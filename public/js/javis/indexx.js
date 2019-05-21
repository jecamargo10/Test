document.getElementById("inicioMaximo").addEventListener("click", function(){
  var doritos = document.getElementById("email").value;
  var tostacos = document.getElementById("pass").value;
  var data = { username: doritos, pass: tostacos}

  $.get("/user",data,
  function(data, status){
    console.log(data)
    localStorage.setItem("gyf", data);
    window.location.href = '../portal.html';
  });
  /**
  if (doritos.startsWith("manuel"))
  {
console.log(window.location.href)
    window.location.href = '../stuff2.html';
    console.log("ESPICHADO" + doritos)
  }
  else   if (doritos.startsWith("javier"))
  {
    window.location.href = '../portal.html';
    console.log("ESPICHADO" + doritos)
  }
  else   if (doritos.startsWith("admin"))
  {
    window.location.href = '../RentingMP/admin.html';
    console.log("ESPICHADO" + doritos)
  }*/
});
