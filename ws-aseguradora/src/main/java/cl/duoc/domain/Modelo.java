package cl.duoc.domain;

import sun.rmi.runtime.Log;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 29-03-2017.
 */
@Entity
@Table(name = "Modelo")
public class Modelo implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id_modelo")
    private Long idModelo;
    private String descripcion;
    @ManyToOne(optional=false)
    @JoinColumn(name="id_marca")
    private Marca marca;

    private Integer valor;

    public Long getIdModelo() {
        return idModelo;
    }

    public void setIdModelo(Long idModelo) {
        this.idModelo = idModelo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Integer getValor() {
        return valor;
    }

    public void setValor(Integer valor) {
        this.valor = valor;
    }
}
