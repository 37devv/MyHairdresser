package ch.myhairdresser.backend.service;

import ch.myhairdresser.backend.mapper.HairdresserMapper;
import ch.myhairdresser.backend.model.dao.Hairdresser;
import ch.myhairdresser.backend.model.dto.CreateHairdresserRequest;
import ch.myhairdresser.backend.repository.HairdresserRepository;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class HairdresserService {

    private static final Logger logger = LoggerFactory.getLogger(HairdresserService.class);

    HairdresserRepository hairdresserRepository;

    private static final HairdresserMapper hairdresserMapper = Mappers.getMapper(HairdresserMapper.class);

    @Autowired
    public HairdresserService(HairdresserRepository hairdresserRepository) {
        this.hairdresserRepository = hairdresserRepository;
    }

    public Hairdresser addHairdresser(CreateHairdresserRequest createHairdresserRequest) {
        Hairdresser hairdresser = hairdresserMapper.fromDto(createHairdresserRequest);
        logger.info("adding new hairdresser: {}", hairdresser.toString());
        return hairdresserRepository.save(hairdresser);
    }
}
