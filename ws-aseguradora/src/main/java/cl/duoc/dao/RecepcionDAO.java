package cl.duoc.dao;

import cl.duoc.domain.Recepcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Usuario on 24-04-2017.
 */
@Repository
public interface RecepcionDAO extends JpaRepository<Recepcion,Long> {
}
