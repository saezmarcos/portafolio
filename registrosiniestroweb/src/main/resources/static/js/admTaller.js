/**
 * Created by Usuario on 30-05-2017.
 */

$(document).ready(function () {
    $('body #acciones').click();
});
var modalError=document.getElementById("myModalError");
var procesando=document.getElementById("processing-modal");
var modalPresupuesto=document.getElementById("myModalPresupuesto");
var modalRecepcion=document.getElementById("myModalRecepcion");
var modalPresupuesto1=document.getElementById("myModalPresupuesto1");
var modalPago=document.getElementById("myModalPago");
var response;
var modalError1=document.getElementById("myModalError1");
var modalFinal2=document.getElementById("myModalFinal2");
var modalCierreFinal = document.getElementById("myModalCierre");
cargaNavbar();
$("body").on('click','#closes',function () {
    $("body #presupuesto").click();
});
$('body').on('click','#listSiniestro',function () {
    $('body #recepcion').remove();
    $('body #listPresAdm').remove();
    $('body #pagoSini').remove();
    cargarSiniestros();
});
$('body').on('click','#presupuesto',function () {
    $('body #recepcion').remove();
    $('body #listPresAdm').remove();
    $('body #pagoSini').remove();
    cargarPresupuesto();
});
$('body').on('click','#finalizar',function () {
    $('body #listPresAdm').remove();
    $('body #recepcion').remove();
    $('body #pagoSini').remove();
    cargarListarPres();
});
$('body').on('click','#pagoSiniestro',function () {
    $('body #pagoSini').remove();
    $('body #recepcion').remove();
    $('body #listPresAdm').remove();
    cargarPagoSiniestros();
});
$("body").on("click", "#close1", function () {
    location.reload();
   $("body #listSiniestro").click();
});
$("body").on("click", ".close", function () {

    modalRecepcion.style.display="none";
    modalError1.style.display = "none";
    modalFinal2.style.display = "none";
    modalPresupuesto.style.display="none";
});
$("body").on('click','#closes1',function () {
    $("body #finalizar").click();
    modalPresupuesto1.style.display="none";
});
$("body").on('click','#closes3',function () {
    $("body #finalizar").click();
    modalCierreFinal.style.display="none";
});
$("body").on('click','#closes4',function () {
    $("body #pagoSiniestro").click();
    modalPago.style.display="none";
});
$("body").on("click","#btnCerrar1", function () {
    modalError1.style.display = "none";
});
$("body").on("click","#btnCerrar2", function () {
    location.reload();
    modalFinal2.style.display = "none";
    $("body #listSiniestro").click();

});
function cargaNavbar() {
    $.ajax({
        type: "POST",
        url: "/administradortaller/menuprincipal/carga/navbar/",
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
function cargarSiniestros() {
    $.ajax({
        url : "/administradortaller/cargar/recepcion/",
        type : "POST",
        error : function () {
        },
        success : function (data) {
            $("body #administradorTaller").append(data);
            $.ajax({
                url : "/administradortaller/buscar/siniestros/",
                type : "POST",
                data : {rut : $("body #rut").val()},
                error : function () {

                },
                success : function (data) {
                    procesando.style.display="none";
                    var response=$.parseJSON(data);

                    $.each($("#table_recors tr"),function (i,item) {
                        if(i>0)
                            this.remove();
                    });
                    var tdHTML = "";
                    $.each(response,function (i,item) {
                        if (item.tipoEstado.idTipoEstado == 1 || item.tipoEstado.idTipoEstado==8)
                            tdHTML +='<tr><td><a href="#" onclick="cargarPoliza($(this).parent().parent());">' + item.idSiniestro+'</a></td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td>' + item.tipoEstado.descripcion+'</td><td><a href="#" onclick="cargaActa($(this).parent().parent());">Generar Acta de Recepción</a></td></tr>';
                    });
                    $('body #table_recors').append(tdHTML);

                },
                beforeSend : function () {
                    procesando.style.display="block";
                }
            });
        }
    });
}
function cargaActa(item) {
    $.ajax({
        url : "/administradorTaller/carga/creaRecepcion/",
        type : "POST",
        error : function () {

        },
        success : function (data) {
            $("#creaRecepcion").empty();
            $("#creaRecepcion").append(data);

            $("#fechaIngresoM").val(hoy(false));
            var idSiniestro= item.find('td:eq(0)').text();
            $.ajax({
                url : "/administradorTaller/obtener/siniestro/",
                type : "POST",
                data : {id_siniestro : idSiniestro},
                success : function (data) {
                    modalRecepcion.style.display="block";
                    var resp= $.parseJSON(data);
                    $("body #marcaVehiculo").val(resp.vehiculo.modelo.marca.descripcion);
                    $("body #modeloVehiulo").val(resp.vehiculo.modelo.descripcion);
                    $("body ").on('click', "#btnCrearRecepcion",function () {
                        var nombreRecep = $("body #nombreRecepcionista").val();
                        var nombreChofer = $("body #nombreConductor").val();
                        var telefono = $("body #telefonoRecepcion").val();
                        if (nombreChofer=="" || nombreRecep=="" || telefono=="") {
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
                            var estadoCrear={
                                id : " ",
                                nombreConductor : nombreChofer,
                                telefonoConductor : telefono,
                                nombreRecepcionista : nombreRecep,
                                modelo : $("body #modeloVehiulo").val(),
                                marca : $("body #marcaVehiculo").val(),
                                idSiniestro : idSiniestro,
                                fechaIngreso : $("#fechaIngresoM").val(),
                                rutTaller : item.find('td:eq(1)').text()
                            };
                            jsonEstado=JSON.stringify(estadoCrear);
                            $.ajax({
                                url : "/administradorTaller/crear/recepcion",
                                type : "POST",
                                data : {recepcion : jsonEstado},
                                success : function (data) {
                                    procesando.style.display="none";
                                    if (data=="201")
                                    {
                                        var fe=item.find('td:eq(6)').text();
                                        var estado = {
                                            idEstado: item.find('td:eq(2)').text(),
                                            idTipoEstado: 3,
                                            costo : 0,
                                            idSiniestro : idSiniestro,
                                            rut : item.find('td:eq(3)').text(),
                                            rutTaller : item.find('td:eq(1)').text(),
                                            fechaIngreso : toDate(fe),
                                            fechaEntrega : toDate(fe),
                                            numeroChasis : item.find('td:eq(4)').text()

                                        };
                                        var estadoParseado = JSON.stringify(estado);

                                        $.ajax({
                                            url : "/administradorTaller/crear/estado/",
                                            type : "POST",
                                            data: {estado: estadoParseado},
                                            error : function () {
                                                modalRecepcion.style.display="none";
                                                $('#errorModal1').text("No se pudo crear el Acta Recepción, favor inténtelo más tarde");
                                                modalError1.style.display = "block";
                                            },
                                            success : function (data) {
                                                if(data=="201") {
                                                    var historia = {
                                                        idHistorial: " ",
                                                        numeroChasis: item.find('td:eq(4)').text(),
                                                        rutTaller: item.find('td:eq(1)').text(),
                                                        idSiniestro: idSiniestro,
                                                        costo: 0,
                                                        descripcion : " ",
                                                        idTipoEstado: 3
                                                    };
                                                    var historialParse = JSON.stringify(historia);
                                                    $.ajax({
                                                        url : "/administradorTaller/crear/historialestado/",
                                                        type : "POST",
                                                        data: {historial: historialParse},
                                                        error : function () {
                                                            modalRecepcion.style.display="none";
                                                            $('#errorModal1').text("No se pudo crear el Acta Recepción, favor inténtelo más tarde");
                                                            modalError1.style.display = "block";
                                                        },
                                                        success : function (data) {
                                                            if(data=="201") {
                                                                procesando.style.display = "none";
                                                                modalRecepcion.style.display="none";
                                                                $('#confirmacion').text("Se ha guardado correctamente el Acta Recepción");
                                                                modalFinal2.style.display = "block";
                                                            }else
                                                            {
                                                                modalRecepcion.style.display="none";
                                                                $('#errorModal1').text("No se pudo crear el Acta Recepción, favor inténtelo más tarde");
                                                                modalError1.style.display = "block";
                                                            }
                                                        }
                                                    });
                                                }else
                                                {
                                                    modalRecepcion.style.display="none";
                                                    $('#errorModal1').text("No se pudo crear el Acta Recepción, favor inténtelo más tarde");
                                                    modalError1.style.display = "block";
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        modalRecepcion.style.display="none";
                                        $('#errorModal1').text("No se pudo crear el Acta Recepción, favor inténtelo más tarde");
                                        modalError1.style.display = "block";
                                    }
                                },
                                error : function () {
                                    modalRecepcion.style.display="none";
                                    $('#errorModal1').text("No se pudo crear el Acta Recepción, favor inténtelo más tarde");
                                    modalError1.style.display = "block";
                                },
                                beforeSend : function () {
                                    procesando.style.display="block";

                                }
                            });
                        }
                    });
                },
                error : function () {
                }
            });
        }
    });
}
function cargarPresupuesto() {
    $.ajax({
        url : "/administradortaller/cargar/recepcion/",
        type : "POST",
        async : true,
        error : function () {
        },
        success : function (data) {
            $("body #administradorTaller").append(data);
            $.ajax({
                url : "/administradortaller/buscar/siniestros/",
                type : "POST",
                data : {rut : $("body #rut").val()},
                error : function () {
                },
                success : function (data) {
                    procesando.style.display="none";
                    var response=$.parseJSON(data);
                    $.each($("#table_recors tr"),function (i,item) {
                        if(i>0)
                            this.remove();
                    });
                    var tdHTML = "";
                    $.each(response,function (i,item) {
                        if (item.tipoEstado.idTipoEstado == 3 || item.tipoEstado.idTipoEstado == 6)
                            tdHTML +='<tr><td><a href="#" onclick="cargarPoliza($(this).parent().parent());">' + item.idSiniestro+'</a></td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td>' + item.tipoEstado.descripcion+'</td><td><a href="#" onclick="cargaPresupuestoModal($(this).parent().parent());">Generar Presupuesto</a></td></tr>';
                    });
                    $('body #table_recors').append(tdHTML);

                },
                beforeSend : function () {
                    procesando.style.display="block";
                }
            });
        }
    });
}
function cargaPresupuestoModal(item) {
    $.ajax({
        url : "/administradorTaller/carga/creaPresupuesto/",
        type : "POST",
        error : function () {
        },
        success : function (data) {
            $("body #creaPresupuestos").empty();
            $("body #creaPresupuestos").append(data);
            var hh=hoy(true);
            $("body #fechaEntregaM").attr("min", hh);
            $("body #fechaEntregaM").attr("max", sumarDias(hh,91));
            modalPresupuesto.style.display="block";
            $("body").on('click','#btnCrearPresupuesto',function () {
                $("body #strong").text('Debe llenar todos los campos');
                var costo = $("body #costo").val();
                var descripcion = $("body #tipoReparacion").val();
                if(!$("body #perdidaTotal").prop('checked'))
                {
                    if (costo == "" || descripcion == "" || $("body #fechaEntregaM").val() == "") {
                        $(".alert-danger").removeClass("hidden");
                        setTimeout(function () {
                            $(".alert-danger").fadeIn();
                        }, 0);
                        setTimeout(function () {
                            $(".alert-danger").fadeOut();
                        }, 3000);
                    }
                    else {
                        if ($("body #fechaEntregaM").val() < hh) {
                            $("#strong").text('Fecha entrega errada');
                            $(".alert-danger").removeClass("hidden");
                            setTimeout(function () {
                                $(".alert-danger").fadeIn();
                            }, 0);
                            setTimeout(function () {
                                $(".alert-danger").fadeOut();
                            }, 3000);
                        }
                        else {
                            var fe = item.find('td:eq(6)').text();
                            var estado = {
                                idEstado: item.find('td:eq(2)').text(),
                                idTipoEstado: 9,
                                costo: costo,
                                idSiniestro: item.find('td:eq(0)').text(),
                                rut: item.find('td:eq(3)').text(),
                                rutTaller: item.find('td:eq(1)').text(),
                                fechaIngreso: toDate(fe),
                                fechaEntrega: $("body #fechaEntregaM").val(),
                                numeroChasis: item.find('td:eq(4)').text()
                                };
                            var estadoParseado = JSON.stringify(estado);
                            $.ajax({
                                url: "/administradorTaller/crear/estado/",
                                type: "POST",
                                data: {estado: estadoParseado},
                                error: function () {
                                    modalPresupuesto.style.display = "none";
                                    $('#errorModal1').text("No se pudo crear el Presupuesto, favor inténtelo más tarde");
                                    modalError1.style.display = "block";
                                },
                                success: function (data) {
                                    if (data == "201") {
                                        var historia = {
                                            idHistorial: " ",
                                            numeroChasis: item.find('td:eq(4)').text(),
                                            rutTaller: item.find('td:eq(1)').text(),
                                            idSiniestro: item.find('td:eq(0)').text(),
                                            costo: costo,
                                            descripcion: descripcion,
                                            idTipoEstado: 9
                                        };
                                        var historialParse = JSON.stringify(historia);
                                        $.ajax({
                                            url: "/administradorTaller/crear/historialestado/",
                                            type: "POST",
                                            data: {historial: historialParse},
                                            error: function () {
                                                modalPresupuesto.style.display = "none";
                                                $('#errorModal1').text("No se pudo crear el Presupuesto, favor inténtelo más tarde");
                                                modalError1.style.display = "block";
                                            },
                                            success: function (data) {
                                                if (data == "201") {
                                                    procesando.style.display = "none";
                                                    modalPresupuesto.style.display = "none";
                                                    $('#confirmacion').text("Se ha guardado correctamente el Presupuesto");
                                                    modalFinal2.style.display = "block";
                                                } else {
                                                    modalPresupuesto.style.display = "none";
                                                    $('#errorModal1').text("No se pudo crear el Presupuesto, favor inténtelo más tarde");
                                                    modalError1.style.display = "block";
                                                }
                                            }
                                        });
                                    } else {
                                        modalPresupuesto.style.display = "none";
                                        $('#errorModal1').text("No se pudo crear el Presupuesto, favor inténtelo más tarde");
                                        modalError1.style.display = "block";
                                    }
                                }
                            });
                        }
                    }
                }
                else
                {
                    if(descripcion=="")
                    {
                        $("body #strong").text('Ingrese descripción de la pérdida');
                        $(".alert-danger").removeClass("hidden");
                        setTimeout(function () {
                            $(".alert-danger").fadeIn();
                        }, 0);
                        setTimeout(function () {
                            $(".alert-danger").fadeOut();
                        }, 3000);
                    }
                    else
                    {
                        var fe = item.find('td:eq(6)').text();
                        var estado = {
                            idEstado: item.find('td:eq(2)').text(),
                            idTipoEstado: 10,
                            costo: 0,
                            idSiniestro: item.find('td:eq(0)').text(),
                            rut: item.find('td:eq(3)').text(),
                            rutTaller: item.find('td:eq(1)').text(),
                            fechaIngreso: toDate(fe),
                            fechaEntrega: toDate(fe),
                            numeroChasis: item.find('td:eq(4)').text()

                        };
                        var estadoParseado = JSON.stringify(estado);
                        $.ajax({
                            url: "/administradorTaller/crear/estado/",
                            type: "POST",
                            data: {estado: estadoParseado},
                            error: function () {
                                modalPresupuesto.style.display = "none";
                                $('#errorModal1').text("No se pudo crear el Presupuesto, favor inténtelo más tarde");
                                modalError1.style.display = "block";
                            },
                            success: function (data) {
                                if (data == "201") {
                                    var historia = {
                                        idHistorial: " ",
                                        numeroChasis: item.find('td:eq(4)').text(),
                                        rutTaller: item.find('td:eq(1)').text(),
                                        idSiniestro: item.find('td:eq(0)').text(),
                                        costo: 0,
                                        descripcion: descripcion,
                                        idTipoEstado: 10
                                    };
                                    var historialParse = JSON.stringify(historia);
                                    $.ajax({
                                        url: "/administradorTaller/crear/historialestado/",
                                        type: "POST",
                                        data: {historial: historialParse},
                                        error: function () {
                                            modalPresupuesto.style.display = "none";
                                            $('#errorModal1').text("No se pudo guardar el Presupuesto, favor inténtelo más tarde");
                                            modalError1.style.display = "block";
                                        },
                                        success: function (data) {
                                            if (data == "201") {
                                                procesando.style.display = "none";
                                                modalPresupuesto.style.display = "none";
                                                $('#confirmacion').text("Se ha guardado correctamente el Presupuesto");
                                                modalFinal2.style.display = "block";
                                            } else {
                                                modalPresupuesto.style.display = "none";
                                                $('#errorModal1').text("No se pudo crear el Presupuesto, favor inténtelo más tarde");
                                                modalError1.style.display = "block";
                                            }
                                        }
                                    });
                                } else {
                                    modalPresupuesto.style.display = "none";
                                    $('#errorModal1').text("No se pudo crear el Presupuesto, favor inténtelo más tarde");
                                    modalError1.style.display = "block";
                                }
                            }
                        });

                    }
                }
            });
            $("body").on('change','#fechaEntregaM',function () {
                var entrega = $("#fechaEntregaM").val();
                var f1 = moment(entrega);
                var f2 = moment(hh);
                var da = f1.diff(f2,'days');
                da = da +1 ;
                if(da<0)
                {
                    $("#tiempoAsociado").val("");
                }
                else
                {
                    $("#tiempoAsociado").val(da);
                }

            });
            $("body").on('change','#perdidaTotal',function (){
                if($("body #perdidaTotal").prop('checked'))
                {
                    $("body #fechaEntregaM").attr('readonly',true);
                    $("body #costo").attr('readonly',true);
                    $("body #tipoReparacion").attr('placeholder','Descripción de  pérdida');
                }
                else
                {
                    $("body #fechaEntregaM").attr('readonly',false);
                    $("body #costo").attr('readonly',false);
                    $("body #tipoReparacion").attr('placeholder','Descripción de Reparaciones');
                }
            });
        }
    });  
}
function cargarListarPres() {
    $.ajax({
        url : "/administradortaller/carga/listadoPresupuesto/",
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
            $('body #administradorTaller').append(data);
            $.ajax({
                type : "POST",
                url :"/administradortaller/buscar/siniestros/",
                data : {rut : $("body #rut").val()},
                success : function (data) {
                    var response = $.parseJSON(data);
                    $.each($("#table_recors tr"),function (i,item) {
                        if(i>0)
                            this.remove();
                    });
                    var tdHTML = "";
                    $.each(response,function (i,item) {
                        if(item.tipoEstado.idTipoEstado !=4)
                            if (item.tipoEstado.idTipoEstado ==10)
                                tdHTML +='<tr class="danger"><td><a href="#" onclick="cargarPoliza($(this).parent().parent());">' + item.idSiniestro+'</a></td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="presupuestoModal($(this).parent().parent());">Ver/Imprimir</a></td><td><span">No se puede Gestionar</span></td></tr>';
                            else
                                if (item.tipoEstado.idTipoEstado ==7)
                                    tdHTML +='<tr class="active"><td><a href="#" onclick="cargarPoliza($(this).parent().parent());">' + item.idSiniestro+'</a></td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="presupuestoModal($(this).parent().parent());">Ver/Imprimir</a></td><td><span">No se puede Gestionar</span></td></tr>';
                                else
                                    tdHTML +='<tr class="warning"><td><a href="#" onclick="cargarPoliza($(this).parent().parent());">' + item.idSiniestro+'</a></td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="presupuestoModal($(this).parent().parent());">Ver/Imprimir</a></td><td><span">No se puede Gestionar</span></td></tr>';
                        else
                            tdHTML +='<tr class="info"><td><a href="#" onclick="cargarPoliza($(this).parent().parent());">' + item.idSiniestro+'</a></td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="presupuestoModal($(this).parent().parent());">Ver/Imprimir</a></td><td><a href="#" onclick="cerrarReparacion($(this).parent().parent());">Finalizar Reparación</a></td></tr>';
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
        url : "/administradorTaller/carga/creaPresupuesto/",
        type : "POST",
        error : function () {
        },
        success: function (data) {
            $("body #muestraPresupuestos").empty();
            $("body #muestraPresupuestos").append(data);
            $("body #btn").addClass('hidden');
            $.ajax({
                url : "/administradortaller/obtener/historial",
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
            modalPresupuesto1.style.display="block";
            $("body #imprime1").on('click',function () {
                $("body div#PrintArea").printArea();
            })
        }
    });
}
function cerrarReparacion(item) {
    $.ajax({
        url : "/administradorTaller/carga/cierreFinal/",
        type : "POST",
        error : function () {
        },
        success : function (data) {
            $("body #muestraCierre").empty();
            $("body #muestraCierre").append(data);
            $.ajax({
                url : "/administradortaller/obtener/historial",
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
                            if(histor.idHistorial>mayor.idHistorial)
                                mayor=histor;
                        });
                        historial=mayor;
                    }
                    else
                        historial=idsHis[0];
                    $("#tipoReparacion2").text(historial.descripcion);
                    var entrega = toDate(item.find('td:eq(7)').text());
                    $("#fechaEntregaM2").val(fechaAdate(entrega));
                    $("#costo2").val(historial.costo);
                    var hh=toDate(item.find('td:eq(6)').text());
                    var f1 = moment(entrega);
                    var f2 = moment(hh);
                    var da = f1.diff(f2,'days');
                    $("#tiempoAsociado2").val(da);
                    $("#fechaEntregaM2").attr('readonly',true);
                    $("#tipoReparacion2").attr('readonly',true);
                    $("#costo2").attr('readonly',true);
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
            modalCierreFinal.style.display="block";
            $("body #imprime2").on('click',function () {
                $("body div#PrintAreaFinal").printArea();
            });
            $("body #btnAprobarCierre").on('click',function (){
                var fe = item.find('td:eq(6)').text();
                var estado = {
                    idEstado: item.find('td:eq(2)').text(),
                    idTipoEstado: 7,
                    costo: $("#costo2").val(),
                    idSiniestro: item.find('td:eq(0)').text(),
                    rut: item.find('td:eq(3)').text(),
                    rutTaller: item.find('td:eq(1)').text(),
                    fechaIngreso: toDate(fe),
                    fechaEntrega: $("body #fechaEntregaM2").val(),
                    numeroChasis: item.find('td:eq(4)').text()
                };
                var estadoParseado = JSON.stringify(estado);
                $.ajax({
                    url: "/administradorTaller/crear/estado/",
                    type: "POST",
                    data: {estado: estadoParseado},
                    error: function () {
                        modalCierreFinal.style.display = "none";
                        $('#errorModal1').text("No se pudo Finalizar Reparación, favor inténtelo más tarde");
                        modalError1.style.display = "block";
                    },
                    success: function (data) {
                        if (data == "201") {
                            var historia = {
                                idHistorial: " ",
                                numeroChasis: item.find('td:eq(4)').text(),
                                rutTaller: item.find('td:eq(1)').text(),
                                idSiniestro: item.find('td:eq(0)').text(),
                                costo: $("#costo2").val(),
                                descripcion: $("#tipoReparacion2").val(),
                                idTipoEstado: 7
                            };
                            var historialParse = JSON.stringify(historia);
                            $.ajax({
                                url: "/administradorTaller/crear/historialestado/",
                                type: "POST",
                                data: {historial: historialParse},
                                error: function () {
                                    modalCierreFinal.style.display = "none";
                                    $('#errorModal1').text("No se pudo Finalizar Reparación, favor inténtelo más tarde");
                                    modalError1.style.display = "block";
                                },
                                success: function (data) {
                                    if (data == "201") {
                                        procesando.style.display = "none";
                                        modalCierreFinal.style.display = "none";
                                        $("body #muestraCierre").empty();
                                        $("body #muestraCierre").append('<h3>Se ha Finalizado correctamente el Siniestro</h3>');
                                        $("body #footer").addClass('hidden');
                                        modalCierreFinal.style.display = "block";
                                    } else {
                                        modalCierreFinal.style.display = "none";
                                        $
                                        $('#muestraCierre').text("No se pudo Finalizar Reparación, favor inténtelo más tarde");
                                        modalError1.style.display = "block";
                                    }
                                }
                            });
                        } else {
                            modalCierreFinal.style.display = "none";
                            $('#errorModal1').text("No se pudo Finalizar Reparación, favor inténtelo más tarde");
                            modalError1.style.display = "block";
                        }
                    }
                });
            });

        }
    });
}
function cargarPagoSiniestros() {
    $.ajax({
        url:"/administradorTaller/carga/pagoSiniestro/",
        type:"POST",
        error : function () {
        },
        success: function (data) {
            $("body #administradorTaller").append(data);
            $.ajax({
                url : "/administradortaller/buscar/siniestros/",
                type : "POST",
                data : {rut : $("body #rut").val()},
                error : function () {
                },
                success : function (data) {
                    procesando.style.display="none";
                    var response=$.parseJSON(data);

                    $.each($("#table_recors tr"),function (i,item) {
                        if(i>0)
                            this.remove();
                    });
                    var tdHTML = "";
                    $.each(response,function (i,item) {
                        if (item.tipoEstado.idTipoEstado == 7)
                            tdHTML +='<tr><td><a href="#" onclick="cargarPoliza($(this).parent().parent());">' + item.idSiniestro+'</a></td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="pagarDeducible($(this).parent().parent());">Pagar Reparaciones</a></td></tr>';
                    });
                    $('body #table_recors').append(tdHTML);

                },
                beforeSend : function () {
                    procesando.style.display="block";
                }
            });
        }
    });
}
function pagarDeducible(item) {
    var idSiniestro= item.find('td:eq(0)').text();
    var tipoEstadoId=item.find('td:eq(11)').text();
    $.ajax({
        url : "/administradorTaller/obtener/siniestro/",
        type : "POST",
        data : {id_siniestro : idSiniestro},
        error : function () {
        },
        success : function (data) {
            response = $.parseJSON(data);
            var tipoSeguro = response.tipoSeguro;
            var fechaAux="";
            $.ajax({
                url:"/administradorTaller/carga/pago/",
                type : "POST",
                error: function () {
                },
                success: function (data) {
                    $("body #muestraPago").empty();
                    $("body #muestraPago").append(data);
                    $.ajax({
                        url : "/administradortaller/obtener/historial",
                        type : "POST",
                        data : {idSiniestro : idSiniestro},
                        error : function () {
                        },
                        success : function (data) {
                            var histo = $.parseJSON(data);
                            var idsHis=[];
                            var historial="";
                            $.each(histo,function (i, histor) {
                                if(histor.idTipoEstado == tipoEstadoId)
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
                            $("#tipoReparacion3").text(historial.descripcion);
                            var entrega = toDate(item.find('td:eq(7)').text());
                            $("#fechaEntregaM3").val(fechaAdate(entrega));
                            $("#deducible3").val(tipoSeguro.ufDeducible);
                            $("#costo3").val(historial.costo);
                            $("#fechapago").val(hoy(false));
                            fechaAux=$("#fechapago").val();
                            var hh=toDate(item.find('td:eq(6)').text());
                            var f1 = moment(entrega);
                            var f2 = moment(hh);
                            var da = f1.diff(f2,'days');
                            $("#tiempoAsociado3").val(da);
                            $("#fechaEntregaM3").attr('readonly',true);
                            $("#tipoReparacion3").attr('readonly',true);
                            $("#costo3").attr('readonly',true);
                            $("#pagar3").val($("#costo3").val()-($("#deducible3").val()*$("#uf").val()));
                            if($("#pagar3").val()<0)
                                $("#pagar3").val(0);
                            $("body #costo1").text(historial.costo);
                            $("body #fechaEntregaM1").text(fechaAdate(entrega));
                            $("body #tiempoAsociado1").text(da);
                            $("body #tipoReparacion1").text(historial.descripcion);
                            $("body #estado1").text(item.find('td:eq(8)').text());
                            $("body #liquidador1").text(item.find('td:eq(5)').text());
                            $("body #nombreTaller").text(item.find('td:eq(9)').text());
                            $("body #rutTaller").text(item.find('td:eq(10)').text());
                            $("body #vehiculo").text(response.vehiculo.modelo.descripcion);
                            $("body #marca").text(response.vehiculo.modelo.marca.descripcion);
                            $("body #agno").text(response.vehiculo.ano);
                            $("body #patente").text(response.vehiculo.patente);
                            $("body #deducible").text(tipoSeguro.ufDeducible);
                            $("#pagar").text($("#pagar3").val());
                            $("#fechapago1").text($("#fechapago").val());
                        }
                    });
                    modalPago.style.display="block";
                    $("body #imprime3").on('click',function () {
                        $("body div#PrintAreaPago").printArea();
                    })
                    $("body #uf").on('change',function () {
                        $("#pagar3").val($("#costo3").val()-($("#deducible3").val()*$("#uf").val()));
                        if($("#pagar3").val()<0)
                            $("#pagar3").val(0);
                        $("#pagar").text($("#pagar3").val());
                    });
                    $("body #btnPagar").on('click',function () {
                        $("body #footer").addClass('hidden');
                       var pago ={
                           idPagoSiniestro : " ",
                           montoCancelar : $("#pagar3").val(),
                           descripcion : $("#tipoReparacion3").val(),
                           idSiniestro : idSiniestro,
                           fechaPago : DateAFechaNormal(fechaAux)
                       };
                       $.ajax({
                           url : "/administradorTaller/crear/pago/",
                           type : "POST",
                           data : {pago : JSON.stringify(pago)},
                           error : function () {
                           },
                           beforeSend : function () {
                               procesando.style.display="block";
                           },
                           success : function (data) {
                               if(data=="201")
                               {
                                   var estado = {
                                       idEstado: item.find('td:eq(2)').text(),
                                       idTipoEstado: 15,
                                       costo : $("#costo3").val(),
                                       idSiniestro : idSiniestro,
                                       rut : item.find('td:eq(3)').text(),
                                       rutTaller : item.find('td:eq(1)').text(),
                                       fechaIngreso : toDate(item.find('td:eq(6)').text()),
                                       fechaEntrega : toDate(item.find('td:eq(7)').text()),
                                       numeroChasis : item.find('td:eq(4)').text()
                                   };
                                   var estadoParseado = JSON.stringify(estado);
                                   $.ajax({
                                       url : "/administradorTaller/crear/estado/",
                                       type : "POST",
                                       data: {estado: estadoParseado},
                                       error : function () {
                                           procesando.style.display="none";
                                           modalPago.style.display="none";
                                           $('#errorModal1').text("No se pudo crear el Pago, favor inténtelo más tarde");
                                           modalError1.style.display = "block";
                                       },
                                       success : function (data) {
                                           if(data=="201") {
                                               var historia = {
                                                   idHistorial: " ",
                                                   numeroChasis: item.find('td:eq(4)').text(),
                                                   rutTaller: item.find('td:eq(1)').text(),
                                                   idSiniestro: idSiniestro,
                                                   costo: $("#costo3").val(),
                                                   descripcion : $("#tipoReparacion3").val(),
                                                   idTipoEstado: 15
                                               };
                                               var historialParse = JSON.stringify(historia);
                                               $.ajax({
                                                   url : "/administradorTaller/crear/historialestado/",
                                                   type : "POST",
                                                   data: {historial: historialParse},
                                                   error : function () {
                                                       procesando.style.display="none";
                                                       modalPago.style.display="none";
                                                       $('#errorModal1').text("No se pudo crear el Pago, favor inténtelo más tarde");
                                                       modalError1.style.display = "block";
                                                   },
                                                   success : function (data) {
                                                       if(data=="201") {
                                                           procesando.style.display = "none";
                                                           modalPago.style.display="none";
                                                           var mensaje="<h3>Se ha registrado el Pago de forma correcta</h3>";
                                                           $("body #estado1").text("ENTREGADO");
                                                           $("body #imprime3").click();
                                                           $("#muestraPago").empty();
                                                           $('#muestraPago').append(mensaje);
                                                           $("body #footer").addClass('hidden');
                                                           modalPago.style.display = "block";
                                                       }else
                                                       {
                                                           procesando.style.display="none";
                                                           modalPago.style.display="none";
                                                           $('#errorModal1').text("No se pudo crear el Pago, favor inténtelo más tarde");
                                                           modalError1.style.display = "block";
                                                       }
                                                   }
                                               });
                                           }else
                                           {
                                               procesando.style.display="none";
                                               modalPago.style.display="none";
                                               $('#errorModal1').text("No se pudo crear el Pago, favor inténtelo más tarde");
                                               modalError1.style.display = "block";
                                           }
                                       }
                                   });
                               }
                               else
                               {
                                   procesando.style.display="none";
                                   modalPago.style.display="none";
                                   $('#errorModal1').text("No se pudo crear el Pago, favor inténtelo más tarde");
                                   modalError1.style.display = "block";
                               }
                           }
                       });
                    });
                }
            });
        }
    });
}
function cargarPoliza(item) {
    $("#dialog").dialog();
    $("#dialog").dialog("close");
    $.ajax({
        data: {id_siniestro: item.find('td:eq(0)').text()},
        url: "/administradorTaller/obtener/siniestro/",
        type: "POST",
        success: function (data) {
            var idPoliza = JSON.parse(data);
            polizaConTodosLosDatos = idPoliza;
            $("body #rutAsegurado").text("Rut: " + idPoliza.persona.rut);
            $("body #nombreAsegurado").text("Nombre: " + idPoliza.persona.nombre);
            $("body #comunaAsegurado").text("Comuna: " + idPoliza.persona.comuna.nombre);
            $("body #patenteAsegurado").text("Patente: " + idPoliza.vehiculo.patente);
            $("body #modeloAsegurado").text("Modelo: " + idPoliza.vehiculo.modelo.descripcion);
            $("body #marcaAsegurado").text("Marca: " + idPoliza.vehiculo.modelo.marca.descripcion);
            $("body #anioAsegurado").text("Año: " + idPoliza.vehiculo.ano);
            $("body #chasis").val(idPoliza.vehiculo.numeroChasis);
        },
        error: function (e) {
        }
    });
    $("#dialog").dialog();
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
function sumarDias(hh,dias){
    fecha = new Date(hh);
    fecha.setDate(fecha.getDate() + dias);
    var y1= fecha.getFullYear();
    var m1 = fecha.getMonth()+1;
    if(m1<10)
        m1="0"+m1;
    var dt1 = fecha.getDate();
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
function DateAFechaNormal(fecha) {
    var d1 = new Date(fecha);
    var y1= d1.getFullYear();
    var m1 = d1.getMonth()+1;
    if(m1<10)
        m1="0"+m1;
    var dt1 = d1.getDate();
    if(dt1<10)
        dt1 = "0"+dt1;
    var d2 = dt1+"-"+m1+"-"+y1;

    return d2;
}

