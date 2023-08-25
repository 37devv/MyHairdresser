package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.Hairdresser;
import ch.myhairdresser.backend.model.dto.CreateHairdresserRequest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HairdresserMapper {

    HairdresserMapper INSTANCE = Mappers.getMapper(HairdresserMapper.class);

    Hairdresser fromDto(CreateHairdresserRequest createHairdresserRequest);
}
