/**
 * Created by Jean on 28-05-2017.
 */
var modalError = document.getElementById("myModalError");
var procesando = document.getElementById("processing-modal");
var modalTaller = document.getElementById("myModalTaller");
var modalChofer = document.getElementById("myModalChofer");
var modalFinalModif = document.getElementById("myModalFinalModif");
var response;
var modalError1 = document.getElementById("myModalError1");
var modalFinal = document.getElementById("myModalFinal");
var modalFinal2 = document.getElementById("myModalFinal2");
cargaNavbar();
$("body").on('click', "#close1", function () {
    modalFinal2.style.display = "none";
});
$("body").on('click', "#btnCerrar2", function () {
    modalFinal2.style.display = "none";
});
$("body").on('click', "#btnCerrar1", function () {
    modalError.style.display = "none";
    modalTaller.style.display = "none";
    modalError1.style.display = "none";
    modalFinal.style.display = "none";
    procesando.style.display = "none";
});
$("body").on('click', ".cerrar", function () {
    modalError.style.display = "none";
    modalTaller.style.display = "none";
    modalChofer.style.display = "none";
    modalError1.style.display = "none";
    modalFinal.style.display = "none";
    procesando.style.display = "none";
});
$("body").on('click', ".close", function () {
    modalError.style.display = "none";
    modalTaller.style.display = "none";
    modalChofer.style.display = "none";
    modalError1.style.display = "none";
    modalFinal.style.display = "none";
    procesando.style.display = "none";
    modalFinalModif.style.display = "none";
});
$(document).ready(function () {
    $("body").on("change", function () {
        modalError1 = document.getElementById("myModalError1");
        modalFinal = document.getElementById("myModalFinal");
        modalFinal2 = document.getElementById("myModalFinal2");
    });
});
function cargaNavbar() {
    $.ajax({
        type: "POST",
        url: "/cliente/menuprincipal/carga/navbarCliente/",
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
            if (data == "Error" || data == null || data == "null") {
                procesando.style.display = "none";
                $('#errorModal').text(" Ocurrio un problema al intentar generar la página, favor inténtelo más tarde ");
                modalError.style.display = "block";
            }
            else {
                $('#menuPrincipal').append(data);
                username = $('body #nombreUsuario').val();
                $('body #usrname').text(' Bienvenido: ' + username);
                $('body #usrname').css('font-family', "Helvetica Neue,Helvetica,Arial,sans-serif");
                //$('body #usrname').addClass("glyphicon glyphicon-user");
                procesando.style.display = "none";
            }
        }
    });
}
$('body').on('click', '#verSiniestro', function () {
    $("body #estadoSiniestroCliente").remove();
    $("body #estadoSiniestroF").remove();
    cargarEstadoSiniestro();
});
$('body').on('click', '#listadoSiniestros', function () {
    $("body #estadoSiniestroF").remove();
    $("body #estadoSiniestroCliente").remove();
    cargarEstadoSiniestroCerrado();
});
function cargarEstadoSiniestro() {
    $.ajax({
        type: "POST",
        url: "/cliente/mostrar/estadoSiniestro/",
        error: function (e) {
            console.log(e.toString());
            $('#errorModal').text("En estos momentos no podemos atenderlo, favor inténtelo más tarde");
        },
        success: function (data) {
            procesando.style.display = "none";
            $('#cliente').empty();
            $('#cliente').append(data);
            var estados={};
            $.ajax({
                type: "POST",
                url: "/cliente/obtener/poliza/",
                data : {id_poliza:$("body #polizaP").val()},
                error: function (e) {
                    console.log(e.toString());
                },
                success: function (data) {
                    var response=$.parseJSON(data);
                    var siniestros=response.siniestros;
                    $.ajax({
                        url : "/cliente/cargar/estados/",
                        type:"POST",
                        error: function () {
                        },
                        success : function (data) {
                            estados=$.parseJSON(data);
                            $.each($("#table_recors tr"),function (i,item) {
                                if(i>0)
                                    this.remove();
                            });
                            var tdHTML = "";
                            var hh=hoy(true);
                            var f2 = moment(hh);
                            $.each(siniestros,function (i,item) {
                                $.each(estados,function (j,sini) {
                                    if(item.id==sini.idSiniestro)
                                        if(sini.tipoEstado.idTipoEstado!=15 && sini.tipoEstado.idTipoEstado!=14 && sini.tipoEstado.idTipoEstado!=10) {
                                            f1=moment(toDate(sini.fechaEntrega));
                                            var da = f1.diff(f2,'days');
                                            da=da+1;
                                            if(da<0)
                                                da="Debió Retirar hace "+(da*-1) + " día(s)";
                                            else
                                                da="Faltan "+(da)+" día(s)";
                                            tdHTML += '<tr><td>' + sini.idSiniestro + '</td><td class="hidden">' + sini.taller.rutTaller + '</td><td class="hidden">' + sini.idEstado + '</td><td class="hidden">' + sini.persona.rut + '</td><td class="hidden">' + sini.grua.numeroChasis + '</td><td>' + sini.persona.nombre + '</td><td>' + sini.fechaIngreso + '</td><td>' + sini.tipoEstado.descripcion + '</td><td><a href="#" onclick="cargarPoliza($(this).parent().parent());">Historial</a></td><td>' + da + '</td></tr>';
                                        }
                                });
                            });
                            $('body #table_recors').append(tdHTML);
                        }
                    });

                }
            });
        },
        beforeSend: function () {
            procesando.style.display = "block";
        }
    });
}
function cargarPoliza(item) {
    $.ajax({
        url: "/cliente/obtener/historial/",
        type: "POST",
        data:{idSiniestro:item.find('td:eq(0)').text()},
        success: function (data) {
            var historial = $.parseJSON(data);
            tipoEstado='[{"id":1,"desc":"INGRESADO"},{"id":2,"desc":"GRUA ENVIADA"},{"id":3,"desc":"EN EVALUACION TALLER"},{"id":4,"desc":"EN REPARACION"},{"id":5,"desc":"RETRASADO"},{"id":6,"desc":"REINGRESADO"},{"id":7,"desc":"FINALIZADO"},{"id":8,"desc":"RECEPCIONADO"},{"id":9,"desc":"EN EVALUACION LIQUIDADOR"},{"id":10,"desc":"PERDIDA TOTAL"},{"id":11,"desc":"RECHAZADO LIQUIDADOR"},{"id":12,"desc":"RECHAZADO CLIENTE"},{"id":13,"desc":"PENDIENTE "},{"id":14,"desc":"RECHAZADO"},{"id":15,"desc":"ENTREGADO"}]';
            var descri=$.parseJSON(tipoEstado);
            $.each($("#table_recors1 tr"),function (i,item) {
                if(i>0)
                    this.remove();
            });
            var tdHTML = "";
            var descrit="";
            historial.sort(function (a, b){
                return (b.idHistorial - a.idHistorial)
            });
            $.each(historial,function (i,item) {
                $.each(descri,function (j,est) {
                    if(item.idTipoEstado==est.id)
                        descrit=est.desc;
                });
                tdHTML +='<tr><td>' + item.idHistorial+'</a></td><td >' + item.rutTaller+'</td><td>' +descrit +'</td></tr>';
            });
            $('body #table_recors1').append(tdHTML);
        },
        error: function (e) {
        }
    });
    $("#dialog").dialog();
}
function cargarEstadoSiniestroCerrado() {
    $.ajax({
        type: "POST",
        url: "/cliente/mostrar/estadoSiniestroFinal/",
        error: function (e) {
            console.log(e.toString());
            $('#errorModal').text("En estos momentos no podemos atenderlo, favor inténtelo más tarde");
        },
        success: function (data) {
            procesando.style.display = "none";
            $('#cliente').empty();
            $('#cliente').append(data);
            var estados={};
            $.ajax({
                type: "POST",
                url: "/cliente/obtener/poliza/",
                data : {id_poliza:$("body #polizaP").val()},
                error: function (e) {
                    console.log(e.toString());
                },
                success: function (data) {
                    var response=$.parseJSON(data);
                    var siniestros=response.siniestros;
                    $.ajax({
                        url : "/cliente/cargar/estados/",
                        type:"POST",
                        error: function () {
                        },
                        success : function (data) {
                            estados=$.parseJSON(data);
                            $.each($("#table_recors tr"),function (i,item) {
                                if(i>0)
                                    this.remove();
                            });
                            var tdHTML = "";
                            $.each(siniestros,function (i,item) {
                                $.each(estados,function (j,sini) {
                                    if(item.id==sini.idSiniestro)
                                        tdHTML += '<tr><td>' + sini.idSiniestro + '</td><td class="hidden">' + sini.taller.rutTaller + '</td><td class="hidden">' + sini.idEstado + '</td><td class="hidden">' + sini.persona.rut + '</td><td class="hidden">' + sini.grua.numeroChasis + '</td><td>' + sini.persona.nombre + '</td><td>' + sini.fechaIngreso + '</td><td>' + sini.tipoEstado.descripcion + '</td><td><a href="#" onclick="cargarPolizaFinal($(this).parent().parent());">Historial</a></td></tr>';
                                });
                            });
                            $('body #table_recors').append(tdHTML);
                        }
                    });

                }
            });
        },
        beforeSend: function () {
            procesando.style.display = "block";
        }
    });
}
function cargarPolizaFinal(item) {
    $.ajax({
        url: "/cliente/obtener/historial/",
        type: "POST",
        data:{idSiniestro:item.find('td:eq(0)').text()},
        success: function (data) {
            var historial = $.parseJSON(data);
            tipoEstado='[{"id":1,"desc":"INGRESADO"},{"id":2,"desc":"GRUA ENVIADA"},{"id":3,"desc":"EN EVALUACION TALLER"},{"id":4,"desc":"EN REPARACION"},{"id":5,"desc":"RETRASADO"},{"id":6,"desc":"REINGRESADO"},{"id":7,"desc":"FINALIZADO"},{"id":8,"desc":"RECEPCIONADO"},{"id":9,"desc":"EN EVALUACION LIQUIDADOR"},{"id":10,"desc":"PERDIDA TOTAL"},{"id":11,"desc":"RECHAZADO LIQUIDADOR"},{"id":12,"desc":"RECHAZADO CLIENTE"},{"id":13,"desc":"PENDIENTE "},{"id":14,"desc":"RECHAZADO"},{"id":15,"desc":"ENTREGADO"}]';
            var descri=$.parseJSON(tipoEstado);
            $.each($("#table_recors1 tr"),function (i,item) {
                if(i>0)
                    this.remove();
            });
            var tdHTML = "";
            var descrit="";
            historial.sort(function (a, b){
                return (b.idHistorial - a.idHistorial)
            });
            $.each(historial,function (i,item) {
                $.each(descri,function (j,est) {
                    if(item.idTipoEstado==est.id)
                        descrit=est.desc;
                });
                tdHTML +='<tr><td>' + item.idHistorial+'</a></td><td >' + item.rutTaller+'</td><td>' +descrit +'</td></tr>';
            });
            $('body #table_recors1').append(tdHTML);
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