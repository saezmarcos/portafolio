package cl.duoc.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 01-05-2017.
 */
@Entity
@Table(name = "Grua")
public class Grua implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "numero_chasis")
    private String numeroChasis;
    private String patente;
    @OneToOne
    @JoinColumn(name="rut_aseguradora")
    private Aseguradora aseguradora;
    @ManyToOne(optional=false)
    @JoinColumn(name="id_comuna")
    private Comuna comuna;
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

    public Aseguradora getAseguradora() {
        return aseguradora;
    }

    public void setAseguradora(Aseguradora aseguradora) {
        this.aseguradora = aseguradora;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }

    public char getEnUso() {
        return enUso;
    }

    public void setEnUso(char enUso) {
        this.enUso = enUso;
    }
}
