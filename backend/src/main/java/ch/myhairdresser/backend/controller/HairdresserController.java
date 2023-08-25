package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.model.dao.Hairdresser;
import ch.myhairdresser.backend.model.dto.CreateHairdresserRequest;
import ch.myhairdresser.backend.service.HairdresserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hairdressers")
@RequiredArgsConstructor
public class HairdresserController {

    private final HairdresserService hairdresserService;

    @PostMapping
    public ResponseEntity<Hairdresser> addHairdresser(@RequestBody CreateHairdresserRequest createHairdresserRequest) {
        Hairdresser addedHairdresser = hairdresserService.addHairdresser(createHairdresserRequest);
        return new ResponseEntity<Hairdresser>(addedHairdresser, HttpStatus.CREATED);


    }
}
