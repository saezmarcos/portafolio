package cl.duoc.resources;

import cl.duoc.Util.Util;

/**
 * Created by Usuario on 18-06-2017.
 */
public class Siniestro {
    private Long id;
    private String fechaIncidente;
    private String detalleIncidente;
    private Comuna comuna;
    private String direccion;
    private Long poliza;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFechaIncidente() {
        return Util.formatearFechaString(Util.formatearFechaSql(fechaIncidente,"yyyy-MM-dd"));
    }

    public void setFechaIncidente(String fechaIncidente) {
        this.fechaIncidente = fechaIncidente;
    }

    public String getDetalleIncidente() {
        return detalleIncidente;
    }

    public void setDetalleIncidente(String detalleIncidente) {
        this.detalleIncidente = detalleIncidente;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Long getPoliza() {
        return poliza;
    }

    public void setPoliza(Long poliza) {
        this.poliza = poliza;
    }
}
