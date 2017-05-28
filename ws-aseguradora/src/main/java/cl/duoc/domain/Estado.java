package cl.duoc.domain;

import cl.duoc.util.Util;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 27-05-2017.
 */
@Entity
@Table(name="Estado")
public class Estado implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_estado")
    private Long idEstado;
    @Column(name="id_siniestro")
    private Long idSiniestro;
    @ManyToOne
    @JoinColumn(name="rut_taller", nullable=false, updatable=false)
    private Taller taller;
    @ManyToOne
    @JoinColumn(name="numero_chasis", nullable=false, updatable=false)
    private Grua grua;
    @ManyToOne
    @JoinColumn(name="rut", nullable=false, updatable=false)
    private Persona persona;
    @ManyToOne
    @JoinColumn(name="id_tipo_estado", nullable=false, updatable=false)
    private TipoEstado tipoEstado;
    private Long costo;
    @Column(name = "fecha_ingreso")
    private String fechaIngreso;
    @Column(name = "fecha_entrega")
    private String fechaEntrega;

    public Long getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(Long idEstado) {
        this.idEstado = idEstado;
    }

    public Long getIdSiniestro() {
        return idSiniestro;
    }

    public void setIdSiniestro(Long idSiniestro) {
        this.idSiniestro = idSiniestro;
    }

    public Taller getTaller() {
        return taller;
    }

    public void setTaller(Taller taller) {
        this.taller = taller;
    }

    public Grua getGrua() {
        return grua;
    }

    public void setGrua(Grua grua) {
        this.grua = grua;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public TipoEstado getTipoEstado() {
        return tipoEstado;
    }

    public void setTipoEstado(TipoEstado tipoEstado) {
        this.tipoEstado = tipoEstado;
    }

    public Long getCosto() {
        return costo;
    }

    public void setCosto(Long costo) {
        this.costo = costo;
    }

    public String getFechaIngreso() {
        return Util.formatearFechaString(Util.formatearFechaSql(fechaIngreso,"yyyy-MM-dd"));
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getFechaEntrega() {
        return Util.formatearFechaString(Util.formatearFechaSql(fechaEntrega,"yyyy-MM-dd"));
    }

    public void setFechaEntrega(String fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }
}
