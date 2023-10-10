package ch.myhairdresser.backend.model.dao;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.sql.Time;
import java.util.Set;

@Entity
@Getter
@Setter
@Slf4j
public class Timeslot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="open_morning")
    private Time start;

    @Column(name="closing_morning")
    private Time end;

    @ManyToMany(mappedBy = "timeslots")
    @JsonBackReference
    private Set<Appointment> appointments;
}
