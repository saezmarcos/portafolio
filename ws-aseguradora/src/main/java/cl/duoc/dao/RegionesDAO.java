package cl.duoc.dao;

import cl.duoc.domain.Regiones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 23-05-2017.
 */
@Repository
public interface RegionesDAO extends JpaRepository<Regiones,Long> {

}
