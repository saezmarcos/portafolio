package cl.duoc.resources;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by Usuario on 01-05-2017.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Taller {
    private String rutTaller;
    private String nombre;
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

    public Comuna getComuna() {
        return comuna;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }


}
