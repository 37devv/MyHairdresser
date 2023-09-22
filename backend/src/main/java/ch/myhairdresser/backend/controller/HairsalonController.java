package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.service.HairsalonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.api.HairsalonsApi;
import org.openapitools.model.HairsalonInDTO;
import org.openapitools.model.HairsalonOutDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hairsalons")
@RequiredArgsConstructor
@Slf4j
public class HairsalonController implements HairsalonsApi {

    private final HairsalonService hairsalonService;

    @PostMapping
    public ResponseEntity<HairsalonOutDTO> saveHairsalon(@RequestBody HairsalonInDTO hairsalonInDTO) {
        log.info("incomming request {}", hairsalonInDTO.toString());
        HairsalonOutDTO addedHairsalon = hairsalonService.addHairsalon(hairsalonInDTO);
        return new ResponseEntity<HairsalonOutDTO>(addedHairsalon, HttpStatus.CREATED);
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<String>> autocompleteHairsalonName(@RequestParam(name = "salonNameToComplete", required = true) String salonNameToComplete) {
        log.info("HairsalonController::autocompleteHairsalonName request {}", salonNameToComplete);
        List<String> hairdresserNames = hairsalonService.autocomplete(salonNameToComplete);
        return ResponseEntity.ok(hairdresserNames);
    }

    @GetMapping("/{salonId}")
    public ResponseEntity<HairsalonOutDTO> getHairsalonById(Integer salonId) {
        log.info("HairsalonController::getHairsalonById request id:{}", salonId);
        HairsalonOutDTO hairsalon = hairsalonService.getHairsalonById(salonId);
        return new ResponseEntity<HairsalonOutDTO>(hairsalon, HttpStatus.OK);
    }
}
