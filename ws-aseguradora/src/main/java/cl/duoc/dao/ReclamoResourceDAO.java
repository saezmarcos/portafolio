package cl.duoc.dao;

import cl.duoc.resource.RaclamoResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 26-06-2017.
 */
@Repository
public interface ReclamoResourceDAO extends JpaRepository<RaclamoResource,Long> {
}
