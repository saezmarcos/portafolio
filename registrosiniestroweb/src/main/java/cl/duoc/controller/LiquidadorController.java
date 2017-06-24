package cl.duoc.controller;

import cl.duoc.Util.Util;
import cl.duoc.domain.*;
import cl.duoc.resources.*;
import cl.duoc.services.RegistroSiniestroServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.websocket.server.PathParam;
import java.util.List;

/**
 * Created by Usuario on 28-05-2017.
 */
@Controller
public class LiquidadorController {
    @Autowired
    private RegistroSiniestroServices analista;
    @RequestMapping("/liquidador/negocio/parametros/pantalla/")
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
    @RequestMapping(value = {"/liquidador/menuprincipal/carga/navbar/"}, method = RequestMethod.POST)
    public String cargaNavBar() {
        try {
            return "navbarLiquidador";
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value={"/liquidador/usuario/cargar/listar/usuarios/"},method = RequestMethod.POST)
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
    @RequestMapping(value={"/liquidador/usuario/cargar/listar/"},method = RequestMethod.POST)
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

    @RequestMapping(value={"/liquidador/negocio/obtener/talleres/"},method = RequestMethod.POST)
    public
    @ResponseBody
    String obtenerTalleres() {
        List<Taller> talleres = analista.obtenerTalleres();
        String jsonRes = Util.convertirAJson(talleres);
        return jsonRes;
    }
    @RequestMapping(value={"/liquidador/negocio/obtener/comunas/"},method = RequestMethod.POST)
    public
    @ResponseBody
    String obtenerComunas() {
        List<Comuna> comunas = analista.obtenerComunas();
        String jsonRes = Util.convertirAJson(comunas);
        return jsonRes;
    }

    @RequestMapping(value={"/liquidador/negocio/obtener/gruas/"},method = RequestMethod.POST)
    public
    @ResponseBody
    String obtenerGruas() {
        List<Grua> gruas = analista.obtenerGruas();
        String jsonRes = Util.convertirAJson(gruas);
        return jsonRes;
    }

    @RequestMapping(value={"/liquidador/negocio/obtener/usuarios/"},method = RequestMethod.POST)
    public
    @ResponseBody
    String obtenerUsuarios() {
        List<PersonaDomain> personas = analista.obtenerPersonas();
        String jsonRes = Util.convertirAJson(personas);
        return jsonRes;
    }
    @RequestMapping(value = {"/liquidador/negocio/obtener/regiones/"}, method = RequestMethod.POST)
    public @ResponseBody String obtenerRegiones()
    {
        List<Region> regiones = analista.obtenerRegiones();
        String jsonRes = Util.convertirAJson(regiones);
        return jsonRes;
    }

    @RequestMapping(value = {"/liquidador/usuario/cargar/crear/grua/"}, method = RequestMethod.POST)
    public String cargarCrearGrua(Model model)
    {
        try {
            model.addAttribute("rutAseguradora","77777777-7");
            return "creagrua";
        } catch (Exception e) {
            return "Error";
        }
    }
    @RequestMapping(value = {"/liquidador/usuario/cargar/crear/taller/"}, method = RequestMethod.POST)
    public String cargarCrearTaller(Model model)
    {
        try {
            model.addAttribute("rutAseguradora","77777777-7");
            return "creaTaller";
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/liquidador/usuario/crear/grua/"},method = RequestMethod.POST)
    public @ResponseBody String crearGrua(String grua)
    {
        GruaDomain g;
        g=(GruaDomain)Util.jsonObject(grua,GruaDomain.class);
        List<Grua> gr= analista.obtenerGruas();
        for (Grua gg: gr) {
            if(gg.getNumeroChasis().equals(g.getNumeroChasis()) || gg.getPatente().equals(g.getPatente()))
            {
                return "existe";
            }
        }
        return analista.crearGrua(grua);
    }
    @RequestMapping(value = {"/liquidador/usuario/crear/taller/"},method = RequestMethod.POST)
    public @ResponseBody String crearTaller(String taller)
    {
        TallerDomain t;
        t=(TallerDomain)Util.jsonObject(taller,TallerDomain.class);
        List<Taller> tr= analista.obtenerTalleres();
        for (Taller tt: tr) {
            if(tt.getRutTaller().equals(t.getRutTaller()))
            {
                return "existe";
            }
        }
        return analista.crearTaller(taller);
    }

    @RequestMapping(value={"/liquidador/usuario/cargar/presupuestos/"},method = RequestMethod.POST)
    public String cargaAsignar(Model model)
    {
        try
        {
            Authentication aut = SecurityContextHolder.getContext().getAuthentication();
            model.addAttribute("rut",aut.getName());
            return "asignar";
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value={"/liquidador/cargar/presupuestos/"},method = RequestMethod.POST)
    public @ResponseBody String listadoPresupuestos(@PathParam("rutLiquidador")String rutLiquidador)
    {
        try {
            return analista.obtenerSiniestrosByLiquidador(rutLiquidador);
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value = {"/liquidador/carga/creaPresupuesto/"},method = RequestMethod.POST)
    public String cargarPresupuestoModal()
    {
        try
        {
            return "presupuesto";
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value={"/liquidador/obtener/historial"},method = RequestMethod.POST)
    public @ResponseBody String cagarhistorial(@PathParam("idSiniestro")String idSiniestro)
    {
        return analista.obtenerHistorialBySiniestro(Long.parseLong(idSiniestro));
    }

    @RequestMapping(value = {"/liquidador/crear/estado/"}, method = RequestMethod.POST)
    public
    @ResponseBody
    String crearEstado(@PathParam("estado") String estado) {
        try {
            EstadoDomain s = (EstadoDomain) Util.jsonObject(estado, EstadoDomain.class);
            String estadoACrear = analista.crearEstado(Util.convertirAJson(s));
            return estadoACrear;
        } catch (Exception e) {
            return "Error";
        }
    }
    @RequestMapping(value = {"/liquidador/crear/historialestado/"}, method = RequestMethod.POST)
    public
    @ResponseBody
    String crearHistorialEstado(@PathParam("historial") String historial) {
        try {
            HistorialEstadoDomain s = (HistorialEstadoDomain) Util.jsonObject(historial, HistorialEstadoDomain.class);
            String historialCrear = analista.crearHistorial(Util.convertirAJson(s));
            return historialCrear;
        } catch (Exception e) {
            return "Error";
        }
    }
}
