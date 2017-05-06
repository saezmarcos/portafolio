package cl.duoc.dao;

import cl.duoc.domain.AdmTaller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Usuario on 24-04-2017.
 */
@Repository
public interface AdmTallerDAO extends JpaRepository<AdmTaller,String> {
}
