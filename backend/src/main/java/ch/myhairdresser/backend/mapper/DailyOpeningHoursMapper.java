package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.DailyOpeningHours;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface DailyOpeningHoursMapper {

    DailyOpeningHoursMapper INSTANCE = Mappers.getMapper(DailyOpeningHoursMapper.class);

    //@Mapping(target = "hairsalon", ignore = true) // Ignore hairsalon to avoid cyclic mapping
    DailyOpeningHours mapToEntity(org.openapitools.model.DailyOpeningHours dto);


    @Mapping(target="openMorning", source = "open_morning")
    @Mapping(target="closingMorning", source = "closing_morning")
    @Mapping(target="hasLunchBreak", source = "has_lunch_break")
    @Mapping(target="openAfternoon", source = "open_afternoon")
    @Mapping(target="closingAfternoon", source = "closing_afternoon")
    org.openapitools.model.DailyOpeningHours mapToOutDTO(DailyOpeningHours entity);





}

