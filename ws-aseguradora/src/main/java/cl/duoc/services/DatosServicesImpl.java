package cl.duoc.services;

import cl.duoc.dao.IdSiniestroResourceDAO;
import cl.duoc.dao.PersonaDAO;
import cl.duoc.domain.Departamento;
import cl.duoc.domain.Persona;
import cl.duoc.resource.IdSiniestroResource;
import cl.duoc.resource.SiniestroResource;
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
    @Autowired
    private IdSiniestroResourceDAO idSR;
    @Override
    public void deleteByIdPoliza(Long idPoliza)
    {
        List<IdSiniestroResource> li= idSR.findAll();
        for (IdSiniestroResource dd:li) {
            if(dd.getIdPoliza()==0)
                idSR.delete(dd.getId());
        }

    }



}
