package ch.myhairdresser.backend.model.dao;

import ch.myhairdresser.backend.model.converter.AppointmentDurationConverter;
import ch.myhairdresser.backend.model.converter.DurationConverter;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
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

    @Column(name="duration", columnDefinition = "interval")
    private Duration duration;

    @ManyToOne
    @JoinColumn(name = "hairsalon_id")
    private Hairsalon hairsalon;

}
