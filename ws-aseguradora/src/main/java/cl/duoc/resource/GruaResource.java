package cl.duoc.resource;
import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 28-05-2017.
 */
@Entity
@Table(name = "Grua")
public class GruaResource implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "numero_chasis")
    private String numeroChasis;
    private String patente;
    @Column(name = "rut_aseguradora")
    private String rutAseguradora;
    @Column(name="id_comuna")
    private Long idComuna;
    @Column(name = "enuso")
    private char enUso;

    public String getNumeroChasis() {
        return numeroChasis;
    }

    public void setNumeroChasis(String numeroChasis) {
        this.numeroChasis = numeroChasis;
    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    public String getRutAseguradora() {
        return rutAseguradora;
    }

    public void setRutAseguradora(String rutAseguradora) {
        this.rutAseguradora = rutAseguradora;
    }

    public Long getIdComuna() {
        return idComuna;
    }

    public void setIdComuna(Long idComuna) {
        this.idComuna = idComuna;
    }

    public char getEnUso() {
        return enUso;
    }

    public void setEnUso(char enUso) {
        this.enUso = enUso;
    }
}
