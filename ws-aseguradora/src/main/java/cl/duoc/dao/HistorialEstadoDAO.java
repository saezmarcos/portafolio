package cl.duoc.dao;

import cl.duoc.domain.HistorialEstado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 27-05-2017.
 */
@Repository
public interface HistorialEstadoDAO extends JpaRepository<HistorialEstado,Long> {
}
