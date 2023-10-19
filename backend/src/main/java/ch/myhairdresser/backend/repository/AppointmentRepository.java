package ch.myhairdresser.backend.repository;

import ch.myhairdresser.backend.model.dao.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findByAppointmentidentifier(String appointmentIdentifier);


    int deleteByAppointmentidentifier(String appointmentidentifier);

    List<Appointment> findByDateAndHairsalon_Id(Date date, int hairsalonId);

    Long countByHairsalon_Mail(String mail);

    @Query("SELECT SUM(a.price) FROM Appointment a WHERE a.hairsalon.mail = :mail")
    Double findTotalPriceByHairsalonMail(@Param("mail") String hairsalonMail);

    List<Appointment> findByDateAndHairsalon_Mail(Date date, String mail);
}
