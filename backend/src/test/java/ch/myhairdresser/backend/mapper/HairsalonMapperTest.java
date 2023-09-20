package ch.myhairdresser.backend.mapper;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

public class HairsalonMapperTest {

    private final HairsalonMapper hairsalonMapper = Mappers.getMapper(HairsalonMapper.class);

    @Test
    public void testDtoToEntityMapping() {
        // Given
        /*CreateHairdresserRequest request = new CreateHairdresserRequest("John Doe's hairdresser", "testdescription");

        // When
        Hairdresser hairdresser = hairdresserMapper.fromDto(request);

        // Then
        assertEquals(request.name(), hairdresser.getName());*/
    }
}
