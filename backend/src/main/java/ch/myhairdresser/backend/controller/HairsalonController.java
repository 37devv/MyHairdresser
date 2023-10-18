package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.model.dto.LoginRequest;
import ch.myhairdresser.backend.service.HairsalonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.api.HairsalonsApi;
import org.openapitools.model.HairsalonInDTO;
import org.openapitools.model.HairsalonOutDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/hairsalons")
@RequiredArgsConstructor
@Slf4j
public class HairsalonController {

    private final HairsalonService hairsalonService;

    @PostMapping
    public ResponseEntity<HairsalonOutDTO> saveHairsalon(@RequestBody HairsalonInDTO hairsalonInDTO) {
        log.info("incomming request {}", hairsalonInDTO.toString());
        HairsalonOutDTO addedHairsalon = hairsalonService.addHairsalon(hairsalonInDTO);
        return new ResponseEntity<HairsalonOutDTO>(addedHairsalon, HttpStatus.CREATED);
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<Hairsalon>> autocompleteHairsalonName(@RequestParam(name = "salonNameToComplete",
                                                                    required = true) String salonNameToComplete) {
        log.info("HairsalonController::autocompleteHairsalonName request {}", salonNameToComplete);
        List<Hairsalon> hairdresserNames = hairsalonService.autocomplete(salonNameToComplete);
        return new ResponseEntity<>(hairdresserNames, HttpStatus.OK);
    }

    @GetMapping("/{salonId}")
    public ResponseEntity<HairsalonOutDTO> getHairsalonById(@PathVariable Integer salonId) {
        log.info("HairsalonController::getHairsalonById request id:{}", salonId);
        HairsalonOutDTO hairsalon = hairsalonService.getHairsalonById(salonId);
        return new ResponseEntity<HairsalonOutDTO>(hairsalon, HttpStatus.OK);
    }

    @GetMapping("/byname/{name}")
    public ResponseEntity<HairsalonOutDTO> getHairsalonByName(Integer salonId) {
        log.info("HairsalonController::getHairsalonById request id:{}", salonId);
        HairsalonOutDTO hairsalon = hairsalonService.getHairsalonById(salonId);
        return new ResponseEntity<HairsalonOutDTO>(hairsalon, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Hairsalon>> getSearchResultsByFilter(@RequestParam Double latitude,
                                                              @RequestParam Double longitude,
                                                              @RequestParam String selectedServices){
        log.info("HairsalonController::getSearchResultsByFilter request latitude: {}, longitude: {}, selected Services: {}",
                latitude, longitude, selectedServices);


        List<String> serviceNames = Arrays.asList(selectedServices.split(","));

        List<Hairsalon> hairsalonsByCriteria = hairsalonService.getHairsalonsByCriteria(latitude, longitude, serviceNames);

        return new ResponseEntity<List<Hairsalon>>(hairsalonsByCriteria, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        log.info("HairsalonController::login request");

        boolean isAuthenticated = hairsalonService.authenticateHairsalon(
                loginRequest.mail(),
                loginRequest.password()
        );

        if (isAuthenticated) {
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Ungültiges Login", HttpStatus.UNAUTHORIZED);
        }
    }
}
