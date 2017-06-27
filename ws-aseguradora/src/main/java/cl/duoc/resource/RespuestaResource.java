package cl.duoc.resource;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Usuario on 26-06-2017.
 */
@Entity
@Table(name = "Respuesta")
public class RespuestaResource {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_respuesta")
    private Long idRespuesta;
    private String descripcion;
    @Column(name = "id_reclamo")
    private Long idReclamo;

    public Long getIdRespuesta() {
        return idRespuesta;
    }

    public void setIdRespuesta(Long idRespuesta) {
        this.idRespuesta = idRespuesta;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getIdReclamo() {
        return idReclamo;
    }

    public void setIdReclamo(Long idReclamo) {
        this.idReclamo = idReclamo;
    }
}
