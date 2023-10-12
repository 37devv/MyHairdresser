package ch.myhairdresser.backend.repository;

import ch.myhairdresser.backend.model.dao.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    @Query("SELECT DISTINCT s FROM Service s")
    List<Service> findDistinctServices();

}