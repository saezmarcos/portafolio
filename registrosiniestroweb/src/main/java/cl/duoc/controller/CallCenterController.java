package cl.duoc.controller;

/**
 * Created by Jean on 10-05-2017.
 */

import cl.duoc.Util.Util;
import cl.duoc.domain.SiniestroDomain;
import cl.duoc.resources.Comuna;
import cl.duoc.resources.CreacionUsuario;
import cl.duoc.services.RegistroSiniestroServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.websocket.server.PathParam;
import java.util.List;

@Controller
public class CallCenterController {

    @Autowired
    private RegistroSiniestroServices callCenter;

    @RequestMapping("/callCenter/agregarSiniestro/comunasComboBox/")
    public
    @ResponseBody
    String obtenerParametros() {
        CreacionUsuario listaComunas = new CreacionUsuario();
        List<Comuna> comunas = callCenter.obtenerComunas();
        listaComunas.setComunas(comunas);
        String jsonRes = Util.convertirAJson(listaComunas);
        return jsonRes;
    }


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

    @RequestMapping(value = {"/callCenter/consultar/poliza/"}, method = RequestMethod.POST)
    public
    @ResponseBody
    String consultarPoliza(@PathParam("idPoliza") String idPoliza) {
        try {
            String cc = callCenter.obtenerPoliza(idPoliza);
            return cc;
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/callCenter/crear/idSiniestro/"}, method = RequestMethod.POST)
    public
    @ResponseBody
    String obtenerNroSiniestro() {
        try {
            String idSiniestroGenerado = callCenter.obtenerNroSiniestro();
            return idSiniestroGenerado;
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/callCenter/crear/siniestro/"}, method = RequestMethod.POST)
    public
    @ResponseBody
    String crearSiniestro(@PathParam("siniestro") String siniestro) {
        try {
            SiniestroDomain s = (SiniestroDomain) Util.jsonObject(siniestro, SiniestroDomain.class);
            String siniestroACrear = callCenter.crearSiniestro(Util.convertirAJson(s));
            return siniestroACrear;
        } catch (Exception e) {
            return "Error";
        }
    }

}
