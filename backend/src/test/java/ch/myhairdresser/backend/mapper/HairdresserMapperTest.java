package ch.myhairdresser.backend.mapper;



import ch.myhairdresser.backend.model.dao.Hairdresser;
import ch.myhairdresser.backend.model.dto.CreateHairdresserRequest;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class HairdresserMapperTest {

    private final HairdresserMapper hairdresserMapper = Mappers.getMapper(HairdresserMapper.class);

    @Test
    public void testDtoToEntityMapping() {
        // Given
        CreateHairdresserRequest request = new CreateHairdresserRequest("John Doe's hairdresser");

        // When
        Hairdresser hairdresser = hairdresserMapper.fromDto(request);

        // Then
        assertEquals(request.name(), hairdresser.getName());
    }
}
