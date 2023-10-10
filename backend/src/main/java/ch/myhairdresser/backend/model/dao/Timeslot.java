package ch.myhairdresser.backend.model.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.sql.Time;

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

}
