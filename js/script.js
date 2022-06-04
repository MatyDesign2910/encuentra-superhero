$(document).ready(function () {
  $("#info").hide();
  $("#enviar").on("click", function (e) {
    e.preventDefault();
    let idSuperHero = $("#numero").val();
    idSuperHero = parseInt(idSuperHero);
    console.log(idSuperHero);
    $.ajax({
      type: "GET",
      url: `https://www.superheroapi.com/api.php/110234478371938/${idSuperHero}`,
      dataType: "json",
      success: function (datosApi) {
        console.log(datosApi);
        if(idSuperHero == "" || idSuperHero < 1 || idSuperHero > 731) {
            alert(`Ingrese un número válido desde el 1 al 731`);
            location.reload();
        }
        $("#info").show();
        $("#buscador").hide();
        // alert("SI LLEGO")
        // alert(datosApi.name);
        if(datosApi.image.url === null || datosApi.image.url === "-") {
            datosApi.image.url = "Desconocido";
            $("#imagen").attr("src", datosApi.image.url);
        }
        else {
            $("#imagen").attr("src", datosApi.image.url);
        }

        if(datosApi.name === null || datosApi.name === "-") {
            datosApi.name = "Desconocido";
            $("#title").text(datosApi.name);
        }
        else {
            $("#title").text(datosApi.name);
        }

        if(datosApi.connections["group-affiliation"] === null || datosApi.connections["group-affiliation"] === "-") {
            datosApi.connections["group-affiliation"] = "Desconocido";
            $("#grupos").text(datosApi.connections["group-affiliation"]);
        }
        else {
            $("#grupos").text(datosApi.connections["group-affiliation"]);
        }

        if(datosApi.biography.publisher === null || datosApi.biography.publisher === "-") {
            datosApi.biography.publisher = "Desconocido";
            $("#por").text(datosApi.biography.publisher);
        }
        else {
            $("#por").text(datosApi.biography.publisher);
        }

        if(datosApi.work.occupation === null || datosApi.work.occupation === "-") {
            datosApi.work.occupation = "Desconocido";
            $("#ocupacion").text(datosApi.work.occupation);
        }
        else {
            $("#ocupacion").text(datosApi.work.occupation);
        }

        if(datosApi.biography["first-appearance"] === null || datosApi.biography["first-appearance"] === "-") {
            datosApi.biography["first-appearance"] = "Desconocido";
            $("#aparicion").text(datosApi.biography["first-appearance"]);
        }
        else {
            $("#aparicion").text(datosApi.biography["first-appearance"]);
        }

        if(datosApi.appearance.height === null || datosApi.appearance.height === "-") {
            datosApi.appearance.height = "Desconocido";
            $("#altura").text(datosApi.appearance.height);
        }
        else {
            $("#altura").text(datosApi.appearance.height);
        }

        if(datosApi.appearance.weight === null || datosApi.appearance.weight === "-") {
            datosApi.appearance.weight = "Desconocido";
            $("#peso").text(datosApi.appearance.weight);
        }
        else {
            $("#peso").text(datosApi.appearance.weight);
        }

        if(datosApi.biography.aliases === null || datosApi.biography.aliases === "-") {
            datosApi.biography.aliases = "Desconocido";
            $("#alianzas").text(datosApi.biography.aliases);
        }
        else {
            $("#alianzas").text(datosApi.biography.aliases);
        }

        let dataHero = Object.entries(datosApi.powerstats).map(([label,y]) => {
            if(y === null || y === "-") {
                y = "Desconocido";
            }
            return {y,label};
        });
        console.log(dataHero);

        const heroChart = () => {
            var chart = new CanvasJS.Chart("chartContainer", {
                theme: "light2", // "light1", "light2", "dark1", "dark2"
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: "Estadísticas de poder para " + datosApi.name,
                },
                data: [{
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: dataHero
                }]
            });
            chart.render();    
        }
        heroChart();

      },
      error: function (error) {
        //si algo sale mal, se agrega la funcionalidad aquí.
        alert("Algo salió mal, comunicate con tu el area de soporte");
        location.reload();
      },
    });
  });  
});