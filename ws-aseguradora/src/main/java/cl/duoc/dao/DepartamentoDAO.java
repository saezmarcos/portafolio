package cl.duoc.dao;

import cl.duoc.domain.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 28-03-2017.
 */
@Repository

public interface DepartamentoDAO extends JpaRepository<Departamento,Long>{

}
