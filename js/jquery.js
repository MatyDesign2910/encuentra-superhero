$(document).ready(function () {
  $("button").on("click", function () {
    $.ajax({
      type: "GET",
      url: "https://reqres.in/api/users",
      dataType: "json",
      success: function (datosApi) {
        console.log(datosApi.data);
        datosApi.data.forEach((element) => {
          $(".resultado").append(`<p>${element.id}-${element.email}-
      ${element.first_name}-${element.last_name}-
      ${element.avatar}</p>`);

          $("#imagen").append("<img src=" + element.avatar + " >");
        });
      },
      error: function (error) {
        //si algo sale mal, se agrega la funcionalidad aquí.
      },
    });
  });
});
