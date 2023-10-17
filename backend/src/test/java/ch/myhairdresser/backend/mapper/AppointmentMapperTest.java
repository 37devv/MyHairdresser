package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.Appointment;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.AppointmentInDto;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;
public class AppointmentMapperTest {

    private final AppointmentMapper appointmentMapper = Mappers.getMapper(AppointmentMapper.class);

    @Test
    public void testMappingFromDtoToEntity2() {
        /*AppointmentInDto dto = new AppointmentInDto();

        dto.setDuration("PT1H");

        Appointment entity = appointmentMapper.fromInDtoToEntity(dto);
        assertEquals(Duration.ofHours(1), entity.getDuration()); // Check duration mapping*/
        java.time.Duration d = java.time.Duration.parse("PT1H");
        System.out.println("Duration in seconds: " + d.get(java.time.temporal.ChronoUnit.SECONDS));
    }


}
