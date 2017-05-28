package cl.duoc.resource;

import cl.duoc.util.Util;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 27-05-2017.
 */
@Entity
@Table(name = "Estado")
public class EstadoResource implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_estado")
    @GeneratedValue(generator="SEQ_ID_ESTADO")
    @SequenceGenerator(name="SEQ_ID_ESTADO",sequenceName="SEQ_ID_ESTADO", allocationSize=1)
    private Long idEstado;
    @Column(name="id_siniestro")
    private Long idSiniestro;
    @Column(name = "rut_taller")
    private String rutTaller;
    @Column (name = "numero_chasis")
    private Long numeroChasis;
    private String rut;
    @Column(name="id_tipo_estado")
    private Long idTipoEstado;
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

    public String getRutTaller() {
        return rutTaller;
    }

    public void setRutTaller(String rutTaller) {
        this.rutTaller = rutTaller;
    }

    public Long getNumeroChasis() {
        return numeroChasis;
    }

    public void setNumeroChasis(Long numeroChasis) {
        this.numeroChasis = numeroChasis;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public Long getIdTipoEstado() {
        return idTipoEstado;
    }

    public void setIdTipoEstado(Long idTipoEstado) {
        this.idTipoEstado = idTipoEstado;
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
