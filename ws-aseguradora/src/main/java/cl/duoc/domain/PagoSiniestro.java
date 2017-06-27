package cl.duoc.domain;

import cl.duoc.util.Util;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 11-06-2017.
 */
@Entity
@Table(name = "Pago_siniestro")
public class PagoSiniestro implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_pago_siniestro")
    @GeneratedValue(generator="SEQ_ID_PAGO_SINIESTRO")
    @SequenceGenerator(name="SEQ_ID_PAGO_SINIESTRO",sequenceName="SEQ_ID_PAGO_SINIESTRO", allocationSize=1)
    private Long idPagoSiniestro;
    @Column(name = "monto_cancelar")
    private Long montoCancelar;
    private String descripcion;
    @Column(name = "id_siniestro")
    private Long idSiniestro;
    @Column(name = "fecha_pago")
    private String fechaPago;

    public Long getIdPagoSiniestro() {
        return idPagoSiniestro;
    }

    public void setIdPagoSiniestro(Long idPagoSiniestro) {
        this.idPagoSiniestro = idPagoSiniestro;
    }

    public Long getMontoCancelar() {
        return montoCancelar;
    }

    public void setMontoCancelar(Long montoCancelar) {
        this.montoCancelar = montoCancelar;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getIdSiniestro() {
        return idSiniestro;
    }

    public void setIdSiniestro(Long idSiniestro) {
        this.idSiniestro = idSiniestro;
    }

    public String getFechaPago() {

        return Util.formatearFechaString(Util.formatearFechaSql(fechaPago,"yyyy-MM-dd"));
    }

    public void setFechaPago(String fechaPago) {
        this.fechaPago = fechaPago;
    }
}
