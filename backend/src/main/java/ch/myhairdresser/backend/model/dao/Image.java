package ch.myhairdresser.backend.model.dao;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Hairsalon getHairsalon() {
        return hairsalon;
    }

    public void setHairsalon(Hairsalon hairsalon) {
        this.hairsalon = hairsalon;
    }
}
