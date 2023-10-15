package ch.myhairdresser.backend.service;

import ch.myhairdresser.backend.mapper.AppointmentMapper;
import ch.myhairdresser.backend.model.dao.Appointment;
import ch.myhairdresser.backend.model.dao.DailyOpeningHours;
import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.model.dao.Timeslot;
import ch.myhairdresser.backend.model.dto.AvailableTimeslotResult;
import ch.myhairdresser.backend.model.dto.Severity;
import ch.myhairdresser.backend.repository.AppointmentRepository;
import ch.myhairdresser.backend.repository.HairsalonRepository;
import ch.myhairdresser.backend.repository.TimeslotRepository;
import io.swagger.models.Response;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.AppointmentInDto;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.*;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final HairsalonRepository hairsalonRepository;
    private final TimeslotRepository timeslotRepository;
    private static final AppointmentMapper appointmentMapper = Mappers.getMapper(AppointmentMapper.class);
    public String bookAppointment(AppointmentInDto appointmentInDto) {
        //Mapper
        Appointment appointmentToSave = appointmentMapper.fromInDtoToEntity(appointmentInDto);
        Optional<Hairsalon> hairsalon = hairsalonRepository.findById(Long.valueOf(appointmentInDto.getHairsalonid()));

        //Set Duration and Price
        DurationTimeResult durationTimeResult = resolveCostAndDurationForSelectedServices(hairsalon, appointmentInDto.getServiceIds());
        appointmentToSave.setDuration(durationTimeResult.duration());
        appointmentToSave.setPrice(durationTimeResult.price());
        appointmentToSave.setServices(durationTimeResult.bookedServices());


        appointmentToSave.setAppointmentidentifier(UUID.randomUUID().toString());

        Set<Timeslot> requiredTimeslots = findTimeslotsForDuration(appointmentInDto.getTime(), appointmentToSave.getDuration());
        appointmentToSave.setTimeslots(requiredTimeslots);

        Appointment appointment = appointmentRepository.save(appointmentToSave);

        return appointment.getAppointmentidentifier();
    }

    private Set<Timeslot> findTimeslotsForDuration(String startTime, Duration duration) {
        // Convert your startTime to a Time object
        LocalTime localStartTime = LocalTime.parse(startTime);
        Time sqlStartTime = Time.valueOf(localStartTime);

        // Calculate the end time based on duration
        LocalTime localEndTime = localStartTime.plusMinutes(duration.toMinutes());
        Time sqlEndTime = Time.valueOf(localEndTime);

        // Fetch timeslots between start and end time
        List<Timeslot> timeslots = timeslotRepository.findByStartBetween(sqlStartTime, sqlEndTime);

        return new HashSet<>(timeslots);
    }

    private DurationTimeResult resolveCostAndDurationForSelectedServices(Optional<Hairsalon> hairsalon, List<Integer> serviceIdsSelectedByUser) {

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

    public AvailableTimeslotResult getAvailableTimeslots(LocalDate date, Integer hairsalonId, List<Integer> serviceIds) {
        Hairsalon hairsalon = hairsalonRepository.findById(Long.valueOf(hairsalonId)).get();

        //Check if salon is closed
        if(isHairsalonClosedOnGivenDaten(date,hairsalon)){
            log.info("Hairsalon is closed on {}", date);
            return new AvailableTimeslotResult(
                    Severity.WARNING,
                    null,
                    "Der Salon ist an diesem Wochentag geschlossen. Bitte wählen Sie einen neuen Tag."
            );
        }

        //Retrieve daily OpeningHours
        Optional<DailyOpeningHours> openingHoursForSingleDay = retrieveDailyOpeningHours(date, hairsalon);

        if (openingHoursForSingleDay.isPresent()){
            List<LocalTime> allTimeSlotsFromSingleDay = generateTimeSlotsForGivenWeekday(openingHoursForSingleDay.get());
            DurationTimeResult durationTimeResult = resolveCostAndDurationForSelectedServices(Optional.of(hairsalon), serviceIds);

            List<LocalTime> possibleTimeslots = generateTimeSlotsBasedOnTimeAndAvailabilityConstraints(allTimeSlotsFromSingleDay, date, hairsalonId, new ArrayList<>(durationTimeResult.bookedServices()));
            return new AvailableTimeslotResult(Severity.OK, possibleTimeslots, "");
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

    private Optional<DailyOpeningHours> retrieveDailyOpeningHours(LocalDate date, Hairsalon hairsalon) {
        Optional<DailyOpeningHours> dailyOpeningHours = hairsalon.getDailyOpeningHours().stream().
                filter(e ->
                        e.getDay() == date.getDayOfWeek().getValue()
                ).findFirst();

        return dailyOpeningHours;
    }

    private List<LocalTime> generateTimeSlotsForGivenWeekday(DailyOpeningHours openingHours) {
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

    //This method returns timeslots where its
    private List<LocalTime> generateTimeSlotsBasedOnTimeAndAvailabilityConstraints(List<LocalTime> dailySlots,
                                                                                   LocalDate date, int hairsalon_id,
                                                                                   List<ch.myhairdresser.backend.model.dao.Service> bookedServices){

        List<Appointment> byDateAndHairsalonId = appointmentRepository.findByDateAndHairsalon_Id(Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant()), hairsalon_id);

        List<LocalTime> dailySlotsWithoutBookedOnes = removeAllBookedSlots(dailySlots, byDateAndHairsalonId);
        List<LocalTime> result = returnAllPossibleSlotsBasedOnTimeConstraint(dailySlotsWithoutBookedOnes,
                bookedServices);
        return result;
    }

    private List<LocalTime> removeAllBookedSlots(List<LocalTime> dailySlots, List<Appointment> listOfAppointments) {
        // Create a set of all booked slots for fast lookup
        Set<LocalTime> bookedSlots = listOfAppointments.stream()
                .flatMap(appointment -> appointment.getTimeslots().stream())
                .map(timeslot -> timeslot.getStart().toLocalTime())
                .collect(Collectors.toSet());

        // Filter dailySlots to exclude booked slots
        return dailySlots.stream()
                .filter(slot -> !bookedSlots.contains(slot))
                .collect(Collectors.toList());
    }

    private List<LocalTime> returnAllPossibleSlotsBasedOnTimeConstraint(List<LocalTime> dailySlots,
                                                                        List<ch.myhairdresser.backend.model.dao.Service> bookedServices){
        // Calculate the total duration required
        Duration totalDuration = bookedServices.stream()
                .map(ch.myhairdresser.backend.model.dao.Service::getDuration)
                .reduce(Duration.ZERO, Duration::plus);

        // Convert the total duration to the equivalent number of slots. Assuming each slot is 15 minutes
        int requiredSlotsCount = calculateAmountOfSlotsNeeded(totalDuration);

        // Filter the dailySlots to find starting slots where the next requiredSlotsCount - 1 slots are also available
        return IntStream.range(0, dailySlots.size() - requiredSlotsCount + 1)
                .filter(index -> {
                    for (int i = 0; i < requiredSlotsCount; i++) {
                        if (!dailySlots.contains(dailySlots.get(index).plusMinutes(i * 15))) {
                            return false;
                        }
                    }
                    return true;
                })
                .mapToObj(index -> dailySlots.get(index))
                .collect(Collectors.toList());
    }


    private int calculateAmountOfSlotsNeeded(Duration totalDuration ){
        return (int) Math.ceil((double) totalDuration.toMinutes() / 15);
    }

    @Transactional
    public ResponseEntity<?> deleteAppointment(String appointmentUuid) {
        // If the return value is greater than 0, it means the delete operation was successful; otherwise, it means no matching records were found for deletion. If the return value is greater than 0, it means the delete operation was successful; otherwise, it means no matching records were found for deletion.
        int deletedRows = appointmentRepository.deleteByAppointmentidentifier(appointmentUuid);

        if (deletedRows > 0) {
            // Return 204 No Content for a successful deletion
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            // Return 404 Not Found if no matching records were found for deletion
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Entity not found");
        }
    }
}

record DurationTimeResult(Duration duration, Double price, Set<ch.myhairdresser.backend.model.dao.Service> bookedServices) {}
