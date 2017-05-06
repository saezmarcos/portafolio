package cl.duoc.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Blob;

/**
 * Created by Usuario on 08-04-2017.
 */
@Entity
@Table(name = "Foto_evid_siniestro")
public class FotoEvidSiniestro implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_siniestro")
    private Long id;
    @Column(name = "Foto1_nombre")
    private String foto1Nombre;
    @Column(name = "Foto1_url")
    private String foto1Url;
    @Column (name = "Foto2_nombre")
    private String foto2Nombre;
    @Column(name = "Foto2_url")
    private String foto2Url;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFoto1Nombre() {
        return foto1Nombre;
    }

    public void setFoto1Nombre(String foto1Nombre) {
        this.foto1Nombre = foto1Nombre;
    }

    public String getFoto1Url() {
        return foto1Url;
    }

    public void setFoto1Url(String foto1Url) {
        this.foto1Url = foto1Url;
    }

    public String getFoto2Nombre() {
        return foto2Nombre;
    }

    public void setFoto2Nombre(String foto2Nombre) {
        this.foto2Nombre = foto2Nombre;
    }

    public String getFoto2Url() {
        return foto2Url;
    }

    public void setFoto2Url(String foto2Url) {
        this.foto2Url = foto2Url;
    }
}
