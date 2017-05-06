package cl.duoc.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by Usuario on 29-03-2017.
 */
@Entity
@Table(name = "Marca")
public class Marca implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_marca")
    private Long idMarca;
    private String descripcion;

    public Long getIdMarca() {
        return idMarca;
    }

    public void setIdMarca(Long idMarca) {
        this.idMarca = idMarca;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
