package cl.duoc.dao;

import cl.duoc.domain.Poliza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Usuario on 27-03-2017.
 */
@Repository
public interface PolizaDAO extends JpaRepository<Poliza,Long>{
}
