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
var modalRecepcion=document.getElementById("myModalRecepcion");
var response;
var modalError1=document.getElementById("myModalError1");
var modalFinal=document.getElementById("myModalFinal");
var modalFinal2=document.getElementById("myModalFinal2");
cargaNavbar();
$('body').on('click','#listSiniestro',function () {
    $('body #recepcion').remove();
    $('body #creaUsuario').remove();
    $('body #listadoUsuario').remove();
    $('body #creaGrua').remove();
    $('body #creaTaller').remove();
    cargarSiniestros();
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
$("body").on("click", ".close", function () {
   modalRecepcion.style.display="none";
   modalError1.style.display = "none";
    modalFinal2.style.display = "none";
   $("body #listSiniestro").click();
});
$("body").on("click","#btnCerrar1", function () {
    modalError1.style.display = "none";
});
$("body").on("click","#btnCerrar2", function () {
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
                            tdHTML +='<tr><td>' + item.idSiniestro+'</td><td class="hidden">' + item.taller.rutTaller+'</td><td class="hidden">' + item.idEstado+'</td><td class="hidden">' + item.persona.rut+'</td><td class="hidden">' + item.grua.numeroChasis+'</td><td>' + item.persona.nombre+'</td><td>' + item.fechaIngreso+'</td><td><a href="#" onclick="cargaActa($(this).parent().parent());">Generar Acta de Recepción</a></td></tr>';
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
            var d1 = new Date();
            var y1= d1.getFullYear();
            var m1 = d1.getMonth()+1;
            if(m1<10)
                m1="0"+m1;
            var dt1 = d1.getDate();
            if(dt1<10)
                dt1 = "0"+dt1;
            var d2 = y1+"-"+m1+"-"+dt1;
            $("#fechaIngresoM").val(d2);
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
                                        var estado = {
                                            idEstado: item.find('td:eq(2)').text(),
                                            idTipoEstado: 3,
                                            costo : 0,
                                            idSiniestro : idSiniestro,
                                            rut : item.find('td:eq(3)').text(),
                                            rutTaller : item.find('td:eq(1)').text(),
                                            fechaIngreso : item.find('td:eq(6)').text(),
                                            fechaEntrega : item.find('td:eq(6)').text(),
                                            numeroChasis : item.find('td:eq(4)').text()

                                        };
                                        var estadoParseado = JSON.stringify(estado);

                                        $.ajax({
                                            url : "/administradorTaller/crear/estado/",
                                            type : "POST",
                                            data: {estado: estadoParseado},
                                            error : function () {
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
                                                    console.log(historia);
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
                                                    $('#errorModal1').text("No se pudo crear el Acta Recepción, favor inténtelo más tarde");
                                                    modalError1.style.display = "block";
                                                }
                                            }
                                        });
                                    }
                                },
                                error : function () {

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

