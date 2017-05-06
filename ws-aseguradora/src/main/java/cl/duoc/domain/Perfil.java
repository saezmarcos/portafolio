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
@Table(name = "Perfil")
public class Perfil implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_perfil")
    private Long idPerfil;
    private String rol;

    public Long getIdPerfil() {
        return idPerfil;
    }

    public void setIdPerfil(Long idPerfil) {
        this.idPerfil = idPerfil;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
