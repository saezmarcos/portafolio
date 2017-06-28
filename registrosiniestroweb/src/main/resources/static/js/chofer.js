/**
 * Created by Usuario on 27-06-2017.
 */
var modalError=document.getElementById("myModalError");
var modalFinal2=document.getElementById("myModalFinal2");
var modalError1=document.getElementById("myModalError1");
var procesando=document.getElementById("processing-modal");
$("body").on("click","#entregarVe",function (){
    $("body #listChofer").remove();
    $("body #listChoferEntrega").remove();
    cargarListarPres();
});
$("body").on("click","#listarentregas",function (){
    $("body #listChofer").remove();
    $("body #listChoferEntrega").remove();
    cargarListarPresEntre();
});
$("body").on("click","#btnCerrar",function () {
    modalError.style.display="none";
});
$("body").on("click","#close",function () {
    modalError.style.display="none";
});
$("body").on("click","#btnCerrar1",function () {
    cargarListarPres();
    modalError1.style.display="none";
    modalFinal2.style.display="none";
});
$("body").on("click","#close1",function () {
    cargarListarPres();
    modalError1.style.display="none";
    modalFinal2.style.display="none";
});
cargaNavbar();
var choferGruapas={};
function cargaNavbar() {
    $.ajax({
        type: "POST",
        url: "/chofergrua/menuprincipal/carga/navbar/",
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
function cargarListarPres() {
    $.ajax({
        url : "/chofergrua/carga/listadoPresupuesto/",
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
            $('body #choferGrua').empty();
            $('body #choferGrua').append(data);
            $.ajax({
                url : "/chofergrua/obtener/choferGrua/",
                type : "POST",
                data :{rutChofer:$("body #rut").val()},
                error : function () {
                },
                success: function (data) {
                    var responses=data;
                    choferGruapas=$.parseJSON(responses);
                }
            });
            $.ajax({
                type : "POST",
                url :"/chofergrua/cargar/presupuestos/",
                success : function (data) {
                    var response = $.parseJSON(data);
                    $.each($("#table_recors tr"),function (i,item) {
                        if(i>0)
                            this.remove();
                    });
                    var tdHTML = "";
                    $.each(response,function (i,item) {
                        if(item.tipoEstado.idTipoEstado == 2)
                            if(item.grua.numeroChasis==choferGruapas.numeroChasis)
                                tdHTML +='<tr class="warning"><td>' + item.idSiniestro+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td>' + item.taller.nombre+'</td><td>' + item.grua.patente+'</td><td class="hidden">' + item.grua.comuna.idComuna+'</td><td><a href="#" onclick="entregarVehiculo($(this).parent().parent());">Ingresar Vehículo</a></td></tr>';
                    });
                    procesando.style.display="none";
                    $('body #table_recors').append(tdHTML);
                },
                error : function () {
                }
            });
        }
    });
}
function cargarListarPresEntre() {
    $.ajax({
        url : "/chofergrua/carga/listadoEntregas/",
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
            $('body #choferGrua').empty();
            $('body #choferGrua').append(data);
            $.ajax({
                url : "/chofergrua/obtener/choferGrua/",
                type : "POST",
                data :{rutChofer:$("body #rut").val()},
                error : function () {
                },
                success: function (data) {
                    var responses=data;
                    choferGruapas=$.parseJSON(responses);
                }
            });
            $.ajax({
                type : "POST",
                url :"/chofergrua/cargar/presupuestos/",
                success : function (data) {
                    var response = $.parseJSON(data);
                    $.each($("#table_recors tr"),function (i,item) {
                        if(i>0)
                            this.remove();
                    });
                    var tdHTML = "";
                    $.each(response,function (i,item) {
                        if(item.tipoEstado.idTipoEstado != 2)
                            if(item.grua.numeroChasis==choferGruapas.numeroChasis)
                                tdHTML +='<tr class="active"><td><a href="#" onclick="cargarPoliza($(this).parent().parent());">' + item.idSiniestro+'</a></td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>VEHÍCULO ENTREGADO</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td>' + item.taller.nombre+'</td><td>' + item.grua.patente+'</td><td class="hidden">' + item.grua.comuna.idComuna+'</td><td>' + item.taller.direccion+'</td></tr>';
                    });
                    procesando.style.display="none";
                    $('body #table_recors').append(tdHTML);
                },
                error : function () {
                }
            });
        }
    });
}
function cargarPoliza(item) {
    $.ajax({
        data: {id_siniestro: item.find('td:eq(0)').text()},
        url: "/chofergrua/obtener/siniestro/",
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
function entregarVehiculo(item) {
    procesando.style.display="block";
    var gruanCambio={
        numeroChasis : item.find('td:eq(4)').text(),
        idComuna : item.find('td:eq(14)').text(),
        rutAseguradora : '77777777-7',
        enUso : "F",
        patente : item.find('td:eq(13)').text()
    };
    $.ajax({
        url:"/chofergrua/usuario/modificar/grua/",
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
                    idTipoEstado: 8,
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
                    url : "/chofergrua/crear/estado/",
                    type : "POST",
                    data: {estado: estadoParseado},
                    error : function () {
                        procesando.style.display="none";
                        $('#errorModal1').text("No se pudo Recepcionar Vehículo, favor inténtelo más tarde");
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
                                descripcion : "Vehiculo Recepcionado en Taller",
                                idTipoEstado: 8
                            };
                            var historialParse = JSON.stringify(historia);
                            $.ajax({
                                url : "/chofergrua/crear/historialestado/",
                                type : "POST",
                                data: {historial: historialParse},
                                error : function () {
                                    procesando.style.display="none";
                                    $('#errorModal1').text("No se pudo Recepcionar Vehículo, favor inténtelo más tarde");
                                    modalError1.style.display = "block";
                                },
                                success : function (data) {
                                    if(data=="201") {
                                        procesando.style.display = "none";
                                        $('#confirmacion').text("Se ha Recepcionado correctamente el Vehículo");
                                        modalFinal2.style.display = "block";
                                    }else
                                    {
                                        procesando.style.display="none";
                                        $('#errorModal1').text("No se pudo Recepcionar Vehículo, favor inténtelo más tarde");
                                        modalError1.style.display = "block";
                                    }
                                }
                            });
                        }else
                        {
                            procesando.style.display="none";
                            $('#errorModal1').text("No se pudo Reingresar Vehículo, favor inténtelo más tarde");
                            modalError1.style.display = "block";
                        }
                    }
                });
            }
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