package cl.duoc.dao;

import cl.duoc.domain.FotoEvidSiniestro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 08-04-2017.
 */
@Repository
public interface FotoEvidSiniestroDAO extends JpaRepository <FotoEvidSiniestro,Long> {
}
