var map;
var marker;
var markersArray = [];

$(document).ready(function () {
    if (!doesConnectionExist()) {
        location.href = "vacantes_favoritas.html";
    }
    if (doesConnectionExist()) {
        $("#label-internet-connection").text("Online");
        $("#div-internet-connection").css("background-color", "#80d580");
    } else {
        $("#label-internet-connection").text("Offline");
        $("#div-internet-connection").css("background-color", "#ec8787");
    }

    cargarDepartamentosCrud();

    $("#txtId").val(localStorage.getItem('id'));
    $("#txtTitulo").val(localStorage.getItem('titulo'));
    $("#selectTipo").val(localStorage.getItem('tipo'));
    $("#txtDescripcion").val(localStorage.getItem('descripcion'));
    $("#selectVacantes").val(localStorage.getItem('numVacantes'));
    $("#txtCargo").val(localStorage.getItem('cargo'));
    $("#selectSalario").val(localStorage.getItem('salario'));
    $("#selectExperiencia").val(localStorage.getItem('experiencia'));
    $("#select_nivel").val(localStorage.getItem('nivel'));
    $("#txtProfesion").val(localStorage.getItem('profesion'));
    $("#departamento").val(localStorage.getItem('departamento'));
    $("#municipio").val(localStorage.getItem('municipio'));
    $("#txtfechaVencimiento").val(getEndDate(localStorage.getItem('fechaVencimiento')));
    $("#txtDireccion").val(localStorage.getItem('direccion'));
    $("#txtCorreo").val(localStorage.getItem('correo'));
    $("#selectIndicativo").val(localStorage.getItem('indicativo'));
    $("#txtTelefono").val(localStorage.getItem('telefono'));
    $("#txtCelular").val(localStorage.getItem('celular'));

    if (localStorage.getItem('latitud') != 0 && localStorage.getItem('longitud') != 0) {
        setTimeout(function () {
            InitializeEdit(localStorage.getItem('latitud'), localStorage.getItem('longitud'));
            $("#divMap").css("display", "block");
        }, 500);
    }
});

$(function() {
    $( "#txtfechaVencimiento" ).datepicker({
        minDate: new Date(),
        maxDate: AddRestrictedDays(15)
    });
});

function AddRestrictedDays(arg) {
    var d = new Date();
    var d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + arg);
    return d;
}

function crearMapa() {
    setTimeout(function() {
        geoCiudad($("#municipio option:selected").html());
    }, 500);
}

function geoCiudad(cityName) {
    var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': ''+ cityName +', co'}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var lat = results[0].geometry.location.lat();
            var lon = results[0].geometry.location.lng();
            InitializeReg(lat, lon);
        } else {
            alert("Something got wrong " + status);
        }
    });
}

function InitializeReg(lat, lon) {

    google.maps.visualRefresh = true;
    var cityCenter = new google.maps.LatLng(lat, lon);

    var mapOptions = {
        zoom: 14,
        center: cityCenter,
        mapTypeId: google.maps.MapTypeId.G_NORMAL_MAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    google.maps.event.addListener(map, "click", function(event)
    {
        placeMarker(event.latLng);
    });
}

function InitializeEdit(lat, lon) {

    google.maps.visualRefresh = true;
    var cityCenter = new google.maps.LatLng(lat, lon);

    var mapOptions = {
        zoom: 14,
        center: cityCenter,
        mapTypeId: google.maps.MapTypeId.G_NORMAL_MAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var myLatlng = new google.maps.LatLng(lat, lon);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    })

    marker.setIcon('images/marker.png');
    markersArray.push(marker);

    google.maps.event.addListener(map, "click", function(event)
    {
        placeMarker(event.latLng);
    });
}

function placeMarker(location) {

    deleteOverlays();

    marker = new google.maps.Marker({
        position: location, 
        map: map
    });

    localStorage.setItem('latitud', location.lat());
    localStorage.setItem('longitud', location.lng());

    marker.setIcon('images/marker.png');
    markersArray.push(marker);
}

function deleteOverlays() {
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
    markersArray.length = 0;
    }
}

function editar()
{
    var id = $("#txtId").val();
    var titulo = $("#txtTitulo").val();
    var tipo = $("#selectTipo").val();
    var tipoTexto = $("#selectTipo option:selected").html();
    var descripcion = $("#txtDescripcion").val();
    var numVacantes = $("#selectVacantes").val();
    var cargo = $("#txtCargo").val();
    var salario = $("#selectSalario").val();
    var experiencia = $("#selectExperiencia").val();
    var experienciaTexto = $("#selectExperiencia option:selected").html();
    var nivel = $("#select_nivel").val();
    var nivelTexto = $("#select_nivel option:selected").html();
    var profesion = $("#txtProfesion").val();
    var salarioTexto = $("#selectSalario option:selected").html();
    var departamento = $("#departamento").val();
    var departamentoTexto = $("#departamento option:selected").html();
    var municipio = $("#municipio").val();
    var municipioTexto = $("#municipio option:selected").html();
    var direccion = $("#txtDireccion").val();
    var correo = $("#txtCorreo").val();
    var indicativo = $("#selectIndicativo").val();
    var telefono = $("#txtTelefono").val();
    var celular = $("#txtCelular").val();
    var fechaVencimiento = $("#txtfechaVencimiento").val();

    if(id && titulo && tipo && descripcion && cargo && departamento != null && municipio != null && correo && telefono && fechaVencimiento) {

        localStorage.setItem('id', id);
        localStorage.setItem('titulo', titulo);
        localStorage.setItem('tipo', tipo);
        localStorage.setItem('descripcion', descripcion);
        localStorage.setItem('numVacantes', numVacantes);
        localStorage.setItem('cargo', cargo);
        localStorage.setItem('salario', salario);
        localStorage.setItem('experiencia', experiencia);
        localStorage.setItem('nivel', nivel);
        localStorage.setItem('profesion', profesion);
        localStorage.setItem('departamento', departamento);
        localStorage.setItem('municipio', municipio);
        localStorage.setItem('direccion', direccion);
        localStorage.setItem('correo', correo);
        localStorage.setItem('indicativo', indicativo);
        localStorage.setItem('telefono', telefono);
        localStorage.setItem('celular', celular);
        localStorage.setItem('fechaVencimiento', fechaVencimiento);

        $("#detalleTitulo").html("<strong>Título:  </strong>" + titulo);
        $("#detalleDesc").html("<strong>Descripción:  </strong>" + descripcion);
        $("#detalleNumVacantes").html("<strong>Número de vacantes:  </strong>" + numVacantes);
        $("#detalleCargo").html("<strong>Cargo:  </strong>" + cargo);
        $("#detalleSalario").html("<strong>Salario:  </strong>" + salarioTexto);
        $("#detalleExperiencia").html("<strong>Experiencia:  </strong>" + experienciaTexto);
        $("#detalleNivel").html("<strong>Nivel:  </strong>" + nivelTexto);
        $("#detalleDepto").html("<strong>Deparatamento:  </strong>" + departamentoTexto);
        $("#detalleMuni").html("<strong>Municipio:  </strong>" + municipioTexto);
        $("#detalleCorreo").html("<strong>Correo:  </strong>" + correo);
        $("#detalleTelefono").html("<strong>Teléfono:  </strong>" + telefono);
        $("#detalleFechaPublicacion").html("<strong>Fecha publicación:  </strong>" + getEndDate(new Date()));
        $("#detalleFechaVencimiento").html("<strong>Fecha vencimiento:  </strong>" + fechaVencimiento);

        $("#formularioVacante").css("display", "none");
        $("#detalleVacante").css("display", "block");
    }
}

function modificarVacante() {

    MostrarDivCargando();

    var vacante = new Object();
    vacante.ID = localStorage.getItem('id');
    vacante.Titulo = localStorage.getItem('titulo');
    vacante.TipoID = localStorage.getItem('tipo');
    vacante.Descripcion = localStorage.getItem('descripcion');
    vacante.Num_vacantes = localStorage.getItem('numVacantes');
    vacante.Cargo = localStorage.getItem('cargo');
    vacante.SalarioID = localStorage.getItem('salario');
    vacante.ExperienciaID = localStorage.getItem('experiencia');
    vacante.Nivel_estudiosID = localStorage.getItem('nivel');
    vacante.Profesion = localStorage.getItem('profesion');
    vacante.Municipio = localStorage.getItem('municipio');
    vacante.Departamento = localStorage.getItem('departamento');
    vacante.Fecha_vencimiento = localStorage.getItem('fechaVencimiento') + " 23:59:59";
    vacante.Direccion = localStorage.getItem('direccion');
    vacante.Email = localStorage.getItem('correo');
    vacante.Indicativo = localStorage.getItem('indicativo');
    vacante.Telefono = localStorage.getItem('telefono');
    vacante.Celular = localStorage.getItem('celular');

    if(localStorage.getItem('latitud') != 0 && localStorage.getItem('longitud') != 0) {
        vacante.Latitud = localStorage.getItem('latitud');
        vacante.Longitud = localStorage.getItem('longitud');
    }
    else {
        vacante.Latitud = "0";
        vacante.Longitud = "0";
    }

    vacante.Empleador = localStorage.getItem("nombreUsuario");

    $.ajax({
        url: 'http://apiempleo.apphb.com/api/Vacante/modificarVacante',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(vacante),
        success: function (data, textStatus, xhr) {
            abrirConfirm("la vacante ha sido modificada exitosamente!!");
            OcultarDivCargando();
        },
        error: function (xhr, textStatus, errorThrown) {
            abrirAlert("Ha ocurrido un problema, inténtelo nuevamente.");
            OcultarDivCargando();
        }
    });
}

function regresar()
{
    $("#detalleVacante").css("display", "none");
    $("#formularioVacante").css("display", "block");
    $("#contactForm").show();
}

function gestionarVacantes() {
    document.location.href = "lista_ofertas_empleador.html";
}

function regresarListado() {
    document.location.href = "lista_ofertas_empleador.html";
}

function getEndDate(fecha) {
    var today = new Date(fecha);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if(dd < 10) {
        dd = '0' + dd;
    } 

    if(mm < 10) {
        mm = '0' + mm
    } 

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}