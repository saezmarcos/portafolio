package cl.duoc.controller;

/**
 * Created by Jean on 10-05-2017.
 */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class CallCenterController {

    @RequestMapping(value = {"/menuprincipal/carga/navbarCall/"}, method = RequestMethod.POST)
    public String cargaNavBar() {
        try {
            return "navbarCallCenter";
        } catch (Exception e) {
            return "Error";
        }
    }
    @RequestMapping(value = {"/callCenter/cargar/crear"}, method = RequestMethod.POST)
    public String cargarCrear() {
        try {
            return "agregarSiniestro";
        } catch (Exception e) {
            return "Error";
        }
    }
}
