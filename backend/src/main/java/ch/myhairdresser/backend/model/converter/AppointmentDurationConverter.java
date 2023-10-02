package ch.myhairdresser.backend.model.converter;

import jakarta.persistence.AttributeConverter;
import lombok.extern.slf4j.Slf4j;

import java.time.Duration;

@Slf4j
public class AppointmentDurationConverter implements AttributeConverter<String, Duration> {
    @Override
    public Duration convertToDatabaseColumn(String dbData) {
        log.info("Goes into convertToDatabaseColumn {}", dbData);
        return null;
    }

    @Override
    public String convertToEntityAttribute(Duration attribute) {
        log.info("Goes into convertToEntityAttribute {}", attribute);
        return null;
    }
}