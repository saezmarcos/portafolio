package cl.duoc.dao;

import cl.duoc.domain.Chofer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 02-05-2017.
 */
@Repository
public interface ChoferDAO extends JpaRepository<Chofer,String> {
}
