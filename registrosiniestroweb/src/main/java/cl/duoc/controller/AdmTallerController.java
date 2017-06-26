package cl.duoc.controller;

import cl.duoc.Util.Util;
import cl.duoc.domain.EstadoDomain;
import cl.duoc.domain.HistorialEstadoDomain;
import cl.duoc.resources.AdmTaller;
import cl.duoc.resources.Estado;
import cl.duoc.resources.Siniestro;
import cl.duoc.services.RegistroSiniestroServices;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.websocket.server.PathParam;
import java.security.Security;
import java.util.List;

/**
 * Created by Usuario on 30-05-2017.
 */
@Controller
public class AdmTallerController {
    @Autowired
    private RegistroSiniestroServices administradorTaller;
    @RequestMapping(value = {"/administradortaller/menuprincipal/carga/navbar/"}, method = RequestMethod.POST)
    public String cargaNavBar() {
        try {

            return "navbarAdmTaller";
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value={"/administradortaller/cargar/recepcion/"},method = RequestMethod.POST)
    public String cargarRecepcion(Model model)
    {
        Authentication aut = SecurityContextHolder.getContext().getAuthentication();
        model.addAttribute("rut",aut.getName());
        return "recepcion";
    }

    @RequestMapping(value={"/administradortaller/buscar/siniestros/"},method = RequestMethod.POST)
    public @ResponseBody  String estadoSiniestros(@PathParam("rut") String rut)
    {
        AdmTaller adm= (AdmTaller) Util.jsonObject(administradorTaller.obtenerAdmTaller(rut),AdmTaller.class);
        return administradorTaller.obtenerSiniestrosByTaller(adm.getRutTaller());
    }

    @RequestMapping(value = {"/administradorTaller/carga/creaRecepcion/"},method = RequestMethod.POST)
    public String cargarecepcionModal()
    {
        try
        {
            return "creaRecepcion";
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value = {"/administradorTaller/obtener/siniestro/"},method = RequestMethod.POST)
    public @ResponseBody String obtnerSiniestro(@PathParam("id_siniestro") String id_siniestro)
    {
        try
        {
             Siniestro siniestro = (Siniestro) Util.jsonObject(administradorTaller.obtenerSiniestroById(Long.parseLong(id_siniestro)),Siniestro.class);
             return administradorTaller.obtenerPoliza(siniestro.getPoliza().toString());
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value = {"/administradorTaller/crear/recepcion"},method = RequestMethod.POST)
    public @ResponseBody String creaRecepcion(@PathParam("recepcion") String recepcion)
    {
        try {
            return administradorTaller.addRecepcion(recepcion);
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value = {"/administradorTaller/crear/estado/"}, method = RequestMethod.POST)
    public
    @ResponseBody
    String crearEstado(@PathParam("estado") String estado) {
        try {
            EstadoDomain s = (EstadoDomain) Util.jsonObject(estado, EstadoDomain.class);
            String estadoACrear = administradorTaller.crearEstado(Util.convertirAJson(s));
            return estadoACrear;
        } catch (Exception e) {
            return "Error";
        }
    }
    @RequestMapping(value = {"/administradorTaller/crear/historialestado/"}, method = RequestMethod.POST)
    public
    @ResponseBody
    String crearHistorialEstado(@PathParam("historial") String historial) {
        try {
            HistorialEstadoDomain s = (HistorialEstadoDomain) Util.jsonObject(historial, HistorialEstadoDomain.class);
            String historialCrear = administradorTaller.crearHistorial(Util.convertirAJson(s));
            return historialCrear;
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/administradorTaller/carga/creaPresupuesto/"},method = RequestMethod.POST)
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

    @RequestMapping(value = {"/administradortaller/carga/listadoPresupuesto/"},method = RequestMethod.POST)
    public String cargarPresupuestoListado(Model model)
    {
        try
        {
            Authentication aut = SecurityContextHolder.getContext().getAuthentication();
            model.addAttribute("rut",aut.getName());
            return "listadoPresupuestoAdmTaller";
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value={"/administradortaller/cargar/presupuestos/"},method = RequestMethod.POST)
    public @ResponseBody String listadoPresupuestos(@PathParam("rutAdmin")String rutAdmin)
    {
        try {
            return administradorTaller.obtenerSiniestrosByLiquidador(rutAdmin);
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value={"/administradortaller/obtener/historial"},method = RequestMethod.POST)
    public @ResponseBody String cagarhistorial(@PathParam("idSiniestro")String idSiniestro)
    {
        return administradorTaller.obtenerHistorialBySiniestro(Long.parseLong(idSiniestro));
    }
}
