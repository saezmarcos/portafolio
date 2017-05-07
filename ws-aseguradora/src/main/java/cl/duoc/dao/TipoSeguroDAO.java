package cl.duoc.dao;

import cl.duoc.domain.TipoSeguro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Created by Usuario on 29-03-2017.
 */
@Repository
public interface TipoSeguroDAO extends JpaRepository<TipoSeguro,Long> {
}
