/**
 * Created by Usuario on 30-05-2017.
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
$('body').on('click','#listSiniestro',function () {
    $('body #modificaUsuario').remove();
    $('body #creaUsuario').remove();
    $('body #listadoUsuario').remove();
    $('body #creaGrua').remove();
    $('body #creaTaller').remove();
    cargarCrear("nuevo");
});
$('body').on('click','#presupuesto',function () {
    $('body #modificaUsuario').remove();
    $('body #creaUsuario').remove();
    $('body #listadoUsuario').remove();
    $('body #creaGrua').remove();
    $('body #creaTaller').remove();
    cargarModificar();
});
$('body').on('click','#reparacion',function () {
    $('body #listadoUsuario').remove();
    $('body #modificaUsuario').remove();
    $('body #creaUsuario').remove();
    $('body #creaGrua').remove();
    $('body #creaTaller').remove();
    cargarListar();
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

