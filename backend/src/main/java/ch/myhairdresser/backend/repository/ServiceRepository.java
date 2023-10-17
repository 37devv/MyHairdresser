package ch.myhairdresser.backend.repository;

import ch.myhairdresser.backend.model.dao.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    @Query("SELECT s FROM Service s WHERE s.id IN (SELECT MIN(ss.id) FROM Service ss GROUP BY ss.name)")
    List<Service> findDistinctServiceObjects();


}