package cl.duoc.dao;

import cl.duoc.domain.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 27-05-2017.
 */
@Repository
public interface EstadoDAO extends JpaRepository<Estado,Long> {
}
