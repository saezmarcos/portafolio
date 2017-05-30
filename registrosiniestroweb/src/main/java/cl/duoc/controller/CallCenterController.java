package cl.duoc.controller;

/**
 * Created by Jean on 10-05-2017.
 */

import cl.duoc.Util.Util;
import cl.duoc.domain.EstadoDomain;
import cl.duoc.domain.PersonaDomain;
import cl.duoc.domain.SiniestroDomain;
import cl.duoc.resources.*;
import cl.duoc.services.RegistroSiniestroServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.websocket.server.PathParam;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

@Controller
public class CallCenterController {

    @Autowired
    private RegistroSiniestroServices callCenter;

    @RequestMapping("/callcenter/agregarSiniestro/comunasComboBox/")
    public
    @ResponseBody
    String obtenerParametros() {
        CreacionUsuario datos = new CreacionUsuario();
        List<Region> regiones = callCenter.obtenerRegiones();
        List<Provincia> provincias = callCenter.obtenerProvincias();
        List<Comuna> comunas = callCenter.obtenerComunas();
        List<PersonaDomain> personas = callCenter.obtenerPersonas();
        List<Taller> talleres = callCenter.obtenerTalleres();
        List<Grua> gruas = callCenter.obtenerGruas();
        datos.setRegiones(regiones);
        datos.setProvincias(provincias);
        datos.setPersonas(personas);
        datos.setComunas(comunas);
        datos.setTalleres(talleres);
        datos.setGruas(gruas);
        String jsonRes = Util.convertirAJson(datos);
        return jsonRes;
    }


    @RequestMapping(value = {"callcenter/menuprincipal/carga/navbarCall/"}, method = RequestMethod.POST)
    public String cargaNavBar() {
        try {
            return "navbarCallCenter";
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/callcenter/cargar/crear"}, method = RequestMethod.POST)
    public String cargarCrear() {
        try {
            return "agregarSiniestro";
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/callcenter/consultar/poliza/"}, method = RequestMethod.POST)
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

    @RequestMapping(value = {"/callcenter/crear/idSiniestro/"}, method = RequestMethod.POST)
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

    @RequestMapping(value = {"/callcenter/crear/siniestro/"}, method = RequestMethod.POST)
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
