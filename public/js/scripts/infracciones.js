//Obtiene la variable que indica si hay una sesión activa
var sesion = localStorage.getItem("sesion");
//Verifica que haya una sesión activa con el valor de la variable sesión
if(sesion.localeCompare("false") === 0)
{
    //Envía al usuario al index si no hay una sesión activa
    window.location = "index.jsp";
}

//Función para cerrar sesión
$('#cerrar').click( function() { 
    localStorage.setItem("sesion", false);
    localStorage.setItem("rol", "");
    localStorage.setItem("idMun", "");
    localStorage.setItem("nomMun", "");
    window.location = "index.jsp";
});
//Asigna valores iniciales para las variables del filtro
var parametroURLFiltro = "TODOSDPTOS";
var parametroCualId = "";
//Obtiene el rol del usuario actual
var rolUsuario = localStorage.getItem("rol");
//Dependiendo del rol del usuario muestra el contenido apropiado
if(rolUsuario.localeCompare("ADMIN") === 0){
    document.getElementById("divComparendosDpto").style.display = "block";
} else if(rolUsuario.localeCompare("SUBIR") === 0) {
    window.location = "upload.jsp";
} else if(rolUsuario.localeCompare("ANON") === 0) {
    document.getElementById("ajustesDiv").innerHTML = "";
    document.getElementById("adminConsole").style.display = "none";
    parametroURLFiltro = "MUNIC";
    parametroCualId = localStorage.getItem("idMun");

    document.getElementById("divComparendosAno").style.display = "block";

    document.getElementById("textoSeleccionActualComparendos").innerHTML = "Municipio: " + localStorage.getItem("nomMun");
} else if(rolUsuario.localeCompare("UNICVER") === 0) {
    document.getElementById("ajustesDiv").innerHTML = "";
    document.getElementById("cargarDiv").style.display = "none";
    document.getElementById("divisionCargar").style.display = "none";
    document.getElementById("divComparendosDpto").style.display = "block";
}
//Asigna un arreglo para el manejo de los nombres de los meses
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
//Se crean las variables para manejar las fechas iniciales
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

var recaudoTotal; 

//AJAX METHOD
//Método que se encarga de la conexión con la base de datos
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

//Configuración del selector de fecha

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
});

//Función que alista los recursos necesarios para ejecución
$(document).ready(function () {

    $('.demo i').click(function () {
        $(this).parent().find('input').click();
    });

    $('.demo2 i').click(function () {
        $(this).parent().find('input').click();
    });

    if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {
        funcionesPorDepartamento();
    } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
        funcionesPorTiempo();
    } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
        funcionesPorMunicipio();
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
        
        console.log("CAMBIAR DEMO");
        
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
        document.getElementById("textoSeleccionActualComparendos").innerHTML = "Todos los Departamentos";

        funcionesPorDepartamento();
        document.getElementById("divComparendosDpto").style.display = "block";
        document.getElementById("divComparendosMunicipio").style.display = "none";
        document.getElementById("divComparendosAno").style.display = "none";
    } else if(seleccion.localeCompare("DPTOID") === 0) {
        parametroURLFiltro = "DPTO";
        parametroCualId = document.getElementById("departamentosSelect").value;
        document.getElementById("textoSeleccionActualComparendos").innerHTML = "Departamento: " + document.getElementById("departamentosSelect").value;

        funcionesPorMunicipio();
        document.getElementById("divComparendosDpto").style.display = "none";
        document.getElementById("divComparendosMunicipio").style.display = "block";
        document.getElementById("divComparendosAno").style.display = "none";
    }  else if(seleccion.localeCompare("MUNICID") === 0) {
        parametroURLFiltro = "MUNIC";

        var munSelect = document.getElementById("municipiosSelect");
        var munText = munSelect.options[munSelect.selectedIndex].text;

        parametroCualId = document.getElementById("municipiosSelect").value;
        document.getElementById("textoSeleccionActualComparendos").innerHTML = "Municipio: " + munText;

        funcionesPorTiempo();
        document.getElementById("divComparendosDpto").style.display = "none";
        document.getElementById("divComparendosMunicipio").style.display = "none";
        document.getElementById("divComparendosAno").style.display = "block";
    }
    return false;
}

function cargarMunicipios(){
    var dpto = document.getElementById("departamentosSelect").value;
    if(dpto.localeCompare("TODOS") === 0) {
        parametroURLFiltro = "TODOSDPTOS";
        parametroCualId = "BLA";
        document.getElementById("textoSeleccionActualComparendos").innerHTML = "Todos los Departamentos";

        funcionesPorDepartamento();
        document.getElementById("divComparendosDpto").style.display = "block";
        document.getElementById("divComparendosMunicipio").style.display = "none";
        document.getElementById("divComparendosAno").style.display = "none";
    } else {
        parametroURLFiltro = "DPTO";
        parametroCualId = document.getElementById("departamentosSelect").value;
        document.getElementById("textoSeleccionActualComparendos").innerHTML = "Departamento: " + document.getElementById("departamentosSelect").value;

        funcionesPorMunicipio();
        document.getElementById("divComparendosDpto").style.display = "none";
        document.getElementById("divComparendosMunicipio").style.display = "block";
        document.getElementById("divComparendosAno").style.display = "none";
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
            mun.innerHTML="<option value=\"\">Elegir un municipio</option><option value=\"63001000\">Armenia</option><option value=\"63130000\">Calarca</option><option value=\"63190001\">Circasia</option><option value=\"63272000\">Finlandia</option><option value=\"63401000\">La Tebaida</option><option value=\"63594000\">Quimbaya</option>";
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
    var radioButtonComparendoPorTipo = document.getElementById("optionCompTipoServicio8"); 
    comparendoPorTipoRadioButtonClickedKPI8(radioButtonComparendoPorTipo);
    proyeccionComparendosKPI10();
    comparendosPorDepartamento();
    totalValorComparendosKPI11_1();
    promedioValorComparendosKPI11_2();
    totalValorComparendosImpuestosKPI12();
    valorDelImpuestoPorServicioDeCarroKPI13();
    var top = document.getElementById("optionTop"); 
    top10(top);
    resoluciones("Cantidad de comparendos", "Tipo de resolucion actual");
}

function funcionesPorMunicipio() {
    var radioButtonComparendoPorTipo = document.getElementById("optionCompTipoServicio8"); 
    comparendoPorTipoRadioButtonClickedKPI8(radioButtonComparendoPorTipo);
    proyeccionComparendosKPI10();
    comparendosPorMunicipio();
    totalValorComparendosKPI11_1();
    promedioValorComparendosKPI11_2();
    totalValorComparendosImpuestosKPI12();
    valorDelImpuestoPorServicioDeCarroKPI13();
    var top = document.getElementById("optionTop"); 
    top10(top);
    resoluciones("Cantidad de comparendos", "Tipo de resolucion actual");
}

function funcionesPorTiempo() {
    var radioButtonComparendoPorTipo = document.getElementById("optionCompTipoServicio8"); 
    comparendoPorTipoRadioButtonClickedKPI8(radioButtonComparendoPorTipo);
    proyeccionComparendosKPI10();
    totalComparendosImpuestosKPI7();
    totalComparendosImpuestosKPI7Mes();
    totalValorComparendosKPI11_1();
    promedioValorComparendosKPI11_2();
    totalValorComparendosImpuestosKPI12();
    valorDelImpuestoPorServicioDeCarroKPI13();
    var top = document.getElementById("optionTop"); 
    top10(top);
    resoluciones("Cantidad de comparendos", "Tipo de resolucion actual");
}
//-------------------------------------------------------------------------------------------------------
// Valor total de los comparendos
//-------------------------------------------------------------------------------------------------------
function totalValorComparendosKPI11_1() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/totalesComparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=TOTVALOR"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    var stringGET2 = "";
    if(usingTwoRanges) {
        stringGET2 = "/webresources/kpis/totalesComparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=TOTVALOR"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
        self.ajax(stringGET, 'GET').done(function(data) {
            self.ajax(stringGET2, 'GET').done(function(data2) {
                if(parseFloat(data) > parseFloat(data2)) {
                    data = data.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("totalValorComparendosKPI11_1").innerHTML = "<span style=\"color: green\">$" + data + "</span> vs <span style=\"color: red\">$" + data2 + "</span>";
                }
                else if(parseFloat(data) < parseFloat(data2)) {
                    data = data.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("totalValorComparendosKPI11_1").innerHTML = "<span style=\"color: red\">$" + data + "</span> vs <span style=\"color: green\">$" + data2 + "</span>";
                }
                else {
                    data = data.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("totalValorComparendosKPI11_1").innerHTML = "<span style=\"color: black\">$" + data + "</span> vs <span style=\"color: black\">$" + data2 + "</span>";
                }
            });
        });
    } else {
        self.ajax(stringGET, 'GET').done(function(data) {
                data = data.toLocaleString();
                document.getElementById("totalValorComparendosKPI11_1").innerHTML = "<span style=\"color: black\">$" + data + "</span>";
        });
    }
    return false;
}
function probarPromedio(startMonth, startYear, endMonth, endYear) {
    var difMeses;
    if(endYear-startYear > 0)
        difMeses = (12 - startMonth + 1) + (((endYear-startYear-1)*12)) + endMonth;
    else if(endYear - startYear == 0)
        difMeses = endMonth;
    return difMeses;
}
//-------------------------------------------------------------------------------------------------------
// Promedio del valor de los comparendos
//-------------------------------------------------------------------------------------------------------
function promedioValorComparendosKPI11_2() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/promediocomparendos?token=" + token + "&day=01&month=" + startMonth + "&year="+ startYear +"&day1=" + endDay + "&month1="+ endMonth +"&year1=" + endYear  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;

    if(usingTwoRanges) {
        var stringGET2 = "/webresources/kpis/promediocomparendos?token=" + token + "&day=01&month=" + startMonth2 + "&year="+ startYear2 +"&day1=" + endDay2 + "&month1="+ endMonth2 +"&year1=" + endYear2  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
        self.ajax(stringGET, 'GET').done(function(data) {
            self.ajax(stringGET2, 'GET').done(function(data2) {
                data = parseFloat(data);
                data2 = parseFloat(data2);
                
                if(data>data2) {
                    data = data.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("promedioValorComparendosKPI11_2").innerHTML = "<span style=\"color: green\">$" + data + "</span> vs <span style=\"color: red\">$" + data2 + "</span>";
                } else if(data<data2) {
                    data = data.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("promedioValorComparendosKPI11_2").innerHTML = "<span style=\"color: red\">$" + data + "</span> vs <span style=\"color: green\">$" + data2 + "</span>";
                } else {
                    data = data.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("promedioValorComparendosKPI11_2").innerHTML = "<span style=\"color: black\">$" + data + "</span> vs <span style=\"color: black\">$" + data2 + "</span>";
                }
            });
        });
    } else {
        self.ajax(stringGET, 'GET').done(function(data) {
                data = parseFloat(data);
                data = data.toLocaleString();
                document.getElementById("promedioValorComparendosKPI11_2").innerHTML = "<span style=\"color: black\">$" + data + "</span>";
        });
    }
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Proyección de comparendos
//-------------------------------------------------------------------------------------------------------
function proyeccionComparendosKPI10() {
    var fecha = new Date();
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/promediocomparendos?token=" + token + "&day=01&month=01&year="+ fecha.getFullYear() +"&day1="+ fecha.getDate() +"&month1="+ (fecha.getMonth()+1) +"&year1=" + fecha.getFullYear()  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    var stringGET2 = "/webresources/kpis/totalesComparendos?token=" + token + "&day=01&month=01&year="+ (fecha.getFullYear()-1) +"&day1=31&month1=12&year1=" + (fecha.getFullYear()-1)  + "&type=TOTVALOR&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
    //Independiente al rango
    //Proyecto el año según los meses que lleva hasta la fecha actual
    if(usingTwoRanges) {
        self.ajax(stringGET, 'GET').done(function(data) {
            self.ajax(stringGET2, 'GET').done(function(data2) {
                data = parseFloat(data);
                var proyeccion = data*12;
                data2 = parseFloat(data2);
                if(proyeccion>data2) {
                    proyeccion = proyeccion.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("proyeccionComparendosKPI10").innerHTML = "<span style=\"color: green\">$" + proyeccion + "</span> vs <span style=\"color: red\">$" + data2 + "</span>";
                } else if (proyeccion < data2) {
                    proyeccion = proyeccion.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("proyeccionComparendosKPI10").innerHTML = "<span style=\"color: red\">$" + proyeccion + "</span> vs <span style=\"color: green\">$" + data2 + "</span>";
                } else {
                    proyeccion = proyeccion.toLocaleString();
                    data2 = data2.toLocaleString();
                    document.getElementById("proyeccionComparendosKPI10").innerHTML = "<span style=\"color: black\">$" + proyeccion + "</span> vs <span style=\"color: black\">$" + data2 + "</span>";
                }
            });
        });
    } else {
        self.ajax(stringGET, 'GET').done(function(data) {
                data = parseFloat(data);
                var proyeccion = data*12;
                proyeccion = proyeccion.toLocaleString();
                document.getElementById("proyeccionComparendosKPI10").innerHTML = "<span style=\"color: black\">$" + proyeccion + "</span>";
        });
    }
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Comparendos por departamento
//-------------------------------------------------------------------------------------------------------
var comparendosDepartamento;
function comparendosPorDepartamento() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=COMPDEPTO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
            comparendosDepartamento = AmCharts.makeChart("chartComparendosDpto",
                {
                    "type": "serial",
                    "categoryField": "Departamento",
                    "language": "es",
                    "zoomOutText": "",
                    "maxSelectedSeries": 8,
                    "startDuration": 1,
                    "categoryAxis": {
                        "gridPosition": "start",
                        "title": "Departamento"
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
                            "balloonText": "[[title]] de [[category]]: $[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-1",
                            "labelText": "$[[value]]",
                            "title": "Valor comparendos",
                            "type": "column",
                            "valueAxis": "ValueAxis-1",
                            "valueField": "Valor"
                        },
                        {
                            "balloonText": "[[title]] de [[category]]: [[value]]",
                            "bullet": "round",
                            "id": "AmGraph-2",
                            "labelText": "[[value]]",
                            "lineThickness": 2,
                            "lineAlpha": 0,
                            "title": "Número de comparendos",
                            "valueAxis": "ValueAxis-2",
                            "valueField": "Numero de Comparendos"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "title": "Valor comparendos",
                            "unit": "$",
                            "unitPosition": "left"
                        },
                        {
                            "id": "ValueAxis-2",
                            "position": "right",
                            "title": "Numero de comparendos"
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
                                "text": "Número de comparendos y su valor por departamento"
                        }
                    ],
                    "dataProvider": data,
                    "export": {
                        "enabled": true,
                        "libs": {
                            "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                        },
                        "menu": []
                    }
               }
            );  
           AmCharts.checkEmptyData(comparendosDepartamento);
        } else {
            var stringGET2 = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=COMPDEPTO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
            self.ajax(stringGET2, 'GET').done(function(data2) {
                combinarArrays(data, data2, 'Valor', 'Valor R2', 'Departamento');
                combinarArrays(data, data2, 'Numero de Comparendos', 'Numero de Comparendos R2', 'Departamento');
                comparendosDepartamento = AmCharts.makeChart("chartComparendosDpto",
                   {
                    "type": "serial",
                    "categoryField": "Departamento",
                    "language": "es",
                    "zoomOutText": "",
                    "maxSelectedSeries": 8,
                    "startDuration": 1,
                    "categoryAxis": {
                        "gridPosition": "start",
                        "title": "Departamento"
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
                            "balloonText": "[[title]] de [[category]]: $[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-1",
                            "labelText": "$[[value]]",
                            "title": "Valor comparendos "+ startYear + "-" + endYear,
                            "type": "column",
                            "valueAxis": "ValueAxis-1",
                            "valueField": "Valor"
                        },
                        {
                            "balloonText": "[[title]] de [[category]]: [[value]]",
                            "bullet": "round",
                            "id": "AmGraph-2",
                            "labelText": "[[value]]",
                            "lineThickness": 2,
                            "lineAlpha": 0,
                            "title": "Número de comparendos "+ startYear + "-" + endYear,
                            "valueAxis": "ValueAxis-2",
                            "valueField": "Numero de Comparendos"
                        },
                        {
                            "balloonText": "[[title]] de [[category]]: $[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-3",
                            "labelText": "$[[value]]",
                            "title": "Valor comparendos " + startYear2 + "-" + endYear2,
                            "type": "column",
                            "valueAxis": "ValueAxis-1",
                            "valueField": "Valor R2"
                        },
                        {
                            "balloonText": "[[title]] de [[category]]: [[value]]",
                            "bullet": "round",
                            "id": "AmGraph-4",
                            "labelText": "[[value]]",
                            "lineThickness": 2,
                            "lineAlpha": 0,
                            "title": "Número de comparendos " + startYear2 + "-" + endYear2,
                            "valueAxis": "ValueAxis-2",
                            "valueField": "Numero de Comparendos R2"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "title": "Valor comparendos",
                            "unit": "$",
                            "unitPosition": "left"
                        },
                        {
                            "id": "ValueAxis-2",
                            "position": "right",
                            "title": "Numero de comparendos"
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
                            "text": "Número de comparendos y su valor por departamento"
                        }
                    ],
                    "dataProvider": data,
                    "export": {
                        "enabled": true,
                        "libs": {
                            "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                        },
                        "menu": []
                    }
                  }
               );  
               AmCharts.checkEmptyData(comparendosDepartamento);
            });
        }
    });
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Comparendos por municipio
//-------------------------------------------------------------------------------------------------------
var comparendosMunicipios;
function comparendosPorMunicipio() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=COMPMUNICIPIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false)
        {
            comparendosMunicipios = AmCharts.makeChart("chartComparendosMunicipio",
            {
                "type": "serial",
                "categoryField": "Municipio",
                "language": "es",
                "zoomOutText": "",
                "maxSelectedSeries": 8,
                "startDuration": 1,
                "categoryAxis": {
                    "gridPosition": "start",
                    "title": "Municipio"
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
                        "balloonText": "[[title]] de [[category]]: $[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "labelText": "$[[value]]",
                        "title": "Valor comparendos",
                        "type": "column",
                        "valueAxis": "ValueAxis-1",
                        "valueField": "Valor"
                    },
                    {
                        "balloonText": "[[title]] de [[category]]: [[value]]",
                        "bullet": "round",
                        "id": "AmGraph-2",
                        "labelText": "[[value]]",
                        "lineThickness": 2,
                        "lineAlpha": 0,
                        "title": "Número de comparendos",
                        "valueAxis": "ValueAxis-2",
                        "valueField": "Numero de Comparendos"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": "Valor comparendos",
                        "unit": "$",
                        "unitPosition": "left"
                    },
                    {
                        "id": "ValueAxis-2",
                        "position": "right",
                        "title": "Numero de comparendos"
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
                        "text": "Número de comparendos y su valor por municipio"
                    }
                ],
                "dataProvider": data,
                "export": {
                    "enabled": true,
                    "libs": {
                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                      },
                    "menu": []
                }
           }
           );
           AmCharts.checkEmptyData(comparendosMunicipios);
        } else {
            var stringGET2 = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=COMPMUNICIPIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
            self.ajax(stringGET2, 'GET').done(function(data2) {
                combinarArrays(data, data2, 'Valor', 'Valor R2', 'Municipio');
                combinarArrays(data, data2, 'Numero de Comparendos', 'Numero de Comparendos R2', 'Municipio');
               comparendosMunicipios = AmCharts.makeChart("chartComparendosMunicipio",
                    {
                           "type": "serial",
                           "categoryField": "Municipio",
                           "language": "es",
                           "zoomOutText": "",
                           "maxSelectedSeries": 8,
                           "startDuration": 1,
                           "categoryAxis": {
                                   "gridPosition": "start",
                                   "title": "Municipio"
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
                                           "balloonText": "[[title]] de [[category]]: $[[value]]",
                                           "fillAlphas": 1,
                                           "id": "AmGraph-1",
                                           "labelText": "$[[value]]",
                                           "title": "Valor comparendos "+ startYear + "-" + endYear,
                                           "type": "column",
                                           "valueAxis": "ValueAxis-1",
                                           "valueField": "Valor"
                                   },
                                   {
                                           "balloonText": "[[title]] de [[category]]: [[value]]",
                                           "bullet": "round",
                                           "id": "AmGraph-2",
                                           "labelText": "[[value]]",
                                           "lineThickness": 2,
                                           "lineAlpha": 0,
                                           "title": "Número de comparendos "+ startYear + "-" + endYear,
                                           "valueAxis": "ValueAxis-2",
                                           "valueField": "Numero de Comparendos"
                                   },
                                   {
                                           "balloonText": "[[title]] de [[category]]: $[[value]]",
                                           "fillAlphas": 1,
                                           "id": "AmGraph-3",
                                           "labelText": "$[[value]]",
                                           "title": "Valor comparendos "+ startYear2 + "-" + endYear2,
                                           "type": "column",
                                           "valueAxis": "ValueAxis-1",
                                           "valueField": "Valor R2"
                                   },
                                   {
                                           "balloonText": "[[title]] de [[category]]: [[value]]",
                                           "bullet": "round",
                                           "id": "AmGraph-4",
                                           "labelText": "[[value]]",
                                           "lineThickness": 2,
                                           "lineAlpha": 0,
                                           "title": "Número de comparendos " + startYear2 + "-" + endYear2,
                                           "valueAxis": "ValueAxis-2",
                                           "valueField": "Numero de Comparendos R2"
                                   }
                           ],
                           "guides": [],
                           "valueAxes": [
                                   {
                                           "id": "ValueAxis-1",
                                           "title": "Valor comparendos",
                                           "unit": "$",
                                           "unitPosition": "left"
                                   },
                                   {
                                           "id": "ValueAxis-2",
                                           "position": "right",
                                           "title": "Numero de comparendos"
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
                                           "text": "Número de comparendos y su valor por municipio"
                                   }
                           ],
                           "dataProvider": data,
                           "export": {
                                "enabled": true,
                                "libs": {
                                    "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                  },
                                "menu": []
                           }
                   }
                   );
                   AmCharts.checkEmptyData(comparendosMunicipios);
            });
        }
    });
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Comparendos por año
//-------------------------------------------------------------------------------------------------------
var comparendosAno;
function totalComparendosImpuestosKPI7() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=CANTIDADANIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
            comparendosAno = AmCharts.makeChart("totalComparendosImpuestosKPI7",
                   {
                          "type": "serial",
                          "categoryField": "Mes",
                          "language": "es",
                          "zoomOutText": "",
                          "maxSelectedSeries": 8,
                          "startDuration": 1,
                          "categoryAxis": {
                                  "gridPosition": "start",
                                  "title": "Año"
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
                                          "id": "AmGraph-2",
                                          "labelText": "$[[value]]",
                                          "fillAlphas": 1,
                                          "type": "column",
                                          "title": "Valor de los comparendos",
                                          "valueAxis": "ValueAxis-1",
                                          "valueField": "Valor"
                                  },
                                  {
                                          "balloonText": "[[title]] de [[category]]: $[[value]]",
                                          "id": "AmGraph-1",
                                          "labelText": "[[value]]",
                                          "title": "Número de comparendos",
                                          "bullet": "round",
                                          "lineThickness": 2,
                                          "lineAlpha": 1,
                                          "valueAxis": "ValueAxis-2",
                                          "valueField": "Numero de Comparendos"
                                  }
                          ],
                          "guides": [],
                          "valueAxes": [
                                  {
                                          "id": "ValueAxis-2",
                                          "position": "right",
                                          "title": "Numero de comparendos"
                                  },
                                  {
                                          "id": "ValueAxis-1",
                                          "position": "left",
                                          "unit": "$",
                                          "unitPosition": "left",
                                          "title": "Valor de los comparendos"
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
                                          "text": "Número de comparendos y su valor por año"
                                  }
                          ],
                          "dataProvider": data,
                          "export": {
                                "enabled": true,
                                "libs": {
                                    "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                  },
                                "menu": []
                          }
                  }
               );  
           AmCharts.checkEmptyData(comparendosAno);

        } else {
            var stringGET2 = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=CANTIDADANIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
            self.ajax(stringGET2, 'GET').done(function(data2) {
                    combinarArrays(data, data2, 'Numero de Comparendos', 'Numero de Comparendos R2', 'Mes');
                    combinarArrays(data, data2, 'Valor', 'Valor R2', 'Mes');
                    comparendosAno = AmCharts.makeChart("totalComparendosImpuestosKPI7",
                       {
                              "type": "serial",
                              "categoryField": "Mes",
                              "language": "es",
                              "zoomOutText": "",
                              "maxSelectedSeries": 8,
                              "startDuration": 1,
                              "categoryAxis": {
                                      "gridPosition": "start",
                                      "title": "Año"
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
                                              "id": "AmGraph-2",
                                              "labelText": "$[[value]]",
                                              "fillAlphas": 1,
                                              "type": "column",
                                              "title": "Valor de los comparendos "+ startYear + "-" + endYear,
                                              "valueAxis": "ValueAxis-1",
                                              "valueField": "Valor"
                                      },
                                      {
                                              "balloonText": "[[title]] de [[category]]: $[[value]]",
                                              "id": "AmGraph-1",
                                              "labelText": "[[value]]",
                                              "title": "Número de comparendos "+ startYear + "-" + endYear,
                                              "bullet": "round",
                                              "lineThickness": 2,
                                              "lineAlpha": 1,
                                              "valueAxis": "ValueAxis-2",
                                              "valueField": "Numero de Comparendos"
                                      },
                                      {
                                              "balloonText": "[[title]] de [[category]]: [[value]]",
                                              "id": "AmGraph-4",
                                              "labelText": "$[[value]]",
                                              "fillAlphas": 1,
                                              "type": "column",
                                              "title": "Valor de los comparendos "+ startYear2 + "-" + endYear2,
                                              "valueAxis": "ValueAxis-1",
                                              "valueField": "Valor R2"
                                      },
                                      {
                                              "balloonText": "[[title]] de [[category]]: $[[value]]",
                                              "id": "AmGraph-3",
                                              "labelText": "[[value]]",
                                              "title": "Número de  comparendos "+ startYear2 + "-" + endYear2,
                                              "bullet": "round",
                                              "lineThickness": 2,
                                              "lineAlpha": 1,
                                              "valueAxis": "ValueAxis-2",
                                              "valueField": "Numero de Comparendos R2"
                                      },
                              ],
                              "guides": [],
                              "valueAxes": [
                                      {
                                              "id": "ValueAxis-2",
                                              "position": "right",
                                              "title": "Numero de comparendos"
                                      },
                                      {
                                              "id": "ValueAxis-1",
                                              "position": "left",
                                              "unit": "$",
                                              "unitPosition": "left",
                                              "title": "Valor de los comparendos"
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
                                              "text": "Número de comparendos y su valor por año"
                                      }
                              ],
                              "dataProvider": data,
                              "export": {
                                    "enabled": true,
                                    "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                    "menu": []
                              }
                      }
                   );  
               AmCharts.checkEmptyData(comparendosAno);
            });
        }
    });
    return false;
}
//-------------------------------------------------------------------------------------------------------
// Comparendos por mes
//-------------------------------------------------------------------------------------------------------
var comparendosMes;
function totalComparendosImpuestosKPI7Mes() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=CANTIDADANIOMES"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
            comparendosMes = AmCharts.makeChart("totalComparendosImpuestosKPI7Mes",
                   {
                          "type": "serial",
                          "categoryField": "Mes",
                          "language": "es",
                          "zoomOutText": "",
                          "maxSelectedSeries": 8,
                          "startDuration": 1,
                          "categoryAxis": {
                                  "gridPosition": "start",
                                  "title": "Mes"
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
                                          "id": "AmGraph-2",
                                          "labelText": "$[[value]]",
                                          "fillAlphas": 1,
                                          "type": "column",
                                          "title": "Valor de los comparendos",
                                          "valueAxis": "ValueAxis-1",
                                          "valueField": "Valor"
                                  },
                                  {
                                          "balloonText": "[[title]] de [[category]]: $[[value]]",
                                          "id": "AmGraph-1",
                                          "labelText": "[[value]]",
                                          "title": "Número de comparendos",
                                          "bullet": "round",
                                          "lineThickness": 2,
                                          "lineAlpha": 1,
                                          "valueAxis": "ValueAxis-2",
                                          "valueField": "Numero de Comparendos"
                                  }
                          ],
                          "guides": [],
                          "valueAxes": [
                                  {
                                          "id": "ValueAxis-2",
                                          "position": "right",
                                          "title": "Numero de comparendos"
                                  },
                                  {
                                          "id": "ValueAxis-1",
                                          "position": "left",
                                          "unit": "$",
                                          "unitPosition": "left",
                                          "title": "Valor de los comparendos"
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
                                          "text": "Número de comparendos y su valor por mes"
                                  }
                          ],
                          "dataProvider": data,
                          "export": {
                                "enabled": true,
                                "libs": {
                                    "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                  },
                                "menu": []
                          }
                  }
               );  
           AmCharts.checkEmptyData(comparendosMes);

        } else {
            stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=MESCOMP"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
            var stringGET2 = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=MESCOMP"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
            self.ajax(stringGET2, 'GET').done(function(data2) {
                self.ajax(stringGET, 'GET').done(function(data) {
                    combinarArrays(data, data2, 'Numero de Comparendos', 'Numero de Comparendos R2', 'Mes');
                    combinarArrays(data, data2, 'Valor', 'Valor R2', 'Mes');
                    comparendosMes = AmCharts.makeChart("totalComparendosImpuestosKPI7Mes",
                       {
                            "type": "serial",
                            "categoryField": "Mes",
                            "language": "es",
                            "zoomOutText": "",
                            "maxSelectedSeries": 12,
                            "startDuration": 1,
                            "categoryAxis": {
                                    "gridPosition": "start",
                                    "title": "Mes"
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
                                            "id": "AmGraph-2",
                                            "labelText": "$[[value]]",
                                            "fillAlphas": 1,
                                            "type": "column",
                                            "title": "Valor de los comparendos " + startYear + "-" + endYear,
                                            "valueAxis": "ValueAxis-1",
                                            "valueField": "Valor"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]: $[[value]]",
                                            "id": "AmGraph-1",
                                            "labelText": "[[value]]",
                                            "title": "Número de comparendos " + startYear + "-" + endYear,
                                            "bullet": "round",
                                            "lineThickness": 2,
                                            "lineAlpha": 1,
                                            "valueAxis": "ValueAxis-2",
                                            "valueField": "Numero de Comparendos" 
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]: [[value]]",
                                            "id": "AmGraph-4",
                                            "labelText": "$[[value]]",
                                            "fillAlphas": 1,
                                            "type": "column",
                                            "title": "Valor de los comparendos "+ startYear2 + "-" + endYear2,
                                            "valueAxis": "ValueAxis-1",
                                            "valueField": "Valor R2"
                                    },
                                    {
                                            "balloonText": "[[title]] de [[category]]: $[[value]]",
                                            "id": "AmGraph-3",
                                            "labelText": "[[value]]",
                                            "title": "Número de comparendos "+ startYear2 + "-" + endYear2,
                                            "bullet": "round",
                                            "lineThickness": 2,
                                            "lineAlpha": 1,
                                            "valueAxis": "ValueAxis-2",
                                            "valueField": "Numero de Comparendos R2"
                                    }
                            ],
                            "guides": [],
                            "valueAxes": [
                                    {
                                            "id": "ValueAxis-2",
                                            "position": "right",
                                            "title": "Numero de comparendos"
                                    },
                                    {
                                            "id": "ValueAxis-1",
                                            "position": "left",
                                            "unit": "$",
                                            "unitPosition": "left",
                                            "title": "Valor de los comparendos"
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
                                            "text": "Número de comparendos y su valor por mes"
                                    }
                            ],
                            "dataProvider": data,
                            "export": {
                              "enabled": true,
                              "libs": {
                                  "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                },
                              "menu": []
                            }
                      }
                   );  
                    AmCharts.checkEmptyData(comparendosMes);
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
        totalComparendosImpuestosKPI7();
    } else {
        document.getElementById("botonesMes").style.display = "block";
        document.getElementById("botonesAno").style.display = "none";
        document.getElementById("graphMes").style.display = "block";
        document.getElementById("graphAno").style.display = "none";
        totalComparendosImpuestosKPI7Mes();
    }
}
//-------------------------------------------------------------------------------------------------------
// KPI8
//-------------------------------------------------------------------------------------------------------
var chartKPI8;
var chartKPI8Rango2;
function comparendoPorTipoRadioButtonClickedKPI8(radioButton) {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + radioButton.value + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
    var rdValue = radioButton.value + "";
    var tituloField = "";
    var valueField = ""; 
    var tipo = 1;
    document.getElementById("botonVerTablaConversionComparendo").style.display= "none";
    document.getElementById("botonVerTablaConversionVehiculos2").style.display= "none";
    if (rdValue.localeCompare("TIPOSERVICIO")===0) {
        tituloField = "Tipo de servicio";
        valueField = "Cantidad de comparendos"; 
    } else if (rdValue.localeCompare("CODIGOINFRACCION")===0) {
        document.getElementById("botonVerTablaConversionComparendo").style.display= "block";
        tituloField = "Codigo de infraccion";
        valueField = "Cantidad de comparendos"; 
        tipo = 2;
    } else if (rdValue.localeCompare("TIPOINFRACTOR")===0) {
        tituloField = "Tipo de infractor";
        valueField = "Cantidad de comparendos"; 
    } else if (rdValue.localeCompare("TIPOVEHICULO")===0) {
        tituloField = "Tipo de vehiculo";
        valueField = "Cantidad de comparendos"; 
        tipo = 2;
        document.getElementById("botonVerTablaConversionVehiculos2").style.display= "block";
    } else if (rdValue.localeCompare("RADIOACCION")===0) {
        tituloField = "Radio de accion";
        valueField = "Cantidad de comparendos"; 
    } else if (rdValue.localeCompare("COMPFOTOMULTA")===0) {
        tituloField = "Es por foto multa?";
        valueField = "Cantidad de comparendos"; 
    } else if (rdValue.localeCompare("COMPACCIDENTE")===0) {
        tituloField = "Registra accidente?";
        valueField = "Cantidad de comparendos"; 
    } else if (rdValue.localeCompare("COMPPORRESOLUCION")===0) {
        tituloField = "Tipo de resolucion actual";
        valueField = "Cantidad de comparendos"; 
        resoluciones(valueField, tituloField);
        return false;
    } else if (rdValue.localeCompare("COMPINMOVILIZACION")===0) {
        tituloField = "Registra Inmovilizacion?";
        valueField = "Cantidad de comparendos"; 
    } else if (rdValue.localeCompare("COMPFUGA")===0) {
        tituloField = "Registra Fuga?";
        valueField = "Cantidad de comparendos"; 
    }

    if(tipo === 1) {
        self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI8 = AmCharts.makeChart("comparendoPorTipoRadioButtonClickedKPI8",
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
                                            "text": "Cantidad de comparendos por: " + tituloField
                                       }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                      "enabled": true,
                                      "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                      "menu": []
                                    }
                           }
                   );
           AmCharts.checkEmptyDataPie(chartKPI8);
       });

       var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + radioButton.value + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
       self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI8Rango2 = AmCharts.makeChart("comparendoPorTipoRadioButtonClickedKPI8Rango2",
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
                                            "text": "Cantidad de comparendos que: " + tituloField
                                       }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                      "enabled": true,
                                      "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                      "menu": []
                                    }
                           }
                   );
           AmCharts.checkEmptyDataPie(chartKPI8Rango2);
       });
    } else if(tipo === 2) {
        self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI8 = AmCharts.makeChart("comparendoPorTipoRadioButtonClickedKPI8",
                           {
                                   "type": "serial",
                                   "categoryField": tituloField,
                                   "rotate": true,
                                   "zoomOutText": "",
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
                                                   "title": "Número de comparendos " + startYear + "-" + endYear,
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
                                                   "unitPosition": "left",
                                                   "integersOnly": "true",
                                                   "title": "Número de comparendos " + startYear + "-" + endYear
                                           }
                                   ],
                                   "allLabels": [],
                                   "balloon": {},
                                   "titles": [
                                           {
                                                   "id": "",
                                                   "size": 15,
                                                   "text": "Número de comparendos por " + tituloField + " en " + startYear + "-" + endYear
                                           }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                      "enabled": true,
                                      "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                      "menu": []
                                    }
                           }
                   );
           AmCharts.checkEmptyData(chartKPI8);
       });

       var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + radioButton.value + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
       self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI8Rango2 = AmCharts.makeChart("comparendoPorTipoRadioButtonClickedKPI8Rango2",
                           {
                                   "type": "serial",
                                   "categoryField": tituloField,
                                   "rotate": true,
                                   "zoomOutText": "",
                                   "maxSelectedSeries": 8,
                                   "startDuration": 1,
                                   "categoryAxis": {
                                           "gridPosition": "start"
                                   },
                                   "chartCursor": {
                                           "enabled": true
                                   },
                                   "chartScrollbar": {
                                           "enabled": true,
                                           "position": "top"
                                   },
                                   "trendLines": [],
                                   "graphs": [
                                           {
                                                   "fillAlphas": 1,
                                                   "id": "AmGraph-1",
                                                   "title": "Número de comparendos "+ startYear2 + "-" + endYear2,
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
                                                   "unitPosition": "left",
                                                   "integersOnly": "true",
                                                   "title": "Número de comparendos "+ startYear2 + "-" + endYear2
                                           }
                                   ],
                                   "allLabels": [],
                                   "balloon": {},
                                   "titles": [
                                           {
                                                   "id": "",
                                                   "size": 15,
                                                   "text": "Número de comparendos por " + tituloField + " en " + startYear2 + "-" + endYear2
                                           }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                      "enabled": true,
                                      "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                      "menu": []
                                    }
                           }
                   );
           AmCharts.checkEmptyData(chartKPI8Rango2);
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
        stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ day1 +"&month="+ month1 +"&year="+ year1 +"&day1="+ day2 +"&month1="+ month2 +"&year1=" + year2 + "&type=COMPPORRESOLUCION&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
        self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI8 = AmCharts.makeChart("comparendoPorTipoRadioButtonClickedKPI8",
                           {
                                   "type": "serial",
                                   "categoryField": tituloField,
                                   "rotate": true,
                                   "zoomOutText": "",
                                   "maxSelectedSeries": 8,
                                   "startDuration": 1,
                                   "categoryAxis": {
                                           "gridPosition": "start"
                                   },
                                   "chartCursor": {
                                           "enabled": true,
                                           "position": "top"
                                   },
                                   "chartScrollbar": {
                                           "enabled": true
                                   },
                                   "trendLines": [],
                                   "graphs": [
                                           {
                                                   "fillAlphas": 1,
                                                   "id": "AmGraph-1",
                                                   "title": "Número de resoluciones ",
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
                                                   "title": "Número de resoluciones "
                                           }
                                   ],
                                   "allLabels": [],
                                   "balloon": {},
                                   "titles": [
                                           {
                                                   "id": "",
                                                   "size": 15,
                                                   "text": "Número de comparendos por " + tituloField + " en " + day1 + "/" + month1 + "/" + year1 + "-" + day2 + "/" + month2 + "/" + year2
                                           }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                      "enabled": true,
                                      "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                      "menu": []
                                    }
                           }
                   );
           AmCharts.checkEmptyData(chartKPI8);
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
       var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ day12 +"&month="+ month12 +"&year="+ year12 +"&day1="+ day22 +"&month1="+ month22 +"&year1=" + year22 + "&type=COMPPORRESOLUCION&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
       self.ajax(stringGET, 'GET').done(function(data) {
            chartKPI8Rango2 = AmCharts.makeChart("comparendoPorTipoRadioButtonClickedKPI8Rango2",
                           {
                                   "type": "serial",
                                   "categoryField": tituloField,
                                   "rotate": true,
                                   "zoomOutText": "",
                                   "maxSelectedSeries": 8,
                                   "startDuration": 1,
                                   "categoryAxis": {
                                           "gridPosition": "start"
                                   },
                                   "chartCursor": {
                                           "enabled": true
                                   },
                                   "chartScrollbar": {
                                           "enabled": true,
                                           "position": "top"
                                   },
                                   "trendLines": [],
                                   "graphs": [
                                           {
                                                   "fillAlphas": 1,
                                                   "id": "AmGraph-1",
                                                   "title": "Número de resoluciones ",
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
                                                   "title": "Número de resoluciones "
                                           }
                                   ],
                                   "allLabels": [],
                                   "balloon": {},
                                   "titles": [
                                           {
                                                   "id": "",
                                                   "size": 15,
                                                   "text": "Número de comparendos por " + tituloField + " en "  + day12 + "/" + month12 + "/" + year12 + "-" + day22 + "/" + month22 + "/" + year22
                                           }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                      "enabled": true,
                                      "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                      "menu": []
                                    }
                           }
                   );
           AmCharts.checkEmptyData(chartKPI8Rango2);
       });
}
//-------------------------------------------------------------------------------------------------------
// KPI12
//-------------------------------------------------------------------------------------------------------
var chartKPI12;
var chartKPI12Rango2;
function totalValorComparendosImpuestosKPI12() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=VALORCOMPPORCODIGO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

    var tituloField = "Codigo de infraccion";
    var valueField = "Valor"; 

    self.ajax(stringGET, 'GET').done(function(data) {
         chartKPI12 = AmCharts.makeChart("totalValorComparendosImpuestosKPI12",
                        {
                                "type": "serial",
                                "categoryField": tituloField,
                                "maxSelectedSeries": 8,
                                "categoryAxis": {
                                        "gridPosition": "start"
                                },
                                "chartScrollbar": {
                                        "enabled": true
                                },
                                "trendLines": [],
                                "graphs": [
                                        {
                                                "fillAlphas": 1,
                                                "id": "AmGraph-1",
                                                "title": "Valor de los comparendos "+ startYear + "-" + endYear,
                                                "type": "column",
                                                "labelText": "$[[value]]",
                                                "valueField": valueField
                                        }
                                ],
                                "guides": [],
                                "valueAxes": [
                                        {
                                                "id": "ValueAxis-1",
                                                "unit": "$",
                                                "unitPosition": "left",
                                                "title": "Valor de los comparendos "+ startYear + "-" + endYear
                                        }
                                ],
                                "allLabels": [],
                                "balloon": {},
                                "titles": [
                                        {
                                                "id": "",
                                                "size": 15,
                                                "text": "Valor de comparendos en " + startYear + "-" + endYear
                                        }
                                ],
                                "dataProvider": data,
                                "export": {
                                   "enabled": true,
                                   "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                   "menu": []
                                 }
                        }
                );
        AmCharts.checkEmptyData(chartKPI12);
    });
    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=VALORCOMPPORCODIGO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

    self.ajax(stringGET, 'GET').done(function(data) {
         chartKPI12Rango2 = AmCharts.makeChart("totalValorComparendosImpuestosKPI12Rango2",
                        {
                                "type": "serial",
                                "categoryField": tituloField,
                                "rotate": true,
                                "zoomOutText": "",
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
                                                "title": "Valor de los comparendos " + startYear2 + "-" + endYear2,
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
                                                "title": "Valor de los comparendos " + startYear2 + "-" + endYear2
                                        }
                                ],
                                "allLabels": [],
                                "balloon": {},
                                "titles": [
                                        {
                                                "id": "",
                                                "size": 15,
                                                "text": "Valor de los comparendos " + startYear2 + "-" + endYear2
                                        }
                                ],
                                "dataProvider": data,
                                "export": {
                                   "enabled": true,
                                   "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                   "menu": []
                                 }
                        }
                );
        AmCharts.checkEmptyData(chartKPI12Rango2);
    });

    return false;

}
//-------------------------------------------------------------------------------------------------------
// KPI13
//-------------------------------------------------------------------------------------------------------
var chartKPI13;
var chartKPI13Rango2;
function valorDelImpuestoPorServicioDeCarroKPI13() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=VALORIMPPORSERVICIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

    var tituloField = "Tipo de servicio";
    var valueField = "Valor"; 

    self.ajax(stringGET, 'GET').done(function(data) {
         chartKPI13 = AmCharts.makeChart("valorDelImpuestoPorServicioDeCarroKPI13",
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
                                        "text": "Valor impuesto por tipo de carro"
                                    }
                                ],
                                "dataProvider": data,
                                "export": {
                                   "enabled": true,
                                   "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                   "menu": []
                                 }
                        }
                );
        AmCharts.checkEmptyDataPie(chartKPI13);
    });

    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=VALORIMPPORSERVICIO"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

    self.ajax(stringGET, 'GET').done(function(data) {
         chartKPI13Rango2 = AmCharts.makeChart("valorDelImpuestoPorServicioDeCarroKPI13Rango2",
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
                                        "text": "Valor impuesto por tipo de carro"
                                    }
                                ],
                                "dataProvider": data,
                                "export": {
                                   "enabled": true,
                                   "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                   "menu": []
                                 }
                        }
                );
        AmCharts.checkEmptyDataPie(chartKPI13Rango2);
    });

    return false;

}
var chartKPI_Top10;
function top10(radioButton) {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=" + radioButton.value  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  

    var rdValue = radioButton.value + "";
    var tituloField = "";
    var valueField = ""; 
    
    var tipo = 1;
    
    if(rdValue.localeCompare("CANTIDADPORMES") === 0) {
        top10ComparendosRecaudo();
        return false;
    } else if (rdValue.localeCompare("TOPSIEMPRE")===0) {
        tituloField = "Direccion";
        valueField = "Cantidad de comparendos"; 
    } else if (rdValue.localeCompare("CANTIDADDELDIA")===0) {
        tituloField = "Dia";
        valueField = "Cantidad de comparendos"; 
    } else if (rdValue.localeCompare("HORA")===0) {
        tituloField = "Hora";
        valueField = "Cantidad de comparendos"; 
        tipo = 2;
    } 
    if(tipo === 1) {
        self.ajax(stringGET, 'GET').done(function(data) {
            if(usingTwoRanges === false) {
                chartKPI_Top10 = AmCharts.makeChart("top10Chart",
                               {
                                   "type": "serial",
                                   "categoryField": tituloField,
                                   "language": "es",
                                   "zoomOutText": "",
                                   "maxSelectedSeries": 8,
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
                                                   "title": "Número de comparendos " + startYear + "-" + endYear,
                                                   "type": "column",
                                                   "valueField": valueField
                                           }
                                   ],
                                   "guides": [],
                                   "valueAxes": [
                                           {
                                                   "id": "ValueAxis-1",
                                                   "title": ""
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
                                                   "text": "Comparendos por " + tituloField
                                           }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                          "enabled": true,
                                          "libs": {
                                            "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                          },
                                          "menu": []
                                   }
                           }
                       );
               AmCharts.checkEmptyData(chartKPI_Top10);
           } else {
                var stringGET2 = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + radioButton.value  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
                self.ajax(stringGET2, 'GET').done(function(data2) {
                        combinarArrays(data, data2, valueField, valueField + " R2", tituloField);
                        chartKPI_Top10 = AmCharts.makeChart("top10Chart",
                               {
                                   "type": "serial",
                                   "categoryField": tituloField,
                                   "language": "es",
                                   "zoomOutText": "",
                                   "maxSelectedSeries": 8,
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
                                                   "title": "Número de comparendos "+ startYear + "-" + endYear,
                                                   "type": "column",
                                                   "valueField": valueField
                                           },
                                           {
                                                   "balloonText": "[[title]] de [[category]]: [[value]]",
                                                   "fillAlphas": 1,
                                                   "id": "AmGraph-2",
                                                   "title": "Número de comparendos "+ startYear2 + "-" + endYear2,
                                                   "type": "column",
                                                   "valueField": valueField + " R2"
                                           }
                                   ],
                                   "guides": [],
                                   "valueAxes": [
                                           {
                                                   "id": "ValueAxis-1",
                                                   "title": ""
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
                                                   "text": "Comparendos por " + tituloField
                                           }
                                   ],
                                   "dataProvider": data,
                                   "export": {
                                          "enabled": true,
                                          "libs": {
                                            "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                          },
                                          "menu": []
                                   }
                           }
                       );
                    AmCharts.checkEmptyData(chartKPI_Top10);
                });
            }
        });
    } else if(tipo === 2) {
        self.ajax(stringGET, 'GET').done(function(data) {
            if(usingTwoRanges === false)
            {
               chartKPI_Top10 = AmCharts.makeChart("top10Chart",
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
                                          "text": "Comparendos por " + tituloField
                                      }
                                  ],
                                  "dataProvider": data,
                                  "export": {
                                         "enabled": true,
                                         "menu": []
                                  }
                          }
                      );

              AmCharts.checkEmptyData(chartKPI_Top10);
          } else {
              var stringGET2 = "/webresources/kpis/accidentes?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=" + radioButton.value  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;  
              self.ajax(stringGET2, 'GET').done(function(data2) {
                  combinarArrays(data, data2, valueField, valueField + " R2", tituloField);
                   chartKPI_Top10 = AmCharts.makeChart("top10Chart",
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
                                                       "valueField": valueField
                                               },
                                               {
                                                       "balloonText": "[[title]] de [[category]]: [[value]]",
                                                       "fillAlphas": 0.7,
                                                       "id": "AmGraph-2",
                                                       "lineAlpha": 0,
                                                       "title": "Promedio accidentes " + startYear2 + "-" + endYear2,
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
                                               "text": "Comparendos por " + tituloField
                                           }
                                       ],
                                       "dataProvider": data,
                                       "export": {
                                              "enabled": true,
                                              "menu": []
                                       }
                               }
                           );

                   AmCharts.checkEmptyData(chartKPI_Top10);
               });
          }
       });
    }
    
    return false;
}
function top10ComparendosRecaudo() {
    var token = localStorage.getItem("token");
    var stringGET = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay +"&month="+ startMonth +"&year="+ startYear +"&day1="+ endDay +"&month1="+ endMonth +"&year1=" + endYear + "&type=CANTIDADPORMES"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;               
    self.ajax(stringGET, 'GET').done(function(data) {
        if(usingTwoRanges === false) {
            chartKPI_Top10 = AmCharts.makeChart("top10Chart",
                           {
                               "type": "serial",
                               "categoryField": "Mes",
                               "language": "es",
                               "zoomOutText": "",
                               "rotate": true,
                               "startDuration": 1,
                               "categoryAxis": {
                                       "gridPosition": "start",
                                       "title": "Mes"
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
                                               "labelText": "[[value]]",
                                               "title": "Número de comparendos "+ startYear + "-" + endYear,
                                               "type": "column",
                                               "valueAxis": "ValueAxis-1",
                                               "valueField": "Numero de Comparendos"
                                       },
                                       {
                                               "balloonText": "[[title]] de [[category]]: $[[value]]",
                                               "bullet": "round",
                                               "id": "AmGraph-2",
                                               "labelText": "$[[value]]",
                                               "lineThickness": 2,
                                               "title": "Valor de los comparendos "+ startYear + "-" + endYear,
                                               "valueAxis": "ValueAxis-2",
                                               "valueField": "Valor"
                                       }
                               ],
                               "guides": [],
                               "valueAxes": [
                                       {
                                               "id": "ValueAxis-1",
                                               "title": "Número de comparendos"
                                       },
                                       {
                                               "id": "ValueAxis-2",
                                               "position": "top",
                                               "title": "Valor comparendos (en millones de pesos)",
                                               "unit": "$",
                                               "unitPosition": "left"
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
                                               "text": "Comparendos por mes"
                                       }
                               ],
                               "dataProvider": data,
                               "export": {
                                      "enabled": true,
                                      "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                      "menu": []
                               }
                       }
                   );
           AmCharts.checkEmptyData(chartKPI_Top10);
        } else {
            var stringGET2 = "/webresources/kpis/comparendos?token=" + token + "&day="+ startDay2 +"&month="+ startMonth2 +"&year="+ startYear2 +"&day1="+ endDay2 +"&month1="+ endMonth2 +"&year1=" + endYear2 + "&type=CANTIDADPORMES"  + "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;               
            self.ajax(stringGET2, 'GET').done(function(data2) {
                combinarArrays(data, data2, 'Numero de Comparendos', 'Numero de Comparendos R2', 'Mes');
                combinarArrays(data, data2, 'Valor', 'Valor R2', 'Mes');
                chartKPI_Top10 = AmCharts.makeChart("top10Chart",
                           {
                               "type": "serial",
                               "categoryField": "Mes",
                               "language": "es",
                               "zoomOutText": "",
                               "rotate": true,
                               "startDuration": 1,
                               "categoryAxis": {
                                       "gridPosition": "start",
                                       "title": "Mes"
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
                                               "labelText": "[[value]]",
                                               "title": "Número de comparendos " + startYear + "-" + endYear,
                                               "type": "column",
                                               "valueAxis": "ValueAxis-1",
                                               "valueField": "Numero de Comparendos"
                                       },
                                       {
                                               "balloonText": "[[title]] de [[category]]: $[[value]]",
                                               "bullet": "round",
                                               "id": "AmGraph-2",
                                               "labelText": "$[[value]]",
                                               "lineThickness": 2,
                                               "title": "Valor de los comparendos "+ startYear + "-" + endYear,
                                               "valueAxis": "ValueAxis-2",
                                               "valueField": "Valor"
                                       },
                                       {
                                               "balloonText": "[[title]] de [[category]]: [[value]]",
                                               "fillAlphas": 1,
                                               "id": "AmGraph-3",
                                               "labelText": "[[value]]",
                                               "title": "Número de comparendos "+ startYear2 + "-" + endYear2,
                                               "type": "column",
                                               "valueAxis": "ValueAxis-1",
                                               "valueField": "Numero de Comparendos R2"
                                       },
                                       {
                                               "balloonText": "[[title]] de [[category]]: $[[value]]",
                                               "bullet": "round",
                                               "id": "AmGraph-4",
                                               "labelText": "$[[value]]",
                                               "lineThickness": 2,
                                               "title": "Valor de los comparendos " + startYear2 + "-" + endYear2,
                                               "valueAxis": "ValueAxis-2",
                                               "valueField": "Valor R2"
                                       }
                               ],
                               "guides": [],
                               "valueAxes": [
                                       {
                                               "id": "ValueAxis-1",
                                               "title": "Número de comparendos"
                                       },
                                       {
                                               "id": "ValueAxis-2",
                                               "position": "top",
                                               "title": "Valor comparendos (en millones de pesos)",
                                               "unit": "$",
                                               "unitPosition": "left"
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
                                               "text": "Comparendos por mes"
                                       }
                               ],
                               "dataProvider": data,
                               "export": {
                                      "enabled": true,
                                      "libs": {
                                        "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                                      },
                                      "menu": []
                               }
                       }
                   );
                AmCharts.checkEmptyData(chartKPI_Top10);
            });
        }
    });

    return false;
}
// Metodos para Exportar en Excel e Imprimir
function exportComparendosDpto() {
  comparendosDepartamento.export.toXLSX({
    data: comparendosDepartamento.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "comparendosDepartamento.xlsx");
  });
}

function printComparendosDpto(){
   comparendosDepartamento.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportComparendosMunicipio() {
  comparendosMunicipios.export.toXLSX({
    data: comparendosMunicipios.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "comparendosMunicipios.xlsx");
  });
}

function printComparendosMunicipio(){
   comparendosMunicipios.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportComparendosAno() {
  comparendosAno.export.toXLSX({
    data: comparendosAno.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "TotalComparendosImpuestosEnRango.xlsx");
  });
}

function printComparendosAno(){
   comparendosAno.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportComparendosMes() {
  chartKPI7Ano.export.toXLSX({
    data: chartKPI7Ano.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "TotalComparendosImpuestosEnRango.xlsx");
  });
}

function printComparendosMes(){
   chartKPI7Ano.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportComparendosPorTipo() {
  chartKPI8.export.toXLSX({
    data: chartKPI8.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "ComparendosPorTipoEnRango.xlsx");
  });
}

function printComparendosPorTipo(){
   chartKPI8.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportComparendosPorTipoRango2() {
  chartKPI8Rango2.export.toXLSX({
    data: chartKPI8Rango2.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "ComparendosPorTipoEnRango.xlsx");
  });
}

function printComparendosPorTipoRango2(){
   chartKPI8Rango2.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportValorTotal() {
  chartKPI12.export.toXLSX({
    data: chartKPI12.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "ValorTotalComparendosImpuestosEnRango.xlsx");
  });
}

function printValorTotal(){
   chartKPI12.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportValorTotalRango2() {
  chartKPI12Rango2.export.toXLSX({
    data: chartKPI12Rango2.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "ValorTotalComparendosImpuestosEnRango.xlsx");
  });
}

function printValorTotalRango2(){
   chartKPI12Rango2.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportValorImpuesto() {
  chartKPI13.export.toXLSX({
    data: chartKPI13.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "ValorImpuestoPorServicioDelCarroEnRango.xlsx");
  });
}

function printValorImpuesto(){
   chartKPI13.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportValorImpuestoRango2() {
  chartKPI13Rango2.export.toXLSX({
    data: chartKPI13Rango2.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "ValorImpuestoPorServicioDelCarroEnRango.xlsx");
  });
}

function printValorImpuestoRango2(){
   chartKPI13Rango2.export.capture( {}, function() {
       this.toPRINT();
   } );
}

function exportTop10Comparendos() {
  chartKPI_Top10.export.toXLSX({
    data: chartKPI_Top10.dataProvider
  }, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "Top10EnRango.xlsx");
  });
}

function printTop10Comparendos(){
   chartKPI_Top10.export.capture( {}, function() {
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
        var stringGET = "/webresources/kpis/historia?token=" + token + "&type=COMP"+ "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
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
            } else if(historico) {
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


        document.getElementById("divChartCompRango2").style.display = "block";
        document.getElementById("divChartCompRango1").className = "col-lg-6";

        document.getElementById("divChartValorTotRango2").style.display = "block";
        document.getElementById("divChartValorTotRango1").className = "col-lg-6";

        document.getElementById("divChartImpuestoRango2").style.display = "block";
        document.getElementById("divChartImpuestoRango1").className = "col-lg-6";

        document.getElementById("exportRango22").style.display = "inline-block";
        document.getElementById("exportRango23").style.display = "inline-block";
        document.getElementById("exportRango24").style.display = "inline-block";

    if (parametroURLFiltro.localeCompare("TODOSDPTOS") === 0) {
        funcionesPorDepartamento();
    } else if (parametroURLFiltro.localeCompare("MUNIC") === 0) {
        funcionesPorTiempo();
    } else if (parametroURLFiltro.localeCompare("DPTO") === 0 ) {
        funcionesPorMunicipio();
    }

    if(usingTwoRanges === false) {
        document.getElementById("divChartCompRango2").style.display = "none";
        document.getElementById("divChartCompRango1").className = "col-lg-12";

        document.getElementById("divChartValorTotRango2").style.display = "none";
        document.getElementById("divChartValorTotRango1").className = "col-lg-12";

        document.getElementById("divChartImpuestoRango2").style.display = "none";
        document.getElementById("divChartImpuestoRango1").className = "col-lg-12";

        document.getElementById("exportRango22").style.display = "none";
        document.getElementById("exportRango23").style.display = "none";
        document.getElementById("exportRango24").style.display = "none";
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
        var stringGET = "/webresources/kpis/historia?token=" + token + "&type=COMP"+ "&filtro=" + parametroURLFiltro + "&filtroid=" + parametroCualId;
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

function totalImpuesto() {
    var sel = document.getElementById("totalImpuestoSelect").value;
    if(sel.localeCompare("total") === 0) {
        document.getElementById("valorTotal").style.display = "block";
        document.getElementById("valorImpuesto").style.display = "none";
    } else if (sel.localeCompare("impuesto") === 0) {
        document.getElementById("valorImpuesto").style.display = "block";
        document.getElementById("valorTotal").style.display = "none"
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
        graficas.push(comparendosDepartamento);
    } else if(depto.localeCompare("0") != 0 && municipio.localeCompare("0") === 0) {
        //Está seleccionado un departamento
        graficas.push(comparendosMunicipios);
    } else if(depto.localeCompare("0") != 0 && municipio.localeCompare("0") != 0) {
        //Está seleccionado un municipio
        var tiempo = document.getElementById("anoMes").value;
        if(tiempo.localeCompare("ano") === 0) {
            graficas.push(comparendosAno);
        } else if(tiempo.localeCompare("mes") === 0) {
            graficas.push(comparendosMes);
        }
    }
    if(usingTwoRanges == true) {
        graficas.push(chartKPI8);
        graficas.push(chartKPI8Rango2);
    } else if(usingTwoRanges == false) {
        graficas.push(chartKPI8);
    }
    var valorTotal = document.getElementById("totalImpuestoSelect").value;
    if(valorTotal.localeCompare("total") === 0) {
        if(usingTwoRanges == true) {
            graficas.push(chartKPI12);
            graficas.push(chartKPI12Rango2);
        } else if(usingTwoRanges == false) {
            graficas.push(chartKPI12);
        }
    } else if(valorTotal.localeCompare("impuesto") === 0) {
        if(usingTwoRanges == true) {
            graficas.push(chartKPI13);
            graficas.push(chartKPI13Rango2);
        } else if(usingTwoRanges == false) {
            graficas.push(chartKPI13);
        }
    }
    graficas.push(chartKPI_Top10);
    return graficas;
}