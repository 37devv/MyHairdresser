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

    @Mapping(source = "firstname", target = "firstname")
    @Mapping(source = "lastname", target = "lastname")
    @Mapping(source = "telephone", target = "telephone")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "mail", target = "mail")
    @Mapping(source = "hairsalonid", target = "hairsalon.id")
    Appointment fromInDtoToEntity(AppointmentInDto appointmentInDto);

    // If you need to map back from Entity to OutDto, you can adjust this method similarly
    @Mapping(source = "firstname", target = "firstname")
    @Mapping(source = "lastname", target = "lastname")
    @Mapping(source = "telephone", target = "telephone")
    @Mapping(source = "description", target = "description")
    @Mapping(target = "services", ignore = true)
    AppointmentOutDto fromEntityToOutDto(Appointment appointment);
}
