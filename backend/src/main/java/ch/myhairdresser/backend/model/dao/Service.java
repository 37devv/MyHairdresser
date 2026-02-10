package ch.myhairdresser.backend.model.dao;

import ch.myhairdresser.backend.model.converter.DurationConverter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import io.hypersistence.utils.hibernate.type.interval.PostgreSQLIntervalType;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.time.Duration;
import java.util.Set;

@Entity
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="price")
    private Double price;

    @Column(name="duration")
    //@Convert(converter = DurationConverter.class)
    @Type(PostgreSQLIntervalType.class)
    private Duration duration;

    @ManyToOne
    @JoinColumn(name = "hairsalon_id")
    @JsonBackReference
    private Hairsalon hairsalon;

    @ManyToMany(mappedBy = "services")
    @JsonBackReference
    private Set<Appointment> appointments;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public Hairsalon getHairsalon() {
        return hairsalon;
    }

    public void setHairsalon(Hairsalon hairsalon) {
        this.hairsalon = hairsalon;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    }
}
