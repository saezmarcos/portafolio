package cl.duoc.dao;

import cl.duoc.domain.Reclamo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Usuario on 26-06-2017.
 */
public interface ReclamoDAO extends JpaRepository<Reclamo,Long> {
}
