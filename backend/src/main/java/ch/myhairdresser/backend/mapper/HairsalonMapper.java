package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.Hairsalon;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.HairsalonInDTO;
import org.openapitools.model.HairsalonOutDTO;

@Mapper(uses = DailyOpeningHoursMapper.class)
public interface HairsalonMapper {

    HairsalonMapper INSTANCE = Mappers.getMapper(HairsalonMapper.class);

    Hairsalon fromInDto(HairsalonInDTO hairsalonInDTO);

    @Mapping(target = "dailyOpeningHours", source = "dailyOpeningHours")
    HairsalonOutDTO toOutDto(Hairsalon hairsalon);
}
