package cl.duoc.services;

import cl.duoc.domain.PersonaDomain;

/**
 * Created by Usuario on 24-05-2017.
 */
public interface UserService {
    PersonaDomain findByUsername(String username);
}
