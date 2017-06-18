package cl.duoc.domain;

import cl.duoc.util.Util;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by Usuario on 24-04-2017.
 */
@Entity
@Table(name = "Recepcion")
public class Recepcion implements Serializable{
    private static final long  serialVersionUID =1L;

    @Id
    @Column(name = "id_recepcion")
    @GeneratedValue(generator="SEQ_ID_RECEPCION")
    @SequenceGenerator(name="SEQ_ID_RECEPCION",sequenceName="SEQ_ID_RECEPCION", allocationSize=1)
    private Long id;
    @Column(name="fecha_ingreso")
    private String fechaIngreso;
    @Column(name="nombre_conductor")
    private String nombreConductor;
    @Column(name="telefono_conductor")
    private String telefonoConductor;
    @Column(name = "nombre_recepcionista")
    private String nombreRecepcionista;
    @Column(name = "rut_taller")
    private String rutTaller;
    private String modelo;
    private String marca;
    @Column(name = "numero_siniestro")
    private Long idSiniestro;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFechaIngreso() {
        return Util.formatearFechaString(Util.formatearFechaSql(fechaIngreso,"yyyy-MM-dd"));
    }



    public String getNombreConductor() {
        return nombreConductor;
    }

    public void setNombreConductor(String nombreConductor) {
        this.nombreConductor = nombreConductor;
    }

    public String getTelefonoConductor() {
        return telefonoConductor;
    }

    public void setTelefonoConductor(String telefonoConductor) {
        this.telefonoConductor = telefonoConductor;
    }

    public String getNombreRecepcionista() {
        return nombreRecepcionista;
    }

    public void setNombreRecepcionista(String nombreRecepcionista) {
        this.nombreRecepcionista = nombreRecepcionista;
    }

    public String getRutTaller() {
        return rutTaller;
    }

    public void setRutTaller(String rutTaller) {
        this.rutTaller = rutTaller;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Long getIdSiniestro() {
        return idSiniestro;
    }

    public void setIdSiniestro(Long idSiniestro) {
        this.idSiniestro = idSiniestro;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = Util.formatearFechaString(Util.formatearFechaSql(fechaIngreso,"yyyy-MM-dd"));
    }

}
