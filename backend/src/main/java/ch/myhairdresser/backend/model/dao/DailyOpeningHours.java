package ch.myhairdresser.backend.model.dao;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.sql.Time;

@Entity
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public Time getOpen_morning() {
        return open_morning;
    }

    public void setOpen_morning(Time open_morning) {
        this.open_morning = open_morning;
    }

    public Time getClosing_morning() {
        return closing_morning;
    }

    public void setClosing_morning(Time closing_morning) {
        this.closing_morning = closing_morning;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public Time getOpen_afternoon() {
        return open_afternoon;
    }

    public void setOpen_afternoon(Time open_afternoon) {
        this.open_afternoon = open_afternoon;
    }

    public Time getClosing_afternoon() {
        return closing_afternoon;
    }

    public void setClosing_afternoon(Time closing_afternoon) {
        this.closing_afternoon = closing_afternoon;
    }

    public boolean isHas_lunch_break() {
        return has_lunch_break;
    }

    public void setHas_lunch_break(boolean has_lunch_break) {
        this.has_lunch_break = has_lunch_break;
    }

    public Hairsalon getHairsalon() {
        return hairsalon;
    }

    public void setHairsalon(Hairsalon hairsalon) {
        this.hairsalon = hairsalon;
    }
}
