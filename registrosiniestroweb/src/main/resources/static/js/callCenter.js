var modalError = document.getElementById("myModalError");
var procesando = document.getElementById("processing-modal");
var modalTaller = document.getElementById("myModalTaller");
var modalChofer = document.getElementById("myModalChofer");
var modalFinalModif = document.getElementById("myModalFinalModif");
var response;
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
    $.ajax({
        data: {siniestro: siniestroParseado},
        url: "/callcenter/crear/siniestro/",
        type: "POST",
        success: function (data) {
            if (data == "201") {
                var estado = {
                    idEstado: " ",
                    numeroChasis: $("#gruas").val(),
                    rutTaller: $("#talleres").val(),
                    idSiniestro: $("#nroSiniestro").text(),
                    costo: 0,
                    fechaIngreso: $("#fecha").val(),
                    fechaEntrega: $("#fecha").val(),
                    rut: $("#liquidadores").val(),
                    idTipoEstado: 1
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
                                numeroChasis: $("#gruas").val(),
                                rutTaller: $("#talleres").val(),
                                idSiniestro: $("#nroSiniestro").text(),
                                costo: 0,
                                descripcion : " ",
                                idTipoEstado: 1
                            };
                            var historialParse = JSON.stringify(historia);
                            console.log(historia);
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
                    if (item.comuna.provincia.region.idRegion == $("body #regiones").val()) {
                        selectHTML += '<option value="' + item.numeroChasis + '">' + item.patente + '</option>';
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