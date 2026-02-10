package ch.myhairdresser.backend.model.converter;

import jakarta.persistence.AttributeConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;

public class AppointmentDurationConverter implements AttributeConverter<String, Duration> {
    private static final Logger LOGGER = LoggerFactory.getLogger(AppointmentDurationConverter.class);

    @Override
    public Duration convertToDatabaseColumn(String dbData) {
        LOGGER.info("Goes into convertToDatabaseColumn {}", dbData);
        return null;
    }

    @Override
    public String convertToEntityAttribute(Duration attribute) {
        LOGGER.info("Goes into convertToEntityAttribute {}", attribute);
        return null;
    }
}
