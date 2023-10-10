package ch.myhairdresser.backend.repository;

import ch.myhairdresser.backend.model.dao.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findByAppointmentidentifier(String appointmentIdentifier);

    List<Appointment> findByDateAndHairsalon_Id(Date date, int hairsalonId);
}
