package ch.myhairdresser.backend.service;

import ch.myhairdresser.backend.mapper.HairsalonMapper;
import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.model.dto.CreateHairdresserRequest;
import ch.myhairdresser.backend.repository.HairsalonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class HairsalonService {

    HairsalonRepository hairsalonRepository;

    private static final HairsalonMapper hairsalonMapper = Mappers.getMapper(HairsalonMapper.class);

    @Autowired
    public HairsalonService(HairsalonRepository hairsalonRepository) {
        this.hairsalonRepository = hairsalonRepository;
    }

    public Hairsalon addHairsalon(CreateHairdresserRequest createHairdresserRequest) {
        Hairsalon hairsalon = hairsalonMapper.fromDto(createHairdresserRequest);
        log.info("adding new hairdresser: {}", hairsalon.toString());
        return hairsalonRepository.save(hairsalon);
    }

    public List<String> autocomplete(String keyword) {
        List<Hairsalon> hairsalons = hairsalonRepository.findByNameContaining(keyword);
       /* List<String> hairsalonNames = hairsalons.stream()
                                                    .map(hairsalons)
                                                    .collect(Collectors.toList());*/

        return List.of();
    }
}
