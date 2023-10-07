package ch.myhairdresser.backend.service;

import ch.myhairdresser.backend.mapper.AppointmentMapper;
import ch.myhairdresser.backend.model.dao.Appointment;
import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.repository.AppointmentRepository;
import ch.myhairdresser.backend.repository.HairsalonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.AppointmentInDto;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final HairsalonRepository hairsalonRepository;
    private static final AppointmentMapper appointmentMapper = Mappers.getMapper(AppointmentMapper.class);

    public Long bookAppointment(AppointmentInDto appointmentInDto) {
        //Mapper
        Appointment appointmentToSave = appointmentMapper.fromInDtoToEntity(appointmentInDto);

        Optional<Hairsalon> hairsalon = hairsalonRepository.findById(appointmentToSave.getHairsalon().getId());


        List<Integer> serviceIdsSelectedByUser = appointmentInDto.getServiceIds();
        List<ch.myhairdresser.backend.model.dao.Service> servicesAvailableFromHairdresser = hairsalon.get().getServices();

        DurationTimeResult durationTimeResult = receiveCostAndLengthFromSelectedHairdresserServices(serviceIdsSelectedByUser, servicesAvailableFromHairdresser);
        appointmentToSave.setDuration(durationTimeResult.duration());
        appointmentToSave.setPrice(durationTimeResult.price());

        Appointment appointment = appointmentRepository.save(appointmentToSave);


        //TODO: Create second field GUID to use as link identifier
        return appointment.getId();
    }

    private DurationTimeResult receiveCostAndLengthFromSelectedHairdresserServices(List<Integer> serviceIdsSelectedByUser, List<ch.myhairdresser.backend.model.dao.Service> servicesAvailableFromHairdresser) {


        List<ch.myhairdresser.backend.model.dao.Service> filteredServices = servicesAvailableFromHairdresser.stream()
                .filter(service -> serviceIdsSelectedByUser.contains(service.getId().intValue()))
                .toList();

        // Calculate total duration
        Duration totalDuration = filteredServices.stream()
                .map(ch.myhairdresser.backend.model.dao.Service::getDuration)
                .reduce(Duration::plus)
                .orElse(Duration.ZERO);  // Default to ZERO if there's no duration to sum

        // Calculate total price
        double totalPrice = filteredServices.stream()
                .mapToDouble(ch.myhairdresser.backend.model.dao.Service::getPrice)
                .sum();


        return new DurationTimeResult(totalDuration, totalPrice);

    }

    public Appointment getAppointmentById(int id) {
        log.info("AppointmentService::getAppointmentById request {}", id);
        Appointment appointment = appointmentRepository.findById(Long.valueOf(id)).get();
        return appointment;
    }


}

record DurationTimeResult(Duration duration, Double price) {

}
