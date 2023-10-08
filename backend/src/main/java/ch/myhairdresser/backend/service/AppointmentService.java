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
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final HairsalonRepository hairsalonRepository;
    private static final AppointmentMapper appointmentMapper = Mappers.getMapper(AppointmentMapper.class);

    public String bookAppointment(AppointmentInDto appointmentInDto) {
        //Mapper
        Appointment appointmentToSave = appointmentMapper.fromInDtoToEntity(appointmentInDto);
        Optional<Hairsalon> hairsalon = hairsalonRepository.findById(appointmentToSave.getHairsalon().getId());

        //Set Duration and Price
        DurationTimeResult durationTimeResult = resolveCostAndDurationForSelectedServices(hairsalon, appointmentInDto);
        appointmentToSave.setDuration(durationTimeResult.duration());
        appointmentToSave.setPrice(durationTimeResult.price());
        appointmentToSave.setServices(durationTimeResult.bookedServices());

        //Genereate UUID to identify appointment
        appointmentToSave.setAppointmentidentifier(UUID.randomUUID().toString());

        Appointment appointment = appointmentRepository.save(appointmentToSave);
        //TODO: Return UUID
        return appointment.getAppointmentidentifier();
    }

    private DurationTimeResult resolveCostAndDurationForSelectedServices(Optional<Hairsalon> hairsalon, AppointmentInDto appointmentInDto) {

        List<Integer> serviceIdsSelectedByUser = appointmentInDto.getServiceIds();
        List<ch.myhairdresser.backend.model.dao.Service> servicesAvailableFromHairdresser = hairsalon.get().getServices();


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

        Set<ch.myhairdresser.backend.model.dao.Service> bookedServices = new HashSet<>(filteredServices);


        return new DurationTimeResult(totalDuration, totalPrice, bookedServices);

    }

    public Appointment getAppointmentByUuid(String uuid) {
        log.info("AppointmentService::getAppointmentById request {}", uuid);
        Appointment appointment = appointmentRepository.findByAppointmentidentifier(uuid).get();
        return appointment;
    }


}

record DurationTimeResult(Duration duration, Double price, Set<ch.myhairdresser.backend.model.dao.Service> bookedServices) {}
