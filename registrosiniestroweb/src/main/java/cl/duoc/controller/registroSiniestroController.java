package cl.duoc.controller;

import cl.duoc.domain.PersonaDomain;
import cl.duoc.resources.Login;
import cl.duoc.resources.Persona;
import cl.duoc.resources.Rol;
import cl.duoc.services.RegistroSiniestroServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Usuario on 14-04-2017.
 */
@Controller
public class registroSiniestroController {
    @RequestMapping(value={"/","login","Aseguradora/login"})
    public String autenticacion(){
        return("login");
    }
    @Autowired
    private RegistroSiniestroServices registro;
    @RequestMapping(value = {"/acceso/usuario/login/"}, method = RequestMethod.POST)
    public String obtenerAcceso(@ModelAttribute("login") Login login, Model model)   {
        try {
            Rol acces = registro.accesoPersona(login.getRut(), login.getPassword());
            PersonaDomain p ;
            p =  registro.obtenerPersona(login.getRut());
            model.addAttribute("nombre",p.getNombre());
            if (acces.getRol().equals("Analista de Negocio")) {
                return "analistaNegocio";
            } else {
                if (acces.getRol().equals("CallCenter")) {
                    return "agregarSiniestro";
                }else
                {
                    return "login";
                }
            }
        }
        catch (Exception e)
        {
            return "error";
        }
    }

    @RequestMapping(value={"/sistema/error/"},method = RequestMethod.GET)
    public String errorPagina(){

        return("login");
    }
    @RequestMapping(value={"/sistema/salir/"},method = RequestMethod.GET)
    public String salidaPagina(){

        return("login");
    }
}
