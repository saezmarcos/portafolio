package cl.duoc.controller;

import cl.duoc.Util.Util;
import cl.duoc.domain.PersonaDomain;
import cl.duoc.resources.*;
import cl.duoc.services.RegistroSiniestroServices;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
        List<Region> regiones=analista.obtenerRegiones();
        List<Provincia> provincias=analista.obtenerProvincias();
        creacion.setPerfiles(perfiles);
        creacion.setComunas(comunas);
        creacion.setRegiones(regiones);
        creacion.setProvincias(provincias);
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
    String crearUsuario(@PathParam("persona") String persona,@PathParam("flag") String flag) {
        try {
            if(flag.equals("nuevo")) {
                Persona p;
                String resp;
                p=(Persona)Util.jsonObject(persona,Persona.class);
                String res=Util.convertirAJson(analista.obtenerPersona(p.getRut()));
                if(res==null || res=="null") {
                     resp = analista.crearPersona(persona);
                }
                else
                {
                    return "existe";
                }
                return resp;
            }
            else
            {
                String resp = analista.crearPersona(persona);
                return resp;
            }
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

    @RequestMapping(value={"/usuario/cargar/listar/usuarios"},method = RequestMethod.POST)
    public @ResponseBody
    String getPersonas()
    {
        try
        {
            String resp=Util.convertirAJson(analista.obtenerPersonas());
            return resp;
        }
        catch (Exception e)
        {
            return null;
        }
    }
    @RequestMapping(value={"/usuario/cargar/listar/"},method = RequestMethod.POST)
    public String cargaListado()
    {
        try
        {
            return "listarUsuarios";
        }
        catch (Exception e)
        {
            return "Error";
        }
    }
}