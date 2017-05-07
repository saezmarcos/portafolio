package cl.duoc.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 29-03-2017.
 */
@Entity
@Table(name = "TipoSeguro")
public class TipoSeguro implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_tipo_seguro")
    private Long id;
    @Column(name = "uf_deducible")
    private Long ufDeducible;
    @Column(name = "tasa_interes")
    private Long tasaInteres;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUfDeducible() {
        return ufDeducible;
    }

    public void setUfDeducible(Long ufDeducible) {
        this.ufDeducible = ufDeducible;
    }

    public Long getTasaInteres() {
        return tasaInteres;
    }

    public void setTasaInteres(Long tasaInteres) {
        this.tasaInteres = tasaInteres;
    }
}
