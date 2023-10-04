package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.model.dao.Appointment;
import ch.myhairdresser.backend.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.api.AppointmentsApi;
import org.openapitools.model.AppointmentInDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
@Slf4j
public class AppointmentController implements AppointmentsApi {

    private final AppointmentService appointmentService;

    @Override
    @PostMapping
    public ResponseEntity<Long> bookAppointment(@RequestBody AppointmentInDto appointmentInDto) {
        log.info("AppointmentController::bookAppointment request {}",appointmentInDto);
        Long bookingId = appointmentService.bookAppointment(appointmentInDto);
        return new ResponseEntity<Long>(bookingId, HttpStatus.CREATED);
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Integer appointmentId) {
        log.info("AppointmentController::getAppointmentById request {}", appointmentId);
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);
        return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
    }

    //Get Available Slots TBD

}
