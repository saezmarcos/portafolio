package cl.duoc.services;

import cl.duoc.Util.Util;
import cl.duoc.domain.PersonaDomain;
import cl.duoc.domain.SiniestroDomain;
import cl.duoc.resources.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import sun.misc.Perf;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Usuario on 14-04-2017.
 */
@Service
public class RegistroSiniestroServices {
    @Value(("${ws.obtener.polizas}"))
    private String urlPoliza;
    @Value(("${ws.obtener.login}"))
    private String urlLogin;
    @Value(("${ws.obtener.perfiles}"))
    private String urlPerfiles;
    @Value(("${ws.obtener.comunas}"))
    private String urlComunas;
    @Value(("${ws.obtener.departamentos}"))
    private String urlDepartamentos;
    @Value(("${ws.obtener.talleres}"))
    private String urlTalleres;
    @Value(("${ws.obtener.gruas}"))
    private String urlGruas;
    @Value(("${ws.crear.persona}"))
    private String urlCrearPersona;
    @Value(("${ws.crear.chofer}"))
    private String urlChofer;
    @Value(("${ws.crear.admTaller}"))
    private String urlAdmTaller;
    @Value(("${ws.obtener.persona}"))
    private String urlPersona;
    @Value(("${ws.obtener.personas}"))
    private String urlPersonas;
    @Value(("${ws.obtener.idSiniestro}"))
    private String urlIdSiniestro;
    @Value(("${ws.crear.siniestro}"))
    private String urlCrearSiniestro;
    @Value(("${ws.crear.estado}"))
    private String urlCrearEstado;
    @Value(("${ws.obtener.regiones}"))
    private String urlRegiones;
    @Value(("${ws.obtener.provincias}"))
    private String urlProvincias;
    @Value(("${ws.crear.historial}"))
    private String urlCrearHistorial;
    @Value(("${ws.crear.grua}"))
    private String urlCrearGrua;
    @Value(("${ws.crear.taller}"))
    private String urlCrearTaller;

    public Rol accesoPersona(String rut, String password) {
        ObjectMapper mapper = new ObjectMapper();
        Rol acceso;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlLogin + "/?rut=" + rut + "&password=" + password);
        ResponseEntity<Rol> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<Rol>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                acceso = respuesta.getBody();
                break;
            case 404:
                return null;
            default:
                throw new RuntimeException("Error");
        }
        return acceso;
    }

    public List<Perfil> obtenerPerfiles() {
        ObjectMapper mapper = new ObjectMapper();
        List<Perfil> perfiles;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlPerfiles);
        ResponseEntity<List<Perfil>> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<Perfil>>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                perfiles = respuesta.getBody();
                break;
            case 404:
                return null;

            default:
                throw new RuntimeException("Error");
        }
        return perfiles;
    }

    public List<Comuna> obtenerComunas() {
        ObjectMapper mapper = new ObjectMapper();
        List<Comuna> com;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlComunas);
        ResponseEntity<List<Comuna>> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<Comuna>>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                com = respuesta.getBody();
                break;
            case 404:
                return null;

            default:
                throw new RuntimeException("Error");
        }
        return com;

    }

    public List<Departamento> obtenerDepartamentos() {
        ObjectMapper mapper = new ObjectMapper();
        List<Departamento> departamentos;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlDepartamentos);
        ResponseEntity<List<Departamento>> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<Departamento>>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                departamentos = respuesta.getBody();
                break;
            case 404:
                return null;

            default:
                throw new RuntimeException("Error");
        }
        return departamentos;
    }

    public List<Taller> obtenerTalleres() {
        ObjectMapper mapper = new ObjectMapper();
        List<Taller> talleres;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlTalleres);
        ResponseEntity<List<Taller>> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<Taller>>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                talleres = respuesta.getBody();
                break;
            case 404:
                return null;

            default:
                throw new RuntimeException("Error");
        }
        return talleres;
    }

    public List<Grua> obtenerGruas() {
        ObjectMapper mapper = new ObjectMapper();
        List<Grua> gruas;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlGruas);
        ResponseEntity<List<Grua>> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<Grua>>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                gruas = respuesta.getBody();
                break;
            case 404:
                return null;

            default:
                throw new RuntimeException("Error");
        }
        return gruas;
    }

    public String crearPersona(String persona) {

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(persona, headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlCrearPersona);
        ResponseEntity<String> response = restTemplate.postForEntity(builder.build().encode().toUri(), entity, String.class);
        return "" + response.getStatusCodeValue();

    }

    public String crearChofer(String chofer) {

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(chofer, headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlChofer);
        ResponseEntity<String> response = restTemplate.postForEntity(builder.build().encode().toUri(), entity, String.class);
        return "" + response.getStatusCodeValue();

    }

    public String crearAdmTaller(String admTaller) {

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(admTaller, headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlAdmTaller);
        ResponseEntity<String> response = restTemplate.postForEntity(builder.build().encode().toUri(), entity, String.class);
        return "" + response.getStatusCodeValue();

    }

    public PersonaDomain obtenerPersona(String rut) {
        ObjectMapper mapper = new ObjectMapper();
        PersonaDomain persona;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlPersona + "/?rut=" + rut);
        ResponseEntity<PersonaDomain> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<PersonaDomain>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                persona = respuesta.getBody();
                break;
            case 404:
                return null;

            default:
                throw new RuntimeException("Error");
        }
        return persona;
    }

    public List<PersonaDomain> obtenerPersonas() {
        ObjectMapper mapper = new ObjectMapper();
        List<PersonaDomain> personas;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlPersonas);
        ResponseEntity<List<PersonaDomain>> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<PersonaDomain>>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                personas = respuesta.getBody();
                break;
            case 404:
                return null;

            default:
                throw new RuntimeException("Error");
        }
        return personas;
    }

    public String obtenerPoliza(String idPoliza) {
        ObjectMapper mapper = new ObjectMapper();
        String acceso;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlPoliza + "?id_poliza=" + idPoliza);
        ResponseEntity<String> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<String>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                acceso = respuesta.getBody();
                break;
            case 404:
                return null;
            default:
                throw new RuntimeException("Error");
        }
        return acceso;
    }

    public String obtenerNroSiniestro() {

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlIdSiniestro);
        ResponseEntity<String> response = restTemplate.postForEntity(builder.build().encode().toUri(), entity, String.class);
        switch (response.getStatusCodeValue()) {
            case 201:
                return response.getBody();
            case 404:
                return null;
            default:
                throw new RuntimeException("Error");
        }

    }

    public String crearSiniestro(String siniestro) {

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(siniestro, headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlCrearSiniestro);
        ResponseEntity<String> response = restTemplate.postForEntity(builder.build().encode().toUri(), entity, String.class);
        return "" + response.getStatusCodeValue();

    }

    public String crearEstado(String estado) {

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(estado, headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlCrearEstado);
        ResponseEntity<String> response = restTemplate.postForEntity(builder.build().encode().toUri(), entity, String.class);
        return "" + response.getStatusCodeValue();

    }

    public List<Region> obtenerRegiones() {
        ObjectMapper mapper = new ObjectMapper();
        List<Region> com;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlRegiones);
        ResponseEntity<List<Region>> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<Region>>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                com = respuesta.getBody();
                break;
            case 404:
                return null;

            default:
                throw new RuntimeException("Error");
        }
        return com;

    }

    public List<Provincia> obtenerProvincias() {
        ObjectMapper mapper = new ObjectMapper();
        List<Provincia> com;
        String requestBody = null;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlProvincias);
        ResponseEntity<List<Provincia>> respuesta = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, new ParameterizedTypeReference<List<Provincia>>() {
        });
        switch (respuesta.getStatusCodeValue()) {
            case 200:
                com = respuesta.getBody();
                break;
            case 404:
                return null;

            default:
                throw new RuntimeException("Error");
        }
        return com;

    }

    public String crearHistorial(String historial) {

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(historial, headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlCrearHistorial);
        ResponseEntity<String> response = restTemplate.postForEntity(builder.build().encode().toUri(), entity, String.class);
        return "" + response.getStatusCodeValue();

    }
    public String crearGrua(String grua) {

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(grua, headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlCrearGrua);
        ResponseEntity<String> response = restTemplate.postForEntity(builder.build().encode().toUri(), entity, String.class);
        return "" + response.getStatusCodeValue();

    }

    public String crearTaller(String taller) {

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>(taller, headers);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlCrearTaller);
        ResponseEntity<String> response = restTemplate.postForEntity(builder.build().encode().toUri(), entity, String.class);
        return "" + response.getStatusCodeValue();

    }
}
