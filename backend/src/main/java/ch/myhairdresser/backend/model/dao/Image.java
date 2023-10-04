package ch.myhairdresser.backend.model.dao;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Entity
@Getter
@Setter
@Slf4j
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String link;

    // Many-to-One relationship with Hairsalon
    @ManyToOne
    @JoinColumn(name = "hairsalon_id")
    @JsonBackReference
    private Hairsalon hairsalon;
}
