package ch.myhairdresser.backend.repository;

import ch.myhairdresser.backend.model.dao.Hairsalon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HairsalonRepository extends JpaRepository<Hairsalon, Long> {
    List<Hairsalon> findByNameContaining(String name);

    // Mit Hilfe von ChatGPT gelöst
    @Query(nativeQuery = true,
            value = "SELECT h.* FROM Hairsalon h " +
                    "JOIN Service s ON h.id = s.hairsalon_id " +
                    "WHERE SQRT(POW(111.045 * (h.latitude - :latitude), 2) + " +
                    "POW(111.045 * (:longitude - h.longitude) * COS(h.latitude / 57.3), 2)) <= 20 " +
                    "AND s.name IN :serviceNames " +
                    "GROUP BY h.id " +
                    "HAVING COUNT(DISTINCT s.name) = :serviceCount")
    List<Hairsalon> findHairsalonsNearbyWithServices(@Param("latitude") Double latitude,
                                                     @Param("longitude") Double longitude,
                                                     @Param("serviceNames") List<String> serviceNames,
                                                     @Param("serviceCount") Long serviceCount);

    Optional<Hairsalon> findByMail(String mail);
}
