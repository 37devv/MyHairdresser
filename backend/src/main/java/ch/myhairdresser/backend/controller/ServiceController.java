package ch.myhairdresser.backend.controller;

import ch.myhairdresser.backend.model.dao.Service;
import ch.myhairdresser.backend.repository.ServiceRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/services")
public class ServiceController {

    private final ServiceRepository serviceRepository;

    public ServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping("/distinct")
    public List<Service> getDistinctServices() {
        return serviceRepository.findDistinctServiceObjects();
    }
}
