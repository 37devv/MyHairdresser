package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.DailyOpeningHours;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.sql.Time;
import java.util.regex.Pattern;

@Mapper
public interface DailyOpeningHoursMapper {

    DailyOpeningHoursMapper INSTANCE = Mappers.getMapper(DailyOpeningHoursMapper.class);
    @Mapping(target="open_morning", source = "openMorning", qualifiedByName = "toTime")
    @Mapping(target="closing_morning", source = "closingMorning", qualifiedByName = "toTime")
    @Mapping(target="has_lunch_break", source = "hasLunchBreak")
    @Mapping(target="open_afternoon", source = "openAfternoon", qualifiedByName = "toTime")
    @Mapping(target="closing_afternoon", source = "closingAfternoon", qualifiedByName = "toTime")
    DailyOpeningHours mapToEntity(org.openapitools.model.DailyOpeningHours dto);


    @Mapping(target="openMorning", source = "open_morning")
    @Mapping(target="closingMorning", source = "closing_morning")
    @Mapping(target="hasLunchBreak", source = "has_lunch_break")
    @Mapping(target="openAfternoon", source = "open_afternoon")
    @Mapping(target="closingAfternoon", source = "closing_afternoon")
    org.openapitools.model.DailyOpeningHours mapToOutDTO(DailyOpeningHours entity);


    // Custom conversion methods
    @Named("toTime")
    default Time toTime(String input) {

        if (input == null || input.trim().isEmpty()) {
            return null; // or handle it differently if needed
        }
        input = input + ":00";

        // Expected pattern: HH:mm:ss
        Pattern pattern = Pattern.compile("^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$");
        if (!pattern.matcher(input).matches()) {
            // Log the unexpected input format
            System.out.println("Unexpected time format: " + input);
            return null; // or throw an exception, depending on your needs
        }

        return Time.valueOf(input);
    }


    @Named("toStringTime")
    default String toStringTime(Time time) {
        return time.toString().substring(0, 5);  // returns "HH:mm"
    }


}

