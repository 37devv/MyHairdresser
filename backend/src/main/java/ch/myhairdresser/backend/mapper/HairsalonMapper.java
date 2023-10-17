package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.model.dao.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.HairsalonInDTO;
import org.openapitools.model.HairsalonOutDTO;

import java.util.List;

@Mapper(uses = DailyOpeningHoursMapper.class)
public interface HairsalonMapper {

    HairsalonMapper INSTANCE = Mappers.getMapper(HairsalonMapper.class);

    Hairsalon fromInDto(HairsalonInDTO hairsalonInDTO);

    @Mapping(target = "dailyOpeningHours", source = "dailyOpeningHours")
    HairsalonOutDTO toOutDto(Hairsalon hairsalon);

    // Custom mapping method to map List<String> images to List<Image> images
    List<Image> mapImages(List<String> images);

    // Custom mapping method to map a single String to an Image
    Image mapImage(String image);
}
