package cl.duoc.controller;

import cl.duoc.Util.Util;
import cl.duoc.resources.*;
import cl.duoc.services.RegistroSiniestroServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.websocket.server.PathParam;
import java.util.List;

/**
 * Created by Usuario on 16-04-2017.
 */
@Controller
public class AnalistaNegocioController {
    @Autowired
    private RegistroSiniestroServices analista;

    @RequestMapping("/analista/negocio/parametros/pantalla/")
    public
    @ResponseBody
    String obtenerParametros() {
        CreacionUsuario creacion = new CreacionUsuario();
        List<Perfil> perfiles = analista.obtenerPerfiles();
        List<Comuna> comunas = analista.obtenerComunas();
        List<Departamento> departamentos = analista.obtenerDepartamentos();
        List<Taller> talleres = analista.obtenerTalleres();
        List<Grua> gruas = analista.obtenerGruas();
        creacion.setPerfiles(perfiles);
        creacion.setComunas(comunas);
        creacion.setDepartamentos(departamentos);
        creacion.setTalleres(talleres);
        creacion.setGruas(gruas);
        String jsonRes = Util.convertirAJson(creacion);
        return jsonRes;
    }

    @RequestMapping(value = {"/menuprincipal/carga/navbar/"}, method = RequestMethod.POST)
    public String cargaNavBar() {
        try {
            return "navbarAnalista";
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/usuario/cargar/crear"}, method = RequestMethod.POST)
    public String cargarCrear() {
        try {
            return "creausuario";
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/usuario/cargar/modificar/"}, method = RequestMethod.POST)
    public String cargarModificar() {
        try {
            return "modificausuario";
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/analista/usuario/crear/"}, method = RequestMethod.POST)
    public
    @ResponseBody
    String crearUsuario(@PathParam("persona") String persona) {
        try {
            String resp = analista.crearPersona(persona);
            return resp;
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/acceso/usuario/login/usuario/modificar/buscar/"}, method = RequestMethod.POST)
    public
    @ResponseBody
    String getPersona(@PathParam("rutM") String rutM)
    {

        try
        {
            String resp=Util.convertirAJson(analista.obtenerPersona(rutM));
            return resp;
        }
        catch (Exception e)
        {
            return "Error";
        }
    }
}