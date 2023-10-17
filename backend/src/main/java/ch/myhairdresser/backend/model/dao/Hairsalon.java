package ch.myhairdresser.backend.model.dao;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
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

    private String address;

    private String phonenumber;

    private String mail;

    @Column(precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(precision = 9, scale = 6)
    private BigDecimal longitude;

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
