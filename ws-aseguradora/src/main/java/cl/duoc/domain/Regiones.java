package cl.duoc.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by Usuario on 28-03-2017.
 */
@Entity
@Table(name="Regiones")
public class Regiones implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_region")
    private Long idRegion;
    private String nombre;

    public Long getIdRegion() {
        return idRegion;
    }

    public void setIdRegion(Long idRegion) {
        this.idRegion = idRegion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
