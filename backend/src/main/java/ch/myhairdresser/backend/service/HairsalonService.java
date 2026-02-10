package ch.myhairdresser.backend.service;

import ch.myhairdresser.backend.mapper.HairsalonMapper;
import ch.myhairdresser.backend.model.dao.DailyOpeningHours;
import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.model.dao.Image;
import ch.myhairdresser.backend.repository.HairsalonRepository;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.HairsalonInDTO;
import org.openapitools.model.HairsalonOutDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class HairsalonService {

    private final HairsalonRepository hairsalonRepository;

    private static final HairsalonMapper hairsalonMapper = Mappers.getMapper(HairsalonMapper.class);

    public HairsalonService(HairsalonRepository hairsalonRepository) {
        this.hairsalonRepository = hairsalonRepository;
    }

    public HairsalonOutDTO addHairsalon(HairsalonInDTO hairsalonInDTO) {
        Hairsalon hairsalon = hairsalonMapper.fromInDto(hairsalonInDTO);

        // Set the Hairsalon reference on each DailyOpeningHours, Image, and Service
        if (hairsalon.getDailyOpeningHours() != null) {
            for (DailyOpeningHours daily : hairsalon.getDailyOpeningHours()) {
                daily.setHairsalon(hairsalon);
            }
        }

        if (hairsalon.getImages() != null) {
            for (Image image : hairsalon.getImages()) {
                image.setHairsalon(hairsalon);
            }
        }

        if (hairsalon.getServices() != null) {
            for (ch.myhairdresser.backend.model.dao.Service service : hairsalon.getServices()) {
                service.setHairsalon(hairsalon);
            }
        }

        Hairsalon saved = hairsalonRepository.save(hairsalon);
        HairsalonOutDTO outDto = hairsalonMapper.toOutDto(saved);
        return outDto;
    }

    public List<Hairsalon> autocomplete(String keyword) {
        List<Hairsalon> hairsalons = hairsalonRepository.findByNameContaining(keyword);
        List<String> hairsalonNames = hairsalons.stream()
                .map(Hairsalon::getName)
                .toList();

        return hairsalons;
    }

    public HairsalonOutDTO getHairsalonById(Integer salonId) {
        Hairsalon hairsalon = hairsalonRepository.findById(Long.valueOf(salonId)).get();
        return hairsalonMapper.toOutDto(hairsalon);
    }

    public List<Hairsalon> getHairsalonsByCriteria(Double latitude, Double longitude, List<String> serviceNames) {
        Long serviceCount = (long) serviceNames.size();
        return hairsalonRepository.findHairsalonsNearbyWithServices(latitude, longitude, serviceNames, serviceCount);
    }

    public boolean authenticateHairsalon(String email, String password) {
        Optional<Hairsalon> optionalHairsalon = hairsalonRepository.findByMail(email);

        if (!optionalHairsalon.isPresent()) {
            return false;
        }

        Hairsalon hairsalon = optionalHairsalon.get();

        return hairsalon.getPassword().equals(password);
    }
}
