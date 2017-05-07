package cl.duoc.resource;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 21-04-2017.
 */
@Entity
@Table(name = "Siniestro")
@JsonIgnoreProperties(ignoreUnknown = true)
public class IdSiniestroResource implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id_siniestro")
    @GeneratedValue(generator="SEQ_ID_SINIESTRO")
    @SequenceGenerator(name="SEQ_ID_SINIESTRO",sequenceName="SEQ_ID_SINIESTRO", allocationSize=1)
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


    public String getFechaIncidente() {
        return fechaIncidente;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
