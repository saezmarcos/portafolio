package cl.duoc.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 01-05-2017.
 */
@Entity
@Table(name = "Taller")
public class Taller implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "rut_taller")
    private String rutTaller;
    private String nombre;
    private String telefono;
    private String direccion;
    private String correo;
    @OneToOne
    @JoinColumn(name="rut_aseguradora")
    private Aseguradora aseguradora;
    @ManyToOne(optional=false)
    @JoinColumn(name="id_comuna")
    private Comuna comuna;

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
}
