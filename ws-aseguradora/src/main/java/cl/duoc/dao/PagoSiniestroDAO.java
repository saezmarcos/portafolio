package cl.duoc.dao;

import cl.duoc.domain.PagoSiniestro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 11-06-2017.
 */
@Repository
public interface PagoSiniestroDAO extends JpaRepository<PagoSiniestro,Long> {
}
