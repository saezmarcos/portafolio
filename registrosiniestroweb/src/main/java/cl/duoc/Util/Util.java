package cl.duoc.Util;


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


public class Util {

    public static Date formatearFechaSql(String fecha, String formato){
        SimpleDateFormat format = new SimpleDateFormat(formato);
        Date parsed = null;
        try {
            parsed = (Date) format.parse(fecha);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        java.sql.Date sql = new java.sql.Date(parsed.getTime());
        return sql;
    }
    public static String obtenerHoraString(Date fecha){
        Calendar calendar = GregorianCalendar.getInstance(); // creates a new calendar instance
        calendar.setTime(fecha);   // assigns calendar to given date
        return String.format("%02d:%02d", calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE));
    }

    public static String formatearFechaString (Date date, String formato){
        DateFormat df = new SimpleDateFormat(formato);
        String text = df.format(date);
        return text;
    }
    public static String obtenerDiaSemana(Date date){
        String[] dias={"DOM","LUN","MAR", "MIE","JUE","VIE","SAB"};

        Calendar cal= Calendar.getInstance();
        cal.setTime(date);

        return dias[(cal.get(Calendar.DAY_OF_WEEK)) - 1];
    }


    public static Date formatiarStringDate(String fecha)
    {
        SimpleDateFormat formatoDelTexto = new SimpleDateFormat("yyyyMMdd");
        Date fechad = null;
        try
        {
           fechad = formatoDelTexto.parse(fecha);
        } catch (ParseException ex)
        {
            ex.printStackTrace();
        }
          return fechad;
    }

    public static String obtenerPuntos(String hora){

      String primer =   hora.substring(0,2)  ;
        String segundo =   hora.substring(2,4)  ;
        return primer + ":" + segundo;

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

    public static String obtieneFecha( ) throws ParseException {
        Date ahora = new Date();
        SimpleDateFormat formateador = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");

        String fecha =   formateador.format(ahora);

        //Date fechad = formateador.parse(fecha);


        return fecha;
    }

    public static Map<String,String> jsonToMap(String json){
        Map<String,String> map = new HashMap<String,String>();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);
        try {
            map = mapper.readValue(json,
                    new TypeReference<HashMap<String,String>>(){});
            System.out.println(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }

    public static Object jsonObject(String json, Class classObject){
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS);
        Object retorno = null;
        try{
            retorno = mapper.readValue(json, classObject);
        }catch (IOException e){
            e.printStackTrace();
        }
        return retorno;
    }

    public static Object jsonListObject(String json, JavaType typeReference){
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS);

        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        Object retorno = null;
        try{
            retorno = mapper.readValue(json, typeReference);
        }catch (IOException e){
            e.printStackTrace();
        }
        return retorno;
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

    public static String formatearRut(String rut) {
        rut = rut.replaceFirst("^0*", "");
        int cont = 0;
        String format;
        rut = rut.replace(".", "");
        rut = rut.replace("-", "");
        format = "-" + rut.substring(rut.length() - 1);
        for (int i = rut.length() - 2; i >= 0; i--) {
            format = rut.substring(i, i + 1) + format;
            cont++;
            if (cont == 3 && i != 0) {
                format = "." + format;
                cont = 0;
            }
        }
        return format;
    }


    public static String formatearRutSinPuntos(String rut) {
        rut = rut.replace(".", "");
        rut = rut.replace("-", "");
        if(rut.length()==9)
        {
            rut ="0"+rut;
        }
        else
        {
            rut ="00"+rut;
        }
        return rut;
    }

   public static String obtenerFecha() {

       Calendar fecha = Calendar.getInstance();
       int año = fecha.get(Calendar.YEAR);
       int mes = fecha.get(Calendar.MONTH) + 1;
       String mese="";
       if(mes<9)
       {
            mese = "0"+mes;
       }else
       {
           mese = ""+mes;
       }


       return año+mese;
   }



}
