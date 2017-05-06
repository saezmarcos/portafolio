package cl.duoc.dao;

import cl.duoc.domain.Comuna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 28-03-2017.
 */
@Repository
public interface ComunaDAO extends JpaRepository<Comuna,Long>{
}
