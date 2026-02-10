package ch.myhairdresser.backend.model.dao;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.hypersistence.utils.hibernate.type.interval.PostgreSQLIntervalType;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.time.Duration;
import java.util.Date;
import java.util.Set;

@SuppressWarnings("ALL")
@Entity
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

    @ManyToMany
    @JoinTable(
            name = "appointment_timeslot_mapping", // Name of the join table
            joinColumns = @JoinColumn(name = "appointmentid"), // Column in join table for Appointment
            inverseJoinColumns = @JoinColumn(name = "timeslotid") // Column in join table for Service
    )
    @JsonManagedReference
    private Set<Timeslot> timeslots;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAppointmentidentifier() {
        return appointmentidentifier;
    }

    public void setAppointmentidentifier(String appointmentidentifier) {
        this.appointmentidentifier = appointmentidentifier;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    public Set<Service> getServices() {
        return services;
    }

    public void setServices(Set<Service> services) {
        this.services = services;
    }

    public Set<Timeslot> getTimeslots() {
        return timeslots;
    }

    public void setTimeslots(Set<Timeslot> timeslots) {
        this.timeslots = timeslots;
    }
}
