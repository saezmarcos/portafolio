/**
 * Created by Usuario on 28-05-2017.
 */
var modalError=document.getElementById("myModalError");
var modalReingreso=document.getElementById("myModalRechazoTaller");
var modalPresupuesto=document.getElementById("myModalPresupuesto");
var modalPresupuesto1=document.getElementById("myModalPresupuesto1");
var procesando=document.getElementById("processing-modal");
var modalTaller=document.getElementById("myModalTaller");
var modalChofer=document.getElementById("myModalChofer");
var modalFinalModif= document.getElementById("myModalAprobacion");
var modalFinalGrua= document.getElementById("myModalFinalGrua");
var modalFinalTaller= document.getElementById("myModalFinalTaller");
var modalRechazo=document.getElementById("myModalRechazado");
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
    $('body #listPres').remove();
    $('body #listPresRechazado').remove();
    cargarListar();
});
$('body').on('click','#listadoPresupuestos',function () {
    $('body #listPres').remove();
    $('body #listadoUsuario').remove();
    $('body #creaGrua').remove();
    $('body #creaTaller').remove();
    $('body #asigLiquidador').remove();
    $('body #listPresRechazado').remove();
    cargarListarPres();
});
$('body').on('click','#listRechazos',function () {
    $('body #listPresRechazado').remove();
    $('body #listPres').remove();
    $('body #listadoUsuario').remove();
    $('body #creaGrua').remove();
    $('body #creaTaller').remove();
    $('body #asigLiquidador').remove();
    cargaPresupuestoRechazado();
});
$('body').on('click','#crearGrua',function () {
    $('body #creaGrua').remove();
    $('body #listadoUsuario').remove();
    $('body #creaTaller').remove();
    $('body #asigLiquidador').remove();
    $('body #listPres').remove();
    $('body #listPresRechazado').remove();
    cargarCrearGrua();

});
$('body').on('click','#crearTaller',function () {
    $('body #creaTaller').remove();
    $('body #creaGrua').remove();
    $('body #listadoUsuario').remove();
    $('body #asigLiquidador').remove();
    $('body #listPres').remove();
    $('body #listPresRechazado').remove();
    cargarCrearTaller();

});
$("body").on("click",'#asignar',function () {
    $('body #asigLiquidador').remove();
    $('body #listadoUsuario').remove();
    $('body #creaGrua').remove();
    $('body #creaTaller').remove();
    $('body #listPres').remove();
    $('body #listPresRechazado').remove();
    cargarListadoPresupuestos();
});
$("body").on('click','#closes',function () {

    $("body #asignar").click();
});
$("body").on('click','#closes1',function () {
    $("body #listadoPresupuestos").click();
    modalPresupuesto1.style.display="none";
});
$("body").on('click','#closes2',function () {

    $("body #listRechazos").click();
    modalReingreso.style.display="none";
});
$("body").on('click',"#close2",function () {
    location.reload();
    modalFinalModif.style.display="none";
   $("body #asignar").click();
});
$("body").on('click',"#close3",function () {
    location.reload();
    modalRechazo.style.display="none";
    $("body #asignar").click();
});
$("body").on('click',"#close1", function () {
    modalFinal2.style.display="none";
    location.reload();
});
$("body").on('click',"#btnCerrar2",function () {
    modalFinal2.style.display="none";
    modalFinalModif.style.display="none";
    modalFinalGrua.style.display="none";
    modalFinalTaller.style.display="none";
    location.reload();

});
$("body").on('click',"#btnCerrar3",function () {
    modalFinalModif.style.display="none";
    location.reload();
    $("body #asignar").click();
});
$("body").on('click',"#btnCerrar1", function () {
    modalError.style.display = "none";
    modalTaller.style.display="none";
    modalError1.style.display="none";
    modalFinal.style.display="none";
    procesando.style.display="none";

});
$("body").on('click',"#btnRechazoFinal",function () {
    location.reload();
    modalRechazo.style.display="none";
    $("body #asignar").click();
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
    modalError1.style.display = "none";
    modalFinal2.style.display = "none";
    modalPresupuesto.style.display="none";
    modalReingreso.style.display="none";

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
function cargarListadoPresupuestos() {
    $.ajax({
        url : "/liquidador/usuario/cargar/presupuestos/",
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
            $.ajax({
                type : "POST",
                url :"/liquidador/cargar/presupuestos/",
                data : {rutLiquidador : $("body #rut").val()},
                success : function (data) {
                    var response = $.parseJSON(data);
                    $.each($("#table_recors tr"),function (i,item) {
                        if(i>0)
                            this.remove();
                    });
                    var tdHTML = "";
                    $.each(response,function (i,item) {
                        if (item.tipoEstado.idTipoEstado == 9)
                            tdHTML +='<tr><td>' + item.idSiniestro+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="gestionPresupuestoModal($(this).parent().parent());">Gestión Presupuesto</a></td></tr>';
                    });
                    $('body #table_recors').append(tdHTML);
                },
                error : function () {

                }
            });
        }
    });
}
function gestionPresupuestoModal(item) {
    $.ajax({
        url : "/liquidador/carga/creaPresupuesto/",
        type : "POST",
        error : function () {
        },
        success: function (data) {
            $("body #creaPresupuestos").empty();
            $("body #creaPresupuestos").append(data);
            $("body #btn").addClass('hidden');
            $("body #apruebaRechaza").removeClass('hidden');
            $.ajax({
                url : "/liquidador/obtener/historial",
                type : "POST",
                data : {idSiniestro : item.find('td:eq(0)').text()},
                error : function () {
                },
                success : function (data) {
                    var histo = $.parseJSON(data);
                    var idsHis=[];
                    var historial="";
                    $.each(histo,function (i, histor) {
                        if(histor.idTipoEstado==item.find('td:eq(11)').text())
                            idsHis.push(histor);
                    });
                    if (idsHis.length>1)
                    {
                        var mayor=idsHis[0];
                        $.each(idsHis,function (i, histor) {
                                if(histor.idHistorial>mayor.idHistorial)
                                    mayor=histor;
                        });
                        historial=mayor;
                    }
                    else
                        historial=idsHis[0];
                    $("#tipoReparacion").text(historial.descripcion);
                    var entrega = toDate(item.find('td:eq(7)').text());
                    $("#fechaEntregaM").val(fechaAdate(entrega));
                    $("#costo").val(historial.costo);
                    var hh=toDate(item.find('td:eq(6)').text());
                    var f1 = moment(entrega);
                    var f2 = moment(hh);
                    var da = f1.diff(f2,'days');
                    $("#tiempoAsociado").val(da);
                    $("#fechaEntregaM").attr('readonly',true);
                    $("#tipoReparacion").attr('readonly',true);
                    $("#costo").attr('readonly',true);
                    $("body #costo1").text(historial.costo);
                    $("body #fechaEntregaM1").text(fechaAdate(entrega));
                    $("body #tiempoAsociado1").text(da);
                    $("body #tipoReparacion1").text(historial.descripcion);
                    $("body #estado1").text(item.find('td:eq(8)').text());
                    $("body #liquidador1").text(item.find('td:eq(5)').text());
                    $("body #nombreTaller").text(item.find('td:eq(9)').text());
                    $("body #rutTaller").text(item.find('td:eq(10)').text());
                }
            });
            modalPresupuesto.style.display="block";
            $("body #btnAprobarPresupuesto").on('click',function () {
                modalPresupuesto.style.display="none";
                var fe=item.find('td:eq(6)').text();
                var estado = {
                    idEstado: item.find('td:eq(2)').text(),
                    idTipoEstado: 4,
                    costo : $("#costo").val(),
                    idSiniestro : item.find('td:eq(0)').text(),
                    rut : item.find('td:eq(3)').text(),
                    rutTaller : item.find('td:eq(1)').text(),
                    fechaIngreso : toDate(fe),
                    fechaEntrega : $("body #fechaEntregaM").val(),
                    numeroChasis : item.find('td:eq(4)').text()

                };
                var estadoParseado = JSON.stringify(estado);
                $.ajax({
                    url : "/liquidador/crear/estado/",
                    type : "POST",
                    data: {estado: estadoParseado},
                    beforeSend : function () {
                        procesando.style.display="block";
                    },
                    error : function () {
                        procesando.style.display="none";
                        modalPresupuesto.style.display="none";
                        $('#errorModal1').text("No se pudo Aprobar el Presupuesto, favor inténtelo más tarde");
                        modalError1.style.display = "block";
                    },
                    success : function (data) {
                        if(data=="201") {
                            var historia = {
                                idHistorial: " ",
                                numeroChasis: item.find('td:eq(4)').text(),
                                rutTaller: item.find('td:eq(1)').text(),
                                idSiniestro: item.find('td:eq(0)').text(),
                                costo: $("#costo").val(),
                                descripcion : $("#tipoReparacion").text(),
                                idTipoEstado: 4
                            };
                            var historialParse = JSON.stringify(historia);
                            $.ajax({
                                url : "/liquidador/crear/historialestado/",
                                type : "POST",
                                data: {historial: historialParse},
                                error : function () {
                                    modalPresupuesto.style.display="none";
                                    $('#errorModal1').text("No se pudo Aprobar presupuesto, favor inténtelo más tarde");
                                    modalError1.style.display = "block";
                                },
                                success : function (data) {
                                    if(data=="201") {

                                        procesando.style.display = "none";
                                        modalPresupuesto.style.display="none";
                                        $('#confirmacion').text("Se ha Aprobado Presupuesto");
                                        modalFinal2.style.display = "block";
                                    }else
                                    {
                                        modalPresupuesto.style.display="none";
                                        $('#errorModal1').text("No se pudo Aprobar presupuesto, favor inténtelo más tarde");
                                        modalError1.style.display = "block";
                                    }
                                }
                            });
                        }else
                        {
                            modalPresupuesto.style.display="none";
                            $('#errorModal1').text("No se pudo Aprobar presupuesto, favor inténtelo más tarde");
                            modalError1.style.display = "block";
                        }
                    }
                });
                $("body #confirmacionAprobar").text("Vehículo Ingresado al Taller, puede imprimir presupuesto");
                modalFinalModif.style.display="block";
            });
            $("body #btnRechazarPresupuesto").on('click',function () {
                modalPresupuesto.style.display="none";
                var fe=item.find('td:eq(6)').text();
                var estado = {
                    idEstado: item.find('td:eq(2)').text(),
                    idTipoEstado: 11,
                    costo : $("#costo").val(),
                    idSiniestro : item.find('td:eq(0)').text(),
                    rut : item.find('td:eq(3)').text(),
                    rutTaller : item.find('td:eq(1)').text(),
                    fechaIngreso : toDate(fe),
                    fechaEntrega : $("body #fechaEntregaM").val(),
                    numeroChasis : item.find('td:eq(4)').text()

                };
                var estadoParseado = JSON.stringify(estado);
                $.ajax({
                    url : "/liquidador/crear/estado/",
                    type : "POST",
                    data: {estado: estadoParseado},
                    beforeSend : function () {
                        procesando.style.display="block";
                    },
                    error : function () {
                        procesando.style.display="none";
                        modalPresupuesto.style.display="none";
                        $('#errorModal1').text("No se pudo Rechazar el Presupuesto, favor inténtelo más tarde");
                        modalError1.style.display = "block";
                    },
                    success : function (data) {
                        if(data=="201") {
                            var historia = {
                                idHistorial: " ",
                                numeroChasis: item.find('td:eq(4)').text(),
                                rutTaller: item.find('td:eq(1)').text(),
                                idSiniestro: item.find('td:eq(0)').text(),
                                costo: $("#costo").val(),
                                descripcion : $("#tipoReparacion").text(),
                                idTipoEstado: 11
                            };
                            var historialParse = JSON.stringify(historia);
                            $.ajax({
                                url : "/liquidador/crear/historialestado/",
                                type : "POST",
                                data: {historial: historialParse},
                                error : function () {
                                    modalPresupuesto.style.display="none";
                                    $('#errorModal1').text("No se pudo Rechazar presupuesto, favor inténtelo más tarde");
                                    modalError1.style.display = "block";
                                },
                                success : function (data) {
                                    if(data=="201") {
                                        procesando.style.display = "none";
                                        modalPresupuesto.style.display="none";
                                    }else
                                    {
                                        modalPresupuesto.style.display="none";
                                        $('#errorModal1').text("No se pudo Rechazar presupuesto, favor inténtelo más tarde");
                                        modalError1.style.display = "block";
                                    }
                                }
                            });
                        }else
                        {
                            modalPresupuesto.style.display="none";
                            $('#errorModal1').text("No se pudo Rechazar presupuesto, favor inténtelo más tarde");
                            modalError1.style.display = "block";
                        }
                    }
                });
                $("body #confirmacionRechazar").text("Presupuesto Rechazado, Favor Reasignar Taller a Siniestro");
                modalRechazo.style.display="block";
            });
            $("body #imprime").on('click',function () {
                $("body div#PrintArea").printArea();
            })
        }
    });
    $("body #btnAprobacionFinal").on('click',function () {
        $("body #estado1").text('EN REPARACION');
        $("body #imprime").click();
    });
}
function cargarListarPres() {
    $.ajax({
        url : "/liquidador/carga/listadoPresupuesto/",
        type : "POST",
        error : function () {
            procesando.style.display = "none";
            console.log(e.toString());
            $('#errorModal').text("En estos momentos no podemos atenderlo, favor inténtelo más tarde");
            modalError.style.display = "block";
        },
        beforeSend:function () {
            procesando.style.display="block";
        },
        success : function (data) {
            procesando.style.display="none";
            $('body #liquidador').append(data);
            $.ajax({
                type : "POST",
                url :"/liquidador/cargar/presupuestos/",
                data : {rutLiquidador : $("body #rut").val()},
                success : function (data) {
                    var response = $.parseJSON(data);
                    $.each($("#table_recors tr"),function (i,item) {
                        if(i>0)
                            this.remove();
                    });
                    var tdHTML = "";
                    $.each(response,function (i,item) {
                        if(item.tipoEstado.idTipoEstado != 10)
                            tdHTML +='<tr><td>' + item.idSiniestro+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="presupuestoModal($(this).parent().parent());">Ver/Imprimir</a></td></tr>';
                        else
                            tdHTML +='<tr class="danger"><td>' + item.idSiniestro+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="presupuestoModal($(this).parent().parent());">Ver/Imprimir</a></td></tr>';
                    });
                    $('body #table_recors').append(tdHTML);
                },
                error : function () {

                }
            });
        }
    });
}
function presupuestoModal(item) {
    $.ajax({
        url : "/liquidador/carga/creaPresupuesto/",
        type : "POST",
        error : function () {
        },
        success: function (data) {
            $("body #muestraPresupuestos").empty();
            $("body #muestraPresupuestos").append(data);
            $("body #btn").addClass('hidden');
            $.ajax({
                url : "/liquidador/obtener/historial",
                type : "POST",
                data : {idSiniestro : item.find('td:eq(0)').text()},
                error : function () {
                },
                success : function (data) {
                    var histo = $.parseJSON(data);
                    var idsHis=[];
                    var historial="";
                    $.each(histo,function (i, histor) {
                        if(histor.idTipoEstado == item.find('td:eq(11)').text())
                            idsHis.push(histor);
                    });
                    if (idsHis.length>1)
                    {
                        var mayor=idsHis[0];
                        $.each(idsHis,function (i, histor) {
                            if(histor.idHistorial > mayor.idHistorial) {
                                mayor = histor;
                            }
                        });
                        historial=mayor;
                    }
                    else
                        historial=idsHis[0];
                    $("#tipoReparacion").text(historial.descripcion);
                    var entrega = toDate(item.find('td:eq(7)').text());
                    $("#fechaEntregaM").val(fechaAdate(entrega));
                    $("#costo").val(historial.costo);
                    var hh=toDate(item.find('td:eq(6)').text());
                    var f1 = moment(entrega);
                    var f2 = moment(hh);
                    var da = f1.diff(f2,'days');
                    $("#tiempoAsociado").val(da);
                    $("#fechaEntregaM").attr('readonly',true);
                    $("#tipoReparacion").attr('readonly',true);
                    $("#costo").attr('readonly',true);
                    $("body #costo1").text(historial.costo);
                    $("body #fechaEntregaM1").text(fechaAdate(entrega));
                    $("body #tiempoAsociado1").text(da);
                    $("body #tipoReparacion1").text(historial.descripcion);
                    $("body #estado1").text(item.find('td:eq(8)').text());
                    $("body #liquidador1").text(item.find('td:eq(5)').text());
                    $("body #nombreTaller").text(item.find('td:eq(9)').text());
                    $("body #rutTaller").text(item.find('td:eq(10)').text());
                }
            });
            modalPresupuesto1.style.display="block";
            $("body #imprime1").on('click',function () {
                $("body div#PrintArea").printArea();
            })
        }
    });

}
function cargaPresupuestoRechazado() {
    $.ajax({
        url : "/liquidador/carga/listadoPresupuestoRechazado/",
        type : "POST",
        error : function () {
            procesando.style.display = "none";
            console.log(e.toString());
            $('#errorModal').text("En estos momentos no podemos atenderlo, favor inténtelo más tarde");
            modalError.style.display = "block";
        },
        beforeSend:function () {
            procesando.style.display="block";
        },
        success : function (data) {
            procesando.style.display="none";
            $('body #liquidador').append(data);
            $.ajax({
                type : "POST",
                url :"/liquidador/cargar/presupuestos/",
                data : {rutLiquidador : $("body #rut").val()},
                success : function (data) {
                    var response = $.parseJSON(data);
                    $.each($("#table_recors tr"),function (i,item) {
                        if(i>0)
                            this.remove();
                    });
                    var tdHTML = "";
                    $.each(response,function (i,item) {
                        if (item.tipoEstado.idTipoEstado == 11)
                            tdHTML +='<tr><td>' + item.idSiniestro+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.taller.comuna.provincia.region.idRegion+'</td><td><a href="#" onclick="reasignarTaller($(this).parent().parent());">Reasignar Taller/Rechazar Definitivo</a></td></tr>';
                    });
                    $('body #table_recors').append(tdHTML);
                },
                error : function () {

                }
            });
        }
    });
}
function reasignarTaller(item) {
    $.ajax({
        url : "/liquidador/negocio/parametros/pantalla/",
        type : "POST",
        error : function () {
        },
        beforeSend : function () {
            procesando.style.display="block";
        },
        success : function (data) {
            var response=$.parseJSON(data);
            $("body #talleres1").empty();
            var talleres = response.talleres;
            var gruas = response.gruas;
            var selectHTML = '<option value="">Seleccione un Taller</option>';
            $.each(talleres,function (i,taller) {
                if (taller.comuna.provincia.region.idRegion ==item.find('td:eq(11)').text())
                {
                    selectHTML += '<option value="' + taller.rutTaller + '">' + taller.nombre + '</option>';
                }
            });
            $("body #talleres1").append(selectHTML);
            var selectHTML = '<option value="">Seleccione una Grúa</option>';
            $.each(gruas,function (i,grua) {
                if (grua.comuna.provincia.region.idRegion  ==item.find('td:eq(11)').text()&& grua.enUso=="F")
                {
                    selectHTML += '<option value="' + grua.numeroChasis + '">' + grua.patente + '</option>';
                }
            });
            $("body #gruas1").empty();
            $("body #gruas1").append(selectHTML);
            procesando.style.display="none";
            modalReingreso.style.display="block";
            $("body #rech").on('change',function () {
                if($("body #rech").prop('checked')) {
                    $("body #divRechazo").removeClass('hidden');
                    $("body #esconder").addClass('hidden');
                    $("body #btnReasignarTaller").addClass('hidden');
                    $("body #btnRechazoDefinitivo").removeClass('hidden');
                    $("body #bodyGrua").addClass('hidden');
                }
                else {
                    $("body #divRechazo").addClass('hidden');
                    $("body #esconder").removeClass('hidden');
                    $("body #btnReasignarTaller").removeClass('hidden');
                    $("body #btnRechazoDefinitivo").addClass('hidden');
                    $("body #bodyGrua").addClass('hidden');
                }
            });
            $("body #activoG").on('change',function () {
                if($("body #activoG").prop('checked'))
                    $("body #bodyGrua").removeClass('hidden');
                else
                    $("body #bodyGrua").addClass('hidden');
            });
            $("body #btnRechazoDefinitivo").on('click',function () {
                if($("#tipoRechazofinal").val() == "")
                {
                    $("body #strong").text("Ingrese detalle del Rechazo");
                    $(".alert-danger").removeClass("hidden");
                    setTimeout(function() {
                        $(".alert-danger").fadeIn();
                    },0);
                    setTimeout(function() {
                        $(".alert-danger").fadeOut();
                    },3000);
                }
                else
                {
                    var fe=item.find('td:eq(6)').text();
                    var fo=item.find('td:eq(7)').text();
                    var estado = {
                        idEstado: item.find('td:eq(2)').text(),
                        idTipoEstado: 14,
                        costo : 0,
                        idSiniestro : item.find('td:eq(0)').text(),
                        rut : item.find('td:eq(3)').text(),
                        rutTaller : item.find('td:eq(1)').text(),
                        fechaIngreso : toDate(fe),
                        fechaEntrega : toDate(fo),
                        numeroChasis : item.find('td:eq(4)').text()

                    };
                    var estadoParseado = JSON.stringify(estado);

                    $.ajax({
                        url : "/liquidador/crear/estado/",
                        type : "POST",
                        data: {estado: estadoParseado},
                        error : function () {
                            modalReingreso.style.display="none";
                            $('#errorModal1').text("No se pudo finalizar siniestro, favor inténtelo más tarde");
                            modalError1.style.display = "block";
                        },
                        success : function (data) {
                            if(data=="201") {
                                var historia = {
                                    idHistorial: " ",
                                    numeroChasis: item.find('td:eq(4)').text(),
                                    rutTaller: item.find('td:eq(1)').text(),
                                    idSiniestro: item.find('td:eq(0)').text(),
                                    costo: 0,
                                    descripcion :$("body #tipoRechazofinal").val() ,
                                    idTipoEstado: 14
                                };
                                var historialParse = JSON.stringify(historia);
                                $.ajax({
                                    url : "/liquidador/crear/historialestado/",
                                    type : "POST",
                                    data: {historial: historialParse},
                                    error : function () {
                                        modalReingreso.style.display="none";
                                        $('#errorModal1').text("No se pudo Finalizar siniestro, favor inténtelo más tarde");
                                        modalError1.style.display = "block";
                                    },
                                    success : function (data) {
                                        if(data=="201") {
                                            procesando.style.display = "none";
                                            modalReingreso.style.display="none";
                                            $('#confirmacion').text("Se ha finalizado siniestro correctamente");
                                            modalFinal2.style.display = "block";
                                        }else
                                        {
                                            modalReingreso.style.display="none";
                                            $('#errorModal1').text("No se pudo finalizar siniestro, favor inténtelo más tarde");
                                            modalError1.style.display = "block";
                                        }
                                    }
                                });
                            }else
                            {
                                modalReingreso.style.display="none";
                                $('#errorModal1').text("No se pudo finalizar siniestro,, favor inténtelo más tarde");
                                modalError1.style.display = "block";
                            }
                        }
                    });
                }
            });
            $("body #btnReasignarTaller").on('click',function () {
                if($("body #talleres1").val()=="" )
                {
                    $(".alert-danger").removeClass("hidden");
                    setTimeout(function() {
                        $(".alert-danger").fadeIn();
                    },0);
                    setTimeout(function() {
                        $(".alert-danger").fadeOut();
                    },3000);
                }
                else
                    if($("body #activoG").prop('checked'))
                    {
                        if($("body #gruas1").val()=="" )
                        {
                            $(".alert-danger").removeClass("hidden");
                            setTimeout(function() {
                                $(".alert-danger").fadeIn();
                            },0);
                            setTimeout(function() {
                                $(".alert-danger").fadeOut();
                            },3000);
                        }
                        else
                        {
                            var gg="";
                            $.each(gruas,function (i,grua) {
                                if (grua.numeroChasis  == $("body #gruas1").val())
                                {
                                    gg=grua;
                                }
                            });
                            var gruanCambio={
                                    numeroChasis : gg.numeroChasis,
                                    idComuna : gg.comuna.idComuna,
                                    rutAseguradora : gg.aseguradora.rutAseguradora,
                                    enUso : "T",
                                    patente : gg.patente
                            };
                            $.ajax({
                                url:"/liquidador/usuario/modificar/grua/",
                                type : "POST",
                                data : {grua : JSON.stringify(gruanCambio)},
                                error : function () {
                                },
                                success:function (data) {
                                    if(data=="201")
                                    {
                                        var fe=item.find('td:eq(6)').text();
                                        var estado = {
                                            idEstado: item.find('td:eq(2)').text(),
                                            idTipoEstado: 2,
                                            costo : 0,
                                            idSiniestro : item.find('td:eq(0)').text(),
                                            rut : item.find('td:eq(3)').text(),
                                            rutTaller : item.find('td:eq(1)').text(),
                                            fechaIngreso : toDate(fe),
                                            fechaEntrega : toDate(fe),
                                            numeroChasis : item.find('td:eq(4)').text()

                                        };
                                        var estadoParseado = JSON.stringify(estado);

                                        $.ajax({
                                            url : "/liquidador/crear/estado/",
                                            type : "POST",
                                            data: {estado: estadoParseado},
                                            error : function () {
                                                modalReingreso.style.display="none";
                                                $('#errorModal1').text("No se pudo Reingresar Vehículo, favor inténtelo más tarde");
                                                modalError1.style.display = "block";
                                            },
                                            success : function (data) {
                                                if(data=="201") {
                                                    var historia = {
                                                        idHistorial: " ",
                                                        numeroChasis: item.find('td:eq(4)').text(),
                                                        rutTaller: item.find('td:eq(1)').text(),
                                                        idSiniestro: item.find('td:eq(0)').text(),
                                                        costo: 0,
                                                        descripcion : " ",
                                                        idTipoEstado: 2
                                                    };
                                                    var historialParse = JSON.stringify(historia);
                                                    $.ajax({
                                                        url : "/liquidador/crear/historialestado/",
                                                        type : "POST",
                                                        data: {historial: historialParse},
                                                        error : function () {
                                                            modalReingreso.style.display="none";
                                                            $('#errorModal1').text("No se pudo Reingresar Vehículo, favor inténtelo más tarde");
                                                            modalError1.style.display = "block";
                                                        },
                                                        success : function (data) {
                                                            if(data=="201") {
                                                                procesando.style.display = "none";
                                                                modalReingreso.style.display="none";
                                                                $('#confirmacion').text("Se ha Reingresado correctamente el Vehículo");
                                                                modalFinal2.style.display = "block";
                                                            }else
                                                            {
                                                                modalReingreso.style.display="none";
                                                                $('#errorModal1').text("No se pudo Reingresar Vehículo, favor inténtelo más tarde");
                                                                modalError1.style.display = "block";
                                                            }
                                                        }
                                                    });
                                                }else
                                                {
                                                    modalReingreso.style.display="none";
                                                    $('#errorModal1').text("No se pudo Reingresar Vehículo, favor inténtelo más tarde");
                                                    modalError1.style.display = "block";
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                    else
                    {
                        var fe=item.find('td:eq(6)').text();
                        var estado = {
                            idEstado: item.find('td:eq(2)').text(),
                            idTipoEstado: 6,
                            costo : 0,
                            idSiniestro : item.find('td:eq(0)').text(),
                            rut : item.find('td:eq(3)').text(),
                            rutTaller : item.find('td:eq(1)').text(),
                            fechaIngreso : toDate(fe),
                            fechaEntrega : toDate(fe),
                            numeroChasis : item.find('td:eq(4)').text()

                        };
                        var estadoParseado = JSON.stringify(estado);

                        $.ajax({
                            url : "/liquidador/crear/estado/",
                            type : "POST",
                            data: {estado: estadoParseado},
                            error : function () {
                                modalReingreso.style.display="none";
                                $('#errorModal1').text("No se pudo Reingresar Vehículo, favor inténtelo más tarde");
                                modalError1.style.display = "block";
                            },
                            success : function (data) {
                                if(data=="201") {
                                    var historia = {
                                        idHistorial: " ",
                                        numeroChasis: item.find('td:eq(4)').text(),
                                        rutTaller: item.find('td:eq(1)').text(),
                                        idSiniestro: item.find('td:eq(0)').text(),
                                        costo: 0,
                                        descripcion : " ",
                                        idTipoEstado: 6
                                    };
                                    var historialParse = JSON.stringify(historia);
                                    $.ajax({
                                        url : "/liquidador/crear/historialestado/",
                                        type : "POST",
                                        data: {historial: historialParse},
                                        error : function () {
                                            modalReingreso.style.display="none";
                                            $('#errorModal1').text("No se pudo Reingresar Vehículo, favor inténtelo más tarde");
                                            modalError1.style.display = "block";
                                        },
                                        success : function (data) {
                                            if(data=="201") {
                                                procesando.style.display = "none";
                                                modalReingreso.style.display="none";
                                                $('#confirmacion').text("Se ha Reingresado correctamente el Vehículo");
                                                modalFinal2.style.display = "block";
                                            }else
                                            {
                                                modalReingreso.style.display="none";
                                                $('#errorModal1').text("No se pudo Reingresar Vehículo, favor inténtelo más tarde");
                                                modalError1.style.display = "block";
                                            }
                                        }
                                    });
                                }else
                                {
                                    modalReingreso.style.display="none";
                                    $('#errorModal1').text("No se pudo Reingresar Vehículo, favor inténtelo más tarde");
                                    modalError1.style.display = "block";
                                }
                            }
                        });
                    }
            });
        }
    });
}
function toDate(selector) {
    var fechaSinGuion =selector.split("-");
    return new Date(fechaSinGuion[2], fechaSinGuion[1] - 1, fechaSinGuion[0]);
}
function hoy(flag) {
    var d1 = new Date();
    var y1= d1.getFullYear();
    var m1 = d1.getMonth()+1;
    if(m1<10)
        m1="0"+m1;
    var dt1 = d1.getDate();
    if (flag)
        dt1 = dt1 +1;
    if(dt1<10)
        dt1 = "0"+dt1;
    var d2 = y1+"-"+m1+"-"+dt1;
    return d2;
}
function fechaAdate(fecha) {
    var d1 = new Date(fecha);
    var y1= d1.getFullYear();
    var m1 = d1.getMonth()+1;
    if(m1<10)
        m1="0"+m1;
    var dt1 = d1.getDate();
    if(dt1<10)
        dt1 = "0"+dt1;
    var d2 = y1+"-"+m1+"-"+dt1;
    return d2;
}
