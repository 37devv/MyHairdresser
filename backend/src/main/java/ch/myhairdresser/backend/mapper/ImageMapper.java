package ch.myhairdresser.backend.mapper;

import ch.myhairdresser.backend.model.dao.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface ImageMapper {

    ImageMapper INSTANCE = Mappers.getMapper(ImageMapper.class);

    @Mapping(target = "link", source = "imageUrl")
    Image fromImageUrl(String imageUrl);

    @Named("fromImageUrls")
    default List<Image> fromImageUrls(List<String> imageUrls) {
        return imageUrls.stream()
                .map(this::fromImageUrl)
                .collect(Collectors.toList());
    }

}

