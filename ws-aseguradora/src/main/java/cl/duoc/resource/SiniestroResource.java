package cl.duoc.resource;

import cl.duoc.util.Util;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 29-03-2017.
 */

@Entity
@Table(name = "Siniestro")
@PersistenceContext
public class SiniestroResource implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id_siniestro")
    private Long id;
    @Column(name = "fecha_incidente")
    private String fechaIncidente;
    @Column(name = "detalle_incidente")
    private String detalleIncidente;
    @Column(name = "id_poliza")
    private Long idPoliza;
    private String direccion;
    @Column(name = "id_comuna")
    private Long idComuna;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFechaIncidente() {
        return Util.formatearFechaString(Util.formatearFechaSql(fechaIncidente,"yyyy-MM-dd"));
    }


    public void setFechaIncidente(String fechaIncidente) {
        this.fechaIncidente = fechaIncidente;
    }

    public String getDetalleIncidente() {
        return detalleIncidente;
    }

    public void setDetalleIncidente(String detalleIncidente) {
        this.detalleIncidente = detalleIncidente;
    }

    public Long getIdPoliza() {
        return idPoliza;
    }

    public void setIdPoliza(Long idPoliza) {
        this.idPoliza = idPoliza;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Long getIdComuna() {
        return idComuna;
    }

    public void setIdComuna(Long idComuna) {
        this.idComuna = idComuna;
    }
}
