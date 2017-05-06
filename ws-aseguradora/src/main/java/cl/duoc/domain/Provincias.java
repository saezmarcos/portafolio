package cl.duoc.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 28-03-2017.
 */
@Entity
@Table(name = "Provincias")
public class Provincias implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "provincia_id")
    private Long idProvincia;
    @Column(name = "provincia_nombre")
    private String provinciaNombre;

    @ManyToOne(optional=false)
    @JoinColumn(name="id_region", nullable=false, updatable=false)
    private Regiones region;

    public Long getIdProvincia() {
        return idProvincia;
    }

    public void setIdProvincia(Long idProvincia) {
        this.idProvincia = idProvincia;
    }

    public String getProvinciaNombre() {
        return provinciaNombre;
    }

    public void setProvinciaNombre(String provinciaNombre) {
        this.provinciaNombre = provinciaNombre;
    }

    public Regiones getRegion() {
        return region;
    }

    public void setRegion(Regiones region) {
        this.region = region;
    }
}
