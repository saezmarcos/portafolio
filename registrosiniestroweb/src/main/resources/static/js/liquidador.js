/**
 * Created by Usuario on 28-05-2017.
 */
var modalError=document.getElementById("myModalError");
var procesando=document.getElementById("processing-modal");
var modalTaller=document.getElementById("myModalTaller");
var modalChofer=document.getElementById("myModalChofer");
var modalFinalModif= document.getElementById("myModalFinalModif");
var modalFinalGrua= document.getElementById("myModalFinalGrua");
var modalFinalTaller= document.getElementById("myModalFinalTaller");
var response;
var modalError1=document.getElementById("myModalError1");
var modalFinal=document.getElementById("myModalFinal");
var modalFinal2=document.getElementById("myModalFinal2");
cargaNavbar();
function cargarListar() {
    $.ajax({
        url : "/liquidador/usuario/cargar/listar/",
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

            $('#liquidador').append(data);
            $('body .lisUsr').addClass("hidden");
            $('body #tab_usuarios').addClass('hidden');
            $('body .lisLiq').click();
        }

    });
}
$('body').on('click','#listUsr',function () {
    $('body #listadoUsuario').remove();
    $('body #creaGrua').remove();
    $('body #creaTaller').remove();
    $('body #asigLiquidador').remove();
    cargarListar();
});
$('body').on('click','#crearGrua',function () {
    $('body #creaGrua').remove();
    $('body #listadoUsuario').remove();
    $('body #creaTaller').remove();
    $('body #asigLiquidador').remove();
    cargarCrearGrua();

});
$('body').on('click','#crearTaller',function () {
    $('body #creaTaller').remove();
    $('body #creaGrua').remove();
    $('body #listadoUsuario').remove();
    $('body #asigLiquidador').remove();
    cargarCrearTaller();

});
$("body").on("click",'#asignar',function () {
    $('body #asigLiquidador').remove();
    $('body #listadoUsuario').remove();
    $('body #creaGrua').remove();
    $('body #creaTaller').remove();
    cargarAsignar();
});
$("body").on('click',"#close1", function () {
    modalFinal2.style.display="none";
});
$("body").on('click',"#btnCerrar2",function () {
    modalFinal2.style.display="none";
    modalFinalModif.style.display="none";
    modalFinalGrua.style.display="none";
    modalFinalTaller.style.display="none";
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
    modalFinalGrua.style.display="none";
    modalFinalTaller.style.display="none";
});
$(document).ready(function () {
    $("body").on("change", function () {
        modalError1 = document.getElementById("myModalError1");
        modalFinal = document.getElementById("myModalFinal");
        modalFinal2 = document.getElementById("myModalFinal2");
    });
});
$("body").on("click","#btnGuardaGrua",function () {
    modalFinalGrua.style.display="none";
    if($("body #activoG").prop('checked'))
        var enUso="T";
    else
        var enUso="F";
    var grua = {
        numeroChasis : $("body #numeroChasis").val(),
        idComuna : $("body #comuna").val(),
        rutAseguradora : $("body #rutAseguradora").text(),
        enUso : enUso,
        patente : $("body #patente").val()
    };
    var gruaJson= JSON.stringify(grua);
    $.ajax({
        url : "/liquidador/usuario/crear/grua/",
        type : "POST",
        data : {grua : gruaJson},
        error : function () {

        },
        beforeSend : function () {
            procesando.style.display="block";
        },
        success : function (data) {
            procesando.style.display="none";
            if(data=="existe")
            {
                $("body #errorModal").text("La Grúa ya Existe");
                modalError.style.display = "block";
            }
            else
            {
                if(data=="201") {
                    $('#confirmacion').text("Se ha guardado correctamente la grúa");
                    Limpiar();
                    modalFinal2.style.display = "block";
                }
                else
                {
                    $("body #errorModal").text("Ocurrio un problema al guardar, favor inténtelo más tarde");
                    modalError.style.display = "block";
                }
            }

        }
    });
});
$("body").on("click","#btnGuardaTaller",function () {
    modalFinalTaller.style.display="none";
    var taller={
        rutTaller : $("body #rutTaller").val(),
        idComuna : $("body #comuna").val(),
        nombre : $("body #nombreTaller").val(),
        telefono : $("body #telefonoTaller").val(),
        direccion : $("body #direccionTaller").val(),
        rutAseguradora : $("body #rutAseguradora").text(),
        correo : $("body #correoTaller").val()
    };
    var tallerJson=JSON.stringify(taller);
    $.ajax({
        url : "/liquidador/usuario/crear/taller/",
        type : "POST",
        data : {taller : tallerJson},
        error : function () {

        },
        beforeSend : function () {
            procesando.style.display="block";
        },
        success : function (data) {
            procesando.style.display="none";
            if(data=="existe")
            {
                $("body #errorModal").text("El Taller ya Existe");
                modalError.style.display = "block";
            }
            else
            {
                if(data=="201") {
                    $('#confirmacion').text("Se ha guardado correctamente el taller");
                    Limpiar();
                    modalFinal2.style.display = "block";
                }
                else
                {
                    $("body #errorModal").text("Ocurrio un problema al guardar, favor inténtelo más tarde");
                    modalError.style.display = "block";
                }
            }

        }
    });

});
$("body").on("click","#btnCrearTaller",function () {
    if($("body #rutTaller").val()=="" || $("body #regiones").val()=="-1" || $("body #nombreTaller").val()=="" || $("body #direccionTaller").val()=="" || $("body #correoTaller").val()=="" || $("body #telefonoTaller").val()=="" ) {
        $("body #errorModal").text("Debe completar todos los campos");
        modalError.style.display = "block";
    }
    else
    {
        $("body #confirmacionTaller").text("¿Seguro Confirma creación de Taller?");
        modalFinalTaller.style.display="block";
    }
});
$("body").on("click","#btnCrearGrua",function () {
    if($("body #numeroChasis").val()=="" || $("body #regiones").val()=="-1" || $("body #patente").val()=="") {
        $("body #errorModal").text("Debe completar todos los campos");
        modalError.style.display = "block";
    }
    else
    {
        $("body #confirmacionGrua").text("¿Seguro Confirma creación de Grúa?");
        modalFinalGrua.style.display="block";
    }
});
function cargarCrearGrua() {
    $.ajax({
        type : "POST",
        url :"/liquidador/usuario/cargar/crear/grua/",
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
                procesando.style.display="none";
                $("#liquidador").append(data);
                $.ajax({
                    url : "/liquidador/negocio/obtener/regiones/",
                    type : "POST",
                    error : function () {

                    },
                    success : function (data) {
                        var regiones=$.parseJSON(data);
                        var selectHTML = '';
                        $.each(regiones, function (i, item) {
                            selectHTML += '<option value="' + item.idRegion + '">' + item.nombre + '</option>';
                        });
                        $('#regiones').append(selectHTML);
                    }
                });
            }
        }
    });
}
function cargarCrearTaller() {
    $.ajax({
        type: "POST",
        url: "/liquidador/usuario/cargar/crear/taller/",
        error: function (e) {
            procesando.style.display = "none";
            console.log(e.toString());
            $('#errorModal').text("En estos momentos no podemos atenderlo, favor inténtelo más tarde");
            modalError.style.display = "block";
        },
        beforeSend: function () {
            procesando.style.display = "block";
        },
        success: function (data) {
            if (data == "Error" || data == null || data == "null") {
                procesando.style.display = "none";
                $('#errorModal').text("Ocurrio un problema al intentar generar la página, favor inténtelo más tarde");
                modalError.style.display = "block";
            }
            else {
                procesando.style.display = "none";
                $("#liquidador").append(data);
                $.ajax({
                    url: "/liquidador/negocio/obtener/regiones/",
                    type: "POST",
                    error: function () {

                    },
                    success: function (data) {
                        var regiones = $.parseJSON(data);
                        var selectHTML = '';
                        $.each(regiones, function (i, item) {
                            selectHTML += '<option value="' + item.idRegion + '">' + item.nombre + '</option>';
                        });
                        $('#regiones').append(selectHTML);
                    }
                });
            }
        }
    });
}
$("body").on('change',"#regiones",function () {
    if($("#regiones").val()!="-1") {
        var comuna = [];
        $('#comuna').empty();
        $.ajax({
            url: "/liquidador/negocio/obtener/comunas/",
            type: "POST",
            error: function () {
                $("#errorModal").text("Se produjo un error al cargar las comunas, favor inténtelo más tarde");
                modalError.style.display = "block";
            },
            success: function (data) {
                if (data == "Error" || data == "" || data == null || data == "null") {
                    $("#errorModal").text("Se produjo un error al cargar las comunas, favor inténtelo más tarde");
                    modalError.style.display = "block";
                }
                else {
                    comuna = $.parseJSON(data);
                    var selectHTML = '';
                    $.each(comuna, function (i, item) {
                        if (item.provincia.region.idRegion == $("body #regiones").val())
                            selectHTML += '<option value="' + item.idComuna + '">' + item.nombre + '</option>';
                    });
                    $('#comuna').append(selectHTML);
                }
            }
        });
    }
    else
    {
        $('#comuna').empty();
        $('#comuna').append('<option value="-1">Seleccione una comuna</option>');
    }

});
function cargaNavbar() {
    $.ajax({
        type: "POST",
        url: "/liquidador/menuprincipal/carga/navbar/",
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
function Limpiar() {
    $("#nombre").val("");
    $("#rut").val("");
    $("#direccion").val("");
    $("#mail").val("");
    $("#telefono").val("");
    $("#regiones").val("-1");
    $('#comuna').empty();
    $('#comuna').append('<option value="-1">Seleccione una comuna</option>');
    $("#password").val("");
    $("#cfpassword").val("");
    $("#idDepartamento").val("");
    $("#departamento").val("Departamento según perfil");
    $("#perfiles").val("-1");
    $("#numeroChasis").val("");
    $("#patente").val("");
    $("body #rutTaller").val("");
    $("body #comuna").val("");
    $("body #nombreTaller").val("");
    $("body #telefonoTaller").val("");
    $("body #direccionTaller").val("");
    $("body #correoTaller").val("");
}
function mostrarTab(tab) {
    if(tab==1)
    {
        $.ajax({
            url : "/liquidador/negocio/obtener/gruas/",
            type : "POST",
            error : function () {

            },
            success : function (data) {
                procesando.style.display="none";
                var response = $.parseJSON(data);
                $.each($("#table_gruas tr"),function (i,item) {
                    if(i>0)
                        this.remove();
                });
                var selectHTML = '';
                $.each(response, function (i, item) {
                    if(item.enUso=="T") {
                        selectHTML += '<tr><td>' + item.numeroChasis+'</td><td>' + item.patente+'</td><td>' + item.comuna.nombre+'</td><td>' + item.aseguradora.razonSocial+'</td><td align="center" style="background-color: darkred"><i class="glyphicon glyphicon-remove" style="color: white"></i></td></tr>';
                    }
                    else
                        selectHTML += '<tr><td>' + item.numeroChasis+'</td><td>' + item.patente+'</td><td>' + item.comuna.nombre+'</td><td>' + item.aseguradora.razonSocial+'</td><td align="center" style="background-color: darkgreen"><i class="glyphicon glyphicon-ok" style="color: white"></i></td></tr>';
                });
                $('#table_gruas').append(selectHTML);
            },
            beforeSend : function () {
                procesando.style.display="block";
            }
        });
    }
    else
    {
        $.ajax({
            url : "/liquidador/negocio/obtener/talleres/",
            type : "POST",
            error : function () {

            },
            success : function (data) {
                $.each($("#table_taller tr"),function (i,item) {
                    if(i>0)
                        this.remove();
                });
                procesando.style.display="none";
                var response = $.parseJSON(data);
                var selectHTML = '';
                $.each(response, function (i, item) {
                    selectHTML += '<tr><td>' + item.rutTaller+'</td><td>' + item.nombre+'</td><td>' + item.direccion +'</td><td>' + item.comuna.nombre+'</td><td>' + item.telefono +'</td><td>' + item.correo+'</td><td>' + item.aseguradora.razonSocial +'</td></tr>';
                });
                $('#table_taller').append(selectHTML);
            },
            beforeSend : function () {
                procesando.style.display="block";
            }
        });
    }

}
function cargarAsignar() {
    $.ajax({
        url : "/liquidador/usuario/cargar/asignar/",
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

            $('#liquidador').append(data);
        }
    });
}

