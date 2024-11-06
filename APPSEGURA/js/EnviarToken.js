(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity()) {
        const formData = new FormData(form);
        // Obtener los valores del formulario
        const correo = formData.get("correo");

        // Crear el objeto de datos para enviar
        const data = {
          Correo: correo,
        };

        // Realizar la petición a la API
        fetch("https://www.appsegura.somee.com/api/Token", {
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
                window.location.href = "../view/RestablecerContraseña.html";
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
              text: error.Mensaje || "Hubo un error en el Servidor.",
            });
          });
      }
      form.classList.add("was-validated");
    });
  });
})();
