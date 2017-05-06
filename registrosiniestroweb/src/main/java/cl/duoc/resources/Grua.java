package cl.duoc.resources;

/**
 * Created by Usuario on 01-05-2017.
 */
public class Grua {
    private String numeroChasis;
    private String patente;
    private Aseguradora Aseguradora;
    private Comuna comuna;
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

    public cl.duoc.resources.Aseguradora getAseguradora() {
        return Aseguradora;
    }

    public void setAseguradora(cl.duoc.resources.Aseguradora aseguradora) {
        Aseguradora = aseguradora;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }

    public char getEnUso() {
        return enUso;
    }

    public void setEnUso(char enUso) {
        this.enUso = enUso;
    }
}
