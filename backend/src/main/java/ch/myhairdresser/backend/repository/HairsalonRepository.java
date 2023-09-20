package ch.myhairdresser.backend.repository;

import ch.myhairdresser.backend.model.dao.Hairsalon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HairsalonRepository extends JpaRepository<Hairsalon, Long> {
    List<Hairsalon> findByNameContaining(String name);
}
