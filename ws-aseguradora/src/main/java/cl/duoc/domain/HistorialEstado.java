package cl.duoc.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 27-05-2017.
 */
@Entity
@Table(name = "historial_estado")
public class HistorialEstado implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_historial")
    @GeneratedValue(generator="SEQ_ID_ESTADO_HISTORIAL")
    @SequenceGenerator(name="SEQ_ID_ESTADO_HISTORIAL",sequenceName="SEQ_ID_ESTADO_HISTORIAL", allocationSize=1)
    private Long idHistorial;
    @Column(name = "numero_chasis")
    private Long numeroChasis;
    @Column (name = "rut_taller")
    private String rutTaller;
    private Long costo;
    @Column(name = "id_siniestro")
    private Long idSiniestro;
    private String descripcion;
    @Column(name = "id_tipo_estado")
    private Long idTipoEstado;

    public Long getIdHistorial() {
        return idHistorial;
    }

    public void setIdHistorial(Long idHistorial) {
        this.idHistorial = idHistorial;
    }

    public Long getNumeroChasis() {
        return numeroChasis;
    }

    public void setNumeroChasis(Long numeroChasis) {
        this.numeroChasis = numeroChasis;
    }

    public String getRutTaller() {
        return rutTaller;
    }

    public void setRutTaller(String rutTaller) {
        this.rutTaller = rutTaller;
    }

    public Long getCosto() {
        return costo;
    }

    public void setCosto(Long costo) {
        this.costo = costo;
    }

    public Long getIdSiniestro() {
        return idSiniestro;
    }

    public void setIdSiniestro(Long idSiniestro) {
        this.idSiniestro = idSiniestro;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getIdTipoEstado() {
        return idTipoEstado;
    }

    public void setIdTipoEstado(Long idTipoEstado) {
        this.idTipoEstado = idTipoEstado;
    }
}
