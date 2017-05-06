package cl.duoc.domain;

import cl.duoc.util.Util;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by Usuario on 27-03-2017.
 */
@Entity
@Table(name = "Siniestro")
public class Siniestro implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id_siniestro")
    private Long id;
    @Column(name = "fecha_incidente")
    private String fechaIncidente;
    @Column(name = "detalle_incidente")
    private String detalleIncidente;

    @Column(name = "id_poliza")
    private Long poliza;

    private String direccion;
    @ManyToOne(optional=false)
    @JoinColumn(name="id_comuna")
    private Comuna comuna;

    public void setFechaIncidente(String fechaIncidente) {
        this.fechaIncidente = fechaIncidente;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFechaIncidente() {
        return Util.formatearFechaString(Util.formatearFechaSql(fechaIncidente,"yyyy-MM-dd"));
    }

    public void setFechaIncidente(Date fechaIncidente) {
        this.fechaIncidente = Util.formatearFechaString(fechaIncidente);
    }

    public String getDetalleIncidente() {
        return detalleIncidente;
    }

    public void setDetalleIncidente(String detalleIncidente) {
        this.detalleIncidente = detalleIncidente;
    }


    public Long getPoliza() {
        return poliza;
    }

    public void setPoliza(Long poliza) {
        this.poliza = poliza;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
