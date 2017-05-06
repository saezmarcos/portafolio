package cl.duoc.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 28-03-2017.
 */
@Entity
@Table(name="Comuna")
public class Comuna implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_comuna")
    private Long id;

    private String nombre;

    @ManyToOne(optional=false)
    @JoinColumn(name="provincia_id", nullable=false, updatable=false)
    private Provincias provincia;

    public Long getIdComuna() {
        return id;
    }

    public void setId(Long idComuna) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Provincias getProvincia() {
        return provincia;
    }

    public void setProvincia(Provincias provincia) {
        this.provincia = provincia;
    }
}
