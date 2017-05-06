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
@Table(name = "Departamento")
public class Departamento implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="id_departamento")
    private Long idDepartamento;
    private String nombre;
    @Column(name = "rut_aseguradora")
    private String rutAseguradora;

    public Long getIdDepartamento() {
        return idDepartamento;
    }

    public void setIdDepartamento(Long idDepartamento) {
        this.idDepartamento = idDepartamento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRutAseguradora() {
        return rutAseguradora;
    }

    public void setRutAseguradora(String rutAseguradora) {
        this.rutAseguradora = rutAseguradora;
    }
}
