package cl.duoc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Jean on 28-05-2017.
 */
@Controller
public class ClienteController {
    @RequestMapping(value = {"/cliente/menuprincipal/carga/navbarCliente/"}, method = RequestMethod.POST)
    public String cargaNavBar() {
        try {
            return "navbarCliente";
        } catch (Exception e) {
            return "Error";
        }
    }
    @RequestMapping(value = {"/cliente/mostrar/estadoSiniestro/"}, method = RequestMethod.POST)
    public String cargarEstadoSiniestro() {
        try {
            return "estadoSiniestro";
        } catch (Exception e) {
            return "Error";
        }
    }
}
