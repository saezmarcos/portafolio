package cl.duoc.domain;

import cl.duoc.util.Util;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Usuario on 11-06-2017.
 */
@Entity
@Table(name = "Logs")
public class Logs implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_logs")
    @GeneratedValue(generator="SEQ_ID_LOGS")
    @SequenceGenerator(name="SEQ_ID_LOGS",sequenceName="SEQ_ID_LOGS", allocationSize=1)
    private Long idLogs;
    private String usuario;
    private String nombre;
    private String fecha;

    public Long getIdLogs() {
        return idLogs;
    }

    public void setIdLogs(Long idLogs) {
        this.idLogs = idLogs;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getFecha() {
        return Util.formatearFechaString(Util.formatearFechaSql(fecha,"yyyy-MM-dd"));
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
}
