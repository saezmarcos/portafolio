package cl.duoc.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by Usuario on 11-06-2017.
 */
@Entity
@Table (name="Prima")
public class Prima implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_pago")
    private Long idPago;
    @Column(name="fecha_pago")
    private String fechaPago;
    @Column(name="monto_cancelar")
    private Long montoCancelar;
    private Long cancelado;
    private Long deuda;
    @Column(name="id_poliza")
    private Long idPoliza;

    public Long getIdPago() {
        return idPago;
    }

    public void setIdPago(Long idPago) {
        this.idPago = idPago;
    }

    public String getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(String fechaPago) {
        this.fechaPago = fechaPago;
    }

    public Long getMontoCancelar() {
        return montoCancelar;
    }

    public void setMontoCancelar(Long montoCancelar) {
        this.montoCancelar = montoCancelar;
    }

    public Long getCancelado() {
        return cancelado;
    }

    public void setCancelado(Long cancelado) {
        this.cancelado = cancelado;
    }

    public Long getDeuda() {
        return deuda;
    }

    public void setDeuda(Long deuda) {
        this.deuda = deuda;
    }

    public Long getIdPoliza() {
        return idPoliza;
    }

    public void setIdPoliza(Long idPoliza) {
        this.idPoliza = idPoliza;
    }
}
