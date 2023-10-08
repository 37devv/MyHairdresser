package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.AppointmentInDto;
import org.openapitools.model.AppointmentOutDto;

import java.time.Duration;
import java.time.format.DateTimeParseException;

@Mapper
public interface AppointmentMapper {

    AppointmentMapper INSTANCE = Mappers.getMapper(AppointmentMapper.class);

    @Mapping(source = "duration", target = "duration", qualifiedByName = "stringToDuration")
    @Mapping(source = "hairsalonid", target = "hairsalon.id")
    @Mapping(target = "services", ignore = true)  // This line tells MapStruct to ignore the services field.
    Appointment fromInDtoToEntity(AppointmentInDto hairsalonInDTO);

    @Mapping(source = "duration", target = "duration", qualifiedByName = "durationToString")
    @Mapping(target = "services", ignore = true)  // Similarly, ignore services when mapping in the other direction.
    AppointmentOutDto fromEntityToOutDto(Appointment appointment);


    @Named("stringToDuration")
    default Duration stringToDuration(String durationString) {
        try {
            return Duration.parse(durationString);
        } catch (DateTimeParseException e) {
            // Handle invalid duration format if needed
            throw new IllegalArgumentException("Invalid duration format: " + durationString);
        }
    }


    @Named("durationToString")
    default String durationToString(Duration duration) {
        // Implement the conversion from Duration to a string
        // You can use Duration.toString() or any custom logic here
        return duration.toString();
    }
}
