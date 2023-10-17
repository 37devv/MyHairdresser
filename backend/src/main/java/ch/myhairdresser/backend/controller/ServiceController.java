package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.model.dao.Service;
import ch.myhairdresser.backend.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
@Slf4j
public class ServiceController {

    private final ServiceRepository serviceRepository;

    @GetMapping("/distinct")
    public List<Service> getDistinctServices() {
        return serviceRepository.findDistinctServiceObjects();
    }
}
