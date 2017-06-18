package cl.duoc.domain;

/**
 * Created by Usuario on 30-05-2017.
 */
public class HistorialEstadoDomain {
    private Long idHistorial;
    private String numeroChasis;
    private String rutTaller;
    private Long costo;
    private Long idSiniestro;
    private String descripcion;
    private Long idTipoEstado;

    public Long getIdHistorial() {
        return idHistorial;
    }

    public void setIdHistorial(Long idHistorial) {
        this.idHistorial = idHistorial;
    }

    public String getNumeroChasis() {
        return numeroChasis;
    }

    public void setNumeroChasis(String numeroChasis) {
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
