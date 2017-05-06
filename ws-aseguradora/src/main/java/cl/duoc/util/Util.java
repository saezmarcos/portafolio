package cl.duoc.util;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.type.JavaType;
import org.codehaus.jackson.type.TypeReference;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * Created by Usuario on 27-03-2017.
 */
public class Util {
    public static Date formatearFechaSql(String fecha, String formato){
        SimpleDateFormat format = new SimpleDateFormat(formato);
        java.util.Date parsed = null;
        try {
            parsed = (java.util.Date) format.parse(fecha);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        java.sql.Date sql = new java.sql.Date(parsed.getTime());
        return sql;
    }
    public static String formatearFechaString (Date date){
        String fechaS = new SimpleDateFormat("dd-MM-yyyy").format(date);
        return fechaS;
    }
    public static String formatiarFechaDefauld(String fecha)
    {
        SimpleDateFormat formateador = new SimpleDateFormat(
                "dd-MM-yyyy", new Locale("es_ES"));
        SimpleDateFormat formateador1 = new SimpleDateFormat(
                "dd-MMM-yyyy", new Locale("es_ES"));
        Date fechaDate = null;

        try {
            fechaDate = formateador.parse(fecha);

        } catch (ParseException e) {
            e.printStackTrace();
        }

        String fecha1 = formateador1.format(fechaDate);


        return  fecha1;
    }
    public static String convertirAJson(Object object){
        if(object == null){
            return "null";
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        //mapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);
        try{
            return mapper.writeValueAsString(object);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
