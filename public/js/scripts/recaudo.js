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
    document.getElementById("divRecaudoDpto").style.display = "block";
    document.getElementById("divExtemporaneosDpto").style.display = "block";
    document.getElementById("divRecaudoMunicipio").style.display = "none";
    document.getElementById("divExtemporaneosMunicipio").style.display = "none";
    document.getElementById("divRecaudoAno").style.display = "none";
    document.getElementById("divExtemporaneos").style.display = "none";
} else if(rolUsuario.localeCompare("SUBIR") === 0) {
    window.location = "upload.jsp";
} else if(rolUsuario.localeCompare("ANON") === 0) {
    document.getElementById("ajustesDiv").innerHTML = "";
    document.getElementById("adminConsole").style.display = "none";
    parametroURLFiltro = "MUNIC";
    parametroCualId = localStorage.getItem("idMun");

    document.getElementById("divRecaudoAno").style.display = "block";
    document.getElementById("textoSeleccionActualRecaudo").innerHTML = "Municipio: " + localStorage.getItem("nomMun");
} else if(rolUsuario.localeCompare("UNICVER") === 0) {
    document.getElementById("ajustesDiv").innerHTML = "";
    document.getElementById("divisionCargar").style.display = "none";
    document.getElementById("cargarDiv").style.display = "none";
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
 
 var startYearRes = hoy.getFullYear();
var startMonthRes = "01";
var startDayRes = "01";

var endYearRes = hoy.getFullYear();
var endMonthRes = hoy.getMonth() + 1;
var endDayRes = hoy.getDate();

var startYear2Res = hoy.getFullYear();
var startMonth2Res = "01";
var startDay2Res = "01";

var endYear2Res = hoy.getFullYear();
var endMonth2Res = hoy.getMonth() + 1;
var endDay2Res = hoy.getDate();


var usingTwoRanges = false;
var historico = false;

var labelFechaInicio = startDay + " de " + meses[startMonth-1] + " de " + startYear;
var labelFechaFin = endDay + " de " + meses[endMonth-1] + " de " + endYear;

var labelFechaInicio2 = startDay2 + " de " + meses[startMonth2-1] + " de " + startYear2;
var labelFechaFin2 = endDay2 + " de " + meses[endMonth2-1] + " de " + endYear2;

 //Para cálculo de pagos extemporáneos en KPI6
 var recaudoTotal; 


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
            //console.log("ajax error " + jqXHR.status +" and "+ jqXHR);
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
    if ($(window).width() > 768) {
        $('#sidebar-collapse').collapse('show');
    }
    if ($(window).width() <= 768) {
        $('#sidebar-collapse').collapse('hide');
    }
    if ($(window).width() <= 992) {
    }
    if ($(window).width() > 992) {
    }
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

        recaudoTotalDepartamentos();
        recaudoTotalKPI1();
        var radioButtonRecaudoPorTipo = document.getElementById("optionTipoInfractor2"); 
        recaudoPorTipoRadioButtonClickedKPI2(radioButtonRecaudoPorTipo);
        promedioRecaudoTotalKPI3();
        proyeccionRecaudoKPI4();
        extemporaneosPorDepartamento();


    } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {

        recaudoTotalKPI1();
        var radioButtonRecaudoPorTipo = document.getElementById("optionTipoInfractor2"); 
        recaudoPorTipoRadioButtonClickedKPI2(radioButtonRecaudoPorTipo);
        promedioRecaudoTotalKPI3();
        proyeccionRecaudoKPI4();
        recaudoTotalAno();
        recaudoTotalMes();
        pagosExtemporaneosKPI6();

    } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {

        recaudoTotalKPI1();
        recaudoTotalMunicipios();
        var radioButtonRecaudoPorTipo = document.getElementById("optionTipoInfractor2"); 
        recaudoPorTipoRadioButtonClickedKPI2(radioButtonRecaudoPorTipo);
        promedioRecaudoTotalKPI3();
        proyeccionRecaudoKPI4();
        extemporaneosPorMunicipio();

    }

    $('#demo').daterangepicker({
        "showDropdowns": true,
        "locale": "es",
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
        funcionesPorDepartamento();
    } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
        funcionesPorTiempo();
    } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
        funcionesPorMunicipio();
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
        funcionesPorDepartamento();
    } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
        funcionesPorTiempo();
    } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
        funcionesPorMunicipio();
    }
    });
});

function adminConsoleChange(seleccion) {
    if(seleccion.localeCompare("TODOSDPTOS") === 0){
        parametroURLFiltro = "TODOSDPTOS";
        parametroCualId = "BLA";
        document.getElementById("textoSeleccionActualRecaudo").innerHTML = "Todos los Departamentos";
        funcionesPorDepartamento();
        document.getElementById("divRecaudoDpto").style.display = "block";
        document.getElementById("divExtemporaneosDpto").style.display = "block";
        document.getElementById("divRecaudoMunicipio").style.display = "none";
        document.getElementById("divExtemporaneosMunicipio").style.display = "none";
        document.getElementById("divRecaudoAno").style.display = "none";
        document.getElementById("divExtemporaneos").style.display = "none";
    } else if(seleccion.localeCompare("DPTOID") === 0) {
        parametroURLFiltro = "DPTO";
        parametroCualId = document.getElementById("departamentosSelect").value;
        document.getElementById("textoSeleccionActualRecaudo").innerHTML = "Departamento: " + document.getElementById("departamentosSelect").value;
        funcionesPorMunicipio();
        document.getElementById("divRecaudoDpto").style.display = "none";
        document.getElementById("divExtemporaneosDpto").style.display = "none";
        document.getElementById("divRecaudoMunicipio").style.display = "block";
        document.getElementById("divExtemporaneosMunicipio").style.display = "block";
        document.getElementById("divRecaudoAno").style.display = "none";
        document.getElementById("divExtemporaneos").style.display = "none";
    }  else if(seleccion.localeCompare("MUNICID") === 0) {
        parametroURLFiltro = "MUNIC";
        var munSelect = document.getElementById("municipiosSelect");
        var munText = munSelect.options[munSelect.selectedIndex].text;
        parametroCualId = document.getElementById("municipiosSelect").value;
        document.getElementById("textoSeleccionActualRecaudo").innerHTML = "Municipio: " + munText;
        funcionesPorTiempo();
        document.getElementById("divRecaudoDpto").style.display = "none";
        document.getElementById("divExtemporaneosDpto").style.display = "none";
        document.getElementById("divRecaudoMunicipio").style.display = "none";
        document.getElementById("divExtemporaneosMunicipio").style.display = "none";
        document.getElementById("divRecaudoAno").style.display = "block";
        document.getElementById("divExtemporaneos").style.display = "block";
    }
    return false;
}

function cargarMunicipios(){
    var dpto = document.getElementById("departamentosSelect").value;
    if(dpto.localeCompare("TODOS") === 0) {
        parametroURLFiltro = "TODOSDPTOS";
        parametroCualId = "BLA";
        document.getElementById("textoSeleccionActualRecaudo").innerHTML = "Todos los Departamentos";
        funcionesPorDepartamento();
        document.getElementById("divRecaudoDpto").style.display = "block";
        document.getElementById("divExtemporaneosDpto").style.display = "block";
        document.getElementById("divRecaudoMunicipio").style.display = "none";
        document.getElementById("divExtemporaneosMunicipio").style.display = "none";
        document.getElementById("divRecaudoAno").style.display = "none";
        document.getElementById("divExtemporaneos").style.display = "none";
    } else {
        parametroURLFiltro = "DPTO";
        parametroCualId = document.getElementById("departamentosSelect").value;
        document.getElementById("textoSeleccionActualRecaudo").innerHTML = "Departamento: " + document.getElementById("departamentosSelect").value;
        funcionesPorMunicipio();
        document.getElementById("divRecaudoDpto").style.display = "none";
        document.getElementById("divExtemporaneosDpto").style.display = "none";
        document.getElementById("divRecaudoMunicipio").style.display = "block";
        document.getElementById("divExtemporaneosMunicipio").style.display = "block";
        document.getElementById("divRecaudoAno").style.display = "none";
        document.getElementById("divExtemporaneos").style.display = "none";
    }

        if(dpto.localeCompare("CALDAS") === 0)
        {
            var mun = document.getElementById("municipiosSelect");
            mun.innerHTML="<option value=\"0\">Elegir un municipio</option><option value=\"17001000\">Manizales</option><option value=\"17013000\">Aguadas</option><option value=\"17042000\">Anserma</option><option value=\"17050000\">Aranzazu</option><option value=\"17174000\">Chinchina</option><option value=\"17380000\">La Dorada</option><option value=\"17433000\">Manzanares</option><option value=\"17174000\">Riosucio</option><option value=\"17653000\">Salamina</option><option value=\"17873000\">Villamaría</option>";
        } else if(dpto.localeCompare("CAUCA") === 0)
        {
            var mun = document.getElementById("municipiosSelect");
            mun.innerHTML="<option value=\"0\">Elegir un municipio</option><option value=\"19001000\">Popayán</option><option value=\"19130000\">Cajibio</option><option value=\"19137000\">Caldono</option><option value=\"19142000\">Caloto</option><option value=\"19450000\">Mercaderes</option><option value=\"19455000\">Miranda</option><option value=\"19532000\">Patia</option><option value=\"19548000\">Piendamo</option><option value=\"19573000\">Puerto Tejada</option><option value=\"19622000\">Rosas</option><option value=\"19698000\">Santander de Quilichao</option><option value=\"19720000\">Santander</option><option value=\"19807000\">Timbio</option><option value=\"19824000\">Totoro</option><option value=\"19873000\">Villa Rica</option>";
        } else if(dpto.localeCompare("NARINO") === 0)
        {
            var mun = document.getElementById("municipiosSelect");
            mun.innerHTML="<option value=\"0\">Elegir un municipio</option><option value=\"52001000\">Pasto</option><option value=\"52110000\">Buesaco</option><option value=\"52317000\">Guachucal</option><option value=\"52354000\">Imues</option><option value=\"52356000\">Ipiales</option><option value=\"52399000\">La Unión</option><option value=\"52480000\">Nariño</option><option value=\"52788000\">Tangua</option><option value=\"52585000\">Pupiales</option><option value=\"52678000\">Samaniego</option><option value=\"52683000\">Sandona</option><option value=\"52835000\">Tumaco</option><option value=\"52838000\">Tuquerres</option>";
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
            mun.innerHTML="<option value=\"0\">Elegir un municipio</option><option value=\"76001000\">Cali</option><option value=\"76036000\">Andalucía</option><option value=\"76109000\">Buenaventura</option><option value=\"76111000\">Buga</option><option value=\"76122000\">Caicedonia</option><option value=\"76130000\">Candelaria</option><option value=\"76147000\">Cartago</option><option value=\"76248000\">El Cerrito</option><option value=\"76275000\">Florida</option><option value=\"76306000\">Ginebra</option><option value=\"76318000\">Guacari</option><option value=\"76364\">Jamundi</option><option value=\"76400000\">La Union</option><option value=\"76520000\">Palmira</option><option value=\"76622000\">Roldanillo</option><option value=\"76670000\">San Pedro</option><option value=\"76736\">Sevilla</option><option value=\"76834000\">Tulua</option><option value=\"76890000\">Yotoco</option><option value=\"76892000\">Yumbo</option><option value=\"76895000\">Zarzal</option>";
        }
        return false;
}
function funcionesPorDepartamento() {
    recaudoTotalDepartamentos();
    recaudoTotalKPI1();
    var radioButtonRecaudoPorTipo = document.getElementById("optionTipoInfractor2"); 
    recaudoPorTipoRadioButtonClickedKPI2(radioButtonRecaudoPorTipo);
    promedioRecaudoTotalKPI3();
    proyeccionRecaudoKPI4();
    extemporaneosPorDepartamento();
}

function funcionesPorMunicipio() {
    recaudoTotalMunicipios();
    recaudoTotalKPI1();
    var radioButtonRecaudoPorTipo = document.getElementById("optionTipoInfractor2"); 
    recaudoPorTipoRadioButtonClickedKPI2(radioButtonRecaudoPorTipo);
    promedioRecaudoTotalKPI3();
    proyeccionRecaudoKPI4();
    extemporaneosPorMunicipio();
}

function funcionesPorTiempo() {
    recaudoTotalAno();
    recaudoTotalMes();
    recaudoTotalKPI1();
    var radioButtonRecaudoPorTipo = document.getElementById("optionTipoInfractor2"); 
    recaudoPorTipoRadioButtonClickedKPI2(radioButtonRecaudoPorTipo);
    promedioRecaudoTotalKPI3();
    proyeccionRecaudoKPI4();
    pagosExtemporaneosKPI6();
    pagosExtemporaneosKPI6Mes();
}
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// ------------------------ KPIs DEPARTAMENTO ----------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------
// Recaudo por departamentos
//-------------------------------------------------------------------------------------------------------

var recaudoDepartamentos;
function recaudoTotalDepartamentos () {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/second?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + "RECAUDODEPTO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
                recaudoDepartamentos = AmCharts.makeChart("chartRecaudoDpto",
                        {
                            "type": "serial",
                            "categoryField": "Departamento",
                            "language": "es",
                            "zoomOutText": "",
                            "columnWidth": 0.39,
                            "maxSelectedSeries": 8,
                            "sequencedAnimation": false,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Departamentos"
                            },
                            "valueScrollbar": {
                                    "enabled": true
                            },
                            "chartCursor": {
                                    "enabled": true,
                                    "cursorColor": "#919F9F"
                            },
                            "chartScrollbar": {
                                    "enabled": true,
                                    "maximum": -10
                            },
                            "trendLines": [],
                            "graphs": [
                                    {
                                            "balloonText": "[[title]] de [[category]]: $[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "labelText": "$[[value]]",
                                            "title": "Recaudo",
                                            "type": "column",
                                            "valueAxis": "ValueAxis-1",
                                            "valueField": "Recaudo"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]:[[value]]",
                                            "bullet": "round",
                                            "id": "AmGraph-2",
                                            "labelText": "[[value]]",
                                            "lineAlpha": 0,
                                            "title": "Total Transacciones",
                                            "valueAxis": "ValueAxis-2",
                                            "valueField": "Numero de Transacciones"
                                    }
                            ],
                            "guides": [],
                            "valueAxes": [
                                    {
                                            "id": "ValueAxis-1",
                                            "title": "Recaudo",
                                            "unit": "$",
                                            "unitPosition": "left"
                                    },
                                    {
                                            "id": "ValueAxis-2",
                                            "position": "right",
                                            "title": "Numero de transacciones"
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
                                            "text": "Recaudo total por departamento"
                                    }
                            ],
                            "dataProvider": data,
                            "export": {
                               "enabled": true,
                               "menu": []
                             }
                        }
                    );
                AmCharts.checkEmptyData(recaudoDepartamentos);
            } else {
                var stringGET2 = "/webresources/kpis/second?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + "RECAUDODEPTO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
                self.ajax(stringGET2, 'GET').done(function(data2) {
                    combinarArrays(data, data2, 'Recaudo', 'Recaudo R2', 'Departamento');
                    combinarArrays(data, data2, 'Numero de Transacciones', 'Numero de Transacciones R2', 'Departamento');
                    recaudoDepartamentos = AmCharts.makeChart("chartRecaudoDpto",
                        {
                            "type": "serial",
                            "categoryField": "Departamento",
                            "language": "es",
                            "zoomOutText": "",
                            "columnWidth": 0.39,
                            "maxSelectedSeries": 8,
                            "sequencedAnimation": false,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Departamentos"
                            },
                            "valueScrollbar": {
                                    "enabled": true
                            },
                            "chartCursor": {
                                    "enabled": true,
                                    "cursorColor": "#919F9F"
                            },
                            "chartScrollbar": {
                                    "enabled": true,
                                    "maximum": -10
                            },
                            "trendLines": [],
                            "graphs": [
                                {
                                        "balloonText": "[[title]] de [[category]]: $[[value]]",
                                        "fillAlphas": 1,
                                        "id": "AmGraph-1",
                                        "labelText": "$[[value]]",
                                        "title": "Recaudo "+ startYear + "-" + endYear,
                                        "type": "column",
                                        "valueAxis": "ValueAxis-1",
                                        "valueField": "Recaudo"
                                },
                                {
                                        "balloonText": "[[title]] de [[category]]:[[value]]",
                                        "bullet": "round",
                                        "id": "AmGraph-2",
                                        "labelText": "[[value]]",
                                        "lineAlpha": 0,
                                        "title": "Total Transacciones "+ startYear + "-" + endYear,
                                        "valueAxis": "ValueAxis-2",
                                        "valueField": "Numero de Transacciones"
                                },
                                {
                                        "balloonText": "[[title]] de [[category]]: $[[value]]",
                                        "fillAlphas": 1,
                                        "id": "AmGraph-1",
                                        "labelText": "$[[value]]",
                                        "title": "Recaudo " + startYear2 + "-" + endYear2,
                                        "type": "column",
                                        "valueAxis": "ValueAxis-1",
                                        "valueField": "Recaudo R2"
                                },
                                {
                                        "balloonText": "[[title]] de [[category]]:[[value]]",
                                        "bullet": "round",
                                        "id": "AmGraph-2",
                                        "labelText": "[[value]]",
                                        "lineAlpha": 0,
                                        "title": "Total Transacciones "+ startYear2 + "-" + endYear2,
                                        "valueAxis": "ValueAxis-2",
                                        "valueField": "Numero de Transacciones R2"
                                }
                            ],
                            "guides": [],
                            "valueAxes": [
                                {
                                        "id": "ValueAxis-1",
                                        "title": "Recaudo",
                                        "unit": "$",
                                        "unitPosition": "left"
                                },
                                {
                                        "id": "ValueAxis-2",
                                        "position": "right",
                                        "title": "Numero de transacciones"
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
                                        "text": "Recaudo total por departamento"
                                }
                            ],
                            "dataProvider": data,
                            "export": {
                               "enabled": true,
                               "menu": []
                             }
                        }
                    );
                });
            }
    });
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Recaudo por municipios
//-------------------------------------------------------------------------------------------------------
var recaudoMunicipios;
function recaudoTotalMunicipios () {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/second?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + "RECAUDOMUNICIPIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
                recaudoMunicipios = AmCharts.makeChart("chartRecaudoMunicipio",
                        {
                            "type": "serial",
                            "categoryField": "Municipio",
                            "language": "es",
                            "zoomOutText": "",
                            "columnWidth": 0.39,
                            "maxSelectedSeries": 8,
                            "sequencedAnimation": false,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Municipio"
                            },
                            "valueScrollbar": {
                                    "enabled": true
                            },
                            "chartCursor": {
                                    "enabled": true,
                                    "cursorColor": "#919F9F"
                            },
                            "chartScrollbar": {
                                    "enabled": true,
                                    "maximum": -10
                            },
                            "trendLines": [],
                            "graphs": [
                                {
                                        "balloonText": "[[title]] de [[category]]: $[[value]]",
                                        "fillAlphas": 1,
                                        "id": "AmGraph-1",
                                        "labelText": "$[[value]]",
                                        "title": "Recaudo",
                                        "type": "column",
                                        "valueAxis": "ValueAxis-1",
                                        "valueField": "Recaudo"
                                },
                                {
                                        "balloonText": "[[title]] de [[category]]:[[value]]",
                                        "bullet": "round",
                                        "id": "AmGraph-2",
                                        "labelText": "[[value]]",
                                        "lineAlpha": 0,
                                        "title": "Total Transacciones",
                                        "valueAxis": "ValueAxis-2",
                                        "valueField": "Numero de Transacciones"
                                }
                            ],
                            "guides": [],
                            "valueAxes": [
                                {
                                        "id": "ValueAxis-1",
                                        "title": "Recaudo",
                                        "unit": "$",
                                        "unitPosition": "left"
                                },
                                {
                                        "id": "ValueAxis-2",
                                        "position": "right",
                                        "title": "Numero de transacciones"
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
                                        "text": "Recaudo total por municipio"
                                }
                            ],
                            "dataProvider": data,
                            "export": {
                               "enabled": true,
                               "menu": []
                             }
                        }
                    );
                AmCharts.checkEmptyData(recaudoMunicipios);
        } else {
            var stringGET2 = "/webresources/kpis/second?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + "RECAUDOMUNICIPIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
            self.ajax(stringGET2, 'GET').done(function(data2) {
                combinarArrays(data, data2, 'Recaudo', 'Recaudo R2', 'Municipio');
                combinarArrays(data, data2, 'Numero de Transacciones', 'Numero de Transacciones R2', 'Municipio');
                recaudoMunicipios = AmCharts.makeChart("chartRecaudoMunicipio",
                        {
                            "type": "serial",
                            "categoryField": "Municipio",
                            "language": "es",
                            "zoomOutText": "",
                            "columnWidth": 0.39,
                            "maxSelectedSeries": 8,
                            "sequencedAnimation": false,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Municipio"
                            },
                            "valueScrollbar": {
                                    "enabled": true
                            },
                            "chartCursor": {
                                    "enabled": true,
                                    "cursorColor": "#919F9F"
                            },
                            "chartScrollbar": {
                                    "enabled": true,
                                    "maximum": -10
                            },
                            "trendLines": [],
                            "graphs": [
                                {
                                        "balloonText": "[[title]] de [[category]]: $[[value]]",
                                        "fillAlphas": 1,
                                        "id": "AmGraph-1",
                                        "labelText": "$[[value]]",
                                        "title": "Recaudo "+ startYear + "-" + endYear,
                                        "type": "column",
                                        "valueAxis": "ValueAxis-1",
                                        "valueField": "Recaudo"
                                },
                                {
                                        "balloonText": "[[title]] de [[category]]:[[value]]",
                                        "bullet": "round",
                                        "id": "AmGraph-2",
                                        "labelText": "[[value]]",
                                        "lineAlpha": 0,
                                        "title": "Total Transacciones "+ startYear + "-" + endYear,
                                        "valueAxis": "ValueAxis-2",
                                        "valueField": "Numero de Transacciones"
                                },
                                {
                                        "balloonText": "[[title]] de [[category]]: $[[value]]",
                                        "fillAlphas": 1,
                                        "id": "AmGraph-3",
                                        "labelText": "$[[value]]",
                                        "title": "Recaudo " + startYear2 + "-" + endYear2,
                                        "type": "column",
                                        "valueAxis": "ValueAxis-1",
                                        "valueField": "Recaudo R2"
                                },
                                {
                                        "balloonText": "[[title]] de [[category]]:[[value]]",
                                        "bullet": "round",
                                        "id": "AmGraph-4",
                                        "labelText": "[[value]]",
                                        "lineAlpha": 0,
                                        "title": "Total Transacciones " + startYear2 + "-" + endYear2,
                                        "valueAxis": "ValueAxis-2",
                                        "valueField": "Numero de Transacciones R2"
                                }
                            ],
                            "guides": [],
                            "valueAxes": [
                                {
                                        "id": "ValueAxis-1",
                                        "title": "Recaudo",
                                        "unit": "$",
                                        "unitPosition": "left"
                                },
                                {
                                        "id": "ValueAxis-2",
                                        "position": "right",
                                        "title": "Numero de transacciones"
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
                                        "text": "Recaudo total por municipio"
                                }
                            ],
                            "dataProvider": data,
                            "export": {
                               "enabled": true,
                               "menu": []
                             }
                        }
                    );
                AmCharts.checkEmptyData(recaudoMunicipios);
            });
        } 
    });
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Recaudo total años
//-------------------------------------------------------------------------------------------------------
var chartKPI1_1;
function recaudoTotalAno() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/second?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + "RECTOTALANIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
            chartKPI1_1 = AmCharts.makeChart("recaudoTotalKPI1_1",
                    {
                        "type": "serial",
                        "categoryField": "Mes",
                        "language": "es",
                        "zoomOutText": "",
                        "maxSelectedSeries": 8,
                        "sequencedAnimation": false,
                        "categoryAxis": {
                                "gridPosition": "start",
                                "title": "Año"
                        },
                        "valueScrollbar": {
                                "enabled": true
                        },
                        "chartCursor": {
                                "enabled": true,
                                "cursorColor": "#919F9F"
                        },
                        "chartScrollbar": {
                                "enabled": true,
                                "maximum": -10
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                    "balloonText": "[[title]] de [[category]]: $[[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-1",
                                    "labelText": "$[[value]]",
                                    "title": "Recaudo",
                                    "type": "column",
                                    "valueAxis": "ValueAxis-1",
                                    "valueField": "Recaudo"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "bullet": "round",
                                    "id": "AmGraph-2",
                                    "labelText": "[[value]]",
                                    "lineThickness": 2,
                                    "title": "Total Transacciones",
                                    "valueAxis": "ValueAxis-2",
                                    "valueField": "Numero de Transacciones"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                    "id": "ValueAxis-1",
                                    "title": "Recaudo",
                                    "unit": "$",
                                    "unitPosition": "left"
                            },
                            {
                                    "id": "ValueAxis-2",
                                    "position": "right",
                                    "title": "Numero de transacciones"
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
                                    "text": "Recaudo total por año "
                            }
                        ],
                        "dataProvider": data,
                        "export": {
                           "enabled": true,
                           "menu": []
                         }
                    }
                );
                AmCharts.checkEmptyData(chartKPI1_1);
            } else {
                var stringGET2 = "/webresources/kpis/second?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + "RECTOTALANIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
                self.ajax(stringGET2, 'GET').done(function(data2) {
                combinarArrays(data, data2, 'Recaudo', 'Recaudo R2', 'Mes');
                combinarArrays(data, data2, 'Numero de Transacciones', 'Numero de Transacciones R2', 'Mes');
                chartKPI1_1 = AmCharts.makeChart("recaudoTotalKPI1_1",
                    {
                        "type": "serial",
                        "categoryField": "Mes",
                        "language": "es",
                        "zoomOutText": "",
                        "maxSelectedSeries": 8,
                        "sequencedAnimation": false,
                        "categoryAxis": {
                                "gridPosition": "start",
                                "title": "Año"
                        },
                        "valueScrollbar": {
                                "enabled": true
                        },
                        "chartCursor": {
                                "enabled": true,
                                "cursorColor": "#919F9F"
                        },
                        "chartScrollbar": {
                                "enabled": true,
                                "maximum": -10
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                    "balloonText": "[[title]] de [[category]]: $[[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-1",
                                    "labelText": "$[[value]]",
                                    "title": "Recaudo "+ startYear + "-" + endYear,
                                    "type": "column",
                                    "valueAxis": "ValueAxis-1",
                                    "valueField": "Recaudo"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "bullet": "round",
                                    "id": "AmGraph-2",
                                    "labelText": "[[value]]",
                                    "lineThickness": 2,
                                    "title": "Total Transacciones "+ startYear + "-" + endYear,
                                    "valueAxis": "ValueAxis-2",
                                    "valueField": "Numero de Transacciones"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: $[[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-3",
                                    "labelText": "$[[value]]",
                                    "title": "Recaudo " + startYear2 + "-" + endYear2,
                                    "type": "column",
                                    "valueAxis": "ValueAxis-1",
                                    "valueField": "Recaudo R2"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "bullet": "round",
                                    "id": "AmGraph-4",
                                    "labelText": "[[value]]",
                                    "lineThickness": 2,
                                    "title": "Total Transacciones " + startYear2 + "-" + endYear2,
                                    "valueAxis": "ValueAxis-2",
                                    "valueField": "Numero de Transacciones R2"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                    "id": "ValueAxis-1",
                                    "title": "Recaudo",
                                    "unit": "$",
                                    "unitPosition": "left"
                            },
                            {
                                    "id": "ValueAxis-2",
                                    "position": "right",
                                    "title": "Numero de transacciones"
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
                                    "text": "Recaudo total por año"
                            }
                        ],
                        "dataProvider": data,
                        "export": {
                           "enabled": true,
                           "menu": []
                         }
                    }
                );
                AmCharts.checkEmptyData(chartKPI1_1);
                });
            }
    });

    return false;

}
//-------------------------------------------------------------------------------------------------------
// Recaudo total mes
//-------------------------------------------------------------------------------------------------------
var chartKPI1_1Mes;
function recaudoTotalMes() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/second?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + "RECTOTALMESANIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
                chartKPI1_1Mes = AmCharts.makeChart("recaudoTotalKPI1_1Mes",
                        {
                            "type": "serial",
                            "categoryField": "Mes",
                            "language": "es",
                            "zoomOutText": "",
                            "maxSelectedSeries": 8,
                            "sequencedAnimation": false,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Mes"
                            },
                            "valueScrollbar": {
                                    "enabled": true
                            },
                            "chartCursor": {
                                    "enabled": true,
                                    "cursorColor": "#919F9F"
                            },
                            "chartScrollbar": {
                                    "enabled": true,
                                    "maximum": -10
                            },
                            "trendLines": [],
                            "graphs": [
                                {
                                        "balloonText": "[[title]] de [[category]]: $[[value]]",
                                        "fillAlphas": 1,
                                        "id": "AmGraph-1",
                                        "labelText": "$[[value]]",
                                        "title": "Recaudo",
                                        "type": "column",
                                        "valueAxis": "ValueAxis-1",
                                        "valueField": "Recaudo"
                                },
                                {
                                        "balloonText": "[[title]] de [[category]]: [[value]]",
                                        "bullet": "round",
                                        "id": "AmGraph-2",
                                        "labelText": "[[value]]",
                                        "lineThickness": 2,
                                        "title": "Total Transacciones",
                                        "valueAxis": "ValueAxis-2",
                                        "valueField": "Numero de Transacciones"
                                }
                            ],
                            "guides": [],
                            "valueAxes": [
                                {
                                        "id": "ValueAxis-1",
                                        "title": "Recaudo",
                                        "unit": "$",
                                        "unitPosition": "left"
                                },
                                {
                                        "id": "ValueAxis-2",
                                        "position": "right",
                                        "title": "Numero de transacciones"
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
                                        "text": "Recaudo total por mes"
                                }
                            ],
                            "dataProvider": data,
                            "export": {
                               "enabled": true,
                               "menu": []
                             }
                        }
                    );
                AmCharts.checkEmptyData(chartKPI1_1Mes);
            } else {
                var stringGET2 = "/webresources/kpis/second?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + "MESREC"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
                stringGET = "/webresources/kpis/second?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + "MESREC"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
                self.ajax(stringGET2, 'GET').done(function(data2) {
                    self.ajax(stringGET, 'GET').done(function(data) {
                    combinarArrays(data, data2, 'Recaudo', 'Recaudo R2', 'Mes');
                    combinarArrays(data, data2, 'Numero de Transacciones', 'Numero de Transacciones R2', 'Mes');
                        chartKPI1_1Mes = AmCharts.makeChart("recaudoTotalKPI1_1Mes",
                            {
                                "type": "serial",
                                "categoryField": "Mes",
                                "language": "es",
                                "zoomOutText": "",
                                "maxSelectedSeries": 12,
                                "sequencedAnimation": false,
                                "categoryAxis": {
                                        "gridPosition": "start",
                                        "title": "Mes"
                                },
                                "valueScrollbar": {
                                        "enabled": true
                                },
                                "chartCursor": {
                                        "enabled": true,
                                        "cursorColor": "#919F9F"
                                },
                                "chartScrollbar": {
                                        "enabled": true,
                                        "maximum": -10
                                },
                                "trendLines": [],
                                "graphs": [
                                    {
                                            "balloonText": "[[title]] de [[category]]: $[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-1",
                                            "labelText": "$[[value]]",
                                            "title": "Recaudo " + startYear + "-" + endYear,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-1",
                                            "valueField": "Recaudo"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]: [[value]]",
                                            "bullet": "round",
                                            "id": "AmGraph-2",
                                            "labelText": "[[value]]",
                                            "lineThickness": 2,
                                            "title": "Total Transacciones " + startYear + "-" + endYear,
                                            "valueAxis": "ValueAxis-2",
                                            "valueField": "Numero de Transacciones"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]: $[[value]]",
                                            "fillAlphas": 1,
                                            "id": "AmGraph-3",
                                            "labelText": "$[[value]]",
                                            "title": "Recaudo " + startYear2 + "-" + endYear2,
                                            "type": "column",
                                            "valueAxis": "ValueAxis-1",
                                            "valueField": "Recaudo R2"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]: [[value]]",
                                            "bullet": "round",
                                            "id": "AmGraph-4",
                                            "labelText": "[[value]]",
                                            "lineThickness": 2,
                                            "title": "Total Transacciones " + startYear2 + "-" + endYear2,
                                            "valueAxis": "ValueAxis-2",
                                            "valueField": "Numero de Transacciones R2"
                                    }
                                ],
                                "guides": [],
                                "valueAxes": [
                                    {
                                            "id": "ValueAxis-1",
                                            "title": "Recaudo",
                                            "unit": "$",
                                            "unitPosition": "left"
                                    },
                                    {
                                            "id": "ValueAxis-2",
                                            "position": "right",
                                            "title": "Numero de transacciones"
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
                                            "text": "Recaudo total por mes"
                                    }
                                ],
                                "dataProvider": data,
                                "export": {
                                   "enabled": true,
                                   "menu": []
                                 }
                            }
                        );
                    AmCharts.checkEmptyData(chartKPI1_1Mes);
                });
                });
            }
    });

    return false;

}
function cambiarAnoMes() {
    var cual = document.getElementById("anoMes").value;
    if(cual.localeCompare("ano") === 0) {
        document.getElementById("botonesMes").style.display = "none";
        document.getElementById("botonesAno").style.display = "block";
        document.getElementById("graphMes").style.display = "none";
        document.getElementById("graphAno").style.display = "block";
        recaudoTotalAno();
    } else {
        document.getElementById("botonesMes").style.display = "block";
        document.getElementById("botonesAno").style.display = "none";
        document.getElementById("graphMes").style.display = "block";
        document.getElementById("graphAno").style.display = "none";
        recaudoTotalMes();
    }
}
//-------------------------------------------------------------------------------------------------------
// Recauto total 
//-------------------------------------------------------------------------------------------------------
function recaudoTotalKPI1() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/first?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    var stringGET2 = "";
    if(usingTwoRanges) {
        stringGET2 = "/webresources/kpis/first?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
        self.ajax(stringGET, 'GET').done(function(data) {
            self.ajax(stringGET2, 'GET').done(function(data2) {
                recaudoTotal = data;
                data = data.toLocaleString();
                data2 = data2.toLocaleString();
                if(parseFloat(data) > parseFloat(data2))
                    document.getElementById("recaudoTotalKPI1").innerHTML = "<span style=\"color: green\">$" + data + "</span> vs <span style=\"color: red\">$" + data2 + "</span>";
                else if(parseFloat(data) < parseFloat(data2))
                    document.getElementById("recaudoTotalKPI1").innerHTML = "<span style=\"color: red\">$" + data + "</span> vs <span style=\"color: green\">$" + data2 + "</span>";
                else
                    document.getElementById("recaudoTotalKPI1").innerHTML = "<span style=\"color: black\">$" + data + "</span> vs <span style=\"color: black\">$" + data2 + "</span>";
            });
        });
    } else {
        self.ajax(stringGET, 'GET').done(function(data) {
            data = data.toLocaleString();
            document.getElementById("recaudoTotalKPI1").innerHTML = "<span style=\"color: black\">$" + data + "</span>";
        });
    }
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Promedio recaudo total
//-------------------------------------------------------------------------------------------------------
function promedioRecaudoTotalKPI3() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/promediorecaudo?token=" + token + "&day=01&month=" + startMonth + "&year="+ startYear +"&day1=" + endDay + "&month1="+ endMonth +"&year1=" + endYear  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    var stringGET2;
    
    if(usingTwoRanges) {
        stringGET2 = "/webresources/kpis/promediorecaudo?token=" + token + "&day=01&month=" + startMonth2 + "&year="+ startYear2 +"&day1=" + endDay2 + "&month1="+ endMonth2 +"&year1=" + endYear2  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
        self.ajax(stringGET, 'GET').done(function(data) {
            self.ajax(stringGET2, 'GET').done(function(data2) {
                    data = parseFloat(data);
                    data2 = parseFloat(data2);
                if(data>data2) {
                    data = data.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("promedioRecaudoKPI3").innerHTML = "<span style=\"color: green\">$" + data + "</span> vs <span style=\"color: red\">$" + data2 + "</span>";
                } else if(data<data2) {
                    data = data.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("promedioRecaudoKPI3").innerHTML = "<span style=\"color: red\">$" + data + "</span> vs <span style=\"color: green\">$" + data2 + "</span>";
                } else {
                    data = data.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("promedioRecaudoKPI3").innerHTML = "<span style=\"color: black\">$" + data + "</span> vs <span style=\"color: black\">$" + data2 + "</span>";
                }
            });
        });
    } else {
        self.ajax(stringGET, 'GET').done(function(data) {
                data = data.toLocaleString();
                document.getElementById("promedioRecaudoKPI3").innerHTML = "<span style=\"color: black\">$" + data + "</span>";
        });
    }
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Proyección recaudo total
//-------------------------------------------------------------------------------------------------------
function proyeccionRecaudoKPI4() {
    var fecha = new Date();
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/promediorecaudo?token=" + token + "&day=01&month=01&year="+ fecha.getFullYear() +"&day1="+ fecha.getDate() +"&month1="+ (fecha.getMonth()+1) +"&year1=" + fecha.getFullYear()  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    var stringGET2 = "/webresources/kpis/first?token=" + token + "&day=01&month=01&year="+ (fecha.getFullYear()-1) +"&day1=31&month1=12&year1=" + (fecha.getFullYear()-1)  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    if(usingTwoRanges) {
        self.ajax(stringGET, 'GET').done(function(data) {
            self.ajax(stringGET2, 'GET').done(function(data2) {
                data = parseFloat(data);
                var proyeccion = data*12;
                data2 = parseFloat(data2);
                if(proyeccion>data2) {
                    proyeccion = proyeccion.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("proyeccionRecaudoKPI4").innerHTML = "<span style=\"color: green\">$" + proyeccion + "</span> vs <span style=\"color: red\">$" + data2 + "</span>";
                } else if (proyeccion < data2) {
                    proyeccion = proyeccion.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("proyeccionRecaudoKPI4").innerHTML = "<span style=\"color: red\">$" + proyeccion + "</span> vs <span style=\"color: green\">$" + data2 + "</span>";
                } else {
                    proyeccion = proyeccion.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("proyeccionRecaudoKPI4").innerHTML = "<span style=\"color: black\">$" + proyeccion + "</span> vs <span style=\"color: black\">$" + data2 + "</span>";
                }
            });
        });
    } else {
        self.ajax(stringGET, 'GET').done(function(data) {
                data = parseFloat(data);
                var proyeccion = data*12;
                proyeccion = proyeccion.toLocaleString();
                document.getElementById("proyeccionRecaudoKPI4").innerHTML = "<span style=\"color: black\">$" + proyeccion + "</span>";
        });
    }
    return false;
}
//-------------------------------------------------------------------------------------------------------
// KPI2
//-------------------------------------------------------------------------------------------------------
var chartKPI2;
var chartKPI2Rango2;
function recaudoPorTipoRadioButtonClickedKPI2(radioButton) {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/second?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + radioButton.value   + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

    var rdValue = radioButton.value + "";
    var tituloField = "";
    var valueField = ""; 

    var tipo = 1;

    document.getElementById("botonVerTablaConversionRecaudo").style.display= "none";
    document.getElementById("botonVerTablaConversionVehiculos").style.display= "none";

    if (rdValue.localeCompare("CODIGO")===0) {
        document.getElementById("botonVerTablaConversionRecaudo").style.display= "block";
        tituloField = "Codigo de infraccion";
        valueField = "Recaudo"; 
        tipo = 2;
    } else if (rdValue.localeCompare("SERVICIO")===0) {
        tituloField = "Tipo de servicio del vehiculo";
        valueField = "Recaudo"; 
    } else if (rdValue.localeCompare("INFRACTOR")===0) {
        tituloField = "Tipo de infractor";
        valueField = "Recaudo"; 
    } else if (rdValue.localeCompare("TIPOVEHICULO")===0) {
        document.getElementById("botonVerTablaConversionVehiculos").style.display= "block";
        tituloField = "Tipo de vehiculo";
        valueField = "Recaudo"; 
        tipo = 2
    } else if (rdValue.localeCompare("TIPORECAUDO")===0) {
        tituloField = "Tipo de recaudo";
        valueField = "Recaudo"; 
    } else if (rdValue.localeCompare("RESOLUCION")===0) {
        tituloField = "Tipo de resolucion";
        valueField = "Recaudo"; 
        resoluciones("Recaudo", "Tipo de resolucion");
        return false;
    }

    if(tipo === 1)
    {
        self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI2 = AmCharts.makeChart("recaudoKPI2",
                {
                    "type": "pie",
                    "language": "es",
                    "balloonText": "[[title]]<br><span style='font-size:14px'><b>$[[value]]</b> ([[percents]]%)</span>",
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
                            "text": "Recaudo por: " + tituloField
                        }
                    ],
                    "dataProvider": data,
                    "export": {
                       "enabled": true,
                       "menu": []
                     }
                }
            );
           AmCharts.checkEmptyDataPie(chartKPI2);
       });

       var stringGET = "/webresources/kpis/second?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + radioButton.value   + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
       self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI2Rango2 = AmCharts.makeChart("recaudoKPI2Rango2",
                {
                    "type": "pie",
                    "language": "es",
                    "balloonText": "[[title]]<br><span style='font-size:14px'><b>$[[value]]</b> ([[percents]]%)</span>",
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
                            "text": "Recaudo por: " + tituloField
                        }
                    ],
                    "dataProvider": data,
                    "export": {
                       "enabled": true,
                       "menu": []
                     }
                }
            );
           AmCharts.checkEmptyDataPie(chartKPI2Rango2);
       });
    } else if (tipo === 2) {
        self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI2 = AmCharts.makeChart("recaudoKPI2",
                {
                        "type": "serial",
                        "categoryField": tituloField,
                        "language": "es",
                        "zoomOutText": "",
                        "rotate": true,
                        "maxSelectedSeries": 8,
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
                                    "title": "Recaudo " + startYear + "-" + endYear,
                                    "type": "column",
                                    "valueField": valueField
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                    "id": "ValueAxis-1",
                                    "maximum": 0,
                                    "minMaxMultiplier": 0,
                                    "unit": "$",
                                    "unitPosition": "left",
                                    "title": "Recaudo"
                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "titles": [
                            {
                                    "id": "",
                                    "size": 15,
                                    "text": "Recaudo por: " + tituloField
                            }
                        ],
                        "dataProvider": data,
                        "export": {
                           "enabled": true,
                           "menu": []
                         }
                }
            );
           AmCharts.checkEmptyData(chartKPI2);
       });

       var stringGET = "/webresources/kpis/second?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + radioButton.value   + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
       self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI2Rango2 = AmCharts.makeChart("recaudoKPI2Rango2",
                {
                    "type": "serial",
                    "categoryField": tituloField,
                    "language": "es",
                    "zoomOutText": "",
                    "rotate": true,
                    "maxSelectedSeries": 8,
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
                                    "title": "Recaudo " + startYear2 + "-" + endYear2,
                                    "type": "column",
                                    "valueField": valueField
                            }
                    ],
                    "guides": [],
                    "valueAxes": [
                            {
                                    "id": "ValueAxis-1",
                                    "maximum": 0,
                                    "minMaxMultiplier": 0,
                                    "unit": "$",
                                    "unitPosition": "left",
                                    "title": "Recaudo"
                            }
                    ],
                    "allLabels": [],
                    "balloon": {},
                    "titles": [
                            {
                                    "id": "",
                                    "size": 15,
                                    "text": "Recaudo por: " + tituloField
                            }
                    ],
                    "dataProvider": data,
                    "export": {
                       "enabled": true,
                       "menu": []
                     }
                }
            );
           AmCharts.checkEmptyData(chartKPI2Rango2);
       });
    } 
    return false;            
}

function resoluciones(valueField, tituloField) {
    var token = localStorage.getItem("token");
        var day1;
        var month1;
        var year1;
        var day2;
        var month2;
        var year2;
        if(historico) {
            day1 = startDayRes;
            month1 = startMonthRes;
            year1 = startYearRes;
            day2 = endDayRes;
            month2 = endMonthRes;
            year2 = endYearRes;
        } else {
            day1 = startDay;
            month1 = startMonth;
            year1 = startYear;
            day2 = endDay;
            month2 = endMonth;
            year2 = endYear;
        }
        stringGET = "/webresources/kpis/second?token=" + token + "&day="+ day1 +"&month="+ month1 +"&year="+ year1 +"&day1="+ day2 +"&month1="+ month2 +"&year1=" + year2 + "&type=RESOLUCION&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
        self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI2 = AmCharts.makeChart("recaudoKPI2",
                {
                        "type": "serial",
                        "categoryField": tituloField,
                        "language": "es",
                        "zoomOutText": "",
                        "rotate": true,
                        "maxSelectedSeries": 8,
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
                                    "title": "Valor asociado a la resolución ",
                                    "type": "column",
                                    "labelText": "$[[value]]",
                                    "valueField": valueField
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                    "id": "ValueAxis-1",
                                    "maximum": 0,
                                    "minMaxMultiplier": 0,
                                    "unit": "$",
                                    "unitPosition": "left",
                                    "title": "Valor asociado a la resolución"
                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "titles": [
                            {
                                    "id": "",
                                    "size": 15,
                                    "text": "Recaudo por: " + tituloField + " en "  + day1 + "/" + month1 + "/" + year1 + " - " + day2 + "/" + month2 + "/" + year2
                            }
                        ],
                        "dataProvider": data,
                        "export": {
                           "enabled": true,
                           "menu": []
                         }
                }
            );
           AmCharts.checkEmptyData(chartKPI2);
       });
        var day12;
        var month12;
        var year12;
        var day22;
        var month22;
        var year22;
        if(historico) {
            day12 = startDay2Res;
            month12 = startMonth2Res;
            year12 = startYear2Res;
            day22 = endDay2Res;
            month22 = endMonth2Res;
            year22 = endYear2Res;
        } else {
            day12 = startDay2;
            month12 = startMonth2;
            year12 = startYear2;
            day22 = endDay2;
            month22 = endMonth2;
            year22 = endYear2;
        }   
       var stringGET = "/webresources/kpis/second?token=" + token + "&day="+ day12 +"&month="+ month12 +"&year="+ year12 +"&day1="+ day22 +"&month1="+ month22 +"&year1=" + year22 + "&type=RESOLUCION&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
       self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI2Rango2 = AmCharts.makeChart("recaudoKPI2Rango2",
                {
                    "type": "serial",
                    "categoryField": tituloField,
                    "language": "es",
                    "zoomOutText": "",
                    "rotate": true,
                    "maxSelectedSeries": 8,
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
                                    "title": "Valor asociado a la resolución ",
                                    "type": "column",
                                    "labelText": "$[[value]]",
                                    "valueField": valueField
                            }
                    ],
                    "guides": [],
                    "valueAxes": [
                            {
                                    "id": "ValueAxis-1",
                                    "maximum": 0,
                                    "minMaxMultiplier": 0,
                                    "unit": "$",
                                    "unitPosition": "left",
                                    "title": "Valor asociado a la resolución"
                            }
                    ],
                    "allLabels": [],
                    "balloon": {},
                    "titles": [
                            {
                                    "id": "",
                                    "size": 15,
                                    "text": "Recaudo por: " + tituloField + " en "  + day12 + "/" + month12 + "/" + year12 + " - " + day22 + "/" + month22 + "/" + year22
                            }
                    ],
                    "dataProvider": data,
                    "export": {
                       "enabled": true,
                       "menu": []
                     }
                }
            );
           AmCharts.checkEmptyData(chartKPI2Rango2);
       });
    }
//-------------------------------------------------------------------------------------------------------
// Pagos extemporáneos por departamento
//-------------------------------------------------------------------------------------------------------
var extemporaneosDepartamento;
function extemporaneosPorDepartamento() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/recaudoExtra?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear  + "&type=EXTRACARTERADEPTO" + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
                extemporaneosDepartamento = AmCharts.makeChart("chartExtemporaneosDpto",
                    {
                        "type": "serial",
                        "categoryField": "Mes",
                        "language": "es",
                        "zoomOutText": "",
                        "startDuration": 1,
                        "maxSelectedSeries": 8,
                        "categoryAxis": {
                                "gridPosition": "start"
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-1",
                                    "title": "Recaudo del periodo",
                                    "labelText": "$ [[value]]",
                                    "type": "column",
                                    "valueField": "Valor"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-2",
                                    "title": "Recaudo extemporaneo",
                                    "labelText": "$ [[value]]",
                                    "valueAxis": "ValueAxis-3",
                                    "type": "column",
                                    "valueField": "Extra"
                            },
                            {
                                    "id": "AmGraph-5",
                                    "lineThickness": 4,
                                    "lineAlpha": 0,
                                    "bullet": "round",
                                    "title": "Cartera",
                                    "labelText": "$ [[value]]",
                                    "valueAxis": "ValueAxis-2",
                                    "valueField": "Catera"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                    "id": "ValueAxis-1",
                                    "stackType": "regular",
                                    "title": "Pagos"
                            },
                            {
                                    "axisTitleOffset": 7,
                                    "id": "ValueAxis-2",
                                    "position": "right",
                                    "title": "Cartera"
                            },
                            {
                                    "offset": 60,
                                    "id": "ValueAxis-3",
                                    "position": "right",
                                    "title": "Extemporaneos"
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
                                    "text": "Pagos extemporáneos por departamento"
                            }
                        ],
                        "dataProvider": data,
                        "export": {
                                    "enabled": true,
                                    "menu": []
                        }
                    }
               );
            AmCharts.checkEmptyData(extemporaneosDepartamento);

        } else {
            var stringGET2 = "/webresources/kpis/recaudoExtra?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2  + "&type=EXTRACARTERADEPTO" + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
            self.ajax(stringGET2, 'GET').done(function(data2) {
            combinarArrays(data, data2, 'Valor', 'Valor R2', 'Mes');
            combinarArrays(data, data2, 'Extra', 'Extra R2', 'Mes');
            combinarArrays(data, data2, 'Catera', 'Catera R2', 'Mes');
            extemporaneosDepartamento = AmCharts.makeChart("chartExtemporaneosDpto",
                {
                    "type": "serial",
                    "categoryField": "Mes",
                    "language": "es",
                    "zoomOutText": "",
                    "maxSelectedSeries": 8,
                    "startDuration": 1,
                    "categoryAxis": {
                            "gridPosition": "start"
                    },
                    "trendLines": [],
                    "graphs": [
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-1",
                                "title": "Recaudo del periodo "+ startYear + "-" + endYear,
                                "labelText": "$ [[value]]",
                                "type": "column",
                                "valueField": "Valor"
                        },
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-2",
                                "title": "Recaudo extemporaneo "+ startYear + "-" + endYear,
                                "labelText": "$ [[value]]",
                                "type": "column",
                                "valueAxis": "ValueAxis-4",
                                "valueField": "Extra"
                        },
                        {
                                "id": "AmGraph-3",
                                "lineThickness": 4,
                                "lineAlpha": 0,
                                "bullet": "round",
                                "title": "Cartera "+ startYear + "-" + endYear,
                                "labelText": "$ [[value]]",
                                "valueAxis": "ValueAxis-2",
                                "valueField": "Catera"
                        },
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-4",
                                "title": "Recaudo del periodo "+ startYear2 + "-" + endYear2,
                                "labelText": "$ [[value]]",
                                "valueAxis": "ValueAxis-3",
                                "type": "column",
                                "valueField": "Valor R2"
                        },
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-5",
                                "title": "Recaudo extemporaneo "+ startYear2 + "-" + endYear2,
                                "labelText": "$ [[value]]",
                                "valueAxis": "ValueAxis-4",
                                "type": "column",
                                "valueField": "Extra R2"
                        },
                        {
                                "id": "AmGraph-6",
                                "lineThickness": 4,
                                "lineAlpha": 0,
                                "bullet": "round",
                                "title": "Cartera "+ startYear2 + "-" + endYear2,
                                "labelText": "$ [[value]]",
                                "valueAxis": "ValueAxis-2",
                                "valueField": "Catera R2"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                                "id": "ValueAxis-1",
                                "stackType": "regular",
                                "title": "Pagos"
                        },
                        {
                                "id": "ValueAxis-3",
                                "stackType": "regular",
                                "title": "Pagos"
                        },
                        {
                                "axisTitleOffset": 7,
                                "id": "ValueAxis-2",
                                "position": "right",
                                "title": "Cartera"
                        },
                        {
                                "offset": 60,
                                "id": "ValueAxis-4",
                                "position": "right",
                                "title": "Extemporaneos"
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
                                "text": "Pagos extemporáneos por departamento"
                        }
                    ],
                    "dataProvider": data,
                    "export": {
                                "enabled": true,
                                "menu": []
                    }
                }
            );
            AmCharts.checkEmptyData(extemporaneosDepartamento);
            });
        }
    });
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Pagos extemporáneos por municipio
//-------------------------------------------------------------------------------------------------------
var extemporaneosMunicipios;
function extemporaneosPorMunicipio() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/recaudoExtra?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear  + "&type=EXTRACARTERAMUNIC" +  "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
                extemporaneosMunicipios = AmCharts.makeChart("chartExtemporaneosMunicipio",
                    {
                        "type": "serial",
                        "categoryField": "Mes",
                        "language": "es",
                        "zoomOutText": "",
                        "startDuration": 1,
                        "maxSelectedSeries": 8,
                        "categoryAxis": {
                                "gridPosition": "start"
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-1",
                                    "title": "Recaudo del periodo",
                                    "type": "column",
                                    "labelText": "$[[value]]",
                                    "valueField": "Valor"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-2",
                                    "title": "Recaudo extemporaneo",
                                    "type": "column",
                                    "labelText": "$[[value]]",
                                    "valueAxis": "ValueAxis-3",
                                    "valueField": "Extra"
                            },
                            {
                                    "id": "AmGraph-5",
                                    "lineThickness": 4,
                                    "bullet": "round",
                                    "lineAlpha": 0,
                                    "title": "Cartera",
                                    "labelText": "$[[value]]",
                                    "valueAxis": "ValueAxis-2",
                                    "valueField": "Catera"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                    "id": "ValueAxis-1",
                                    "stackType": "regular",
                                    "title": "Pagos"
                            },
                            {
                                    "axisTitleOffset": 7,
                                    "id": "ValueAxis-2",
                                    "position": "right",
                                    "title": "Cartera"
                            },
                            {
                                    "offset": 60,
                                    "id": "ValueAxis-3",
                                    "position": "right",
                                    "title": "Extemporaneos"
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
                                    "text": "Pagos extemporáneos por municipio"
                            }
                        ],
                        "dataProvider": data,
                        "export": {
                                    "enabled": true,
                                    "menu": []
                        }
                    }               
               );
               AmCharts.checkEmptyData(extemporaneosMunicipios);
           } else {
               var stringGET2 = "/webresources/kpis/recaudoExtra?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2  + "&type=EXTRACARTERAMUNIC" +  "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
                self.ajax(stringGET2, 'GET').done(function(data2) {
                combinarArrays(data, data2, 'Extra', 'Extra R2', 'Mes');
                combinarArrays(data, data2, 'Catera', 'Catera R2', 'Mes');
                combinarArrays(data, data2, 'Valor', 'Valor R2', 'Mes');
                extemporaneosMunicipios = AmCharts.makeChart("chartExtemporaneosMunicipio",
                    {
                        "type": "serial",
                        "categoryField": "Mes",
                        "language": "es",
                        "zoomOutText": "",
                        "startDuration": 1,
                        "maxSelectedSeries": 8,
                        "categoryAxis": {
                                "gridPosition": "start"
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-1",
                                    "title": "Recaudo del periodo "+ startYear + "-" + endYear,
                                    "type": "column",
                                    "labelText": "$[[value]]",
                                    "valueField": "Valor"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-2",
                                    "title": "Recaudo extemporaneo "+ startYear + "-" + endYear,
                                    "type": "column",
                                    "labelText": "$[[value]]",
                                    "valueAxis": "ValueAxis-4",
                                    "valueField": "Extra"
                            },
                            {
                                    "id": "AmGraph-3",
                                    "lineThickness": 4,
                                    "bullet": "round",
                                    "lineAlpha": 0,
                                    "title": "Cartera "+ startYear + "-" + endYear,
                                    "labelText": "$[[value]]",
                                    "valueAxis": "ValueAxis-2",
                                    "valueField": "Catera"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-4",
                                    "title": "Recaudo del periodo "+ startYear2 + "-" + endYear2,
                                    "type": "column",
                                    "labelText": "$[[value]]",
                                    "valueAxis": "ValueAxis-3",
                                    "valueField": "Valor R2"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-5",
                                    "title": "Recaudo extemporaneo "+ startYear2 + "-" + endYear2,
                                    "type": "column",
                                    "labelText": "$[[value]]",
                                    "valueAxis": "ValueAxis-4",
                                    "valueField": "Extra R2"
                            },
                            {
                                    "id": "AmGraph-6",
                                    "lineThickness": 4,
                                    "bullet": "round",
                                    "lineAlpha": 0,
                                    "title": "Cartera "+ startYear2 + "-" + endYear2,
                                    "labelText": "$[[value]]",
                                    "valueAxis": "ValueAxis-2",
                                    "valueField": "Catera R2"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                    "id": "ValueAxis-1",
                                    "stackType": "regular",
                                    "title": "Pagos"
                            },
                            {
                                    "id": "ValueAxis-3",
                                    "stackType": "regular",
                                    "title": "Pagos"
                            },
                            {
                                    "axisTitleOffset": 7,
                                    "id": "ValueAxis-2",
                                    "position": "right",
                                    "title": "Cartera"
                            },
                            {
                                    "offset": 60,
                                    "id": "ValueAxis-4",
                                    "position": "right",
                                    "title": "Extemporaneos"
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
                                    "text": "Pagos extemporáneos por municipio"
                            }
                        ],
                        "dataProvider": data,
                        "export": {
                                           "enabled": true,
                                           "menu": []
                        }
                    }               
               );
                AmCharts.checkEmptyData(extemporaneosMunicipios);
                });
           }
    });
    return false;
}
function difDias(primera, segunda) {
    return Math.round((segunda-primera)/(1000*60*60*24));
}
//-------------------------------------------------------------------------------------------------------
// Extemporáneos por año
//-------------------------------------------------------------------------------------------------------
var chartKPI6;
function pagosExtemporaneosKPI6() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/recaudoExtra?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear  + "&type=EXTRACARTERAANIO" +  "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
            chartKPI6 = AmCharts.makeChart("pagosExtemporaneosKPI6",
                {
                    "type": "serial",
                    "categoryField": "Mes",
                    "language": "es",
                    "zoomOutText": "",
                    "startDuration": 1,
                    "maxSelectedSeries": 8,
                    "categoryAxis": {
                            "gridPosition": "start"
                    },
                    "trendLines": [],
                    "graphs": [
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-1",
                                "title": "Recaudo del periodo",
                                "type": "column",
                                "labelText": "$[[value]]",
                                "valueField": "Valor"
                        },
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-2",
                                "title": "Recaudo extemporaneo",
                                "type": "column",
                                "labelText": "$[[value]]",
                                "valueAxis": "ValueAxis-3",
                                "valueField": "Extra"
                        },
                        {
                                "id": "AmGraph-5",
                                "lineThickness": 4,
                                "bullet": "round",
                                "title": "Cartera",
                                "labelText": "$[[value]]",
                                "valueAxis": "ValueAxis-2",
                                "valueField": "Catera"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                                "id": "ValueAxis-1",
                                "stackType": "regular",
                                "title": "Pagos"
                        },
                        {
                                "axisTitleOffset": 7,
                                "id": "ValueAxis-2",
                                "position": "right",
                                "title": "Cartera"
                        },
                        {
                                "offset": 60,
                                "id": "ValueAxis-3",
                                "position": "right",
                                "title": "Extemporaneos"
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
                                "text": "Pagos extemporáneos por año"
                        }
                    ],
                    "dataProvider": data,
                    "export": {
                                "enabled": true,
                                "menu": []
                    }
                }                
           );
           AmCharts.checkEmptyData(chartKPI6);
        } else {
            var stringGET2 = "/webresources/kpis/recaudoExtra?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2  + "&type=EXTRACARTERAANIO" +  "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
            self.ajax(stringGET2, 'GET').done(function(data2) {
            combinarArrays(data, data2, 'Valor', 'Valor R2', 'Mes');
            combinarArrays(data, data2, 'Extra', 'Extra R2', 'Mes');
            combinarArrays(data, data2, 'Catera', 'Catera R2', 'Mes');
            chartKPI6 = AmCharts.makeChart("pagosExtemporaneosKPI6",
                {
                    "type": "serial",
                    "categoryField": "Mes",
                    "language": "es",
                    "zoomOutText": "",
                    "startDuration": 1,
                    "maxSelectedSeries": 8,
                    "categoryAxis": {
                            "gridPosition": "start"
                    },
                    "trendLines": [],
                    "graphs": [
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-1",
                                "title": "Recaudo del periodo "+ startYear + "-" + endYear,
                                "type": "column",
                                "labelText": "$[[value]]",
                                "valueField": "Valor"
                        },
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-2",
                                "title": "Recaudo extemporaneo "+ startYear + "-" + endYear,
                                "type": "column",
                                "labelText": "$[[value]]",
                                "valueAxis": "ValueAxis-3",
                                "valueField": "Extra"
                        },
                        {
                                "id": "AmGraph-3",
                                "lineThickness": 4,
                                "bullet": "round",
                                "title": "Cartera "+ startYear + "-" + endYear,
                                "labelText": "$[[value]]",
                                "valueAxis": "ValueAxis-2",
                                "valueField": "Catera"
                        },
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-4",
                                "title": "Recaudo del periodo "+ startYear2 + "-" + endYear2,
                                "type": "column",
                                "labelText": "$[[value]]",
                                "valueAxis": "ValueAxis-1",
                                "valueField": "Valor R2"
                        },
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-5",
                                "title": "Recaudo extemporaneo "+ startYear2 + "-" + endYear2,
                                "type": "column",
                                "labelText": "$[[value]]",
                                "valueAxis": "ValueAxis-3",
                                "valueField": "Extra R2"
                        },
                        {
                                "id": "AmGraph-6",
                                "lineThickness": 4,
                                "bullet": "round",
                                "title": "Cartera "+ startYear2 + "-" + endYear2,
                                "labelText": "$[[value]]",
                                "valueAxis": "ValueAxis-2",
                                "valueField": "Catera R2"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                                "id": "ValueAxis-1",
                                "stackType": "regular",
                                "title": "Pagos"
                        },
                        {
                                "axisTitleOffset": 7,
                                "id": "ValueAxis-2",
                                "position": "right",
                                "title": "Cartera"
                        },
                        {
                                "offset": 60,
                                "id": "ValueAxis-3",
                                "position": "right",
                                "title": "Extemporaneos"
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
                                "text": "Pagos extemporáneos por año"
                        }
                    ],
                    "dataProvider": data,
                    "export": {
                                "enabled": true,
                                "menu": []
                    }
                }                
            );
            AmCharts.checkEmptyData(chartKPI6);
            });
        }
    });
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Extemporáneos por mes
//-------------------------------------------------------------------------------------------------------
var chartKPI6Mes;
function pagosExtemporaneosKPI6Mes() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/recaudoExtra?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear  + "&type=EXTRACARTERAANIOMES" +  "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
            chartKPI6Mes = AmCharts.makeChart("pagosExtemporaneosKPI6Mes",
                {
                    "type": "serial",
                    "categoryField": "Mes",
                    "language": "es",
                    "zoomOutText": "",
                    "startDuration": 1,
                    "maxSelectedSeries": 8,
                    "categoryAxis": {
                            "gridPosition": "start"
                    },
                    "trendLines": [],
                    "graphs": [
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-1",
                                "title": "Recaudo del periodo",
                                "type": "column",
                                "labelText": "$[[value]]",
                                "valueField": "Valor"
                        },
                        {
                                "balloonText": "[[title]] de [[category]]: [[value]]",
                                "fillAlphas": 1,
                                "id": "AmGraph-3",
                                "title": "Recaudo extemporaneo",
                                "type": "column",
                                "labelText": "$[[value]]",
                                "valueField": "Extra"
                        },
                        {
                                "id": "AmGraph-5",
                                "lineThickness": 4,
                                "bullet": "round",
                                "title": "Cartera",
                                "labelText": "$[[value]]",
                                "valueAxis": "ValueAxis-2",
                                "valueField": "Catera"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                                "id": "ValueAxis-1",
                                "stackType": "regular",
                                "title": "Pagos"
                        },
                        {
                                "axisTitleOffset": 7,
                                "id": "ValueAxis-2",
                                "position": "right",
                                "title": "Cartera"
                        },
                        {
                                "offset": 60,
                                "id": "ValueAxis-3",
                                "position": "right",
                                "title": "Extemporaneos"
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
                                "text": "Pagos extemporáneos por mes"
                        }
                    ],
                    "dataProvider": data,
                    "export": {
                                "enabled": true,
                                "menu": []
                    }
                }                
           );
           AmCharts.checkEmptyData(chartKPI6Mes);
        } else {
            var stringGET2 = "/webresources/kpis/recaudoExtra?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2  + "&type=MESCART" +  "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
            stringGET = "/webresources/kpis/recaudoExtra?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear  + "&type=MESCART" +  "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
            self.ajax(stringGET2, 'GET').done(function(data2) {
                self.ajax(stringGET, 'GET').done(function(data) {
                combinarArrays(data, data2, 'Valor', 'Valor R2', 'Mes');
                combinarArrays(data, data2, 'Extra', 'Extra R2', 'Mes');
                combinarArrays(data, data2, 'Catera', 'Catera R2', 'Mes');
                chartKPI6Mes = AmCharts.makeChart("pagosExtemporaneosKPI6Mes",
                    {
                        "type": "serial",
                        "categoryField": "Mes",
                        "language": "es",
                        "zoomOutText": "",
                        "startDuration": 1,
                        "maxSelectedSeries": 8,
                        "categoryAxis": {
                                "gridPosition": "start"
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-1",
                                    "title": "Recaudo del periodo " + startYear + "-" + endYear,
                                    "labelText": "$ [[value]]",
                                    "type": "column",
                                    "valueField": "Valor"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-2",
                                    "title": "Recaudo extemporaneo " + startYear + "-" + endYear,
                                    "labelText": "$ [[value]]",
                                    "valueAxis": "ValueAxis-4",
                                    "type": "column",
                                    "valueField": "Extra"
                            },
                            {
                                    "id": "AmGraph-3",
                                    "lineThickness": 4,
                                    "lineAlpha": 0,
                                    "bullet": "round",
                                    "title": "Cartera " + startYear + "-" + endYear,
                                    "labelText": "$ [[value]]",
                                    "valueAxis": "ValueAxis-2",
                                    "valueField": "Catera"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-4",
                                    "title": "Recaudo del periodo " + startYear2 + "-" + endYear2,
                                    "labelText": "$ [[value]]",
                                    "valueAxis": "ValueAxis-3",
                                    "type": "column",
                                    "valueField": "Valor R2"
                            },
                            {
                                    "balloonText": "[[title]] de [[category]]: [[value]]",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-5",
                                    "title": "Recaudo extemporaneo " + startYear2 + "-" + endYear2,
                                    "labelText": "$ [[value]]",
                                    "valueAxis": "ValueAxis-4",
                                    "type": "column",
                                    "valueField": "Extra R2"
                            },
                            {
                                    "id": "AmGraph-6",
                                    "lineThickness": 4,
                                    "lineAlpha": 0,
                                    "bullet": "round",
                                    "title": "Cartera " + startYear2 + "-" + endYear2,
                                    "labelText": "$ [[value]]",
                                    "valueAxis": "ValueAxis-2",
                                    "valueField": "Catera R2"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                    "id": "ValueAxis-1",
                                    "stackType": "regular",
                                    "title": "Pagos"
                            },
                            {
                                    "id": "ValueAxis-3",
                                    "stackType": "regular",
                                    "title": ""
                            },
                            {
                                    "axisTitleOffset": 7,
                                    "id": "ValueAxis-2",
                                    "position": "right",
                                    "title": "Cartera"
                            },
                            {
                                    "offset": 60,
                                    "id": "ValueAxis-4",
                                    "position": "right",
                                    "title": "Extemporaneos"
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
                                    "text": "Pagos extemporáneos por mes"
                            }
                        ],
                        "dataProvider": data,
                        "export": {
                                    "enabled": true,
                                    "menu": []
                        }
                    }                
                );
                AmCharts.checkEmptyData(chartKPI6Mes);
            });
            });
        }
    });
    return false;
}
function cambiarAnoMesExtra() {
    var cual = document.getElementById("anoMesExtra").value;
    if(cual.localeCompare("ano") === 0) {
        document.getElementById("botonesMesExtra").style.display = "none";
        document.getElementById("botonesAnoExtra").style.display = "block";
        document.getElementById("graphMesExtra").style.display = "none";
        document.getElementById("graphAnoExtra").style.display = "block";
        pagosExtemporaneosKPI6();
    } else {
        document.getElementById("botonesMesExtra").style.display = "block";
        document.getElementById("botonesAnoExtra").style.display = "none";
        document.getElementById("graphMesExtra").style.display = "block";
        document.getElementById("graphAnoExtra").style.display = "none";
        pagosExtemporaneosKPI6Mes();
    }
}
// Metodos para Exportar en Excel e Imprimir
function exportRecaudoDpto() {
  recaudoDepartamentos.export.toXLSX({
    data: recaudoDepartamentos.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "recaudoDepartamento.xlsx");
  });
}

function printRecaudoDpto(){
   recaudoDepartamentos.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportRecaudoMunicipio() {
  recaudoMunicipios.export.toXLSX({
    data: recaudoMunicipios.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "recaudoMunicipio.xlsx");
  });
}

function printRecaudoMunicipio(){
   recaudoMunicipios.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportRecaudoAno() {
  chartKPI1_1.export.toXLSX({
    data: chartKPI1_1.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "RecaudoTotalEnRango.xlsx");
  });
}

function printRecaudoAno(){
   chartKPI1_1.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportRecaudoMes() {
  chartKPI1_1Mes.export.toXLSX({
    data: chartKPI1_1Mes.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "RecaudoTotalEnRango.xlsx");
  });
}

function printRecaudoMes(){
   chartKPI1_1Mes.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportRecaudoPorTipo() {
  chartKPI2.export.toXLSX({
    data: chartKPI2.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "RecaudoPorTipoEnRango.xlsx");
  });
}

function printRecaudoPorTipo(){
   chartKPI2.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportRecaudoPorTipoRango2() {
  chartKPI2Rango2.export.toXLSX({
    data: chartKPI2Rango2.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "RecaudoPorTipoEnRango.xlsx");
  });
}

function printRecaudoPorTipoRango2(){
   chartKPI2Rango2.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportExtemporaneosDpto() {
  extemporaneosDepartamento.export.toXLSX({
    data: extemporaneosDepartamento.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "extemporaneosDepartamento.xlsx");
  });
}

function printExtemporaneosDpto(){
   extemporaneosDepartamento.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportExtemporaneosMunicipio() {
  extemporaneosMunicipios.export.toXLSX({
    data: extemporaneosMunicipios.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "extemporaneosMunicipios.xlsx");
  });
}

function printExtemporaneosMunicipio(){
   extemporaneosMunicipios.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportExtemporaneosAno() {
  chartKPI6.export.toXLSX({
    data: chartKPI6.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "PagosExtemporaneosEnRango.xlsx");
  });
}

function printExtemporaneosAno(){
   chartKPI6.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportExtemporaneosMes() {
  chartKPI6Mes.export.toXLSX({
    data: chartKPI6Mes.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "PagosExtemporaneosEnRango.xlsx");
  });
}

function printExtemporaneosMes(){
   chartKPI6Mes.export.capture( {}, function() {
       this.toPRINT();
   } );
}

AmCharts.checkEmptyData = function (chart) {

    if ( 0 === chart.dataProvider.length ) {
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
        chart.addLabel(0, '50%', 'No hay información para mostrar', 'center');

        // set opacity of the chart div
        chart.chartDiv.style.opacity = 0.5;

        // redraw it
        chart.validateNow();
    }
};

AmCharts.checkEmptyDataPie = function (chart) {
    if ( 0 === chart.dataProvider.length ) {
        // set min/max on the value axis

        // add dummy data point
        var dataPoint = {
            dummyValue: 0
        };
        dataPoint[chart.titleField] = '';
        chart.dataProvider = [dataPoint];

        // add label
        chart.addLabel(0, '50%', 'No hay información para mostrar', 'center');

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
        document.getElementById("buttonEsconder").innerHTML = "Mostrar Menú de Filtros";

    } else {
        toogle = true;

        document.getElementById("searchHeader").style.display = "block";
        document.getElementById("buttonEsconder").innerHTML = "Esconder Menú de Filtros";
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
        var stringGET = "/webresources/kpis/historia?token=" + token + "&type=REC" + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
        var menor = "";
        var mayor = "";
        self.ajax(stringGET, 'GET').done(function(data) {
            menor = data.Menor;
            mayor = data.Mayor;
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
        document.getElementById("labelRango2").style.display = "block";
        document.getElementById("espacio").style.display = "none";
        document.getElementById("secondRangeButton").className = "btn btn-primary";
    }

        document.getElementById("divChartRecaudoRango2").style.display = "block";
        document.getElementById("divChartRecaudoRango1").className = "col-lg-6";

        document.getElementById("exportRango21").style.display = "inline-block";

    if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {
        funcionesPorDepartamento();
    } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
        funcionesPorTiempo();
    } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
        funcionesPorMunicipio();
    }

    if(usingTwoRanges === false) {
        document.getElementById("divChartRecaudoRango2").style.display = "none";
        document.getElementById("divChartRecaudoRango1").className = "col-lg-12";

        document.getElementById("exportRango21").style.display = "none";
    }

    return false;
}

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
            //console.log(tempObj);
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
        if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {
            funcionesPorDepartamento();
        } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
            funcionesPorTiempo();
        } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
            funcionesPorMunicipio();
        }
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

            if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {
                funcionesPorDepartamento();
            } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
                funcionesPorTiempo();
            } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
                funcionesPorMunicipio();
            }
            var menor2 = menor.split("-")[2] + "/" + menor.split("-")[1] + "/" + menor.split("-")[0];
            var mayor2 = mayor.split("-")[2] + "/" + mayor.split("-")[1] + "/" + mayor.split("-")[0];
            $('#demo2').data('daterangepicker').setStartDate(menor2);
            $('#demo2').data('daterangepicker').setEndDate(mayor2);
        }
    } else {
        historico = true;
        document.getElementById("mostrarHistorico").className = "btn btn-primary";
        var token = localStorage.getItem("token");
        var stringGET = "/webresources/kpis/historia?token=" + token + "&type=REC"+ "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
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
            if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {
                funcionesPorDepartamento();
            } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
                funcionesPorTiempo();
            } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
                funcionesPorMunicipio();
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

                if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {
                    funcionesPorDepartamento();
                } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
                    funcionesPorTiempo();
                } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
                    funcionesPorMunicipio();
                }
                var menor2 = menor.split("-")[2] + "/" + menor.split("-")[1] + "/" + menor.split("-")[0];
                var mayor2 = mayor.split("-")[2] + "/" + mayor.split("-")[1] + "/" + mayor.split("-")[0];
                $('#demo2').data('daterangepicker').setStartDate(menor2);
                $('#demo2').data('daterangepicker').setEndDate(mayor2);
            }
            var stringGET2 = "/webresources/kpis/historia?token=" + token + "&type=RES"+ "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
                var menor = "";
                var mayor = "";
                    self.ajax(stringGET2, 'GET').done(function(data2) {
                        menor = data2.Menor;
                        mayor = data2.Mayor;
                        startYearRes = menor.split("-")[0];
                        startMonthRes = menor.split("-")[1];
                        startDayRes = menor.split("-")[2];
                        endYearRes = mayor.split("-")[0];
                        endMonthRes = mayor.split("-")[1];
                        endDayRes = mayor.split("-")[2];
                        if(usingTwoRanges === true) {
                            usingTwoRanges = true;

                            startYear2Res = menor.split("-")[0];
                            startMonth2Res = menor.split("-")[1];
                            startDay2Res = menor.split("-")[2];

                            endYear2Res = mayor.split("-")[0];
                            endMonth2Res = mayor.split("-")[1];
                            endDay2Res = mayor.split("-")[2];
                            
                        }
                        if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {
                            funcionesPorDepartamento();
                        } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
                            funcionesPorTiempo();
                        } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
                            funcionesPorMunicipio();
                        }
                    });
        });
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
        //Está seleccionado todos los departamentos
        graficas.push(recaudoDepartamentos);
        graficas.push(extemporaneosDepartamento);
    } else if(depto.localeCompare("0") != 0 && municipio.localeCompare("0") === 0) {
        //Está seleccionado un departamento
        graficas.push(recaudoMunicipios);
        graficas.push(extemporaneosMunicipios);
    } else if(depto.localeCompare("0") != 0 && municipio.localeCompare("0") != 0) {
        //Está seleccionado un municipio
        var tiempo = document.getElementById("anoMes").value;
        if(tiempo.localeCompare("ano") === 0) {
            graficas.push(chartKPI1_1);
        } else if(tiempo.localeCompare("mes") === 0) {
            graficas.push(chartKPI1_1Mes);
        }
        var tiempoExtra = document.getElementById("anoMesExtra").value;
        if(tiempoExtra.localeCompare("ano") === 0) {
            graficas.push(chartKPI6);
        } else if(tiempoExtra.localeCompare("mes") === 0) {
            graficas.push(chartKPI6Mes);
        }
    }
    if(usingTwoRanges == true) {
        graficas.push(chartKPI2);
        graficas.push(chartKPI2Rango2);
    } else if(usingTwoRanges == false) {
        graficas.push(chartKPI2);
    }
    return graficas;
}