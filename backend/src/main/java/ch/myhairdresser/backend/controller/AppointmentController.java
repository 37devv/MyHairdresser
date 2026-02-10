package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.model.dao.Appointment;
import ch.myhairdresser.backend.model.dto.AvailableTimeslotResult;
import ch.myhairdresser.backend.service.AppointmentService;
import org.openapitools.api.AppointmentsApi;
import org.openapitools.model.AppointmentInDto;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController implements AppointmentsApi {

    private static final Logger LOGGER = LoggerFactory.getLogger(AppointmentController.class);
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @Override
    @PostMapping
    public ResponseEntity<String> bookAppointment(@RequestBody AppointmentInDto appointmentInDto) {
        LOGGER.info("AppointmentController::bookAppointment request {}", appointmentInDto);
        String bookingUuid = appointmentService.bookAppointment(appointmentInDto);
        return new ResponseEntity<String>(bookingUuid, HttpStatus.CREATED);
    }

    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<?> deleteAppointment(@PathVariable String appointmentId) {
        LOGGER.info("AppointmentController::deleteAppointment request {}", appointmentId);
        return appointmentService.deleteAppointment(appointmentId);
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment> getAppointmentByUuid(@PathVariable String appointmentId) {
        LOGGER.info("AppointmentController::getAppointmentById request {}", appointmentId);
        Appointment appointment = appointmentService.getAppointmentByUuid(appointmentId);
        return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
    }

    @GetMapping("/availability")
    public ResponseEntity<AvailableTimeslotResult> getAppointmentSlots(
                                                            @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate date,
                                                            @RequestParam Integer hairsalonid,
                                                            @RequestParam List<Integer> serviceIds) {
        LOGGER.info("AppointmentController::getAppointmentSlots request date: {}, hairsalonid: {}, serviceIds: {}", date, hairsalonid, serviceIds);
        AvailableTimeslotResult availableTimeslots = appointmentService.getAvailableTimeslots(date, hairsalonid, serviceIds);
        return new ResponseEntity<AvailableTimeslotResult>(availableTimeslots, HttpStatus.OK);
    }

    @GetMapping("/hairsalon/count")
    public ResponseEntity<Long> getAppointmentCountForHairsalon(@RequestParam String hairsalonEmail) {
        LOGGER.info("AppointmentController::getAppointmentCountForHairsalon request email: {}", hairsalonEmail);

        Long count = appointmentService.getAppointmentCountForHairsalonByEmail(hairsalonEmail);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/hairsalon/totalPrice")
    public ResponseEntity<Double> getTotalPriceForHairsalon(@RequestParam String hairsalonEmail) {
        LOGGER.info("AppointmentController::getTotalPriceForHairsalon request email: {}", hairsalonEmail);
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
