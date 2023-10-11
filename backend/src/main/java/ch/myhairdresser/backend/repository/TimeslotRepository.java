package ch.myhairdresser.backend.repository;

import ch.myhairdresser.backend.model.dao.Timeslot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.List;

@Repository
public interface TimeslotRepository extends JpaRepository<Timeslot, Long> {
    List<Timeslot> findByStartBetween(Time startTime, Time endTime);
}
