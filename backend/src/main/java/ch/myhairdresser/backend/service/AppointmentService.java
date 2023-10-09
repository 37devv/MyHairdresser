package ch.myhairdresser.backend.service;

import ch.myhairdresser.backend.mapper.AppointmentMapper;
import ch.myhairdresser.backend.model.dao.Appointment;
import ch.myhairdresser.backend.model.dao.DailyOpeningHours;
import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.model.dto.AvailableTimeslotResult;
import ch.myhairdresser.backend.model.dto.Severity;
import ch.myhairdresser.backend.repository.AppointmentRepository;
import ch.myhairdresser.backend.repository.HairsalonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.AppointmentInDto;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

        Appointment appointment = appointmentRepository.findByAppointmentidentifier(uuid).get();
        return appointment;
    }

    public AvailableTimeslotResult getAvailableTimeslots(LocalDate date, Integer hairsalonId, List<Integer> serviceIds){
        Hairsalon hairsalon = hairsalonRepository.findById(Long.valueOf(hairsalonId)).get();

        //Schauen ob der Salon geschlossen ist
        if(isHairsalonClosedOnGivenDaten(date,hairsalon)){
            log.info("Hairsalon is closed on {}", date);
            return new AvailableTimeslotResult(Severity.WARNING, null,
                    "Der Salon ist an diesem Wochentag geschlossen. Bitte wählen Sie einen neuen Tag.");
        }

        return new AvailableTimeslotResult(Severity.OK, retrieveDailyOpeningHours(date, hairsalon), "");
    }

    private List<LocalTime> retrieveDailyOpeningHours(LocalDate date, Hairsalon hairsalon) {
        Optional<DailyOpeningHours> dailyOpeningHours = hairsalon.getDailyOpeningHours().stream().
                filter(e ->
                        e.getDay() == date.getDayOfWeek().getValue()
                ).findFirst();



        if (dailyOpeningHours.isPresent()){
            return generateTimeSlots(dailyOpeningHours.get());
        }

        return null;
    }

    private boolean isHairsalonClosedOnGivenDaten(LocalDate date, Hairsalon hairsalon) {
        List<DailyOpeningHours> dailyOpeningHours = hairsalon.getDailyOpeningHours();

        DayOfWeek weekday = date.getDayOfWeek();

        //This checks if the hairsalon is closed on given date
        return dailyOpeningHours.stream()
                .filter(doh -> doh.getDay() == weekday.getValue())
                .anyMatch(DailyOpeningHours::isClosed);
    }

    public List<LocalTime> generateTimeSlots(DailyOpeningHours openingHours) {
        LocalTime startMorning = openingHours.getOpen_morning().toLocalTime();
        LocalTime endMorning = openingHours.getClosing_morning().toLocalTime();

        List<LocalTime> morningSlots = Stream.iterate(startMorning, time -> time.isBefore(endMorning), time -> time.plusMinutes(15))
                .collect(Collectors.toList());

        LocalTime startAfternoon = openingHours.getOpen_afternoon().toLocalTime();
        LocalTime endAfternoon = openingHours.getClosing_afternoon().toLocalTime();

        List<LocalTime> afternoonSlots = Stream.iterate(startAfternoon, time -> time.isBefore(endAfternoon), time -> time.plusMinutes(15))
                .collect(Collectors.toList());

        morningSlots.addAll(afternoonSlots);
        return morningSlots;
    }
}

record DurationTimeResult(Duration duration, Double price, Set<ch.myhairdresser.backend.model.dao.Service> bookedServices) {}
