package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.model.dao.Hairdresser;
import ch.myhairdresser.backend.model.dto.CreateHairdresserRequest;
import ch.myhairdresser.backend.service.HairdresserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hairdressers")
@RequiredArgsConstructor
@Slf4j
public class HairdresserController {

    private final HairdresserService hairdresserService;

    @PostMapping
    public ResponseEntity<Hairdresser> addHairdresser(@RequestBody CreateHairdresserRequest createHairdresserRequest) {
        log.info("incomming request {}", createHairdresserRequest.toString());
        Hairdresser addedHairdresser = hairdresserService.addHairdresser(createHairdresserRequest);
        return new ResponseEntity<Hairdresser>(addedHairdresser, HttpStatus.CREATED);
    }
}
