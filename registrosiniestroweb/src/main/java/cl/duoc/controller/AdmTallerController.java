package cl.duoc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Usuario on 30-05-2017.
 */
@Controller
public class AdmTallerController {
    @RequestMapping(value = {"/administradortaller/menuprincipal/carga/navbar/"}, method = RequestMethod.POST)
    public String cargaNavBar() {
        try {
            return "navbarAdmTaller";
        } catch (Exception e) {
            return "Error";
        }
    }

}
