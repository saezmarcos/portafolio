package cl.duoc.domain;

/**
 * Created by Usuario on 28-05-2017.
 */
public class GruaDomain {
    private String numeroChasis;
    private String patente;
    private String rutAseguradora;
    private Long idComuna;
    private char enUso;

    public String getNumeroChasis() {
        return numeroChasis;
    }

    public void setNumeroChasis(String numeroChasis) {
        this.numeroChasis = numeroChasis;
    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    public String getRutAseguradora() {
        return rutAseguradora;
    }

    public void setRutAseguradora(String rutAseguradora) {
        this.rutAseguradora = rutAseguradora;
    }

    public Long getIdComuna() {
        return idComuna;
    }

    public void setIdComuna(Long idComuna) {
        this.idComuna = idComuna;
    }

    public char getEnUso() {
        return enUso;
    }

    public void setEnUso(char enUso) {
        this.enUso = enUso;
    }
}
