(() => {
  "use strict";

  // Función para obtener el valor de un parámetro de la URL
  function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var url = window.location.href;
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // Asignar el token al campo del formulario si existe
  window.onload = function () {
    var token = getParameterByName("token");
    if (token) {
      document.getElementById("token").value = token;
    }
  };

  // Obtener los formularios que necesitan validación
  const forms = document.querySelectorAll(".needs-validation");

  // Validar y enviar el formulario
  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity()) {
        const formData = new FormData(form);
        // Obtener los valores del formulario
        const token = formData.get("token");
        const contraseña = formData.get("contraseña");

        // Crear el objeto de datos para enviar
        const data = {
          Token: token,
          Contraseña: contraseña,
        };

        // Realizar la petición a la API
        fetch("https://www.appsegura.somee.com/api/RestablecerContraseña", {
          method: "Post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.Success) {
              Swal.fire({
                icon: "success",
                title: "Exito",
                text: data.Mensaje,
                confirmButtonText: "ok",
              }).then(() => {
                form.reset(); // Limpiar el formulario
                window.location.href = "../view/index.html";
              });
            } else {
              // Si hay un error en el inicio de sesión
              Swal.fire({
                icon: "error",
                title: "Error",
                text: data.Mensaje || "parece que el correo no esta registrado",
                confirmButtonText: "OK",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.Mensaje || "Hubo un error en la conexion al Servidor",
            });
          });
      }
      form.classList.add("was-validated");
    });
  });
})();
