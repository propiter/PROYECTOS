(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault(); // Evitar la presentación del formulario para el ejemplo

        // Definir el objeto de configuración de la alerta
        let alertConfig = {
          icon: "success",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `
          <i class="fa fa-thumbs-up"></i> Great!
        `,
          confirmButtonAriaLabel: "Thumbs up, great!",
          cancelButtonText: `
          <i class="fa fa-thumbs-down"></i>
        `,
          cancelButtonAriaLabel: "Thumbs down",
        };

        // Mostrar una alerta diferente según el formulario
        if (form.classList.contains("form-1")) {
          alertConfig.title = "Has iniciado sesión correctamente";
          alertConfig.html = `ir a verificar tus
            <a href="https://appsegura.netlify.app/verificarLink.html">links</a>`;
          // } else if (form.classList.contains("form-2")) {
          //   alertConfig.title = "Te has registrado correctamente";
          //   alertConfig.html = `ir a verificar tus
          //     <a href="https://appsegura.netlify.app/verificarLink.html">links</a>`;
        } else if (form.classList.contains("form-3")) {
          const url = document.getElementById("urlaverificar").value;
          alertConfig.title = "Link verificado correctamente";
          alertConfig.html = `ir al enlace verificado
            <a href="${url}">links</a>`;
        } else if (form.classList.contains("form-4")) {
          alertConfig.title = "Datos de usuario enviados";
          alertConfig.html = `ir a tu correo
                <a href="https://accounts.google.com/b/0/AddMailService">aqui</a>`;
        }

        // Mostrar la alerta configurada
        Swal.fire(alertConfig);
      }

      form.classList.add("was-validated");
    });
  });
})();
