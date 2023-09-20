package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.model.dto.CreateHairdresserRequest;
import ch.myhairdresser.backend.service.HairsalonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.api.HairsalonApi;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hairsalon")
@RequiredArgsConstructor
@Slf4j
public class HairsalonController implements HairsalonApi {

    private final HairsalonService hairsalonService;

    @PostMapping
    public ResponseEntity<Hairsalon> saveHairsalon(@RequestBody CreateHairdresserRequest createHairdresserRequest) {
        log.info("incomming request {}", createHairdresserRequest.toString());
        Hairsalon addedHairsalon = hairsalonService.addHairsalon(createHairdresserRequest);
        return new ResponseEntity<Hairsalon>(addedHairsalon, HttpStatus.CREATED);
    }

    @GetMapping
    @Override
    public ResponseEntity<List<String>> autocompleteHairsalonName(String salonNameToComplete) {
        log.info("HairdresserController::autocompleteHairsalonName request {}", salonNameToComplete);
        List<String> hairdresserNames = hairsalonService.autocomplete(salonNameToComplete);
        return ResponseEntity.ok(hairdresserNames);
    }
}
