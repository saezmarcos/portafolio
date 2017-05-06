package cl.duoc.resources;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by Usuario on 30-04-2017.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Comuna{
    private Long idComuna;
    private String nombre;
    private Provincia provincia;


    public Provincia getProvincia() {
        return provincia;
    }

    public void setProvincia(Provincia provincia) {
        this.provincia = provincia;
    }


    public Long getIdComuna() {
        return idComuna;
    }

    public void setIdComuna(Long idComuna) {
        this.idComuna = idComuna;
    }


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
