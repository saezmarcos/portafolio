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
    console.log('click en ver estado siniestro');
    cargarEstadoSiniestro();
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
            $('#cliente').append(data);
            $.ajax({
                type: "POST",
                url: "/cliente/cargar/datosEstado/",
                error: function (e) {
                    console.log(e.toString());
                },
                success: function (data) {

                }
            });
        },
        beforeSend: function () {
            procesando.style.display = "block";
        }
    });
}