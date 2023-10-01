package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hairsalons")
@RequiredArgsConstructor
@Slf4j
public class AppointmentController {

    private final AppointmentService appointmentService;

    public ResponseEntity<String> bookAppointment(Object reequest) {
        log.info("incomming request {}",reequest);
        return new ResponseEntity<String>("test", HttpStatus.CREATED);
    }

    //Get Available Slots

}
