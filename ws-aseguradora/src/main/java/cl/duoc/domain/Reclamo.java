package cl.duoc.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 26-06-2017.
 */
@Entity
@Table(name = "Reclamo")
public class Reclamo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_reclamo")
    private Long idReclamo;
    private String descripcion;
    @ManyToOne(optional=false)
    @JoinColumn(name="id_poliza")
    private Poliza poliza;
    private String email;

    public Long getIdReclamo() {
        return idReclamo;
    }

    public void setIdReclamo(Long idReclamo) {
        this.idReclamo = idReclamo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Poliza getPoliza() {
        return poliza;
    }

    public void setPoliza(Poliza poliza) {
        this.poliza = poliza;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
