package ch.myhairdresser.backend.service;

import ch.myhairdresser.backend.mapper.HairdresserMapper;
import ch.myhairdresser.backend.model.dao.Hairdresser;
import ch.myhairdresser.backend.model.dto.CreateHairdresserRequest;
import ch.myhairdresser.backend.repository.HairdresserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class HairdresserService {

    HairdresserRepository hairdresserRepository;

    private static final HairdresserMapper hairdresserMapper = Mappers.getMapper(HairdresserMapper.class);

    @Autowired
    public HairdresserService(HairdresserRepository hairdresserRepository) {
        this.hairdresserRepository = hairdresserRepository;
    }

    public Hairdresser addHairdresser(CreateHairdresserRequest createHairdresserRequest) {
        Hairdresser hairdresser = hairdresserMapper.fromDto(createHairdresserRequest);
        log.info("adding new hairdresser: {}", hairdresser.toString());
        return hairdresserRepository.save(hairdresser);
    }

    public List<Hairdresser> autocomplete(String keyword) {
        return hairdresserRepository.findByNameContaining(keyword);
    }
}
