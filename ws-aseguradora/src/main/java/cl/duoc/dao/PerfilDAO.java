package cl.duoc.dao;

import cl.duoc.domain.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 16-04-2017.
 */
@Repository
public interface PerfilDAO extends JpaRepository<Perfil,Long>{

}
