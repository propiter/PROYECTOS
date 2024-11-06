window.addEventListener("load", function () {
  // icono para mostrar contraseña
  const showPassword = document.querySelector(".show-password");
  showPassword.addEventListener("click", () => {
    // elementos input de tipo clave
    const passwordInput = document.querySelector("#password");

    if (passwordInput.type === "text") {
      passwordInput.type = "password";
      showPassword.classList.remove("fa-eye-slash");
      showPassword.classList.add("fa-eye");
    } else {
      passwordInput.type = "text";
      showPassword.classList.remove("fa-eye");
      showPassword.classList.add("fa-eye-slash");
    }
  });
});

(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity()) {
        const formData = new FormData(form);
        const codigoPais = formData.get("codigo_pais");
        const telefono = formData.get("telefono");
        const tipo_documento = formData.get("tipo_documento");
        const documento = formData.get("documento");
        const data = {
          nombre: formData.get("nombre"),
          apellido: formData.get("apellido"),
          celular: codigoPais + telefono, // Concatenar el código de país con el número de teléfono
          documento: tipo_documento + documento,
          correo: formData.get("correo"),
          contraseña: formData.get("contraseña"),
        };

        fetch("https://www.appsegura.somee.com/api/Registro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())

          .then((data) => {
            if (data.Success) {
              Swal.fire({
                icon: "success",
                title: "Registro exitoso",
                text: data.Mensaje || "¡Tu registro fue exitoso!",
              }).then(() => {
                form.reset(); // Limpiar el formulario
                window.location.href = "../view/index.html";
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: data.Mensaje || "error al registrarse",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message || "Hubo un error.",
            });
          });
      }
      form.classList.add("was-validated");
    });
  });
})();
