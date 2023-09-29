package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.Service;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ServicesMapper {

    ServicesMapper INSTANCE = Mappers.getMapper(ServicesMapper.class);


    org.openapitools.model.Service mapToOutDTO(Service entity);

}
