/**
 * Created by Usuario on 14-04-2017.
 */
var modalError=document.getElementById("myModalError");
var procesando=document.getElementById("processing-modal");
var modalTaller=document.getElementById("myModalTaller");
var modalChofer=document.getElementById("myModalChofer");
var pag=0;
var pag1=0;
var response;
var modalError1=document.getElementById("myModalError1");
var modalFinal=document.getElementById("myModalFinal");
var modalFinal2=document.getElementById("myModalFinal2");
var nombre;
var rut;
var direccion;
var idDepartamento="";
var email;
var idPerfil="";
var comuna="";
var password;
var telefono;
var confirma=false;
var activar;
cargaNavbar();
$('body').on('click','#crearUsuario',function () {

    $('body #modificaUsuario').remove();
    $('body #creaUsuario').remove();
    $('body #ListadoUsuario').remove();
    cargarCrear();
});
$('body').on('click','#modificar',function () {
    $('body #creaUsuario').remove();
    $('body #ListadoUsuario').remove();
    cargarModificar();
});
$('body').on('click','#listUsr',function () {

    $('body #modificaUsuario').remove();
    $('body #creaUsuario').remove();
    cargarListar();
});
$("body").on('click',"#close1", function () {
        modalFinal2.style.display="none";
    });
$("body").on('click',"#btnCerrar2",function () {
        modalFinal2.style.display="none";
    });
$("body").on('click',"#btnCerrar1", function () {
        modalError.style.display = "none";
        modalTaller.style.display="none";
        modalError1.style.display="none";
        modalFinal.style.display="none";
        procesando.style.display="none";
    });
$("body").on('click',".cerrar" ,function () {
        modalError.style.display = "none";
        modalTaller.style.display="none";
        modalChofer.style.display="none";
        modalError1.style.display="none";
        modalFinal.style.display="none";
        procesando.style.display="none";
    });
$("body").on('click',".close", function () {
        modalError.style.display = "none";
        modalTaller.style.display="none";
        modalChofer.style.display="none";
        modalError1.style.display="none";
        modalFinal.style.display="none";
        procesando.style.display="none";
    });
$(document).ready(function () {
    $("body").on("change", function () {
        modalError1 = document.getElementById("myModalError1");
        modalFinal = document.getElementById("myModalFinal");
        modalFinal2 = document.getElementById("myModalFinal2");
    });
});
$("body").on('click',"#crear",function () {
        confirma=false;
        nombre=$("#nombre").val();
        rut=$("#rut").val();
        direccion=$("#direccion").val();
        email=$("#mail").val();
        telefono=$("#telefono").val();
        comuna=$("#comuna").val();
        password=$("#password").val();
        cfpassword=$("#cfpassword").val();
        idDepartamento = $("#idDepartamento").val();
        idPerfil=$("#perfiles").val();
        if(nombre=="" || rut=="" || direccion=="" || email=="" || telefono=="" || comuna=="-1" || password=="" || cfpassword=="" || idPerfil=="-1" || idDepartamento=="")
        {
            confirma=true;
            $('#errorModal1').text("Debe completar todos los campos");
            modalError1.style.display = "block";
        }
        else
        {
            if(password!=cfpassword) {
                confirma=true;
                $('#errorModal1').text("  Las password no coinciden  ");
                modalError1.style.display = "block";
            }
            else
            {
                if(password.length<4 || cfpassword.length<4) {
                    confirma=true;
                    $('#errorModal1').text("La password debe contener al menos 4 caracteres");
                    modalError1.style.display = "block";
                }
            }
        }

        if(!confirma){
            modalFinal.style.display="block";
        }

    });
$("body").on("click","#enviar",function () {
    flag="nuevo";
    crearUsuario(flag);
});
function cargarDatosPrimeroCrear() {
        $.ajax({
            type: "POST",
            url: "/analista/negocio/parametros/pantalla/",
            error: function (e) {
                procesando.style.display = "none";
                $('#errorModal').text(" Ocurrio un problema con la carga de datos, favor intentelo más tarde ");
                modalError.style.display = "block";
                console.log(e);

            },
            beforeSend: function () {
                procesando.style.display = "block";
            },
            success: function (data) {
                procesando.style.display = "none";
                if (data == "Error") {

                    $('#errorModal').text(" Ocurrio un problema con la carga de datos, favor intentelo más tarde ");
                    modalError.style.display = "block";
                }
                else {
                    if (data == "" || data == null || data=="null") {
                        procesando.style.display = "none";
                        $('#errorModal').text(" No existen perfiles que cargar, favor contacte al área de informática ");
                        modalError.style.display = "block";
                    }
                    else {
                        response = $.parseJSON(data);
                        perfil = response.perfiles;
                        comunas=response.comunas;
                        departamentos=response.departamentos;
                        var selectHTML = '';
                        $.each(perfil, function (i, item) {
                            if(item.rol !="Cliente")
                                selectHTML += '<option value="' + item.idPerfil + '">' + item.rol + '</option>';
                        });
                        $('#perfiles').append(selectHTML);
                         selectHTML = '';
                        $.each(comunas, function (i, item) {
                                selectHTML += '<option value="' + item.idComuna + '">' + item.nombre + '</option>';
                        });
                        $('#comuna').append(selectHTML);
                    }
                }

            }
        });
    }
function cargaNavbar() {

        $.ajax({
            type: "POST",
            url: "/menuprincipal/carga/navbar/",
            error: function (e) {
                procesando.style.display = "none";
                console.log(e.toString());
                $('#errorModal').text(" En estos momentos no podemos atenderlo, favor inténtelo más tarde ");
                modalError.style.display = "block";

            },
            beforeSend: function () {
                procesando.style.display = "block";
            },
            success: function (data) {
                if (data == "Error" || data == null || data=="null") {
                    procesando.style.display = "none";
                    $('#errorModal').text(" Ocurrio un problema al intentar generar la página, favor inténtelo más tarde ");
                    modalError.style.display = "block";
                }
                else {
                    $('#menuPrincipal').append(data);
                    username=$('body #nombreUsuario').val();
                    $('body #usrname').text(' Bienvenido: ' + username);
                    $('body #usrname').css('font-family',"Helvetica Neue,Helvetica,Arial,sans-serif");
                    //$('body #usrname').addClass("glyphicon glyphicon-user");
                    procesando.style.display="none";
                }
            }
        });
    }
function cargarCrear() {
        $.ajax({
            type : "POST",
            url :"/usuario/cargar/crear",
            error: function (e) {
                procesando.style.display = "none";
                console.log(e.toString());
                $('#errorModal').text(" En estos momentos no podemos atenderlo, favor inténtelo más tarde ");
                modalError.style.display = "block";
            },
            beforeSend: function () {
                procesando.style.display = "block";
            },
            success : function (data) {
                if (data == "Error" || data == null || data=="null") {
                    procesando.style.display = "none";
                    $('#errorModal').text(" Ocurrio un problema al intentar generar la página, favor inténtelo más tarde ");
                    modalError.style.display = "block";
                }
                else {
                    cargarDatosPrimeroCrear();
                    $('#analista').append(data);
                }

            }
        });
}
function crearUsuario(flag) {
    var persona = {
        nombre: nombre,
        rut: rut,
        email: email,
        telefono: telefono,
        idComuna: comuna,
        idDepartamento: idDepartamento,
        password: password,
        idPerfil: idPerfil,
        direccion: direccion,
        activo : 'T'
    };
    jsonPersona=JSON.stringify(persona);
    $.ajax({
        url : "/analista/usuario/crear/",
        type : "POST",
        data : {persona: jsonPersona,flag : flag},
        error : function (e) {
            procesando.style.display = "none";
            $('#errorModal').text(" Ocurrio un problema al crear usuario, favor intentelo más tarde ");
            modalError.style.display = "block";
            console.log(e);
        },
        beforeSend : function () {
            procesando.style.display = "block";
        },
        success : function (data) {
            console.log(data);
            if(data=="Error" || data=="" || data==null || data=="null")
            {
                procesando.style.display = "none";
                $('#errorModal').text(" Ocurrio un problema al crear usuario, favor intentelo más tarde ");
                modalError.style.display = "block";
            }
            else
            {
                if(data=="201") {
                    procesando.style.display = "none";
                    $('#confirmacion').text("Se ha guardado correctamente el usuario");
                    Limpiar();
                    modalFinal2.style.display = "block";
                }
                else
                    if(data=="existe")
                    {
                        {
                            procesando.style.display = "none";
                            $('#errorModal').text("El usuario que intenta crear ya existe, no se puede crear nuevamente");
                            modalError.style.display = "block";
                        }
                    }
                    else
                    {
                        procesando.style.display = "none";
                        $('#errorModal').text("Ocurrio un problema al crear usuario, favor intentelo más tarde");
                        modalError.style.display = "block";
                    }
            }

        }
    });

};
$(document).ready(function () {
$("body").on('change',"#perfiles",function () {
        var sel=$("#perfiles").val();
        var departamentos=response.departamentos;
        if(sel=="-1") {
            $("#departamento").val("Departamento según perfil");
            $("#idDepartamento").val("");
        }else {
            $.each(departamentos, function (i, item) {
                if (item.idDepartamento == "42" && sel == "2") {
                    $("#departamento").val(item.nombre);
                    $("#idDepartamento").val(item.idDepartamento);
                    return false;
                }
                if (item.idDepartamento == "41" && (sel == "4" || sel == "5")) {
                    $("#departamento").val(item.nombre);
                    $("#idDepartamento").val(item.idDepartamento);
                    return false;
                }
                if (item.idDepartamento == "1" && sel == "7") {
                    $("#departamento").val(item.nombre);
                    $("#idDepartamento").val(item.idDepartamento);
                    return false;
                }
                if (item.idDepartamento == "3" && sel == "6") {
                    $("#departamento").val(item.nombre);
                    $("#idDepartamento").val(item.idDepartamento);
                    return false;
                }
                if (item.idDepartamento == "2" && sel == "1") {
                    $("#departamento").val(item.nombre);
                    $("#idDepartamento").val(item.idDepartamento);
                    return false;
                }
                if (item.idDepartamento == "44" && sel == "10") {
                    $("#departamento").val(item.nombre);
                    $("#idDepartamento").val(item.idDepartamento);
                    return false;
                }
                if (item.idDepartamento == "43" && sel == "9") {
                    $("#departamento").val(item.nombre);
                    $("#idDepartamento").val(item.idDepartamento);
                    return false;
                }
            });
        }
    });
$("body").on('change',"#talleres",function () {
        var sel=$("#talleres").val();
        var talleres= response.talleres;
        if(sel=="-1")
            $("#region").text("Región donde se ubica Taller");
        else
            $.each(talleres,function (i,item) {
                if(item.rutTaller==sel){
                    $("#region").text(item.comuna.provincia.provinciaNombre);
                    return false;
                }
            });
    });
$("body").on('change',"#chofer",function () {
        var sel=$("#chofer").val();
        var gruas= response.gruas;
        if(sel=="-1")
            $("#regionGrua").text("Región donde se ubica Taller");
        else
            $.each(gruas,function (i,item) {
                if(item.numeroChasis==sel){
                    $("#regionGrua").text(item.comuna.provincia.provinciaNombre);
                    return false;
                }
            });
    });
});
$("body").on('click','#modif',function () {
    var rutM = $("#rutM").val();
    if(rutM!=null && rutM!="") {
        $.ajax({
            url: "/acceso/usuario/login/usuario/modificar/buscar/",
            type: "POST",
            data: {rutM: rutM},
            error : function (e) {
                $("#errorModal").text("Se produjo un error al realizar la busqueda, favor inténtelo más tarde");
                modalError.style.display="block";
            },
            beforeSend : function () {
                procesando.style.display="block";
            },
            success : function (data) {
                if (data=="Error" || data=="" || data==null || data=="null")
                {
                    $("#errorModal").text("Usuario no existe o existe un error en la busqueda, favor intente otras credenciales");
                    modalError.style.display="block";
                }else {
                    var persona= JSON.parse(data);
                    cargarDatosPrimeroCrear();
                    procesando.style.display = "none";
                    trHtml='';
                    $("body .info").remove();
                    trHtml = ' <tr class="info"><td id="nombrep"><input id="nombreMo" type="text" class="form-control input-md" value="'+persona.nombre+'"/></td><td id="rutp"><input id="rutMo" type="text" class="form-control input-md" value="'+persona.rut+'" readonly="true"/></td><td id="direccionp"><input id="direccionMo" type="text" class="form-control input-md" value="'+persona.direccion+'"/></td><td id="comp"><input id="comunap" type="text" class="form-control input-md" value="'+persona.comuna.nombre+'"/></td><td id="perp"><input id="perfilp" type="text" class="form-control input-md" value="'+persona.perfil.rol+'"/></td><td id="depp"><input id="departamentop" type="text" class="form-control input-md" value="'+persona.departamento.nombre+'"/></td><td id="telefonop"><input id="telefonoMo" type="text" class="form-control input-md" value="'+persona.telefono+'"/></td><td id="emailp"><input id="emailMo" type="text" class="form-control input-md" value="'+persona.email+'"/></td><td id="passwordp"><input id="passwordMo" type="text" class="form-control input-md" value="'+persona.password+'"/></td><td id="activop"><label class="custom-control custom-checkbox"><input id="activoMo" type="checkbox" class="custom-control-input"><span class="custom-control-indicator"></span></label></td></tr>';
                    $("#table_recors").append(trHtml);
                    if(persona.activo=='T')
                    {
                        $(':checkbox').attr('checked', true);
                        activar='T';
                    }
                    else
                    {
                        activar='F';
                    }
                    $("#table_recors").removeClass('hidden');
                    $("#modifUsuario").removeClass('hidden');
                    $("body").on('click',"#comunap",function () {
                        $("body #comunados").remove();
                        var select='<select id="comunados" name="comunados" class="form-control"><option value="-1">Seleccione una comuna</option></select>';
                       comunas=response.comunas;
                       var selectHTML='';
                       $.each(comunas, function (i, item) {
                            selectHTML += '<option value="' + item.idComuna + '">' + item.nombre + '</option>';
                        });
                       $("body #comunap").addClass("hidden");
                       $("body #comp").append(select);
                       $("body #comunados").append(selectHTML);

                    });
                    $("body").on('click',"#departamentop",function () {
                        $("body #departamentosdos").remove();
                        var select='<select id="departamentosdos" name="departamentosdos" class="form-control"><option value="-1">Seleccione un departamento</option></select>';
                        departamentos=response.departamentos;
                        var selectHTML='';
                        $.each(departamentos, function (i, item) {
                            if(item.nombre!="Clientes")
                                selectHTML += '<option value="' + item.idDepartamento + '">' + item.nombre + '</option>';
                        });
                        $("body #departamentop").addClass("hidden");
                        $("body #depp").append(select);
                        $("body #departamentosdos").append(selectHTML);
                    });
                    $("body").on('click',"#perfilp",function () {
                        $("body #perfildos").remove();
                        var select='<select id="perfildos" name="perfildos" class="form-control"><option value="-1">Seleccione un perfil</option></select>';
                        perfiles=response.perfiles;
                        var selectHTML='';
                        $.each(perfiles, function (i, item) {
                            if(item.rol!="Cliente")
                                selectHTML += '<option value="' + item.idPerfil + '">' + item.rol + '</option>';
                        });
                        $("body #perfilp").addClass("hidden");
                        $("body #perp").append(select);
                        $("body #perfildos").append(selectHTML);
                    });
                }

            }
        });
    }
    else
    {
        $("#errorModal").text("Debe ingresar un rut para realizar la busqueda");
        modalError.style.display="block";
    }
});
function Limpiar() {

    $("#nombre").val("");
    $("#rut").val("");
    $("#direccion").val("");
    $("#mail").val("");
    $("#telefono").val("");
    $("#comuna").val("-1");
    $("#password").val("");
    $("#cfpassword").val("");
    $("#idDepartamento").val("");
    $("#departamento").val("Departamento según perfil");
    $("#perfiles").val("-1");
}
function cargarModificar() {
    $.ajax({
        url : "/usuario/cargar/modificar/",
        type : "POST",
        error : function () {
            procesando.style.display = "none";
            $('#errorModal').text(" Ocurrio un problema al buscar los datos del usuario, favor intentelo más tarde ");
            modalError.style.display = "block";
            console.log(e);
        },
        beforeSend : function () {
            procesando.style.display = "block";
        },
        success : function (data) {
            procesando.style.display = "none";
            $('#analista').append(data);
        }

    });
}
function cargarListar() {
    $.ajax({
        url : "/usuario/cargar/listar/",
        type : "POST",
        error : function (e) {
            procesando.style.display = "none";
            $('#errorModal').text(" Ocurrio un problema al buscar los datos, favor intentelo más tarde ");
            modalError.style.display = "block";
            console.log(e);
        },
        beforeSend : function () {
            procesando.style.display = "block";
        },
        success : function (data) {
            procesando.style.display = "none";
            $('#analista').append(data);
        }

    });
}
$("body").on('click',"#modifUsuario",function () {
    nombre=$("#nombreMo").val();
    rut=$("#rutMo").val();
    direccion=$("#direccionMo").val();
    email=$("#emailMo").val();
    telefono=$("#telefonoMo").val();
    comuna=$("#comunados").val();
    password=$("#passwordMo").val();
    idDepartamento = $("#departamentodos").val();
    idPerfil=$("#perfildos").val();
    var persona = {
        nombre: nombre,
        rut: rut,
        email: email,
        telefono: telefono,
        idComuna: comuna,
        idDepartamento: idDepartamento,
        password: password,
        idPerfil: idPerfil,
        direccion: direccion,
        activo : activar
    }
    modificar=JSON.stringify(persona);

});
$("body").on('change',"#activoMo",function () {
    if( $('body #activoMo').prop('checked') )
        activar='T';
    else
        activar='F';
});