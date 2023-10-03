package ch.myhairdresser.backend.model.dao;

import ch.myhairdresser.backend.model.converter.AppointmentDurationConverter;
import ch.myhairdresser.backend.model.converter.DurationConverter;
import io.hypersistence.utils.hibernate.type.interval.PostgreSQLIntervalType;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Type;

import java.time.Duration;

@SuppressWarnings("ALL")
@Entity
@Getter
@Setter
@Slf4j
@ToString
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;

    private String lastname;

    private String mail;

    private String telephone;

    private String description;

    @Type(PostgreSQLIntervalType.class)
    @Column(name="duration", columnDefinition = "interval")
    private Duration duration;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hairsalon_id")
    private Hairsalon hairsalon;

}
