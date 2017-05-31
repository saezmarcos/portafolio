package cl.duoc.resource;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by Usuario on 28-05-2017.
 */
@Entity
@Table(name = "Taller")
public class TallerResource implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "rut_taller")
    private String rutTaller;
    private String nombre;
    private String telefono;
    private String direccion;
    private String correo;
    @Column(name="rut_aseguradora")
    private String rutAseguradora;
    @Column(name="id_comuna")
    private Long idComuna;

    public String getRutTaller() {
        return rutTaller;
    }

    public void setRutTaller(String rutTaller) {
        this.rutTaller = rutTaller;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
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
}
