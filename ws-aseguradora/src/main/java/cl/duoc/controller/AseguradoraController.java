package cl.duoc.controller;

import cl.duoc.dao.*;
import cl.duoc.dao.FotoEvidSiniestroDAO;
import cl.duoc.domain.*;
import cl.duoc.resource.*;
import cl.duoc.services.*;
import cl.duoc.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Usuario on 26-03-2017.
 */
@RestController
@RequestMapping("/")
public class AseguradoraController {

    @Autowired
    private PersonaDAO autent;

    //Metodo para retornar el acceso
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String autenticacion(@RequestParam(value = "rut") String rut, @RequestParam(value = "password") String password) {
        Rol r = new Rol();
        Persona p = autent.findOne(rut);
        if (p == null) {
            r.setRol("No existe usuario");
            return Util.convertirAJson(r);
        }
        String resp = p.getPerfil().getRol();
        if (p.getPassword().equals(password))
            if (p.getActivo() == 'T') {
                r.setRol(resp);
                String re = Util.convertirAJson(r);
                return re;
            } else {
                r.setRol("Usuario No Activo");
                return Util.convertirAJson(r);
            }
        else {
            r.setRol("Password Erronea");
            return Util.convertirAJson(r);
        }
    }

    @Autowired
    private IdSiniestroResourceDAO idR;

    //Metodo para obtener un nuevo id de siniestro
    @RequestMapping(value = "/ObtenerIdSiniestro", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public IdSiniestroResource obtenerIdSiniestro() {
        IdSiniestroResource idResource = new IdSiniestroResource();
        idResource.setDetalleIncidente(" ");
        idResource.setFechaIncidente("01-01-2000");
        idResource.setIdPoliza(0L);
        idResource.setDireccion(" ");
        return idR.save(idResource);
    }

    //metodo que retorna una persona
    @RequestMapping(value = "/persona", method = RequestMethod.GET)
    public Persona getPersona(@RequestParam(value = "rut") String rut) {

        return autent.findOne(rut);
    }


    @Autowired
    private DatosServicesInterface lista;

    //Metodo para retornar una lista de personas por departamento
    @RequestMapping(value = "/listaPersonaPorDepa", method = RequestMethod.GET)
    public List<Persona> listaPorDepart(@RequestParam(value = "id_departamento") String id_departamento) {
        long id_depa = Long.parseLong(id_departamento);
        return lista.listPorDepartamento(id_depa);
    }


    @Autowired
    private PersonaResouceDAO p;

    //Metodo para agregar o updatear una persona
    @RequestMapping(value = "/agregarPersona", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public PersonaResouce addPersona(@RequestBody PersonaResouce persona) {
        return p.save(persona);
    }

    @Autowired
    private PolizaDAO poliza;

    //Metodo para buscar una poliza
    @RequestMapping(value = "/poliza", method = RequestMethod.GET)
    public Poliza getPoliza(@RequestParam(value = "id_poliza") Long id_poliza) {
        return poliza.findOne(id_poliza);
    }

    @Autowired
    private SiniestroDAO sinisestro;

    //Metodo que busca un siniestro
    @RequestMapping(value = "/siniestro", method = RequestMethod.GET)
    public Siniestro getSiniestro(@RequestParam(value = "id_siniestro") Long id_siniestro) {
        return sinisestro.findOne(id_siniestro);
    }

    @Autowired
    private SiniestroResourceDAO s;

    //Metodo para agregar o updatear un siniestro
    @RequestMapping(value = "/agregarSiniestro", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public SiniestroResource addSiniestro(@RequestBody SiniestroResource siniestro) {
        return s.save(siniestro);
    }

    @Autowired
    private FotoEvidSiniestroDAO evi;

    //Metodo que agrega o updatea una evidencia
    @RequestMapping(value = "/agregarEvidencia", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public FotoEvidSiniestro addEvidencia(@RequestBody FotoEvidSiniestro evidencia) {
        return evi.save(evidencia);
    }

    //metodo que busca una evidencia
    @RequestMapping(value = "/evidencia", method = RequestMethod.GET)
    public FotoEvidSiniestro getEvidencia(@RequestParam(value = "id_siniestro") Long id_siniestro) {
        return evi.findOne(id_siniestro);
    }


    @Autowired
    //metodo retorna lista de perfiles
    private PerfilDAO perfiles;

    @RequestMapping(value = "/perfiles", method = RequestMethod.GET)
    public List<Perfil> getPerfiles() {
        return perfiles.findAll();
    }

    @Autowired
    //metodo que retorna un adminitrador de taller
    private AdmTallerDAO admTaller;

    @RequestMapping(value = "/admTaller", method = RequestMethod.GET)
    public AdmTaller getAdmTaller(@RequestParam(value = "rut") String rut) {
        return admTaller.findOne(rut);
    }

    //metodo agrega un administrador de taller
    @RequestMapping(value = "/agregarAdmTaller", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public AdmTaller addAdmTaller(@RequestBody AdmTaller admTall) {
        return admTaller.save(admTall);
    }

    @Autowired
    private RecepcionDAO recepcionAgr;

    //metodo agrega una recepcion
    @RequestMapping(value = "/agregarRecepcion", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Recepcion addRecepcion(@RequestBody Recepcion recepcion) {
        return recepcionAgr.save(recepcion);
    }


    @RequestMapping(value = "/recepcion", method = RequestMethod.GET)
    public Recepcion getRecepcion(@RequestParam(value = "id_recepcion") Long id) {
        return recepcionAgr.findOne(id);
    }

    @Autowired
    private ComunaDAO comuna;

    @RequestMapping(value = "/comunas", method = RequestMethod.GET)
    public List<Comuna> getComunas() {
        return comuna.findAll();
    }

    @Autowired
    private DepartamentoDAO departamento;

    @RequestMapping(value = "/departamentos", method = RequestMethod.GET)
    public List<Departamento> getDepartamentos() {
        return departamento.findAll();
    }

    @Autowired
    private TallerDAO taller;

    @RequestMapping(value = "/talleres", method = RequestMethod.GET)
    public List<Taller> getTalleres() {
        return taller.findAll();
    }

    @Autowired
    private GruaDAO gruas;

    @RequestMapping(value = "/gruas", method = RequestMethod.GET)
    public List<Grua> getGruas() {
        return gruas.findAll();
    }

    @Autowired
    private ChoferDAO aChofer;

    @RequestMapping(value = "/agregarChofer", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Chofer addChofer(@RequestBody Chofer chofer) {
        return aChofer.save(chofer);
    }

    //metodo que retorna  personas
    @RequestMapping(value = "/personas", method = RequestMethod.GET)
    public List<Persona> getPersonas() {
        return autent.findAll();
    }

    @Autowired
    //metodo que retorna  regiones
    private RegionesDAO regiones;

    @RequestMapping(value = "/regiones", method = RequestMethod.GET)
    public List<Regiones> getRegiones() {
        return regiones.findAll();
    }

    @Autowired
    //metodo que retorna  provincias
    private ProvinciasDAO provincias;

    @RequestMapping(value = "/provincias", method = RequestMethod.GET)
    public List<Provincias> getProvincias() {
        return provincias.findAll();
    }

    //metodo que retorna  siniestros

    @RequestMapping(value = "/siniestros", method = RequestMethod.GET)
    public List<Siniestro> getSiniestros() {
        List<Siniestro> s = sinisestro.findAll();
        List<Siniestro> sini = new ArrayList<>();
        for (Siniestro c : s) {
            if (c.getPoliza() != 0)
                sini.add(c);
        }
        return sini;
    }

    @Autowired
    private EstadoDAO estados;
    //metodo que retorna  estados
    @RequestMapping(value = "/estados", method = RequestMethod.GET)
    public List<Estado> getEstados(@PathParam("idSiniestro") String idSiniestro) {
        List<Estado> et = estados.findAll();
        List<Estado> est = new ArrayList<>();
        for (Estado es : et) {
            if (es.getIdSiniestro().toString().equals(idSiniestro))
                est.add(es);
        }
        return est;
    }

    @Autowired
    private EstadoResourceDAO estadoAgr;
    //metodo agrega una estado
    @RequestMapping(value = "/agregarEstado", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public EstadoResource addEstados(@RequestBody EstadoResource estado) {
        return estadoAgr.save(estado);
    }


    // metodo retorna historial de estados
    @Autowired
    private HistorialEstadoDAO h;
    @RequestMapping(value = "/historialEstados", method = RequestMethod.GET)
    public List<HistorialEstado> getHistorialEstados(@PathParam("idSiniestro") String idSiniestro) {
        List<HistorialEstado> et = h.findAll();
        List<HistorialEstado> est = new ArrayList<>();
        for (HistorialEstado es : et) {
            if (es.getIdSiniestro().toString().equals(idSiniestro))
                est.add(es);
        }
        return est;
    }

    //metodo agrega una historial estado
    @RequestMapping(value = "/agregarHistorial", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public HistorialEstado addHistorial(@RequestBody HistorialEstado estado) {
        return h.save(estado);
    }

    //metodo agrega una grua grua
    @Autowired
    private GruaResourceDAO agrGrua;
    @RequestMapping(value = "/agregarGrua", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public GruaResource addGrua(@RequestBody GruaResource grua) {
        return agrGrua.save(grua);
    }

    @Autowired
    private TallerResourceDAO agrTaller;
    @RequestMapping(value = "/agregarTaller", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public TallerResource addTaller(@RequestBody TallerResource taller) {
        return agrTaller.save(taller);
    }
}