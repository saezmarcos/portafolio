package cl.duoc.domain;

import cl.duoc.Util.Util;

import java.text.SimpleDateFormat;

/**
 * Created by Jean on 19-05-2017.
 */
public class SiniestroDomain {
    private Long id;
    private String fechaIncidente;
    private String detalleIncidente;
    private Long idPoliza;
    private String direccion;
    private Long idComuna;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFechaIncidente() {
        return fechaIncidente;

    }

    public void setFechaIncidente(String fechaIncidente) {
        //Util.formatearFechaString(Util.formatearFechaSql(fechaIncidente, "yyyy-MM-dd"));
        this.fechaIncidente = fechaIncidente;
    }

    public String getDetalleIncidente() {
        return detalleIncidente;
    }

    public void setDetalleIncidente(String detalleIncidente) {
        this.detalleIncidente = detalleIncidente;
    }

    public Long getIdPoliza() {
        return idPoliza;
    }

    public void setIdPoliza(Long idPoliza) {
        this.idPoliza = idPoliza;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Long getIdComuna() {
        return idComuna;
    }

    public void setIdComuna(Long idComuna) {
        this.idComuna = idComuna;
    }
}
