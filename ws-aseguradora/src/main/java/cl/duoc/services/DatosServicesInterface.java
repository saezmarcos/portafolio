package cl.duoc.services;

import cl.duoc.domain.Persona;

import java.util.List;

/**
 * Created by Usuario on 26-03-2017.
 */
public interface DatosServicesInterface {
        List<Persona> listPorDepartamento(long id_departamento);

}
