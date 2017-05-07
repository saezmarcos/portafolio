package cl.duoc.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by Usuario on 01-05-2017.
 */
@Entity
@Table(name = "Aseguradora")
public class Aseguradora implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "rut_aseguradora")
    private String rutAseguradora;
    @Column(name = "razon_social")
    private String razonSocial;
    private String direccion;
    private String telefono;
    private String email;
    private String giro;

    public String getRutAseguradora() {
        return rutAseguradora;
    }

    public void setRutAseguradora(String rutAseguradora) {
        this.rutAseguradora = rutAseguradora;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGiro() {
        return giro;
    }

    public void setGiro(String giro) {
        this.giro = giro;
    }
}

