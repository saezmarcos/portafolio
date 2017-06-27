package cl.duoc.resource;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by Usuario on 26-06-2017.
 */
@Entity
@Table(name = "Reclamo")
public class RaclamoResource implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_reclamo")
    private Long idReclamo;
    private String descripcion;
    @Column(name="id_poliza")
    private Long idPoliza;
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

    public Long getIdPoliza() {
        return idPoliza;
    }

    public void setIdPoliza(Long idPoliza) {
        this.idPoliza = idPoliza;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
