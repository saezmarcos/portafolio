package cl.duoc.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by Usuario on 27-05-2017.
 */
@Entity
@Table(name = "Tipo_Estado")
public class TipoEstado implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_tipo_estado")
    private Long idTipoEstado;
    private String descripcion;

    public Long getIdTipoEstado() {
        return idTipoEstado;
    }

    public void setIdTipoEstado(Long idTipoEstado) {
        this.idTipoEstado = idTipoEstado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
