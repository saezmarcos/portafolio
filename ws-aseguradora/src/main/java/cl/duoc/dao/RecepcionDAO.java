package cl.duoc.dao;

import cl.duoc.domain.Recepcion;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Usuario on 24-04-2017.
 */
public interface RecepcionDAO extends JpaRepository<Recepcion,Long> {
}
