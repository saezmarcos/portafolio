package cl.duoc.services;

import cl.duoc.dao.PersonaDAO;
import cl.duoc.domain.Departamento;
import cl.duoc.domain.Persona;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Usuario on 26-03-2017.
 */
@Service
public class DatosServicesImpl implements DatosServicesInterface {

    @Autowired
    private PersonaDAO pers;

    @Override
    public List<Persona> listPorDepartamento(long id_departamento) {
        List<Persona> p = pers.findAll();
        List<Persona> departamento = new ArrayList<>();
        for (Persona pr : p)
        {
            Departamento d = pr.getDepartamento();
            if(d.getIdDepartamento()==id_departamento)
            {
                departamento.add(pr);
            }
        }
        return departamento;
    }



}
