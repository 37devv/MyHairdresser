package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.Service;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.Duration;

@Mapper
public interface ServicesMapper {

    ServicesMapper INSTANCE = Mappers.getMapper(ServicesMapper.class);

    @Mappings({
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "price", source = "price"),
            @Mapping(target = "duration", source = "duration", qualifiedByName = "toDuration")
    })
    Service fromDto(org.openapitools.model.Service serviceDto);

    @Mappings({
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "price", source = "price"),
            @Mapping(target = "duration", source = "duration", qualifiedByName = "toStringDuration")
    })
    org.openapitools.model.Service toDto(Service serviceEntity);

    // Converters
    @Named("toDuration")
    default Duration toDuration(String durationStr) {
        return Duration.ofMinutes(Long.parseLong(durationStr));
    }

    @Named("toStringDuration")
    default String toStringDuration(Duration duration) {
        return duration != null ? duration.toString() : null;
    }
}
