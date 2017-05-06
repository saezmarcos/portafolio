package cl.duoc.domain;

import javax.persistence.Entity;
import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 26-03-2017.
 */
@Entity
@Table(name="Persona")
public class Persona implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    private String rut;

    private String nombre;
    private String direccion;
    private String email;
    private String telefono;
    private String password;

    @ManyToOne(optional = false)
    @JoinColumn(name="id_departamento", nullable=false, updatable=false)
    private Departamento departamento;

    @ManyToOne(optional = false)
    @JoinColumn(name="id_perfil", nullable=false, updatable=false)
    private Perfil perfil;

    @ManyToOne(optional = false)
    @JoinColumn(name="id_comuna", nullable=false, updatable=false)
    private Comuna comuna;

    private char activo;


    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public Perfil getPerfil() {
        return perfil;
    }

    public void setPerfil(Perfil perfil) {
        this.perfil = perfil;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }

    public char getActivo() {
        return activo;
    }

    public void setActivo(char activo) {
        this.activo = activo;
    }


}
