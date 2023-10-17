package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.model.dao.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.HairsalonInDTO;
import org.openapitools.model.HairsalonOutDTO;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(uses = {DailyOpeningHoursMapper.class, ImageMapper.class, ServicesMapper.class})
public interface HairsalonMapper {

    HairsalonMapper INSTANCE = Mappers.getMapper(HairsalonMapper.class);

    @Mapping(target = "images", source = "images", qualifiedByName = "fromImageUrls")
    @Mapping(target = "dailyOpeningHours", source = "openingTimes")
    Hairsalon fromInDto(HairsalonInDTO hairsalonInDTO);

    @Mapping(target = "dailyOpeningHours", source = "dailyOpeningHours")
    HairsalonOutDTO toOutDto(Hairsalon hairsalon);



}
