package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.Hairsalon;
import ch.myhairdresser.backend.model.dto.CreateHairdresserRequest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HairsalonMapper {

    HairsalonMapper INSTANCE = Mappers.getMapper(HairsalonMapper.class);

    Hairsalon fromDto(CreateHairdresserRequest createHairdresserRequest);
}
