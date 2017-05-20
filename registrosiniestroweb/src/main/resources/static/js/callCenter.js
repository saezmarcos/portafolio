var modalError = document.getElementById("myModalError");
var procesando = document.getElementById("processing-modal");
var response;
cargaNavbar();
function cargaNavbar() {
    $.ajax({
        type: "POST",
        url: "/menuprincipal/carga/navbarCall/",
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
        url: "/callCenter/cargar/crear",
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
        url: "/callCenter/agregarSiniestro/comunasComboBox/",
        error: function (e) {
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
            } else {
                response = $.parseJSON(data);
                comunas = response.comunas;
                var selectHTML = '';
                $.each(comunas, function (i, item) {
                    selectHTML += '<option value="' + item.idComuna + '">' + item.nombre + '</option>';
                });
                $('#ddlComunas').append(selectHTML);
            }
        }

    });
}
$('body').on('click', '#btnConsultarPoliza', function () {
    var id = $("#idPoliza").val();
    $.ajax({
        data: {idPoliza: id},
        url: "/callCenter/consultar/poliza/",
        type: "POST",
        success: function (data) {
            if (data == "null" || data == null || data == "Error") {

            } else {
                procesando.style.display = "none";
                var idPoliza = JSON.parse(data);
                $.ajax({
                    url: "/callCenter/crear/idSiniestro/",
                    type: "POST",
                    success: function (data) {
                        var nroSiniestro = JSON.parse(data);
                        console.log(nroSiniestro);
                        $("body #nroSiniestro").text(nroSiniestro.id);
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
                $("body #nroBuscado").text(idPoliza.id);
            }
        },
        error: function (e) {
            console.log(e);
        },
        beforeSend: function () {
            procesando.style.display = "block";
        }
    });
});
$('body').on('click', '#btnCrearSiniestro', function () {
    var siniestro = {
        id: $("#nroSiniestro").text(),
        fechaIncidente: $("#fecha").val(),
        detalleIncidente: $("#txtDetalle").val(),
        idPoliza: $("#nroBuscado").text(),
        direccion: $("#txtDireccion").val(),
        idComuna: $("#ddlComunas").val()
    };
    var siniestroParseado = JSON.stringify(siniestro);
    console.log(siniestroParseado);
    $.ajax({
        data: {siniestro : siniestroParseado},
       url: "/callCenter/crear/siniestro/",
        type: "POST",
        success: function (data) {
            console.log(data);
        },
        error: function (e) {
            console.log(e);
        },
        beforeSend : function () {

        }
    });
});