package cl.duoc.controller;

import cl.duoc.Util.Util;
import cl.duoc.domain.PersonaDomain;
import cl.duoc.resources.Siniestro;
import cl.duoc.services.RegistroSiniestroServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.websocket.server.PathParam;

/**
 * Created by Jean on 28-05-2017.
 */
@Controller
public class ClienteController {
    @Autowired
    private RegistroSiniestroServices cliente;
    @RequestMapping(value = {"/cliente/menuprincipal/carga/navbarCliente/"}, method = RequestMethod.POST)
    public String cargaNavBar() {
        try {
            return "navbarCliente";
        } catch (Exception e) {
            return "Error";
        }
    }
    @RequestMapping(value = {"/cliente/mostrar/estadoSiniestro/"}, method = RequestMethod.POST)
    public String cargarEstadoSiniestro(Model model) {
        try {
            Authentication aut = SecurityContextHolder.getContext().getAuthentication();
            PersonaDomain p = cliente.obtenerPersona(aut.getName());
            model.addAttribute("password",p.getPassword());
            return "estadoSiniestro";
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/cliente/obtener/poliza/"},method = RequestMethod.POST)
    public @ResponseBody
    String obtnerPoliza(@PathParam("id_poliza") String id_poliza)
    {
        try
        {

            return cliente.obtenerPoliza(id_poliza);
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value={"/cliente/cargar/estados/"},method = RequestMethod.POST)
    public @ResponseBody String listadoPresupuestos()
    {
        try {
            return cliente.obtenerTodosEstados();
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value={"/cliente/obtener/historial/"},method = RequestMethod.POST)
    public @ResponseBody String cagarhistorial(@PathParam("idSiniestro")String idSiniestro)
    {
        return cliente.obtenerHistorialBySiniestro(Long.parseLong(idSiniestro));
    }
    @RequestMapping(value = {"/cliente/mostrar/estadoSiniestroFinal/"}, method = RequestMethod.POST)
    public String cargarEstadoSiniestroFinal(Model model) {
        try {
            Authentication aut = SecurityContextHolder.getContext().getAuthentication();
            PersonaDomain p = cliente.obtenerPersona(aut.getName());
            model.addAttribute("password",p.getPassword());
            return "estadoSiniestroFinal";
        } catch (Exception e) {
            return "Error";
        }
    }
}
