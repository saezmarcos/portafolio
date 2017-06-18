package cl.duoc.resources;

/**
 * Created by Usuario on 01-05-2017.
 */

public class Departamento {
    private Long idDepartamento;
    private String nombre;
    private String rut_aseguradora;

    public Long getIdDepartamento() {
        return idDepartamento;
    }

    public void setIdDepartamento(Long id) {
        this.idDepartamento = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRut_aseguradora() {
        return rut_aseguradora;
    }

    public void setRut_aseguradora(String rut_aseguradora) {
        this.rut_aseguradora = rut_aseguradora;
    }
}
