/**
 * Created by Usuario on 14-04-2017.
 */
var modalError=document.getElementById("myModalError");
var procesando=document.getElementById("processing-modal");
var modalTaller=document.getElementById("myModalTaller");
var modalChofer=document.getElementById("myModalChofer");
var modalFinalModif= document.getElementById("myModalFinalModif")
var response;
var modalError1=document.getElementById("myModalError1");
var modalFinal=document.getElementById("myModalFinal");
var modalFinal2=document.getElementById("myModalFinal2");
var confirma=false;
cargaNavbar();
function cargarModificar() {
    $.ajax({
        url : "/analista/usuario/cargar/modificar/",
        type : "POST",
        error : function (e) {
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
            cargarCrear("modif");
        }

    });
}
function cargarListar() {
    $.ajax({
        url : "/analista/usuario/cargar/listar/",
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
            $('body .lisUsr').click();
        }

    });
}
$('body').on('click','#crearUsuario',function () {
    $('body #modificaUsuario').remove();
    $('body #creaUsuario').remove();
    $('body #listadoUsuario').remove();
    cargarCrear("nuevo");
});
$('body').on('click','#modificar',function () {
    $('body #modificaUsuario').remove();
    $('body #creaUsuario').remove();
    $('body #listadoUsuario').remove();
    cargarModificar();
});
$('body').on('click','#listUsr',function () {
    $('body #listadoUsuario').remove();
    $('body #modificaUsuario').remove();
    $('body #creaUsuario').remove();
    cargarListar();
});
$("body").on('click',"#close1", function () {
        modalFinal2.style.display="none";
    });
$("body").on('click',"#btnCerrar2",function () {
        modalFinal2.style.display="none";
        modalFinalModif.style.display="none";
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
        modalFinalModif.style.display="none";
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
        idDepartamento = $("#departamento").val();
        idPerfil=$("#perfiles").val();
        if(nombre=="" || rut=="" || direccion=="" || email=="" || telefono=="" || comuna=="-1" || password=="" || cfpassword=="" || idPerfil=="-1" || idDepartamento=="-1")
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
$("body").on('click',"#btnModificar",function () {
    confirma=false;
    nombre=$("#nombre").val();
    rut=$("#rut").val();
    direccion=$("#direccion").val();
    email=$("#mail").val();
    telefono=$("#telefono").val();
    comuna=$("#comuna").val();
    password=$("#password").val();
    idDepartamento = $("#departamento").val();
    idPerfil=$("#perfiles").val();
    if(nombre=="" || direccion=="" || email=="" || telefono=="" || comuna=="-1" || password=="" ||  idPerfil=="-1" || idDepartamento=="-1")
    {
        confirma=true;
        $('#errorModal1').text("Debe completar todos los campos");
        modalError1.style.display = "block";
    }
    else
    {
        if(password.length<4) {
            confirma=true;
            $('#errorModal1').text("La password debe contener al menos 4 caracteres");
            modalError1.style.display = "block";
        }

    }

    if(!confirma){
        $("#confirmacionMod").text(" ¿Seguro desea modificar usuario? ")
        modalFinalModif.style.display="block";
    }

});
$("body").on("click","#enviar",function () {
    flag="nuevo";
    crearUsuario(flag);
});
$("body").on("click","#btnMod",function () {
    flag="modif";
    modalFinalModif.style.display="none";
    crearUsuario(flag);
    $("#cuerpoModificar").addClass('hidden');
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
                        comuna=response.comunas;
                        regiones=response.regiones;
                        provincia=response.provincias;
                        departamentos=response.departamentos;
                        var selectHTML = '';
                        $.each(perfil, function (i, item) {
                            if(item.rol !="Cliente")
                                selectHTML += '<option value="' + item.idPerfil + '">' + item.rol + '</option>';
                        });
                        $('#perfiles').append(selectHTML);
                        selectHTML = '';
                        $.each(regiones, function (i, item) {
                            selectHTML += '<option value="' + item.idRegion + '">' + item.nombre + '</option>';
                        });
                        $('#regiones').append(selectHTML);
                        selectHTML = '';
                        $.each(departamentos, function (i, item) {
                            selectHTML += '<option value="' + item.idDepartamento + '">' + item.nombre + '</option>';
                        });
                        $("#departamento").append(selectHTML);
                    }
                }

            }
        });
    }
$("body").on('change',"#regiones",function () {
    var comuna=[];
    $('#comuna').empty();
    $.ajax({
        url : "/analista/negocio/obtener/comunas/",
        type : "POST",
        error : function () {
            $("#errorModal").text("Se produjo un error al cargar las comunas, favor inténtelo más tarde");
            modalError.style.display="block";
        },
        success : function (data) {
            if (data=="Error" || data=="" || data==null || data=="null")
            {
                $("#errorModal").text("Se produjo un error al cargar las comunas, favor inténtelo más tarde");
                modalError.style.display="block";
            }
            else
            {
                comuna= $.parseJSON(data);
                var selectHTML = '';
                $.each(comuna, function (i, item) {
                    if(item.provincia.region.idRegion==$("body #regiones").val())
                        selectHTML += '<option value="' + item.idComuna + '">' + item.nombre + '</option>';
                });
                $('#comuna').append(selectHTML);
            }
        }
    });

});
function cargaNavbar() {
        $.ajax({
            type: "POST",
            url: "/analista/menuprincipal/carga/navbar/",
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
                    procesando.style.display="none";
                }
            }
        });
    }
function cargarCrear(flag) {
        $.ajax({
            type : "POST",
            url :"/analista/usuario/cargar/crear/",
            error: function (e) {
                procesando.style.display = "none";
                console.log(e.toString());
                $('#errorModal').text("En estos momentos no podemos atenderlo, favor inténtelo más tarde");
                modalError.style.display = "block";
            },
            beforeSend: function () {
                procesando.style.display = "block";
            },
            success : function (data) {
                if (data == "Error" || data == null || data=="null") {
                    procesando.style.display = "none";
                    $('#errorModal').text("Ocurrio un problema al intentar generar la página, favor inténtelo más tarde");
                    modalError.style.display = "block";
                }
                else {
                    cargarDatosPrimeroCrear();
                    if(flag=="nuevo")
                        $('#analista').append(data);
                    else
                        $("body #cuerpoModificar").append(data);
                }

            }
        });
}
function crearUsuario(flag) {
    var persona={};
    if(flag=="nuevo")
     persona = {
        nombre:  $("body #nombre").val(),
        rut: $("body #rut").val(),
        email: $("body #mail").val(),
        telefono: $("body #telefono").val(),
        idComuna:$('body #comuna').val(),
        idDepartamento: $('#departamento').val(),
        password: $("body #password").val(),
        idPerfil: $('#perfiles').val(),
        direccion: $("body #direccion").val(),
        activo : 'T'
    };
    else {
        if($("body #activo").prop('checked'))
            var activo="T";
        else
            var activo="F";
        persona = {
            nombre:  $("body #nombre").val(),
            rut: $("body #rut").val(),
            email: $("body #mail").val(),
            telefono: $("body #telefono").val(),
            idComuna:$('body #comuna').val(),
            idDepartamento: $('#departamento').val(),
            password: $("body #password").val(),
            idPerfil: $('#perfiles').val(),
            direccion: $("body #direccion").val(),
            activo: activo
        };
    }
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
                            $('#errorModal').text(" El usuario que intenta crear ya existe ");
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
$("body").on('click','#modif',function () {
    var rutM = $("#rutM").val();
    if(rutM!=null && rutM!="") {
        var comuna=[];
        $.ajax({
            url: "/analista/acceso/usuario/login/usuario/modificar/buscar/",
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
                    $.ajax({
                        url : "/analista/negocio/obtener/comunas/",
                        type : "POST",
                        error : function () {
                            $("#errorModal").text("Se produjo un error al cargar las comunas, favor inténtelo más tarde");
                            modalError.style.display="block";
                        },
                        success : function (com) {
                            if (com=="Error" || com=="" || com==null || com=="null")
                            {
                                $("#errorModal").text("Se produjo un error al cargar las comunas, favor inténtelo más tarde");
                                modalError.style.display="block";
                            }
                            else
                            {
                                comuna= $.parseJSON(com);
                                var selectHTML = '';
                                $.each(comuna, function (i, item) {
                                    if(item.provincia.region.idRegion==reg)
                                        if(persona.comuna.idComuna==item.idComuna)
                                            selectHTML += '<option value="' + item.idComuna + '" selected="true">' + item.nombre + '</option>';
                                        else
                                            selectHTML += '<option value="' + item.idComuna + '">' + item.nombre + '</option>';
                                });
                                $('body #comuna').append(selectHTML);
                            }
                        }
                    });
                    procesando.style.display = "none";
                    $("#cuerpoModificar").removeClass('hidden');
                    $("#legend").addClass('hidden');
                    $("#passwordConf").addClass('hidden');
                    $("body #activoMod").removeClass('hidden');
                    $("body #rut").attr('readonly', true);
                    $("body #password").attr('type', "text");
                    $("body #crear").attr('id', 'btnModificar');
                    $("body #rut").val(persona.rut);
                    $("body #nombre").val(persona.nombre);
                    $("body #direccion").val(persona.direccion);
                    $("body #password").val(persona.password);
                    $("body #telefono").val(persona.telefono);
                    $("body #mail").val(persona.email);
                    $('#departamento').val(persona.departamento.idDepartamento);
                    var reg=persona.comuna.provincia.region.idRegion;
                    $('#regiones').val(reg);
                    $('#comuna').val(persona.comuna.idComuna);
                    $('#perfiles').val(persona.perfil.idPerfil);
                    $("#chec").empty(ch);
                    if(persona.activo=="F") {
                        var ch='<label class="custom-control custom-checkbox form-control"><input type="checkbox" class="custom-control-input hidden" id="activo"/><span class="custom-control-indicator"></span></label>';
                    }
                    else
                    {
                        var ch='<label class="custom-control custom-checkbox form-control"><input type="checkbox" class="custom-control-input hidden " id="activo" checked="checked"/><span class="custom-control-indicator"></span></label>';
                    }
                    $("#chec").append(ch);
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
function mostrarTab(tab) {
    if(tab==0)
    {
        $.ajax({
            url : "/analista/negocio/obtener/usuarios/",
            type : "POST",
            error : function () {

            },
            success : function (data) {
                procesando.style.display="none";
                var response = $.parseJSON(data);
            },
            beforeSend : function () {
                procesando.style.display="block";
            }
        });
    }
    else
    {
        if(tab==1)
        {
            $.ajax({
                url : "/analista/negocio/obtener/gruas/",
                type : "POST",
                error : function () {

                },
                success : function (data) {
                    procesando.style.display="none";
                    var response = $.parseJSON(data);

                },
                beforeSend : function () {
                    procesando.style.display="block";
                }
            });
        }
        else
        {
            $.ajax({
                url : "/analista/negocio/obtener/talleres/",
                type : "POST",
                error : function () {

                },
                success : function (data) {
                    procesando.style.display="none";
                    var response = $.parseJSON(data);

                },
                beforeSend : function () {
                    procesando.style.display="block";
                }
            });
        }
    }
}

