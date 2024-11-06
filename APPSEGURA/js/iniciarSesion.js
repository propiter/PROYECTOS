window.addEventListener("load", function () {
  // Selecciona el ícono para mostrar/ocultar la contraseña
  const showPassword = document.querySelector(".show-password");

  // Asegúrate de que el ícono existe en el DOM antes de añadir el evento
  if (showPassword) {
    showPassword.addEventListener("click", () => {
      // Selecciona el campo de la contraseña
      const passwordInput = document.querySelector("#password");

      if (passwordInput) {
        if (passwordInput.type === "text") {
          passwordInput.type = "password";
          showPassword.classList.remove("fa-eye-slash");
          showPassword.classList.add("fa-eye");
        } else {
          passwordInput.type = "text";
          showPassword.classList.remove("fa-eye");
          showPassword.classList.add("fa-eye-slash");
        }
      }
    });
  }
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

        const correo = formData.get("correo");
        const contraseña = formData.get("contraseña");

        const data = {
          Correo: correo,
          Contraseña: contraseña,
        };

        fetch("https://www.appsegura.somee.com/api/Login", {
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
                showConfirmButton: false,
                timer: 2500,
                didOpen: () => {
                  Swal.showLoading();
                  window.location.href = "../view/verificarLink.html";
                },
                willClose: () => {},
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: data.Mensaje,
                confirmButtonText: "OK",
                customClass: {
                  title: "custom-title-unsafe",
                  htmlContainer: "custom-html",
                },
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.Mensaje || "Hubo un error.",
            });
          });
      }
      form.classList.add("was-validated");
    });
  });
})();
