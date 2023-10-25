package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.model.dao.Appointment;
import ch.myhairdresser.backend.model.dto.AvailableTimeslotResult;
import ch.myhairdresser.backend.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.api.AppointmentsApi;
import org.openapitools.model.AppointmentInDto;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
@Slf4j
public class AppointmentController implements AppointmentsApi {

    private final AppointmentService appointmentService;

    @Override
    @PostMapping
    public ResponseEntity<String> bookAppointment(@RequestBody AppointmentInDto appointmentInDto) {
        log.info("AppointmentController::bookAppointment request {}",appointmentInDto);
        String bookingUuid = appointmentService.bookAppointment(appointmentInDto);
        return new ResponseEntity<String>(bookingUuid, HttpStatus.CREATED);
    }

    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<?> deleteAppointment(@PathVariable String appointmentId) {
        log.info("AppointmentController::deleteAppointment request {}", appointmentId);
        return appointmentService.deleteAppointment(appointmentId);
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment> getAppointmentByUuid(@PathVariable String appointmentId) {
        log.info("AppointmentController::getAppointmentById request {}", appointmentId);
        Appointment appointment = appointmentService.getAppointmentByUuid(appointmentId);
        return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
    }

    @GetMapping("/availability")
    public ResponseEntity<AvailableTimeslotResult> getAppointmentSlots(
                                                            @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate date,
                                                            @RequestParam Integer hairsalonid,
                                                            @RequestParam List<Integer> serviceIds) {
        log.info("AppointmentController::getAppointmentSlots request date: {}, hairsalonid: {}, serviceIds: {}", date, hairsalonid, serviceIds);
        AvailableTimeslotResult availableTimeslots = appointmentService.getAvailableTimeslots(date, hairsalonid, serviceIds);
        return new ResponseEntity<AvailableTimeslotResult>(availableTimeslots, HttpStatus.OK);
    }

    @GetMapping("/hairsalon/count")
    public ResponseEntity<Long> getAppointmentCountForHairsalon(@RequestParam String hairsalonEmail) {
        log.info("AppointmentController::getAppointmentCountForHairsalon request email: {}", hairsalonEmail);

        Long count = appointmentService.getAppointmentCountForHairsalonByEmail(hairsalonEmail);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/hairsalon/totalPrice")
    public ResponseEntity<Double> getTotalPriceForHairsalon(@RequestParam String hairsalonEmail) {
        log.info("AppointmentController::getTotalPriceForHairsalon request email: {}", hairsalonEmail);
        Double totalPrice = appointmentService.getTotalPriceForHairsalon(hairsalonEmail);
        return new ResponseEntity<>(totalPrice, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public List<Appointment> getAppointmentsByMailAndDate(
            @RequestParam String mail,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return appointmentService.getAppointmentsByMailAndDate(mail, date);
    }
}
