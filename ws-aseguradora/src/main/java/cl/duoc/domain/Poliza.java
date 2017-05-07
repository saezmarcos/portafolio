package cl.duoc.domain;

import cl.duoc.resource.SiniestroResource;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by Usuario on 27-03-2017.
 */
@Entity
@Table(name = "Poliza")
public class Poliza implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id_poliza")
    private Long id;

    @ManyToOne(optional=false)
    @JoinColumn(name="id_tipo_seguro")
    private TipoSeguro tipoSeguro;

    private double valor_mensual;


    private String rut_aseguradora;

    @ManyToOne(optional=false)
    @JoinColumn(name="rut")
    private Persona persona;

    @ManyToOne(optional=false)
    @JoinColumn(name="numero_chasis")
    private Vehiculo vehiculo;


    @OneToMany(mappedBy = "poliza" , cascade = CascadeType.ALL,orphanRemoval = true)
    //@JoinColumn(name = "id_siniestro")
    private List<Siniestro> siniestros= new ArrayList<Siniestro>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public double getValor_mensual() {
        return valor_mensual;
    }

    public void setValor_mensual(double valor_mensual) {
        this.valor_mensual = valor_mensual;
    }

    public String getRut_aseguradora() {
        return rut_aseguradora;
    }

    public void setRut_aseguradora(String rut_aseguradora) {
        this.rut_aseguradora = rut_aseguradora;
    }

    public TipoSeguro getTipoSeguro() {
        return tipoSeguro;
    }

    public void setTipoSeguro(TipoSeguro tipoSeguro) {
        this.tipoSeguro = tipoSeguro;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    public List<Siniestro> getSiniestros() {
        return siniestros;
    }

    public void setSiniestros(List<Siniestro> siniestros) {
        this.siniestros = siniestros;
    }
}
