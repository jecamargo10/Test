/* 
 * 
 * 
 * 
 */
var sesion = localStorage.getItem("sesion");
if(sesion.localeCompare("false") === 0)
{
    window.location = "index.jsp";
}

$('#cerrar').click( function() { 
    localStorage.setItem("sesion", false);
    localStorage.setItem("rol", "");
    localStorage.setItem("idMun", "");
    window.location = "index.jsp";
});

var parametroURLFiltro = "TODOSDPTOS";
var parametroCualId = "";

var rolUsuario = localStorage.getItem("rol");

if(rolUsuario.localeCompare("ADMIN") === 0){
    document.getElementById("totalAccidentesTodosDptos").style.display = "block";
} else if(rolUsuario.localeCompare("SUBIR") === 0) {
    window.location = "upload.jsp";
} else if(rolUsuario.localeCompare("ANON") === 0) {

    document.getElementById("ajustesDiv").style.display = "none";
    document.getElementById("adminConsole").style.display = "none";

    document.getElementById("totalAccidentesUnMunicipio").style.display = "block";

    parametroURLFiltro = "MUNIC";
    parametroCualId = localStorage.getItem("idMun");


    document.getElementById("textoSeleccionActualAccidentalidad").innerHTML = "Municipio: " + localStorage.getItem("nomMun");
} else if(rolUsuario.localeCompare("UNICVER") === 0) {
    document.getElementById("ajustesDiv").innerHTML = "";
    document.getElementById("cargarDiv").style.display = "none";
    document.getElementById("divisionCargar").style.display = "none";
}


 var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

 var hoy = new Date();
 var stringStart = "";
 var startYear = hoy.getFullYear();
 var startMonth = "01";
 var startDay = "01";

 var stringEnd = "";
 var endYear = hoy.getFullYear();
 var endMonth = hoy.getMonth() + 1;
 var endDay = hoy.getDate();

 var stringStart2 = "";
 var startYear2 = hoy.getFullYear();
 var startMonth2 = "01";
 var startDay2 = "01";

 var stringEnd2 = "";
 var endYear2 = hoy.getFullYear();
 var endMonth2 = hoy.getMonth() + 1;
 var endDay2 = hoy.getDate();

var usingTwoRanges = false;
var historico = false;
//AJAX METHOD
self.ajax = function(uri, method, data) {
    var request = {
        url: uri,
        type: method,
        contentType: "application/json",
        accepts: "application/json",
        cache: false,
        dataType: 'json',
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
//                    xhr.setRequestHeader("Authorization", 
//                        "Basic " + btoa(self.username + ":" + self.password));
        },
        error: function(jqXHR) {
            console.log("ajax error " + jqXHR.status +" and "+ jqXHR);
        }
    };
    return $.ajax(request);
};
//SET UP DATE PICKER
$('#calendar').datepicker({});
! function ($) {
    $(document).on("click", "ul.nav li.parent > a > span.icon", function () {
        $(this).find('em:first').toggleClass("glyphicon-minus");
    });
    $(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");
}(window.jQuery);
$(window).on('resize', function () {
    if ($(window).width() > 768) $('#sidebar-collapse').collapse('show');
});
$(window).on('resize', function () {
    if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide');
});
// DOCUMENT READY
$(document).ready(function () {

    $('.demo i').click(function () {
        $(this).parent().find('input').click();
    });

    $('.demo2 i').click(function () {
        $(this).parent().find('input').click();
    });

    if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {

         totalAccidentesKPI12();
         accidentesTotalesTodosDptos();
         accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
         accidentesPorTiempoAtencion();
         edades(document.getElementById("edadTipo"));
         promedioAccidentesTipo(document.getElementById("edadTipo"));

    } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {

             totalAccidentesKPI12();
             accidentesTotales();
             accidentesTotalesMes();
             accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
             accidentesPorTiempoAtencion();
             edades(document.getElementById("edadTipo"));
             promedioAccidentesTipo(document.getElementById("edadTipo"));

    } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {

             totalAccidentesKPI12();
             accidentesTotalesTodosMunics();
             accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
             accidentesPorTiempoAtencion();
             edades(document.getElementById("edadTipo"));
             promedioAccidentesTipo(document.getElementById("edadTipo"));

    }

    $('#demo').daterangepicker({
        "showDropdowns": true,
        "autoApply": true,
        "drops": "down",
        locale: {
            format: 'DD/MM/YYYY'
        },
        "startDate": "01/" + startMonth + "/" + startYear,
        "endDate": endDay + "/" + endMonth + "/" + endYear,
        "opens": "right"
    }, function (start, end, label) {

        stringStart = start.format('YYYY-MM-DD');
        startYear = stringStart.split("-")[0];
        startMonth = stringStart.split("-")[1];
        startDay = stringStart.split("-")[2];

        stringEnd = end.format('YYYY-MM-DD');
        endYear = stringEnd.split("-")[0];
        endMonth = stringEnd.split("-")[1];
        endDay = stringEnd.split("-")[2];
        
        document.getElementById("mostrarHistorico").className = "btn btn-default";

        if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {

          totalAccidentesKPI12();
          accidentesTotalesTodosDptos();
          accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
          accidentesPorTiempoAtencion();
          edades(document.getElementById("edadTipo"));
          promedioAccidentesTipo(document.getElementById("edadTipo"));
        } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
                 totalAccidentesKPI12();
                 accidentesTotales();
                 accidentesTotalesMes();
                 accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
                 accidentesPorTiempoAtencion();
                 edades(document.getElementById("edadTipo"));
                 promedioAccidentesTipo(document.getElementById("edadTipo"));
        } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
                 totalAccidentesKPI12();
                 accidentesTotalesTodosMunics();
                 accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
                 accidentesPorTiempoAtencion();
                 edades(document.getElementById("edadTipo"));
                 promedioAccidentesTipo(document.getElementById("edadTipo"));
        }
    });

    $('#demo2').daterangepicker({
        "showDropdowns": true,
        "autoApply": true,
        "drops": "down",
        locale: {
            format: 'DD/MM/YYYY'
        },
        "startDate": "01/" + startMonth2 + "/" + startYear2,
        "endDate": endDay2 + "/" + endMonth2 + "/" + endYear2,
        "opens": "right"
    }, function (start, end, label) {

        usingTwoRanges = true;

        stringStart2 = start.format('YYYY-MM-DD');
        startYear2 = stringStart2.split("-")[0];
        startMonth2 = stringStart2.split("-")[1];
        startDay2 = stringStart2.split("-")[2];

        stringEnd2 = end.format('YYYY-MM-DD');
        endYear2 = stringEnd2.split("-")[0];
        endMonth2 = stringEnd2.split("-")[1];
        endDay2 = stringEnd2.split("-")[2];


        document.getElementById("labelRango2").style.display = "block";
        document.getElementById("espacio").style.display = "none";
        document.getElementById("secondRangeButton").className = "btn btn-primary";
        document.getElementById("mostrarHistorico").className = "btn btn-default";

        if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {

          totalAccidentesKPI12();
          accidentesTotalesTodosDptos();
          accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
          accidentesPorTiempoAtencion();
          edades(document.getElementById("edadTipo"));
          promedioAccidentesTipo(document.getElementById("edadTipo"));

        } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {

                 totalAccidentesKPI12();
                 accidentesTotales();
                 accidentesTotalesMes();
                 accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
                 accidentesPorTiempoAtencion();
                 edades(document.getElementById("edadTipo"));
                 promedioAccidentesTipo(document.getElementById("edadTipo"));

        } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {

                 totalAccidentesKPI12();
                 accidentesTotalesTodosMunics();
                 accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
                 accidentesPorTiempoAtencion();
                 edades(document.getElementById("edadTipo"));
                 promedioAccidentesTipo(document.getElementById("edadTipo"));


        }
    });
});
function adminConsoleChange(seleccion) {

    document.getElementById("totalAccidentesTodosDptos").style.display = "none";
    document.getElementById("totalAccidentesUnMunicipio").style.display = "none";
    document.getElementById("totalAccidentesMunics").style.display = "none";


    if(seleccion.localeCompare("TODOSDPTOS") === 0){
        parametroURLFiltro = "TODOSDPTOS";
        parametroCualId = "X";

        document.getElementById("textoSeleccionActualAccidentalidad").innerHTML = "Todos los Departamentos";
        document.getElementById("totalAccidentesTodosDptos").style.display = "block";

        totalAccidentesKPI12();
        accidentesTotalesTodosDptos();
        accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
        accidentesPorTiempoAtencion();
        edades(document.getElementById("edadTipo"));
        promedioAccidentesTipo(document.getElementById("edadTipo"));

    } else if(seleccion.localeCompare("DPTOID") === 0) {

        parametroURLFiltro = "DPTO";
        parametroCualId = document.getElementById("departamentosSelect").value;

        document.getElementById("textoSeleccionActualAccidentalidad").innerHTML = "Departamento: " + parametroCualId;
        document.getElementById("totalAccidentesMunics").style.display = "block";
        
        totalAccidentesKPI12();
        accidentesTotalesTodosMunics();
        accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
        accidentesPorTiempoAtencion();
        edades(document.getElementById("edadTipo"));
        promedioAccidentesTipo(document.getElementById("edadTipo"));

    } else if(seleccion.localeCompare("MUNICID") === 0) {

        parametroURLFiltro = "MUNIC";
        parametroCualId = document.getElementById("municipiosSelect").value;

        var munSelect = document.getElementById("municipiosSelect");
        var munText = munSelect.options[munSelect.selectedIndex].text;

        document.getElementById("textoSeleccionActualAccidentalidad").innerHTML = "Municipio: " + munText;
        document.getElementById("totalAccidentesUnMunicipio").style.display = "block";

        totalAccidentesKPI12();
        accidentesTotales();
        accidentesTotalesMes();
        accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
        accidentesPorTiempoAtencion();
        edades(document.getElementById("edadTipo"));
        promedioAccidentesTipo(document.getElementById("edadTipo"));

    }

    return false;

}
function cargarMunicipios(){
    var dpto = document.getElementById("departamentosSelect").value;
    document.getElementById("totalAccidentesTodosDptos").style.display = "none";
    document.getElementById("totalAccidentesUnMunicipio").style.display = "none";
    document.getElementById("totalAccidentesMunics").style.display = "none";
    if(dpto.localeCompare("TODOS") === 0) {
        parametroURLFiltro = "TODOSDPTOS";
        parametroCualId = "X";

        document.getElementById("textoSeleccionActualAccidentalidad").innerHTML = "Todos los Departamentos";
        document.getElementById("totalAccidentesTodosDptos").style.display = "block";

        totalAccidentesKPI12();
        accidentesTotalesTodosDptos();
        accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
        accidentesPorTiempoAtencion();
        edades(document.getElementById("edadTipo"));
        promedioAccidentesTipo(document.getElementById("edadTipo"));
    } else {
        parametroURLFiltro = "DPTO";
        parametroCualId = document.getElementById("departamentosSelect").value;

        document.getElementById("textoSeleccionActualAccidentalidad").innerHTML = "Departamento: " + parametroCualId;
        document.getElementById("totalAccidentesMunics").style.display = "block";

        totalAccidentesKPI12();
        accidentesTotalesTodosMunics();
        accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
        accidentesPorTiempoAtencion();
        edades(document.getElementById("edadTipo"));
        promedioAccidentesTipo(document.getElementById("edadTipo"));
    }
        if(dpto.localeCompare("CALDAS") === 0)
        {
            var mun = document.getElementById("municipiosSelect");
            mun.innerHTML="<option value=\"0\">Elegir un municipio</option><option value=\"17001000\">Manizales</option><option value=\"17013000\">Aguadas</option><option value=\"17042000\">Anserma</option><option value=\"17050000\">Aranzazu</option><option value=\"17174000\">Chinchina</option><option value=\"17380000\">La Dorada</option><option value=\"17433000\">Manzanares</option><option value=\"17174000\">Riosucio</option><option value=\"17653000\">Salamina</option><option value=\"17873000\">VillamarÃ­a</option>";
        } else if(dpto.localeCompare("CAUCA") === 0)
        {
            var mun = document.getElementById("municipiosSelect");
            mun.innerHTML="<option value=\"0\">Elegir un municipio</option><option value=\"19001000\">PopayÃ¡n</option><option value=\"19130000\">Cajibio</option><option value=\"19137000\">Caldono</option><option value=\"19142000\">Caloto</option><option value=\"19450000\">Mercaderes</option><option value=\"19455000\">Miranda</option><option value=\"19532000\">Patia</option><option value=\"19548000\">Piendamo</option><option value=\"19573000\">Puerto Tejada</option><option value=\"19622000\">Rosas</option><option value=\"19698000\">Santander de Quilichao</option><option value=\"19720000\">Santander</option><option value=\"19807000\">Timbio</option><option value=\"19824000\">Totoro</option><option value=\"19873000\">Villa Rica</option>";
        } else if(dpto.localeCompare("NARINO") === 0)
        {
            var mun = document.getElementById("municipiosSelect");
            mun.innerHTML="<option value=\"0\">Elegir un municipio</option><option value=\"52001000\">Pasto</option><option value=\"52110000\">Buesaco</option><option value=\"52317000\">Guachucal</option><option value=\"52354000\">Imues</option><option value=\"52356000\">Ipiales</option><option value=\"52399000\">La UniÃ³n</option><option value=\"52480000\">NariÃ±o</option><option value=\"52788000\">Tangua</option><option value=\"52585000\">Pupiales</option><option value=\"52678000\">Samaniego</option><option value=\"52683000\">Sandona</option><option value=\"52835000\">Tumaco</option><option value=\"52838000\">Tuquerres</option>";
        } else if(dpto.localeCompare("QUINDIO") === 0)
        {
            var mun = document.getElementById("municipiosSelect");
            mun.innerHTML="<option value=\"0\">Elegir un municipio</option><option value=\"63001000\">Armenia</option><option value=\"63130000\">Calarca</option><option value=\"63190001\">Circasia</option><option value=\"63272000\">Finlandia</option><option value=\"63401000\">La Tebaida</option><option value=\"63594000\">Quimbaya</option>";
        } else if(dpto.localeCompare("RISARALDA") === 0)
        {
            var mun = document.getElementById("municipiosSelect");
            mun.innerHTML="<option value=\"0\">Elegir un municipio</option><option value=\"66001000\">Pereira</option><option value=\"66170000\">Dos Quebradas</option><option value=\"66400000\">La Virginia</option><option value=\"66594000\">Quinchia</option><option value=\"66682000\">Santa Rosa de Cabal</option>";
        } else if(dpto.localeCompare("VALLE") === 0)
        {
            var mun = document.getElementById("municipiosSelect");
            mun.innerHTML="<option value=\"0\">Elegir un municipio</option><option value=\"76001000\">Cali</option><option value=\"76036000\">AndalucÃ­a</option><option value=\"76109000\">Buenaventura</option><option value=\"76111000\">Buga</option><option value=\"76122000\">Caicedonia</option><option value=\"76130000\">Candelaria</option><option value=\"76147000\">Cartago</option><option value=\"76248000\">El Cerrito</option><option value=\"76275000\">Florida</option><option value=\"76306000\">Ginebra</option><option value=\"76318000\">Guacari</option><option value=\"76364\">Jamundi</option><option value=\"76400000\">La Union</option><option value=\"76520000\">Palmira</option><option value=\"76622000\">Roldanillo</option><option value=\"76670000\">San Pedro</option><option value=\"76736\">Sevilla</option><option value=\"76834000\">Tulua</option><option value=\"76890000\">Yotoco</option><option value=\"76892000\">Yumbo</option><option value=\"76895000\">Zarzal</option>";
        }
        return false;
}
function difDias(primera, segunda) {
    return Math.round((segunda-primera)/(1000*60*60*24));
}
//-------------------------------------------------------------------------------------------------------
// ACCIDENTES TOTALES
//-------------------------------------------------------------------------------------------------------
function totalAccidentesKPI12(){
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/totalesAccidentes?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    var stringGET2 = "";
    if(usingTwoRanges || historico)
        stringGET2 = "/webresources/kpis/totalesAccidentes?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    else
        stringGET2 = "/webresources/kpis/totalesAccidentes?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ (startYear-1) +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + (endYear - 1)  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges) {
            self.ajax(stringGET2, 'GET').done(function(data2) {
                data = data.toLocaleString();
                data2 = data2.toLocaleString();
                if(parseFloat(data) > parseFloat(data2))
                    document.getElementById("totalAccidentes1").innerHTML = "<span style=\"color: green\">" + data + "</span> vs <span style=\"color: red\">" + data2 + "</span>";
                else if(parseFloat(data) < parseFloat(data2))
                    document.getElementById("totalAccidentes1").innerHTML = "<span style=\"color: red\">" + data + "</span> vs <span style=\"color: green\">" + data2 + "</span>";
                else
                    document.getElementById("totalAccidentes1").innerHTML = "<span style=\"color: black\">" + data + "</span> vs <span style=\"color: black\">" + data2 + "</span>";
            });
        } else {
            data = data.toLocaleString();
            document.getElementById("totalAccidentes1").innerHTML = data;
        }
    });

    return false;
}
//-------------------------------------------------------------------------------------------------------
// PROMEDIO TIEMPO DE ATENCIÃ“N
//-------------------------------------------------------------------------------------------------------
function accidentesPorTiempoAtencion() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/AVGtiempoAtencionAccidentes?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    var stringGET2 = "/webresources/kpis/AVGtiempoAtencionAccidentes?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges) {
            self.ajax(stringGET2, 'GET').done(function(data2) {
                var segundos = parseFloat(data)*60;
                var hours = parseInt( segundos / 3600 ) % 24;
                var minutes = parseInt( segundos / 60 ) % 60;
                var seconds = segundos % 60;

                var resultado = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + Math.round(seconds) : Math.round(seconds));

                var segundos2 = parseFloat(data2)*60;
                var hours2 = parseInt( segundos2 / 3600 ) % 24;
                var minutes2 = parseInt( segundos2 / 60 ) % 60;
                var seconds2 = segundos2 % 60;

                var resultado2 = (hours2 < 10 ? "0" + hours2 : hours2) + ":" + (minutes2 < 10 ? "0" + Math.round(minutes2) : Math.round(minutes2)) + ":" + (Math.round(seconds2)  < 10 ? "0" + Math.round(seconds2) : Math.round(seconds2));
                if(segundos > segundos2) 
                    document.getElementById("promedioTiempoAtencion").innerHTML = "<span style=\"color: green\">"+resultado+"</span> vs <span style=\"color: red\">"+resultado2+"</span>";
                else if(segundos < segundos2)
                    document.getElementById("promedioTiempoAtencion").innerHTML = "<span style=\"color: red\">"+resultado+"</span> vs <span style=\"color: green\">"+resultado2+"</span>";
                else
                    document.getElementById("promedioTiempoAtencion").innerHTML = "<span style=\"color: black\">"+resultado+"</span> vs <span style=\"color: black\">"+resultado2+"</span>";
            });
        } else {
                var segundos = parseFloat(data)*60;
                var hours = parseInt( segundos / 3600 ) % 24;
                var minutes = parseInt( segundos / 60 ) % 60;
                var seconds = segundos % 60;

                var resultado = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + Math.round(minutes) : Math.round(minutes)) + ":" + (seconds  < 10 ? "0" + Math.round(seconds) : Math.round(seconds));

                document.getElementById("promedioTiempoAtencion").innerHTML = resultado;
        }
    });            
    return false;            
}
//-------------------------------------------------------------------------------------------------------
// ACCIDENTES POR DEPARTAMENTO
//-------------------------------------------------------------------------------------------------------
var chartKPITotalAccidentesDptos;
function accidentesTotalesTodosDptos() {
    //var tipoAccidente = document.getElementById("gravedadDepartamento").value;
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=TOTDEPTOSGRAV&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
         chartKPITotalAccidentesDptos = AmCharts.makeChart("chartDivTotalDptos",
                        {
                            "type": "serial",
                            "categoryField": "Departamento",
                            "maxSelectedSeries": 8,
                            "zoomOutText": "",
                            "startDuration": 1,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Departamento"
                            },
                            "trendLines": [],
                            "graphs": [
                                    {
                                            "balloonText": "[[title]] of [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos"
                                    },
                                    {
                                            "balloonText": "[[title]] of [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos"
                                    }
                            ],
                            "guides": [],
                            "valueAxes": [
                                    {
                                            "id": "ValueAxis-1",
                                            "stackType": "regular",
                                            "title": "Cantidad de accidentes"
                                    }
                            ],
                            "allLabels": [],
                            "balloon": {},
                            "legend": {
                                    "enabled": true,
                                    "useGraphSettings": true
                            },
                            "titles": [
                                    {
                                            "id": "Title-1",
                                            "size": 15,
                                            "text": "Accidentes por tipo y departamento"
                                    }
                            ],
                            "dataProvider": data,
                            "export": {
                                   "enabled": true,
                                   "menu": []
                            }
                        }
                );

                AmCharts.checkEmptyData(chartKPITotalAccidentesDptos);

        } else {

            var stringGET2 = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=TOTDEPTOSGRAV&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

            self.ajax(stringGET2, 'GET').done(function(data2) {

                combinarArrays(data, data2, 'Con muertos', 'Con muertos R2', 'Departamento');
                combinarArrays(data, data2, 'Con heridos', 'Con heridos R2', 'Departamento');
                combinarArrays(data, data2, 'Solo danos', 'Solo danos R2', 'Departamento');
               //var finalData = mergeObjArraysPorMes(data, data2);
                //var finalData = data.concat(data2);
                console.log(data);
                chartKPITotalAccidentesDptos = AmCharts.makeChart("chartDivTotalDptos",
                        {
                            "type": "serial",
                            "categoryField": "Departamento",
                            "maxSelectedSeries": 8,
                            "zoomOutText": "",
                            "startDuration": 1,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Departamento"
                            },
                            "trendLines": [],
                            "graphs": [
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os "+ startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os "+ startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos R2"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos "+ startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos " + startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos R2"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos "+ startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos "+ startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos R2"
                                    }
                            ],
                            "guides": [],
                            "valueAxes": [
                                    {
                                            "id": "ValueAxis-1",
                                            "stackType": "regular",
                                            "title": "Cantidad de accidentes"
                                    },
                                    {
                                            "id": "ValueAxis-2",
                                            "stackType": "regular",
                                            "title": ""
                                    }
                            ],
                            "allLabels": [],
                            "balloon": {},
                            "legend": {
                                    "enabled": true,
                                    "useGraphSettings": true
                            },
                            "titles": [
                                    {
                                            "id": "Title-1",
                                            "size": 15,
                                            "text": "Accidentes por tipo y departamento"
                                    }
                            ],
                            "dataProvider": data,
                            "export": {
                                   "enabled": true,
                                   "menu": []
                            }
                        }
                );

                AmCharts.checkEmptyData(chartKPITotalAccidentesDptos);
            });

        }
    });

    return false;

}
//-------------------------------------------------------------------------------------------------------
// ACCIDENTES POR MUNICIPIO
//-------------------------------------------------------------------------------------------------------
var chartKPITotalAccidentesMunics;
function accidentesTotalesTodosMunics() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=TOTMUNICGRAV&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
         chartKPITotalAccidentesMunics = AmCharts.makeChart("chartDivTotalMunics",
                        {
                            "type": "serial",
                            "categoryField": "Municipio",
                            "maxSelectedSeries": 8,
                            "zoomOutText": "",
                            "startDuration": 1,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Municipio"
                            },
                            "trendLines": [],
                            "graphs": [
                                    {
                                            "balloonText": "[[title]] of [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos"
                                    },
                                    {
                                            "balloonText": "[[title]] of [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos"
                                    }
                            ],
                            "guides": [],
                            "valueAxes": [
                                    {
                                            "id": "ValueAxis-1",
                                            "stackType": "regular",
                                            "title": "Cantidad de accidentes"
                                    }
                            ],
                            "allLabels": [],
                            "balloon": {},
                            "legend": {
                                    "enabled": true,
                                    "useGraphSettings": true
                            },
                            "titles": [
                                    {
                                            "id": "Title-1",
                                            "size": 15,
                                            "text": "Accidentes por tipo y municipio"
                                    }
                            ],
                            "dataProvider": data,
                            "export": {
                                   "enabled": true,
                                   "menu": []
                            }
                        }
                );

                AmCharts.checkEmptyData(chartKPITotalAccidentesMunics);

        } else {

            var stringGET2 = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=TOTMUNICGRAV&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

            self.ajax(stringGET2, 'GET').done(function(data2) {

                combinarArrays(data, data2, 'Con muertos', 'Con muertos R2', 'Municipio');
                combinarArrays(data, data2, 'Con heridos', 'Con heridos R2', 'Municipio');
                combinarArrays(data, data2, 'Solo danos', 'Solo danos R2', 'Municipio');

               //var finalData = mergeObjArraysPorMes(data, data2);
                //var finalData = data.concat(data2);
                console.log(data);
                chartKPITotalAccidentesMunics = AmCharts.makeChart("chartDivTotalMunics",
                        {
                            "type": "serial",
                            "categoryField": "Municipio",
                            "maxSelectedSeries": 8,
                            "zoomOutText": "",
                            "startDuration": 1,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Municipio"
                            },
                            "trendLines": [],
                            "graphs": [
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os "+ startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os "+ startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos R2"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos "+ startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos "+ startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos R2"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos "+ startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos "+ startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos R2"
                                    }
                            ],
                            "guides": [],
                            "valueAxes": [
                                    {
                                            "id": "ValueAxis-1",
                                            "stackType": "regular",
                                            "title": "Cantidad de accidentes"
                                    },
                                    {
                                            "id": "ValueAxis-2",
                                            "stackType": "regular",
                                            "title": ""
                                    }
                            ],
                            "allLabels": [],
                            "balloon": {},
                            "legend": {
                                    "enabled": true,
                                    "useGraphSettings": true
                            },
                            "titles": [
                                    {
                                            "id": "Title-1",
                                            "size": 15,
                                            "text": "Accidentes por tipo y municipio"
                                    }
                            ],
                            "dataProvider": data,
                            "export": {
                                   "enabled": true,
                                   "menu": []
                            }
                        }
                );

                AmCharts.checkEmptyData(chartKPITotalAccidentesMunics);
            });

        }
    });

    return false;
}
//-------------------------------------------------------------------------------------------------------
// ACCIDENTES POR AÃ‘O
//-------------------------------------------------------------------------------------------------------
var chartKPI13;
function accidentesTotales() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=TOTANIO&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
         chartKPI13 = AmCharts.makeChart("chartDiv",
                        {
                            "type": "serial",
                            "categoryField": "Mes",
                            "maxSelectedSeries": 8,
                            "zoomOutText": "",
                            "startDuration": 1,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "AÃ±o"
                            },
                            "trendLines": [],
                            "graphs": [
                                    {
                                            "balloonText": "[[title]] of [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos"
                                    },
                                    {
                                            "balloonText": "[[title]] of [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos"
                                    }
                            ],
                            "guides": [],
                            "valueAxes": [
                                    {
                                            "id": "ValueAxis-1",
                                            "stackType": "regular",
                                            "title": "Cantidad de accidentes"
                                    }
                            ],
                            "allLabels": [],
                            "balloon": {},
                            "legend": {
                                    "enabled": true,
                                    "useGraphSettings": true
                            },
                            "titles": [
                                    {
                                            "id": "Title-1",
                                            "size": 15,
                                            "text": "Accidentes por tipo y aÃ±o"
                                    }
                            ],
                            "dataProvider": data,
                            "export": {
                                   "enabled": true,
                                   "menu": []
                            }
                        }
                );

                AmCharts.checkEmptyData(chartKPI13);

        } else {

            var stringGET2 = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=TOTANIO&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

            self.ajax(stringGET2, 'GET').done(function(data2) {

                combinarArrays(data, data2, 'Con muertos', 'Con muertos R2', 'Mes');
                combinarArrays(data, data2, 'Con heridos', 'Con heridos R2', 'Mes');
                combinarArrays(data, data2, 'Solo danos', 'Solo danos R2', 'Mes');
                console.log(data);
                chartKPI13 = AmCharts.makeChart("chartDiv",
                        {
                            "type": "serial",
                            "categoryField": "Mes",
                            "maxSelectedSeries": 8,
                            "zoomOutText": "",
                            "startDuration": 1,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "AÃ±o"
                            },
                            "trendLines": [],
                            "graphs": [
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os "+ startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os "+ startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos R2"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos "+ startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos "+ startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos R2"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos "+ startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos "+ startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos R2"
                                    }
                            ],
                            "guides": [],
                            "valueAxes": [
                                    {
                                            "id": "ValueAxis-1",
                                            "stackType": "regular",
                                            "title": "Cantidad de accidentes"
                                    },
                                    {
                                            "id": "ValueAxis-2",
                                            "stackType": "regular",
                                            "title": ""
                                    }
                            ],
                            "allLabels": [],
                            "balloon": {},
                            "legend": {
                                    "enabled": true,
                                    "useGraphSettings": true
                            },
                            "titles": [
                                    {
                                            "id": "Title-1",
                                            "size": 15,
                                            "text": "Accidentes por tipo y aÃ±o"
                                    }
                            ],
                            "dataProvider": data,
                            "export": {
                                   "enabled": true,
                                   "menu": []
                            }
                        }
                );

                AmCharts.checkEmptyData(chartKPI13);
            });

        }
    });
    return false;
}
//-------------------------------------------------------------------------------------------------------
// ACCIDENTES POR MES
//-------------------------------------------------------------------------------------------------------
var chartKPI13Mes;
function accidentesTotalesMes() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=TOTMESANIOFULL&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
         chartKPI13Mes = AmCharts.makeChart("chartDivMes",
                        {
                            "type": "serial",
                            "categoryField": "Mes",
                            "maxSelectedSeries": 8,
                            "zoomOutText": "",
                            "startDuration": 1,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Mes"
                            },
                            "trendLines": [],
                            "graphs": [
                                    {
                                            "balloonText": "[[title]] of [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos"
                                    },
                                    {
                                            "balloonText": "[[title]] of [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos",
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos"
                                    }
                            ],
                            "guides": [],
                            "valueAxes": [
                                    {
                                            "id": "ValueAxis-1",
                                            "stackType": "regular",
                                            "title": "Cantidad de accidentes"
                                    }
                            ],
                            "allLabels": [],
                            "balloon": {},
                            "legend": {
                                    "enabled": true,
                                    "useGraphSettings": true
                            },
                            "titles": [
                                    {
                                            "id": "Title-1",
                                            "size": 15,
                                            "text": "Accidentes por tipo y mes"
                                    }
                            ],
                            "dataProvider": data,
                            "export": {
                                   "enabled": true,
                                   "menu": []
                            }
                        }
                );

                AmCharts.checkEmptyData(chartKPI13Mes);

        } else {

            var stringGET2 = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=MESACCC&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
            var stringGET = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=MESACCC&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
            self.ajax(stringGET2, 'GET').done(function(data2) {
                self.ajax(stringGET, 'GET').done(function(data) {
                combinarArrays(data, data2, 'Con muertos', 'Con muertos R2', 'Mes');
                combinarArrays(data, data2, 'Con heridos', 'Con heridos R2', 'Mes');
                combinarArrays(data, data2, 'Solo danos', 'Solo danos R2', 'Mes');
                console.log(data);
                chartKPI13Mes = AmCharts.makeChart("chartDivMes",
                        {
                            "type": "serial",
                            "categoryField": "Mes",
                            "maxSelectedSeries": 8,
                            "zoomOutText": "",
                            "startDuration": 1,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Mes"
                            },
                            "trendLines": [],
                            "graphs": [
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os " + startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "title": "Solo daÃ±os " + startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Solo danos R2"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos " + startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-2",
                                            "title": "Con heridos " + startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Con heridos R2"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos " + startYear + "-" + endYear,
                                            "type": "column",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-4",
                                            "title": "Con muertos " + startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-2",
                                            "labelText": "[[value]]",
                                            "valueField": "Con muertos R2"
                                    }
                            ],
                            "guides": [],
                            "valueAxes": [
                                    {
                                            "id": "ValueAxis-1",
                                            "stackType": "regular",
                                            "title": "Cantidad de accidentes"
                                    },
                                    {
                                            "id": "ValueAxis-2",
                                            "stackType": "regular",
                                            "title": "Accidentes por tipo y mes"
                                    }
                            ],
                            "allLabels": [],
                            "balloon": {},
                            "legend": {
                                    "enabled": true,
                                    "useGraphSettings": true
                            },
                            "titles": [
                                    {
                                            "id": "Title-1",
                                            "size": 15,
                                            "text": ""
                                    }
                            ],
                            "dataProvider": data,
                            "export": {
                                   "enabled": true,
                                   "menu": []
                            }
                        }
                );

                AmCharts.checkEmptyData(chartKPI13Mes);
            });
            });
        }
    });
    return false;
}
//-------------------------------------------------------------------------------------------------------
// CAMBIAR AÃ‘O Y MES
//-------------------------------------------------------------------------------------------------------
function cambiarAnoMes() {
    var cual = document.getElementById("anoMes").value;
    if(cual.localeCompare("ano") === 0) {
        document.getElementById("botonesMes").style.display = "none";
        document.getElementById("botonesAno").style.display = "block";
        document.getElementById("graphMes").style.display = "none";
        document.getElementById("graphAno").style.display = "block";
        accidentesTotales();
    } else {
        document.getElementById("botonesMes").style.display = "block";
        document.getElementById("botonesAno").style.display = "none";
        document.getElementById("graphMes").style.display = "block";
        document.getElementById("graphAno").style.display = "none";
        accidentesTotalesMes();
    }
}
//-------------------------------------------------------------------------------------------------------
// KPI16
//-------------------------------------------------------------------------------------------------------
var chartKPI16;
var chartKPI16Rango2;
function accidentesPorCriterioKPI16(radioButton) {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + radioButton.value  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    var rdValue = radioButton.value + "";
    var tituloField = "";
    var valueField = ""; 
    var tipo = 1;
    document.getElementById("botonVerTablaConversionVehiculos").style.display= "none";
    document.getElementById("tablaGenero").style.display= "none";
    if (rdValue.localeCompare("ACCPORCLASE")===0) {
        tituloField = "Clase";
        valueField = "Cantidad de accidentes"; 
    } else if (rdValue.localeCompare("ACCPORGRAVEDAD")===0) {
        tituloField = "Gravedad";
        valueField = "Cantidad de accidentes"; 
    } else if (rdValue.localeCompare("ACCPORCHOQUE")===0) {
        tituloField = "Objeto chocado";
        valueField = "Cantidad de accidentes"; 
    } else if (rdValue.localeCompare("ACCPORVEHICULO")===0) {
        document.getElementById("botonVerTablaConversionVehiculos").style.display= "block";
        tituloField = "Tipo de vehiculo";
        valueField = "Cantidad de accidentes"; 
        tipo = 2;
    } else if (rdValue.localeCompare("ACCVEHINVOLUCDRADOS")===0) {
        tituloField = "Numero de vehiculos involucrados";
        valueField = "Cantidad de accidentes"; 
    } else if (rdValue.localeCompare("ACCSERVICIO")===0) {
        tituloField = "Tipo de servicio";
        valueField = "Cantidad de accidentes"; 
    } else if (rdValue.localeCompare("ACCINMOVILIZACION")===0) {
        tituloField = "Fue inmovilizado";
        valueField = "Cantidad de accidentes"; 
    } else if (rdValue.localeCompare("ACCSEXO")===0) {
        tituloField = "Genero";
        valueField = "Cantidad de accidentes"; 
        document.getElementById("tablaGenero").style.display= "block";
    } else if (rdValue.localeCompare("ACCPORTIPODOC")===0) {
        tituloField = "Tipo de documento";
        valueField = "Cantidad de accidentes"; 
    } else if (rdValue.localeCompare("ACCEMBRIAGUEZ")===0) {
        tituloField = "Grado de embriaguez";
        valueField = "Cantidad de accidentes"; 
    }
    if(tipo === 1) {
    self.ajax(stringGET, 'GET').done(function(data) {
         chartKPI16 = AmCharts.makeChart("accidentesPorCriterio",
                        {
                                "type": "pie",
                                "language": "es",
                                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                                "innerRadius": 20,
                                "legend": {
                                        "enabled": true,
                                        "align": "center",
                                        "markerType": "circle",
                                        "maxColumns": 5,
                                        "valueText": ""
                                },
                                "pullOutEffect": "easeOutSine",
                                "startDuration": 0,
                                "titleField": tituloField,
                                "valueField": valueField,
                                "fontSize": 12,
                                "theme": "default",
                                "allLabels": [],
                                "balloon": {},
                                "titles": [
                                    {
                                        "text": "Accidentes por: " + tituloField
                                    }
                                ],
                                "dataProvider": data,
                                "export": {
                                   "enabled": true,
                                   "menu": []
                                }
                        }
                );

            AmCharts.checkEmptyDataPie(chartKPI16);
        });
        var stringGET = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + radioButton.value  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
        self.ajax(stringGET, 'GET').done(function(data) {
         chartKPI16Rango2 = AmCharts.makeChart("accidentesPorCriterioRango2",
                        {
                                "type": "pie",
                                "language": "es",
                                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                                "innerRadius": 20,
                                "legend": {
                                        "enabled": true,
                                        "align": "center",
                                        "markerType": "circle",
                                        "maxColumns": 5,
                                        "valueText": ""
                                },
                                "pullOutEffect": "easeOutSine",
                                "startDuration": 0,
                                "titleField": tituloField,
                                "valueField": valueField,
                                "fontSize": 12,
                                "theme": "default",
                                "allLabels": [],
                                "balloon": {},
                                "titles": [
                                    {
                                        "text": "Accidentes por: " + tituloField
                                    }
                                ],
                                "dataProvider": data,
                                "export": {
                                   "enabled": true,
                                   "menu": []
                                }
                        }
                );

            AmCharts.checkEmptyDataPie(chartKPI16Rango2);
        });
    } else if(tipo === 2) {
        self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI12 = AmCharts.makeChart("accidentesPorCriterio",
                           {
                                   "type": "serial",
                                   "categoryField": tituloField,
                                   "rotate": true,
                                   "zoomOutText": "",
                                   "startDuration": 1,
                                   "categoryAxis": {
                                           "gridPosition": "start"
                                   },
                                   "chartCursor": {
                                           "enabled": true
                                   },
                                   "chartScrollbar": {
                                           "enabled": true
                                   },
                                   "trendLines": [],
                                   "graphs": [
                                           {
                                                   "fillAlphas": 1,
                                                   "id": "AmGraph-1",
                                                   "title": "Cantidad de accidentes "+ startYear + "-" + endYear,
                                                   "type": "column",
                                                   "labelText": "[[value]]",
                                                   "valueField": valueField
                                           }
                                   ],
                                   "guides": [],
                                   "valueAxes": [
                                           {
                                                   "id": "ValueAxis-1",
                                                   "maximum": 0,
                                                   "minMaxMultiplier": 0,
                                                   "unitPosition": "left",
                                                   "title": "Cantidad de accidentes"
                                           }
                                   ],
                                   "allLabels": [],
                                   "balloon": {},
                                   "titles": [
                                           {
                                                   "id": "",
                                                   "size": 15,
                                                   "text": "Accidentes por: " + tituloField
                                           }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                      "enabled": true,
                                      "menu": []
                                    }
                           }
                   );
           AmCharts.checkEmptyData(chartKPI16);
       });

       var stringGET = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + radioButton.value  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
       self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI12 = AmCharts.makeChart("accidentesPorCriterioRango2",
                           {
                                   "type": "serial",
                                   "categoryField": tituloField,
                                   "rotate": true,
                                   "zoomOutText": "",
                                   "startDuration": 1,
                                   "categoryAxis": {
                                           "gridPosition": "start"
                                   },
                                   "chartCursor": {
                                           "enabled": true
                                   },
                                   "chartScrollbar": {
                                           "enabled": true
                                   },
                                   "trendLines": [],
                                   "graphs": [
                                           {
                                                   "fillAlphas": 1,
                                                   "id": "AmGraph-1",
                                                   "title": "Cantidad de accidentes "+ startYear2 + "-" + endYear2,
                                                   "type": "column",
                                                   "labelText": "[[value]]",
                                                   "valueField": valueField
                                           }
                                   ],
                                   "guides": [],
                                   "valueAxes": [
                                           {
                                                   "id": "ValueAxis-1",
                                                   "maximum": 0,
                                                   "minMaxMultiplier": 0,
                                                   "unitPosition": "left",
                                                   "title": "Cantidad de accidentes"
                                           }
                                   ],
                                   "allLabels": [],
                                   "balloon": {},
                                   "titles": [
                                           {
                                                   "id": "",
                                                   "size": 15,
                                                   "text": "Accidentes por: " + tituloField
                                           }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                      "enabled": true,
                                      "menu": []
                                    }
                           }
                   );
           AmCharts.checkEmptyData(chartKPI16Rango2);
       });
    }
    return false;
}
//-------------------------------------------------------------------------------------------------------
// KPIPromedio
//-------------------------------------------------------------------------------------------------------
var chartKPIPromedio;
function promedioAccidentesTipo(radioButton) {     
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + radioButton.value  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    var rdValue = radioButton.value + "";
    var tituloField = "";
    var valueField = "";
    if (rdValue.localeCompare("ACCIDENTESPORHORA")===0) {
        tituloField = "Hora";
        valueField = "Cantidad de accidentes"; 
    } else if (rdValue.localeCompare("ACCIDENTESPORDIA")===0) {
        tituloField = "Dia";
        valueField = "Cantidad de accidentes"; 
    }
    self.ajax(stringGET, 'GET').done(function(data) {
         if(usingTwoRanges === false)
         {
            chartKPIPromedio = AmCharts.makeChart("chartDivPromedio",
                           {
                               "type": "serial",
                               "language": "es",
                               "zoomOutText": "",
                               "categoryField": tituloField,
                               "startDuration": 1,
                               "categoryAxis": {
                                       "gridPosition": "start",
                                       "title": tituloField
                               },
                               "valueScrollbar": {
                                           "enabled": true
                               },
                               "chartScrollbar": {
                                           "enabled": true,
                                           "maximum": -10
                               },
                               "trendLines": [],
                               "graphs": [
                                       {
                                               "balloonText": "[[title]] de [[category]]: [[value]]",
                                               "fillAlphas": 0.7,
                                               "id": "AmGraph-1",
                                               "lineAlpha": 0,
                                               "title": "Promedio accidentes",
                                               "labelText": "[[value]]",
                                               "valueField": valueField
                                       }
                               ],
                               "guides": [],
                               "valueAxes": [
                                       {
                                               "id": "ValueAxis-1",
                                               "title": "Promedio de accidentes"
                                       }
                               ],
                               "allLabels": [],
                               "balloon": {},
                               "legend": {
                                       "enabled": true,
                                       "valueText": ""
                               },
                               "titles": [
                                   {
                                       "text": "Accidentes por: " + tituloField
                                   }
                               ],
                               "dataProvider": data,
                               "export": {
                                      "enabled": true,
                                      "menu": []
                               }
                       }
                   );

           AmCharts.checkEmptyData(chartKPIPromedio);
       } else {
           var stringGET2 = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + radioButton.value  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
           self.ajax(stringGET2, 'GET').done(function(data2) {
               combinarArrays(data, data2, valueField, valueField + " R2", tituloField);
                chartKPIPromedio = AmCharts.makeChart("chartDivPromedio",
                                {
                                    "type": "serial",
                                    "language": "es",
                                    "zoomOutText": "",
                                    "categoryField": tituloField,
                                    "startDuration": 1,
                                    "categoryAxis": {
                                            "gridPosition": "start",
                                            "title": tituloField
                                    },
                                    "valueScrollbar": {
                                                "enabled": true
                                    },
                                    "chartScrollbar": {
                                                "enabled": true,
                                                "maximum": -10
                                    },
                                    "trendLines": [],
                                    "graphs": [
                                            {
                                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                                    "fillAlphas": 0.7,
                                                    "id": "AmGraph-1",
                                                    "lineAlpha": 0,
                                                    "title": "Promedio accidentes "+ startYear + "-" + endYear,
                                                    "labelText": "[[value]]",
                                                    "valueField": valueField
                                            },
                                            {
                                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                                    "fillAlphas": 0.7,
                                                    "id": "AmGraph-2",
                                                    "lineAlpha": 0,
                                                    "title": "Promedio accidentes " + startYear2 + "-" + endYear2,
                                                    "labelText": "[[value]]",
                                                    "valueField": valueField + " R2"
                                            }
                                    ],
                                    "guides": [],
                                    "valueAxes": [
                                            {
                                                    "id": "ValueAxis-1",
                                                    "title": "Promedio de accidentes"
                                            }
                                    ],
                                    "allLabels": [],
                                    "balloon": {},
                                    "legend": {
                                            "enabled": true,
                                            "valueText": ""
                                    },
                                    "titles": [
                                        {
                                            "text": "Accidentes por: " + tituloField
                                        }
                                    ],
                                    "dataProvider": data,
                                    "export": {
                                           "enabled": true,
                                           "menu": []
                                    }
                            }
                        );

                AmCharts.checkEmptyData(chartKPIPromedio);
            });
       }
    });
    return false;
}
//-------------------------------------------------------------------------------------------------------
// KPIEdades
//-------------------------------------------------------------------------------------------------------
var chartEdades;
function edades(radioButton) {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/victimas?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + radioButton.value  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId; 
    var rdValue = radioButton.value + "";
    var tituloField = "";
    var valueField = "";
    if (rdValue.localeCompare("EDADESCONDUCTORES")===0) {
        tituloField = "Edad";
        valueField = "Numero de Conductores"; 
    } else if (rdValue.localeCompare("EDADESACC")===0) {
        tituloField = "Edad";
        valueField = "Numero de Victimas"; 
    }
    self.ajax(stringGET, 'GET').done(function(data) {
            if(usingTwoRanges === false)
            {
                chartEdades = AmCharts.makeChart("accidentesPorEdades",
                               {
                                   "type": "serial",
                                   "language": "es",
                                   "zoomOutText": "",
                                   "categoryField": tituloField,
                                   "rotate": true,
                                   "startDuration": 1,
                                   "categoryAxis": {
                                           "gridPosition": "start",
                                           "title": tituloField + " (aÃ±os)"
                                   },
                                   "valueScrollbar": {
                                               "enabled": true
                                   },
                                   "chartScrollbar": {
                                               "enabled": true,
                                               "maximum": -10
                                   },
                                   "trendLines": [],
                                   "graphs": [
                                           {
                                                   "balloonText": "[[title]] de [[category]]: [[value]]",
                                                   "fillAlphas": 1,
                                                   "id": "AmGraph-1",
                                                   "title": valueField,
                                                   "type": "column",
                                                   "labelText": "[[value]]",
                                                   "valueField": valueField
                                           }
                                   ],
                                   "guides": [],
                                   "valueAxes": [
                                           {
                                                   "id": "ValueAxis-1",
                                                   "title": valueField
                                           }
                                   ],
                                   "allLabels": [],
                                   "balloon": {},
                                   "legend": {
                                           "enabled": true,
                                           "useGraphSettings": true,
                                           "valueText": ""
                                   },
                                   "titles": [
                                           {
                                                   "id": "Title-1",
                                                   "size": 15,
                                                   "text": "Accidentes por: " + tituloField
                                           }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                          "enabled": true,
                                          "menu": []
                                   }
                           }
                       );
                       AmCharts.checkEmptyData(chartEdades);
            } else {

                var stringGET2 = "/webresources/kpis/victimas?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + radioButton.value  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

                self.ajax(stringGET2, 'GET').done(function(data2) {
                    combinarArrays(data, data2, valueField, valueField + " R2", tituloField);
                    chartEdades = AmCharts.makeChart("accidentesPorEdades",
                               {
                                   "type": "serial",
                                   "language": "es",
                                   "zoomOutText": "",
                                   "categoryField": tituloField,
                                   "rotate": true,
                                   "startDuration": 1,
                                   "categoryAxis": {
                                           "gridPosition": "start",
                                           "title": tituloField
                                   },
                                   "valueScrollbar": {
                                               "enabled": true
                                   },
                                   "chartScrollbar": {
                                               "enabled": true,
                                               "maximum": -10
                                   },
                                   "trendLines": [],
                                   "graphs": [
                                           {
                                                   "balloonText": "[[title]] de [[category]]: [[value]]",
                                                   "fillAlphas": 1,
                                                   "id": "AmGraph-1",
                                                   "title": valueField + " " + startYear + "-" + endYear,
                                                   "type": "column",
                                                   "labelText": "[[value]]",
                                                   "valueField": valueField
                                           },
                                           {
                                                   "balloonText": "[[title]] de [[category]]: [[value]]",
                                                   "fillAlphas": 1,
                                                   "id": "AmGraph-2",
                                                   "title": valueField + " "+ startYear2 + "-" + endYear2,
                                                   "type": "column",
                                                   "labelText": "[[value]]",
                                                   "valueField": valueField + " R2"
                                           }
                                   ],
                                   "guides": [],
                                   "valueAxes": [
                                           {
                                                   "id": "ValueAxis-1",
                                                   "title": valueField
                                           }
                                   ],
                                   "allLabels": [],
                                   "balloon": {},
                                   "legend": {
                                           "enabled": true,
                                           "useGraphSettings": true,
                                           "valueText": ""
                                   },
                                   "titles": [
                                           {
                                                   "id": "Title-1",
                                                   "size": 15,
                                                   "text": "Accidentes por: " + tituloField
                                           }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                          "enabled": true,
                                          "menu": []
                                   }
                           }
                       );
                       AmCharts.checkEmptyData(chartEdades);
                });
            }

        });

        return false;

}
//-------------------------------------------------------------------------------------------------------
// Cambiar edad y tipo
//-------------------------------------------------------------------------------------------------------
function cambiarEdadTipo() {
    var cual = document.getElementById("edadTipo").value;
    if(cual.localeCompare("ACCIDENTESPORHORA") === 0 || cual.localeCompare("ACCIDENTESPORDIA") === 0) {
        document.getElementById("botonesEdad").style.display = "none";
        document.getElementById("botonesTipo").style.display = "block";
        document.getElementById("graphEdad").style.display = "none";
        document.getElementById("graphTipo").style.display = "block";
        promedioAccidentesTipo(document.getElementById("edadTipo"));
    } else {
        document.getElementById("botonesEdad").style.display = "block";
        document.getElementById("botonesTipo").style.display = "none";
        document.getElementById("graphEdad").style.display = "block";
        document.getElementById("graphTipo").style.display = "none";
        edades(document.getElementById("edadTipo"));
    }
}
//-------------------------------------------------------------------------------------------------------
// Imprimir y exportar
//-------------------------------------------------------------------------------------------------------
function exportXLSX_KPI13() {
  chartKPI13.export.toXLSX({
    data: chartKPI13.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "AccidentesEnRango.xlsx");
  });
}
function printChart_KPI13(){
   chartKPI13.export.capture( {}, function() {
       this.toPRINT();
   } );
}
function exportXLSX_KPI13Mes() {
  chartKPI13Mes.export.toXLSX({
    data: chartKPI13Mes.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "AccidentesEnRango.xlsx");
  });
}
function printChart_KPI13Mes(){
   chartKPI13Mes.export.capture( {}, function() {
       this.toPRINT();
   } );
}
function exportXLSX_KPITotalDeptos() {
  chartKPITotalAccidentesDptos.export.toXLSX({
    data: chartKPITotalAccidentesDptos.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "AccidentesDepartamentosEnRango.xlsx");
  });
}
function printChart_KPITotalDeptos(){
   chartKPITotalAccidentesDptos.export.capture( {}, function() {
       this.toPRINT();
   } );
}
function exportXLSX_KPITotalMunics() {
  chartKPITotalAccidentesMunics.export.toXLSX({
    data: chartKPITotalAccidentesMunics.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "AccidentesMunicipiosEnRango.xlsx");
  });
}
function printChart_KPITotalMunics(){
   chartKPITotalAccidentesMunics.export.capture( {}, function() {
       this.toPRINT();
   } );
}
function exportXLSX_KPI16() {
  chartKPI16.export.toXLSX({
    data: chartKPI16.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "AccidentesPorTipoEnRango.xlsx");
  });
}
function printChart_KPI16(){
   chartKPI16.export.capture( {}, function() {
       this.toPRINT();
   } );
}
function exportXLSX_KPI16Rango2() {
  chartKPI16Rango2.export.toXLSX({
    data: chartKPI16Rango2.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "AccidentesPorTipoEnRango.xlsx");
  });
}
function printChart_KPI16Rango2(){
   chartKPI16Rango2.export.capture( {}, function() {
       this.toPRINT();
   } );
}
function exportAccidentesTiempo() {
  chartKPIPromedio.export.toXLSX({
    data: chartKPIPromedio.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "accidentesPorHoraDia.xlsx");
  });
}
function printAccidentesTiempo(){
   chartKPIPromedio.export.capture( {}, function() {
       this.toPRINT();
   } );
}
function exportEdades() {
  chartEdades.export.toXLSX({
    data: chartEdades.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "edades.xlsx");
  });
}
function printEdades(){
   chartEdades.export.capture( {}, function() {
       this.toPRINT();
   } );
}
AmCharts.checkEmptyData = function (chart) {
    if ( 0 == chart.dataProvider.length ) {
        // set min/max on the value axis
        chart.valueAxes[0].minimum = 0;
        chart.valueAxes[0].maximum = 100;

        // add dummy data point
        var dataPoint = {
            dummyValue: 0
        };
        dataPoint[chart.categoryField] = '';
        chart.dataProvider = [dataPoint];

        // add label
        chart.addLabel(0, '50%', 'No hay informaciÃ³n para mostrar', 'center');

        // set opacity of the chart div
        chart.chartDiv.style.opacity = 0.5;

        // redraw it
        chart.validateNow();
    }
};
AmCharts.checkEmptyDataPie = function (chart) {
    if ( 0 == chart.dataProvider.length ) {
        // set min/max on the value axis

        // add dummy data point
        var dataPoint = {
            dummyValue: 0
        };
        dataPoint[chart.titleField] = '';
        chart.dataProvider = [dataPoint];

        // add label
        chart.addLabel(0, '50%', 'No hay informaciÃ³n para mostrar', 'center');

        // set opacity of the chart div
        chart.chartDiv.style.opacity = 0.5;

        // redraw it
        chart.validateNow();
    }
};
var toogle = true;
function toogleFiltrosMenu() {

    if (toogle) {
        toogle = false;
        document.getElementById("searchHeader").style.display = "none";
        document.getElementById("buttonEsconder").innerHTML = "Mostrar MenÃº de Filtros";

    } else {
        toogle = true;

        document.getElementById("searchHeader").style.display = "block";
        document.getElementById("buttonEsconder").innerHTML = "Esconder MenÃº de Filtros";
    }

    return false;
};
function toogleSecondRange() {

    if (usingTwoRanges === true) {
        usingTwoRanges = false;
        document.getElementById("secondRangeButton").className = "btn btn-default";
        document.getElementById("labelRango2").style.display = "none";
        document.getElementById("espacio").style.display = "block";
    } else {
        usingTwoRanges = true;
        var token = localStorage.getItem("token");
        var stringGET = "/webresources/kpis/historia?token=" + token + "&type=ACCI"+ "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
        var menor = "";
        var mayor = "";
        self.ajax(stringGET, 'GET').done(function(data) {
            menor = data.Menor;
            mayor = data.Mayor;
            document.getElementById("secondRangeButton").className = "btn btn-primary";
            if(!historico) {
                var menor1 = startYear + "-" + startMonth + "-" + startDay;
                var mayor1 = endYear + "-" + endMonth + "-" + endDay;
                var menor2 = menor1.split("-")[2] + "/" + menor1.split("-")[1] + "/" + menor1.split("-")[0];
                var mayor2 = mayor1.split("-")[2] + "/" + mayor1.split("-")[1] + "/" + mayor1.split("-")[0];
                $('#demo2').data('daterangepicker').setStartDate(menor2);
                $('#demo2').data('daterangepicker').setEndDate(mayor2);
            }
            else if(historico)  {
                startYear2 = startYear;
                startMonth2 = startMonth;
                startDay2 = startDay;
                endYear2 = endYear;
                endMonth2 = endMonth;
                endDay2 = endDay;
                var menor2 = menor.split("-")[2] + "/" + menor.split("-")[1] + "/" + menor.split("-")[0];
                var mayor2 = mayor.split("-")[2] + "/" + mayor.split("-")[1] + "/" + mayor.split("-")[0];
                $('#demo2').data('daterangepicker').setStartDate(menor2);
                $('#demo2').data('daterangepicker').setEndDate(mayor2);
            }
        });
    }
    document.getElementById("labelRango2").style.display = "block";
    document.getElementById("espacio").style.display = "none";
    document.getElementById("exportRango2").style.display = "inline-block";

    if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {

          totalAccidentesKPI12();
          accidentesTotalesTodosDptos();
          accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
          document.getElementById("divChartRango2").style.display = "block";
          document.getElementById("divChartRango1").className = "col-lg-6";
          accidentesPorTiempoAtencion();
          edades(document.getElementById("edadTipo"));
          promedioAccidentesTipo(document.getElementById("edadTipo"));


        } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {

                 totalAccidentesKPI12();
                 accidentesTotales();
                 accidentesTotalesMes();
                 accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
                 document.getElementById("divChartRango2").style.display = "block";
                 document.getElementById("divChartRango1").className = "col-lg-6";
                 accidentesPorTiempoAtencion();
                 edades(document.getElementById("edadTipo"));
                 promedioAccidentesTipo(document.getElementById("edadTipo"));


        } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {

                 totalAccidentesKPI12();
                 accidentesTotalesTodosMunics();
                 accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
                 document.getElementById("divChartRango2").style.display = "block";
                 document.getElementById("divChartRango1").className = "col-lg-6";
                 accidentesPorTiempoAtencion();
                 edades(document.getElementById("edadTipo"));
                 promedioAccidentesTipo(document.getElementById("edadTipo"));
        }

        if(usingTwoRanges === false) {
            document.getElementById("divChartRango2").style.display = "none";
            document.getElementById("divChartRango1").className = "col-lg-12";

            document.getElementById("exportRango2").style.display = "none";
        }

    return false;

};
function combinarArraysPorMes (g, c, nombreValue1, nombreValue2) {
    for (i = 0; i < g.length; i++) {        //Loop trough first array
        var curID = g[i].Mes;                //Get ID of current object
        var exists = false;
        var temoObj;
        for (j = 0; j < c.length; j++) {    //Loop trough second array
            exists = false;
            if (curID === c[j].Mes){          //If id from array1 exists in array2
                exists = true;
                tempObj = c[j];             //Get id,object from array 2
                break;
            }
        }
        if(exists) {
            g[i][nombreValue2] = tempObj[nombreValue1];//If exists add circle from array2 to the record in array1
            console.log(tempObj);
        }else{
            g[i][nombreValue2] = "0";          //If it doesn't add circle with value "no"
        }
    }
    for (i = 0; i < c.length; i++) {        //Loop trough array 2
        var curObj = c[i];
        var ex = true;
        g.forEach(function(row) {           //Loop to check if id form array2 exists in array1
            if (curObj.Mes === row.Mes){
                ex = false;
            }
        });
        if(ex){                             //If it doesn't exist add goal to object with value "no" and push it into array1
            var temp = curObj[nombreValue1];
            curObj[nombreValue2] = temp;
            curObj[nombreValue1] = "0";

            g.push(curObj);
        }
    }

};
function combinarArrays(g, c, nombreValue1, nombreValue2, param) {
    for (i = 0; i < g.length; i++) {        //Loop trough first array
        var curID = g[i][param];                //Get ID of current object
        var exists = false;
        var temoObj;
        for (j = 0; j < c.length; j++) {    //Loop trough second array
            exists = false;
            if (curID === c[j][param]){          //If id from array1 exists in array2
                exists = true;
                tempObj = c[j];             //Get id,object from array 2
                break;
            }
        }
        if(exists) {
            g[i][nombreValue2] = tempObj[nombreValue1];//If exists add circle from array2 to the record in array1
            console.log(tempObj);
        }else{
            g[i][nombreValue2] = "0";          //If it doesn't add circle with value "no"
        }
    }

    for (i = 0; i < c.length; i++) {        //Loop trough array 2
        var curObj = c[i];
        var ex = true;
        g.forEach(function(row) {           //Loop to check if id form array2 exists in array1
            if (curObj[param] === row[param]){
                ex = false;
            }
        });
        if(ex){                             //If it doesn't exist add goal to object with value "no" and push it into array1
            var temp = curObj[nombreValue1];
            curObj[nombreValue2] = temp;
            curObj[nombreValue1] = "0";

            g.push(curObj);
        }
    }

};
var historico = false;
function mostrarHistorico() {
    if(historico) {
        historico = false;
        document.getElementById("mostrarHistorico").className = "btn btn-default";
        var hoy = new Date();
        stringStart = "";
        startYear = hoy.getFullYear();
        startMonth = "01";
        startDay = "01";

        stringEnd = "";
        endYear = hoy.getFullYear();
        endMonth = hoy.getMonth() + 1;
        endDay = hoy.getDate();
        llamarFunciones();
        var menor = startYear + "-" + startMonth + "-" + startDay;
        var mayor = endYear + "-" + endMonth + "-" + endDay;
        var menor2 = menor.split("-")[2] + "/" + menor.split("-")[1] + "/" + menor.split("-")[0];
        var mayor2 = mayor.split("-")[2] + "/" + mayor.split("-")[1] + "/" + mayor.split("-")[0];
        $('#demo').data('daterangepicker').setStartDate(menor2);
        $('#demo').data('daterangepicker').setEndDate(mayor2);
        if(usingTwoRanges === true) {
            usingTwoRanges = true;

            startYear2 = menor.split("-")[0];
            startMonth2 = menor.split("-")[1];
            startDay2 = menor.split("-")[2];

            endYear2 = mayor.split("-")[0];
            endMonth2 = mayor.split("-")[1];
            endDay2 = mayor.split("-")[2];

            document.getElementById("labelRango2").style.display = "block";
            document.getElementById("espacio").style.display = "none";
            document.getElementById("secondRangeButton").className = "btn btn-primary";

            llamarFunciones();
            
            var menor2 = menor.split("-")[2] + "/" + menor.split("-")[1] + "/" + menor.split("-")[0];
            var mayor2 = mayor.split("-")[2] + "/" + mayor.split("-")[1] + "/" + mayor.split("-")[0];
            $('#demo2').data('daterangepicker').setStartDate(menor2);
            $('#demo2').data('daterangepicker').setEndDate(mayor2);
        }
    } else {
        historico = true;
        document.getElementById("mostrarHistorico").className = "btn btn-primary";
        var token = localStorage.getItem("token");
        var stringGET = "/webresources/kpis/historia?token=" + token + "&type=ACCI"+ "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
        var menor = "";
        var mayor = "";
        self.ajax(stringGET, 'GET').done(function(data) {
            menor = data.Menor;
            mayor = data.Mayor;
            startYear = menor.split("-")[0];
            startMonth = menor.split("-")[1];
            startDay = menor.split("-")[2];

            endYear = mayor.split("-")[0];
            endMonth = mayor.split("-")[1];
            endDay = mayor.split("-")[2];
            llamarFunciones();
            if(usingTwoRanges === false) {
                document.getElementById("divChartRango2").style.display = "none";
                document.getElementById("divChartRango1").className = "col-lg-12";
                document.getElementById("exportRango2").style.display = "none";
            }
            var menor2 = menor.split("-")[2] + "/" + menor.split("-")[1] + "/" + menor.split("-")[0];
            var mayor2 = mayor.split("-")[2] + "/" + mayor.split("-")[1] + "/" + mayor.split("-")[0];
            $('#demo').data('daterangepicker').setStartDate(menor2);
            $('#demo').data('daterangepicker').setEndDate(mayor2);
            if(usingTwoRanges === true) {
                usingTwoRanges = true;

                startYear2 = menor.split("-")[0];
                startMonth2 = menor.split("-")[1];
                startDay2 = menor.split("-")[2];

                endYear2 = mayor.split("-")[0];
                endMonth2 = mayor.split("-")[1];
                endDay2 = mayor.split("-")[2];

                document.getElementById("labelRango2").style.display = "block";
                document.getElementById("espacio").style.display = "none";
                document.getElementById("secondRangeButton").className = "btn btn-primary";

                llamarFunciones();
                
                if(usingTwoRanges === false) {
                    document.getElementById("divChartRango2").style.display = "none";
                    document.getElementById("divChartRango1").className = "col-lg-12";
                    document.getElementById("exportRango2").style.display = "none";
                }
                var menor2 = menor.split("-")[2] + "/" + menor.split("-")[1] + "/" + menor.split("-")[0];
                var mayor2 = mayor.split("-")[2] + "/" + mayor.split("-")[1] + "/" + mayor.split("-")[0];
                $('#demo2').data('daterangepicker').setStartDate(menor2);
                $('#demo2').data('daterangepicker').setEndDate(mayor2);
            }
        });
        return false;
    }
    
}       

function llamarFunciones() {
    if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {
        totalAccidentesKPI12();
        accidentesTotalesTodosDptos();
        accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
        accidentesPorTiempoAtencion();
        edades(document.getElementById("edadTipo"));
        promedioAccidentesTipo(document.getElementById("edadTipo"));
    } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
        totalAccidentesKPI12();
        accidentesTotales();
        accidentesTotalesMes();
        accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
        accidentesPorTiempoAtencion();
        edades(document.getElementById("edadTipo"));
        promedioAccidentesTipo(document.getElementById("edadTipo"));
    } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
        totalAccidentesKPI12();
        accidentesTotalesTodosMunics();
        accidentesPorCriterioKPI16(document.getElementById("optionAccidentePorCriterio1"));
        accidentesPorTiempoAtencion();
        edades(document.getElementById("edadTipo"));
        promedioAccidentesTipo(document.getElementById("edadTipo"));
    }
    if(usingTwoRanges) {
        document.getElementById("divChartRango2").style.display = "block";
        document.getElementById("divChartRango1").className = "col-lg-6";
    }
}

function imprimirDashboard() {
    var images = [];
    var graficas = definirGraficasActivas();
    var pending = graficas.length;
    for ( var i = 0; i < graficas.length; i++ ) {
      var chart = graficas[i];
      chart.export.capture( {}, function() {
        this.toJPG( {}, function( data ) {
          images.push( {
            "image": data,
            "fit": [ 523.28, 769.89 ]
          } );
          pending--;
          if ( pending === 0 ) {
            // all done - construct PDF
            chart.export.toPDF( {
              content: images
            }, function( data ) {
               if(usingTwoRanges)
                    this.download(data, "application/pdf", startYear + "_" + endYear + "_vs_" + startYear2 + "_" + endYear2 + ".pdf");
                else 
                    this.download(data, "application/pdf", startYear + "_" + endYear + ".pdf");
                location.reload();
            } );
          }
        } );
      } );
    }
}

function definirGraficasActivas () {
    var graficas = [];
    var depto = document.getElementById("departamentosSelect").value;
    var municipio = document.getElementById("municipiosSelect").value;
    if(depto.localeCompare("0") === 0 && municipio.localeCompare("0") === 0) {
        //EstÃ¡ seleccionado todos los departamentos
        graficas.push(chartKPITotalAccidentesDptos);
    } else if(depto.localeCompare("0") != 0 && municipio.localeCompare("0") === 0) {
        //EstÃ¡ seleccionado un departamento
        graficas.push(chartKPITotalAccidentesMunics);
    } else if(depto.localeCompare("0") != 0 && municipio.localeCompare("0") != 0) {
        //EstÃ¡ seleccionado un municipio
        var tiempo = document.getElementById("anoMes").value;
        if(tiempo.localeCompare("ano") === 0) {
            graficas.push(chartKPI13);
        } else if(tiempo.localeCompare("mes") === 0) {
            graficas.push(chartKPI13Mes);
        }
    }
    if(usingTwoRanges == true) {
        graficas.push(chartKPI16);
        graficas.push(chartKPI16Rango2);
    } else if(usingTwoRanges == false) {
        graficas.push(chartKPI16);
    }
    var cual = document.getElementById("edadTipo").value;
    if(cual.localeCompare("ACCIDENTESPORHORA") === 0 || cual.localeCompare("ACCIDENTESPORDIA") === 0) {
        graficas.push(chartKPIPromedio);
    } else {
        graficas.push(chartEdades);
    }
    return graficas;
}