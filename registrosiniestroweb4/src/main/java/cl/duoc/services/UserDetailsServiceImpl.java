package cl.duoc.services;

import cl.duoc.Util.Util;
import cl.duoc.domain.PersonaDomain;
import cl.duoc.resources.Login;
import cl.duoc.resources.Perfil;
import cl.duoc.resources.Persona;
import cl.duoc.resources.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by Usuario on 23-05-2017.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private RegistroSiniestroServices registro;
    @Override
    public UserDetails loadUserByUsername(String rut) throws UsernameNotFoundException {
        PersonaDomain user =registro.obtenerPersona(rut);
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(user.getPerfil().getRol()));
        return new org.springframework.security.core.userdetails.User(user.getRut(), user.getPassword(), grantedAuthorities);
    }

}
