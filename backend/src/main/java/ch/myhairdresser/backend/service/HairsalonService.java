package ch.myhairdresser.backend.service;

import ch.myhairdresser.backend.mapper.HairsalonMapper;
import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.repository.HairsalonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.HairsalonInDTO;
import org.openapitools.model.HairsalonOutDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


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

    public HairsalonOutDTO addHairsalon(HairsalonInDTO hairsalonInDTO) {
        /*Hairsalon hairsalon = hairsalonMapper.fromInDto(hairsalonInDTO);
        Hairsalon saved = hairsalonRepository.save(hairsalon);
        HairsalonOutDTO outDto = hairsalonMapper.toOutDto(saved);
        return outDto;*/
        return null;
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
}
