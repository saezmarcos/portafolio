package cl.duoc.controller;

import cl.duoc.domain.PersonaDomain;
import cl.duoc.resources.Login;
import cl.duoc.resources.Persona;
import cl.duoc.resources.Rol;
import cl.duoc.services.RegistroSiniestroServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

/**
 * Created by Usuario on 14-04-2017.
 */
@Controller
public class registroSiniestroController {
    @RequestMapping(value={"/login","/"},method = RequestMethod.GET)
    public String autenticacion(){
        return("login");
    }
    @Autowired
    private RegistroSiniestroServices registro;
    @RequestMapping(value = {"/acceso/usuario/login/"}, method = RequestMethod.GET)
    public String obtenerAcceso(Model model)   {
        try {
            Authentication aut = SecurityContextHolder.getContext().getAuthentication();
            Rol acces;
            PersonaDomain p = new PersonaDomain();
            if(aut.getPrincipal().equals("anonymousUser")) {
                p.setRut("sinRut");
                p.setPassword("sinPassword");
            }
            else
                p =  registro.obtenerPersona(aut.getName());
            acces=registro.accesoPersona(p.getRut(),p.getPassword());
            if (acces.getRol().equals("No existe usuario") || acces.getRol().equals("Usuario No Activo") )
                model.addAttribute("nombre",acces.getRol());
            else
                model.addAttribute("nombre",p.getNombre());
            switch (acces.getRol())
            {
                case "Analista de Negocio" : return "analistaNegocio";
                case "CallCenter" : return "callCenter";
                case "Liquidador" : return "liquidador";
                case "Cliente"  :   return "cliente";
                case "Siniestrador" : return "siniestrador";
                case "Chofer Grua" : return "chofer";
                case "Administrador Taller" : return "administradorTaller";
                default: return "login";
            }
        }
        catch (Exception e)
        {
            return "error";
        }
    }

    @RequestMapping(value={"/error/"},method = RequestMethod.GET)
    public String errorPagina(){

        return("login");
    }
    @RequestMapping(value={"/logout"},method = RequestMethod.GET)
    public String salidaPagina(){

        return("login");
    }
}
