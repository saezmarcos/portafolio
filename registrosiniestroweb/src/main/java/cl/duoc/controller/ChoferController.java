package cl.duoc.controller;

import cl.duoc.services.RegistroSiniestroServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Usuario on 27-06-2017.
 */
@Controller
public class ChoferController {
    @Autowired
    private RegistroSiniestroServices chofer;
    @RequestMapping(value = {"/chofergrua/menuprincipal/carga/navbar/"}, method = RequestMethod.POST)
    public String cargaNavBar() {
        try {

            return "navbarChofer";
        } catch (Exception e) {
            return "Error";
        }
    }

}
