package cl.duoc.dao;

import cl.duoc.domain.Siniestro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 27-03-2017.
 */
@Repository
public interface SiniestroDAO extends JpaRepository<Siniestro,Long>{
}
