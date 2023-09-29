package ch.myhairdresser.backend.model.dao;

import ch.myhairdresser.backend.model.converter.DurationConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import java.time.Duration;

@Entity
@Getter
@Setter
@Slf4j
@ToString
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="price")
    private Double price;

    @Column(name="duration")
    @Convert(converter = DurationConverter.class)
    private Duration duration;

    @ManyToOne
    @JoinColumn(name = "hairsalon_id")
    private Hairsalon hairsalon;

}
