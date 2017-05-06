package cl.duoc.dao;

import cl.duoc.domain.Aseguradora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 01-05-2017.
 */
@Repository
public interface AseguradoraDAO extends JpaRepository<Aseguradora,String>{
}
