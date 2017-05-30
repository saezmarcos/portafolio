package cl.duoc.domain;

import cl.duoc.Util.Util;

/**
 * Created by Jean on 27-05-2017.
 */
public class EstadoDomain {
    private int idEstado;
    private String numeroChasis, rutTaller;
    private int idSiniestro, costo;
    private String fechaIngreso, fechaEntrega;
    private String rut;
    private String tipoEstado;

    public int getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(int idEstado) {
        this.idEstado = idEstado;
    }

    public String getNumeroChasis() {
        return numeroChasis;
    }

    public void setNumeroChasis(String numeroChasis) {
        this.numeroChasis = numeroChasis;
    }

    public String getRutTaller() {
        return rutTaller;
    }

    public void setRutTaller(String rutTaller) {
        this.rutTaller = rutTaller;
    }

    public int getIdSiniestro() {
        return idSiniestro;
    }

    public void setIdSiniestro(int idSiniestro) {
        this.idSiniestro = idSiniestro;
    }

    public int getCosto() {
        return costo;
    }

    public void setCosto(int costo) {
        this.costo = costo;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = Util.formatearFechaString(Util.formatearFechaSql(fechaIngreso, "yyyy-MM-dd"));
    }

    public String getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(String fechaEntrega) {
        this.fechaEntrega = Util.formatearFechaString(Util.formatearFechaSql(fechaEntrega, "yyyy-MM-dd"));
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getTipoEstado() {
        return tipoEstado;
    }

    public void setTipoEstado(String tipoEstado) {
        this.tipoEstado = tipoEstado;
    }
}
