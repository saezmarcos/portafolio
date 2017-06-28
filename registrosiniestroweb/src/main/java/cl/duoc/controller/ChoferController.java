package cl.duoc.controller;

import cl.duoc.Util.Util;
import cl.duoc.domain.EstadoDomain;
import cl.duoc.domain.HistorialEstadoDomain;
import cl.duoc.resources.Siniestro;
import cl.duoc.services.RegistroSiniestroServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.websocket.server.PathParam;

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

    @RequestMapping(value = {"/chofergrua/carga/listadoPresupuesto/"},method = RequestMethod.POST)
    public String cargarPresupuestoListado(Model model)
    {
        try
        {
            Authentication aut = SecurityContextHolder.getContext().getAuthentication();
            model.addAttribute("rut",aut.getName());
            return "listadoSiniestrosChofer";
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value = {"/chofergrua/obtener/choferGrua/"},method = RequestMethod.POST)
    public @ResponseBody
    String obtenerGrua(@PathParam("rutChofer") String rutChofer)
    {
        return chofer.obtenerChoferGrua(rutChofer);
    }

    @RequestMapping(value={"/chofergrua/cargar/presupuestos/"},method = RequestMethod.POST)
    public @ResponseBody String listadoPresupuestos()
    {
        try {
            return chofer.obtenerTodosEstados();
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value = {"/chofergrua/usuario/modificar/grua/"},method = RequestMethod.POST)
    public @ResponseBody String updatearGrua(String grua)
    {
        return chofer.crearGrua(grua);
    }

    @RequestMapping(value = {"/chofergrua/crear/estado/"}, method = RequestMethod.POST)
    public @ResponseBody String crearEstado(@PathParam("estado") String estado) {
        try {
            EstadoDomain s = (EstadoDomain) Util.jsonObject(estado, EstadoDomain.class);
            String estadoACrear = chofer.crearEstado(Util.convertirAJson(s));
            return estadoACrear;
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/chofergrua/crear/historialestado/"}, method = RequestMethod.POST)
    public @ResponseBody String crearHistorialEstado(@PathParam("historial") String historial) {
        try {
            HistorialEstadoDomain s = (HistorialEstadoDomain) Util.jsonObject(historial, HistorialEstadoDomain.class);
            String historialCrear = chofer.crearHistorial(Util.convertirAJson(s));
            return historialCrear;
        } catch (Exception e) {
            return "Error";
        }
    }

    @RequestMapping(value = {"/chofergrua/carga/listadoEntregas/"},method = RequestMethod.POST)
    public String cargarEntregas(Model model)
    {
        try
        {
            Authentication aut = SecurityContextHolder.getContext().getAuthentication();
            model.addAttribute("rut",aut.getName());
            return "listadoEntregas";
        }
        catch (Exception e)
        {
            return "Error";
        }
    }

    @RequestMapping(value = {"/chofergrua/obtener/siniestro/"},method = RequestMethod.POST)
    public @ResponseBody String obtnerSiniestro(@PathParam("id_siniestro") String id_siniestro)
    {
        try
        {
            Siniestro siniestro = (Siniestro) Util.jsonObject(chofer.obtenerSiniestroById(Long.parseLong(id_siniestro)),Siniestro.class);
            return chofer.obtenerPoliza(siniestro.getPoliza().toString());
        }
        catch (Exception e)
        {
            return "Error";
        }
    }
}
