var modalError = document.getElementById("myModalError");
var procesando = document.getElementById("processing-modal");
var modalTaller = document.getElementById("myModalTaller");
var modalChofer = document.getElementById("myModalChofer");
var modalFinalModif = document.getElementById("myModalFinalModif");
var response;
var comunaGrua=[];
var modalError1 = document.getElementById("myModalError1");
var modalFinal = document.getElementById("myModalFinal");
var modalFinal2 = document.getElementById("myModalFinal2");
function limpiar() {
    $("#idPoliza").val("");
    $("#nroSiniestro").text("");
    $("#fecha").val("");
    $("#txtDetalle").val("");
    $("#nroBuscado").text("");
    $("#txtDireccion").val("");
    $("#comunas").val("-1");
    $("#liquidadores").val("-1");
}
cargaNavbar();
$("body").on('click', "#close1", function () {
    modalFinal2.style.display = "none";
    $("body #crearSiniestro").click();
});
$("body").on('click', "#btnCerrar2", function () {
    modalFinal2.style.display = "none";
    $("body #crearSiniestro").click();
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
function mostrarDialog() {
    $("#dialog").dialog();
}
function cargaNavbar() {
    $.ajax({
        type: "POST",
        url: "/callcenter/menuprincipal/carga/navbarCall/",
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
function cargarCrear() {
    $.ajax({
        type: "POST",
        url: "/callcenter/cargar/crear",
        error: function (e) {
            console.log(e.toString());
            $('#errorModal').text("En estos momentos no podemos atenderlo, favor inténtelo más tarde");
        },
        success: function (data) {
            $('#callCenter').append(data);
            var hh = hoy(false);
            $("body #fecha").attr("min", sumarDias(hh,-30));
            $("body #fecha").attr("max", hh);
        }
    });
}
$('body').on('click', '#crearSiniestro', function () {
    $('body #siniestros').remove();
    cargarComboBox();
    cargarCrear();
});
function cargarComboBox() {
    $.ajax({
        type: "POST",
        url: "/callcenter/agregarSiniestro/comunasComboBox/",
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
                if (data == "" || data == null || data == "null") {
                    procesando.style.display = "none";
                    $('#errorModal').text(" No existen datos que cargar, favor contacte al área de informática ");
                    modalError.style.display = "block";
                }
                else {
                    response = $.parseJSON(data);
                    regiones = response.regiones;
                    provincias = response.provincias;
                    comunas = response.comunas;
                    personas = response.personas;
                    var selectHTML = '';
                    $.each(regiones, function (i, item) {
                        selectHTML += '<option value="' + item.idRegion + '">' + item.nombre + '</option>';
                    });
                    $('#regiones').append(selectHTML);
                }
            }
        }
    });
}
var polizaConTodosLosDatos = '';
$('body').on('click', '#btnConsultarPoliza', function () {
    var id = $("#idPoliza").val();
    if (!jQuery.isNumeric(id)) {
        $('#errorModal1').text("Debe ingresar un numero de Poliza");
        modalError1.style.display = "block";
        $("#idPoliza").text('');
        return;
    }
    $.ajax({
        data: {idPoliza: id},
        url: "/callcenter/consultar/poliza/",
        type: "POST",
        success: function (data) {
            if (data == "null" || data == null || data == "Error" || data == "") {
                $('#errorModal1').text("Poliza no existe.");
                modalError1.style.display = "block";
                $("#idPoliza").text('');
            } else {
                procesando.style.display = "none";
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
                $("body #nroBuscado").text(idPoliza.id);
                $("body #btnCrSi").removeClass("hidden");
                $("body #labelSini").removeClass("hidden");
                $("body #datosPer").prop("disabled", false);
            }
        },
        error: function (e) {
        }
    });
});
$('body').on('click', '#btnCrearSiniestro', function () {
    var tipoEstado="";
    var numChasis = "0";
    if($("body #activarGrua").prop('checked')) {
        tipoEstado = 2;
        numChasis=$("body #gruas").val();
        var cc="";
        $.each(comunaGrua,function (i,gg) {
            if(gg.numeroChasis==numChasis)
                cc=gg;
        });
        var gruanCambio = {
            numeroChasis: cc.numeroChasis,
            idComuna: cc.comuna.idComuna,
            rutAseguradora: "77777777-7",
            enUso: "T",
            patente: cc.patente
        };
        console.log(gruanCambio);
        $.ajax({
            url: "/callcenter/usuario/modificar/grua/",
            type: "POST",
            data: {grua: JSON.stringify(gruanCambio)},
            error: function () {
            },
            success: function (data) {
            }
        });
    }
    else
        tipoEstado = 1;

    var id = $("#nroSiniestro").text();
    var fecha = $("#fecha").val();
    var detalle = $("#txtDetalle").val();
    var poliza = $("#nroBuscado").text();
    var direccion = $("#txtDireccion").val();
    var comuna = $("#comunas").val();
    if (id == "" || fecha == "" || detalle == "" || poliza == "" || direccion == "" || comuna == "") {
        $('#errorModal1').text("Debe llenar todos los campos");
        modalError1.style.display = "block";
        return;
    }
    var siniestro = {
        id: id,
        fechaIncidente: fecha,
        detalleIncidente: detalle,
        idPoliza: poliza,
        direccion: direccion,
        idComuna: comuna
    };
    var siniestroParseado = JSON.stringify(siniestro);
    var hh=hoy(false);
    $.ajax({
        data: {siniestro: siniestroParseado},
        url: "/callcenter/crear/siniestro/",
        type: "POST",
        success: function (data) {
            if (data == "201") {
                var estado = {
                    idEstado: " ",
                    numeroChasis: numChasis,
                    rutTaller: $("#talleres").val(),
                    idSiniestro: $("#nroSiniestro").text(),
                    costo: 0,
                    fechaIngreso: hh,
                    fechaEntrega: hh,
                    rut: $("#liquidadores").val(),
                    idTipoEstado: tipoEstado
                };
                var estadoParseado = JSON.stringify(estado);

                $.ajax({
                    url : "/callcenter/crear/estado/",
                    type : "POST",
                    data: {estado: estadoParseado},
                    error : function () {
                        $('#errorModal1').text("No se pudo crear el Siniestro, favor inténtelo más tarde");
                        modalError1.style.display = "block";
                    },
                    success : function (data) {
                        if(data=="201") {
                            var historia = {
                                idHistorial: " ",
                                numeroChasis: numChasis,
                                rutTaller: $("#talleres").val(),
                                idSiniestro: $("#nroSiniestro").text(),
                                costo: 0,
                                descripcion : " ",
                                idTipoEstado: tipoEstado
                            };
                            var historialParse = JSON.stringify(historia);
                            $.ajax({
                                url : "/callcenter/crear/historialestado/",
                                type : "POST",
                                data: {historial: historialParse},
                                error : function () {
                                    $('#errorModal1').text("No se pudo crear el Siniestro, favor inténtelo más tarde");
                                    modalError1.style.display = "block";
                                },
                                success : function (data) {
                                    if(data=="201") {
                                        procesando.style.display = "none";
                                        $('#confirmacion').text("Se ha guardado correctamente el siniestro");
                                        limpiar();
                                        modalFinal2.style.display = "block";
                                    }else
                                    {
                                        $('#errorModal1').text("No se pudo crear el Siniestro, favor inténtelo más tarde");
                                        modalError1.style.display = "block";
                                    }
                                }
                            });
                        }else
                        {
                            $('#errorModal1').text("No se pudo crear el Siniestro, favor inténtelo más tarde");
                            modalError1.style.display = "block";
                        }
                    }
                });
            }
        },
        error: function (e) {
            $('#errorModal1').text("No se pudo crear el Siniestro, favor inténtelo más tarde");
            modalError1.style.display = "block";
        }
    });
});
$("body").on('change', "#regiones", function () {
    var comuna = [];
    $('#comunas').empty();
    $('#liquidadores').empty();
    $('#talleres').empty();
    $('#gruas').empty();
    $.ajax({
        url: "/callcenter/agregarSiniestro/comunasComboBox/",
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
                response = $.parseJSON(data);
                comunas = response.comunas;
                personas = response.personas;
                talleres = response.talleres;
                gruas = response.gruas;
                var selectHTML = '';
                $.each(comunas, function (i, item) {
                    if (item.provincia.region.idRegion == $("body #regiones").val())
                        selectHTML += '<option value="' + item.idComuna + '">' + item.nombre + '</option>';
                });
                $('#comunas').append(selectHTML);
                selectHTML = '';
                $.each(personas, function (i, item) {
                    if (item.perfil.rol == 'Liquidador') {
                        if (item.comuna.provincia.region.idRegion == $("body #regiones").val()) {
                            selectHTML += '<option value="' + item.rut + '">' + item.nombre + '</option>';
                        }
                    }
                });
                if (selectHTML == '') {
                    selectHTML = '<option value="-1">No hay liquidadores en la region seleccionada</option>';
                }
                $('#liquidadores').append(selectHTML);
                selectHTML = '';
                $.each(talleres, function (i, item) {
                    if (item.comuna.provincia.region.idRegion == $("body #regiones").val()) {
                        selectHTML += '<option value="' + item.rutTaller + '">' + item.nombre + '</option>';
                    }
                });
                if (selectHTML == '') {
                    selectHTML = '<option value="-1">No hay talleres en la region seleccionada</option>';
                }
                $('#talleres').append(selectHTML);
                selectHTML = '';
                $.each(gruas, function (i, item) {
                    if (item.comuna.provincia.region.idRegion == $("body #regiones").val() && item.enUso=="F") {
                        selectHTML += '<option value="' + item.numeroChasis + '">' + item.patente + '</option>';
                        comunaGrua.push(item);
                    }
                });
                if (selectHTML == '') {
                    selectHTML = '<option value="-1">No hay gruas en la region seleccionada</option>';
                }
                $('#gruas').append(selectHTML);
            }
        }
    });
});
$('body').on('click', '#btnCrSi',function () {
    $.ajax({
        url: "/callcenter/crear/idSiniestro/",
        type: "POST",
        success: function (data) {
            var nroSiniestro = JSON.parse(data);
            $("body #nroSiniestro").text(nroSiniestro.id);

            $("body #btnConsultarPoliza").prop("disabled", true);
            $("body #btnCrSi").prop("disabled", true);
            $("body #formu_registro_siniestro").removeClass("hidden");
            $("body #idPoliza").prop("disabled", true);
            $("body #btnConsultarPoliza").prop("disabled", true);
        },
        error: function (e) {
            console.log(e);
        }
    })
});
$("body").on("click", "#idPoliza",function () {
    $("body #btnCrSi").addClass("hidden");
    $("body #labelSini").addClass("hidden");
    $("body #datosPer").prop("disabled", true);
});
$("body").on('change',"#activarGrua",function () {
    if($("#activarGrua").prop('checked'))
        $("#gruas").attr('readonly',false);
    else
        $("#gruas").attr('readonly',true);
});
function cargarListarPres() {
    $.ajax({
        url : "/callcenter/carga/listadoPresupuesto/",
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
                url :"/callcenter/cargar/presupuestos/",
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
                            if (item.tipoEstado.idTipoEstado == 7)
                                tdHTML +='<tr class="active"><td>' + item.idSiniestro+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="presupuestoModal($(this).parent().parent());">Ver/Imprimir</a></td></tr>';
                            else
                            if (item.tipoEstado.idTipoEstado == 4)
                                tdHTML +='<tr class="info"><td>' + item.idSiniestro+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="presupuestoModal($(this).parent().parent());">Ver/Imprimir</a></td></tr>';
                            else
                                tdHTML +='<tr class="warning"><td>' + item.idSiniestro+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td class="hidden">' + item.fechaEntrega+'</td><td>' + item.tipoEstado.descripcion+'</td><td class="hidden">' + item.taller.nombre+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.tipoEstado.idTipoEstado+'</td><td><a href="#" onclick="presupuestoModal($(this).parent().parent());">Ver/Imprimir</a></td></tr>';
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
        url : "/callcenter/carga/creaPresupuesto/",
        type : "POST",
        error : function () {
        },
        success: function (data) {
            $("body #muestraPresupuestos").empty();
            $("body #muestraPresupuestos").append(data);
            $("body #btn").addClass('hidden');
            $.ajax({
                url : "/callcenter/obtener/historial",
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