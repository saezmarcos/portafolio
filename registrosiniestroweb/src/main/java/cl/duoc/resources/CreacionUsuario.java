package cl.duoc.resources;

import java.util.List;

/**
 * Created by Usuario on 16-04-2017.
 */
public class CreacionUsuario {
    private List<Perfil> perfiles;
    private  List<Comuna> comunas;
    private List<Departamento> departamentos;
    private List<Taller> talleres;
    private List<Grua> gruas;

    public List<Grua> getGruas() {
        return gruas;
    }

    public void setGruas(List<Grua> gruas) {
        this.gruas = gruas;
    }

    public List<Taller> getTalleres() {
        return talleres;
    }

    public void setTalleres(List<Taller> talleres) {
        this.talleres = talleres;
    }

    public List<Departamento> getDepartamentos() {
        return departamentos;
    }

    public void setDepartamentos(List<Departamento> departamentos) {
        this.departamentos = departamentos;
    }

    public List<Comuna> getComunas() {
        return comunas;
    }

    public void setComunas(List<Comuna> comunas) {
        this.comunas = comunas;
    }

    public List<Perfil> getPerfiles() {
        return perfiles;
    }

    public void setPerfiles(List<Perfil> perfiles) {
        this.perfiles = perfiles;
    }
}
