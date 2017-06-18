package cl.duoc.resources;

import cl.duoc.Util.Util;
import cl.duoc.domain.SiniestroDomain;

/**
 * Created by Usuario on 17-06-2017.
 */
public class Estado {
    private Long idEstado;
    private String numero_chasis;
    private Taller taller;
    private SiniestroDomain siniestro;
    private Long costo;
    private String fechaIngreso;
    private String fechaEntrega;
    private Persona persona;
    private Long id_tipo_estado;

    public Long getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(Long idEstado) {
        this.idEstado = idEstado;
    }

    public String getNumero_chasis() {
        return numero_chasis;
    }

    public void setNumero_chasis(String numero_chasis) {
        this.numero_chasis = numero_chasis;
    }

    public Taller getTaller() {
        return taller;
    }

    public void setTaller(Taller taller) {
        this.taller = taller;
    }

    public SiniestroDomain getSiniestro() {
        return siniestro;
    }

    public void setSiniestro(SiniestroDomain siniestro) {
        this.siniestro = siniestro;
    }

    public Long getCosto() {
        return costo;
    }

    public void setCosto(Long costo) {
        this.costo = costo;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = Util.formatearFechaString(Util.formatearFechaSql(fechaIngreso, "yyyy-MM-dd"));
    }

    public String getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(String fechaEntrega) {
        this.fechaEntrega = Util.formatearFechaString(Util.formatearFechaSql(fechaEntrega, "yyyy-MM-dd"));
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Long getId_tipo_estado() {
        return id_tipo_estado;
    }

    public void setId_tipo_estado(Long id_tipo_estado) {
        this.id_tipo_estado = id_tipo_estado;
    }
}
