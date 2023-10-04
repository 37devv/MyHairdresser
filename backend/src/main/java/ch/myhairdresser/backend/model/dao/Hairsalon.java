package ch.myhairdresser.backend.model.dao;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Entity
@Getter
@Setter
@Slf4j
@ToString
public class Hairsalon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String street;

    private String plz;

    private String place;

    private String phonenumber;

    private String mail;

    @JsonManagedReference
    @OneToMany(mappedBy = "hairsalon", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Image> images;

    @JsonManagedReference
    @OneToMany(mappedBy = "hairsalon", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<DailyOpeningHours> dailyOpeningHours;

    @JsonManagedReference
    @OneToMany(mappedBy = "hairsalon", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Service> services;

}
