package ch.myhairdresser.backend.model.dao;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.sql.Time;

@Entity
@Getter
@Setter
@Slf4j
@Table(name="daily-opening-hours")
public class DailyOpeningHours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="day")
    private Integer day;

    @Column(name="open_morning")
    private Time open_morning;

    @Column(name="closing_morning")
    private Time closing_morning;

    @Column(name="closed")
    private boolean closed;

    @Column(name="open_afternoon")
    private Time open_afternoon;

    @Column(name="closing_afternoon")
    private Time closing_afternoon;

    @Column(name="has_lunch_break")
    private boolean has_lunch_break;

    // Many-to-One relationship with Hairsalon
    @ManyToOne
    @JoinColumn(name = "hairsalon_id")
    @JsonBackReference
    private Hairsalon hairsalon;
}