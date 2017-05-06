package cl.duoc.domain;

import com.sun.javafx.sg.prism.NGShape;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 29-03-2017.
 */
@Entity
@Table(name = "Vehiculo")
public class Vehiculo implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "numero_chasis")
    private String numeroChasis;
    private String patente;

    @ManyToOne(optional=false)
    @JoinColumn(name="id_modelo")
    private Modelo modelo;

    private String ano;

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

    public Modelo getModelo() {
        return modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }
}
