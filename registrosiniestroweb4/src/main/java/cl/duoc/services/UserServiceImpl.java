package cl.duoc.services;

import cl.duoc.domain.PersonaDomain;
import cl.duoc.resources.Perfil;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Usuario on 24-05-2017.
 */
public class UserServiceImpl implements UserService {
    @Autowired
    private RegistroSiniestroServices userRepository;
    @Override
    public PersonaDomain findByUsername(String username) {

        return userRepository.obtenerPersona(username);
    }
}
