package cl.duoc.resources;

/**
 * Created by Usuario on 01-05-2017.
 */
public class Aseguradora {

    private String rutAseguradora;
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
