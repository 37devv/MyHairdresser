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

import java.sql.Time;
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

    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment> getAppointmentByUuid(@PathVariable String appointmentId) {
        log.info("AppointmentController::getAppointmentById request {}", appointmentId);
        Appointment appointment = appointmentService.getAppointmentByUuid(appointmentId);
        return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
    }

    @GetMapping("/availability")
    public ResponseEntity<AvailableTimeslotResult> getAppointmentSlots(@RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate date,
                                                          @RequestParam Integer hairsalonid,
                                                          @RequestParam List<Integer> serviceIds) {
        log.info("AppointmentController::getAppointmentSlots request date: {}, hairsalonid: {}, serviceIds: {}", date, hairsalonid, serviceIds);
        AvailableTimeslotResult availableTimeslots = appointmentService.getAvailableTimeslots(date, hairsalonid, serviceIds);
        return new ResponseEntity<AvailableTimeslotResult>(availableTimeslots, HttpStatus.OK);
    }

}
