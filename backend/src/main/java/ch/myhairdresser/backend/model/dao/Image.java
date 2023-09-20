package ch.myhairdresser.backend.model.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Entity
@Getter
@Setter
@Slf4j
@ToString
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    // Many-to-One relationship with Hairsalon
    @ManyToOne
    @JoinColumn(name = "hairsalon_id")
    private Hairsalon hairsalon;
}
