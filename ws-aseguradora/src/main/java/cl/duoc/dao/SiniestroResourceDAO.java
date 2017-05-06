package cl.duoc.dao;

import cl.duoc.resource.SiniestroResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 29-03-2017.
 */
@Repository
public interface SiniestroResourceDAO extends JpaRepository<SiniestroResource,Long> {
}
