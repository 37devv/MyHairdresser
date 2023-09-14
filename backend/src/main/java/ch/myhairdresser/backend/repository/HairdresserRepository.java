package ch.myhairdresser.backend.repository;


import ch.myhairdresser.backend.model.dao.Hairdresser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HairdresserRepository extends JpaRepository<Hairdresser, Long> {
    List<Hairdresser> findByNameContaining(String name);
}
