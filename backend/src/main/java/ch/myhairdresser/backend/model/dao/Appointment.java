package ch.myhairdresser.backend.model.dao;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.hypersistence.utils.hibernate.type.interval.PostgreSQLIntervalType;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Type;

import java.time.Duration;
import java.util.Date;
import java.util.Set;

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

    private String appointmentidentifier;

    private String firstname;

    private String lastname;

    private String mail;

    private String telephone;

    private String description;

    private Double price;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Type(PostgreSQLIntervalType.class)
    @Column(name="duration", columnDefinition = "interval")
    private Duration duration;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hairsalon_id")
    private Hairsalon hairsalon;


    @ManyToMany
    @JoinTable(
            name = "appointment_service_mapping", // Name of the join table
            joinColumns = @JoinColumn(name = "appointmentid"), // Column in join table for Appointment
            inverseJoinColumns = @JoinColumn(name = "serviceid") // Column in join table for Service
    )
    @JsonManagedReference
    private Set<Service> services;

}
