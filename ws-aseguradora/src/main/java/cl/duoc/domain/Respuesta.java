package cl.duoc.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 26-06-2017.
 */
@Entity
@Table(name = "Respuesta")
public class Respuesta implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_respuesta")
    private Long idRespuesta;
    private String descripcion;
    @ManyToOne(optional=false)
    @JoinColumn(name = "id_reclamo")
    private Reclamo reclamo;

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

    public Reclamo getReclamo() {
        return reclamo;
    }

    public void setReclamo(Reclamo reclamo) {
        this.reclamo = reclamo;
    }
}
