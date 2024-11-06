document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  if (username) {
    document.getElementById(
      "user-name"
    ).textContent = `Bienvenido, ${username}`;
  }
});

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
      const Enlace = formData.get("url");

      // Crear el objeto de datos para enviar
      const data = {
        Enlace: Enlace,
      };

      // Realizar la petición a la API
      fetch("https://www.appsegura.somee.com/api/VerificarEnlace", {
        method: "Post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.Mensaje === "El enlace no existe") {
            Swal.fire({
              icon: "info",
              title: "El enlace no Existe",
              html: `El enlace "${data.Enlace}" <br> no existe, Verifica un nuevo enlace`,
              confirmButtonText: "verificar nuevo Enlace",
              customClass: {
                title: "custom-title-unsafe", // Aplicar la clase personalizada al título
                htmlContainer: "custom-html", // Aplicar la clase personalizada al contenido
              },
            }).then(() => {
              form.reset(); // Limpiar el formulario
            });
          } else if (
            data.Mensaje ===
              "El enlace no tiene certificado SSL válido: Certificado expirado" ||
            data.Mensaje ===
              "El enlace no tiene certificado SSL válido: Certificado aún no válido"
          ) {
            Swal.fire({
              icon: "info",
              title: "El certificado SSL no es válido",
              html: `Navega con Cuidado, no des datos que pueda comprometer tu seguridad <br>Consultas: ${data.CantidadConsultas}<br>Reportes: ${data.CantidadReportes}`, // Mostrar el mensaje completo
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Ver Reportes",
              denyButtonText: `Reportar Enlace`,
              cancelButtonText: `verificar nuevo Enlace`,
              customClass: {
                title: "custom-title-unsafe", // Aplicar la clase personalizada al título
                htmlContainer: "custom-html", // Aplicar la clase personalizada al contenido
              },
            }).then((result) => {
              //Listar los Reportes
              if (result.isConfirmed) {
                obtenerReportes(Enlace);
              }
              // Reportar el enlace
              else if (result.isDenied) {
                ReportarEnlace(Enlace); //llamo a la funcion ReportarEnlace
              } else if (
                // Verificar Nuevo Enlace
                result.dismiss === Swal.DismissReason.cancel
              ) {
                form.reset();
              }
            });
          } else if (data.EsSeguro) {
            Swal.fire({
              icon: "success",
              title: "Exito",
              html: `El enlace: "${data.Enlace}" <br> es seguro. <br> <a href= "${data.Enlace}" target="_blank"> IR AL ENLACE</a>`,
              confirmButtonText: "ok",
            }).then(() => {
              form.reset(); // Limpiar el formulario
              //poner link al boton ir al enlace y verificcar otro enlace
            });
          } else {
            Swal.fire({
              title: data.Mensaje || "¡UPS! Parece que el enlace es Sospechoso",
              html: `Te Recomendamos ver los reportes que tiene el enlace o Reportarlo si tienes una buena Razón.<br>Consultas: ${data.CantidadConsultas}<br>Reportes: ${data.CantidadReportes}`,
              icon: "warning",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Ver Reportes",
              denyButtonText: `Reportar Enlace`,
              cancelButtonText: `verificar nuevo Enlace`, //borrar el form, form.reset();
              customClass: {
                title: "custom-title-unsafe", // Aplicar la clase personalizada al título
                htmlContainer: "custom-html", // Aplicar la clase personalizada al contenido
              },
              didOpen: () => {
                const iconElement = document.querySelector(
                  ".swal2-icon.swal2-warning"
                );
                if (iconElement) {
                  iconElement.style.animation = "pulsate 1s infinite";
                  iconElement.style.color = "red";
                }
              },
            }).then((result) => {
              //Listar los Reportes
              if (result.isConfirmed) {
                obtenerReportes(Enlace);
              }
              // Reportar el enlace
              else if (result.isDenied) {
                ReportarEnlace(Enlace); //llamo a la funcion ReportarEnlace
              } else if (
                // Verificar Nuevo Enlace
                result.dismiss === Swal.DismissReason.cancel
              ) {
                form.reset();
              }
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

// Función para formatear la fecha en dd/MM/yyyy
function formatearFecha(fecha) {
  let dia = fecha.getDate().toString().padStart(2, "0");
  let mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Los meses empiezan en 0
  let anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

// Variables para la paginación
let reportesPorPagina = 5;
let paginaActual = 1;
let totalPaginas = 1; // Se actualizará una vez se obtengan los datos

// Función para construir la tabla con la página actual
function construirTabla(pagina, reportes) {
  let inicio = (pagina - 1) * reportesPorPagina;
  let fin = inicio + reportesPorPagina;
  let reportesPagina = reportes.slice(inicio, fin);

  let filas = reportesPagina
    .map(
      (reporte) => `
      <tr>
          <td class="col-70">${reporte.razon}</td>
          <td class="col-30">${formatearFecha(new Date(reporte.fecha))}</td>
      </tr>
  `
    )
    .join("");

  return `
  <table style="width: 100%; text-align: left; border-collapse: collapse;">
      <thead>
          <tr>
              <th class="col-70";">Razon</th>
              <th class="col-30"">Fecha de Reporte</th>
          </tr>
      </thead>
      <tbody>
          ${filas}
      </tbody>
  </table>
  `;
}

// Función para mostrar la alerta con la tabla y la paginación
function mostrarAlerta(pagina, reportes, Enlace) {
  let table = construirTabla(pagina, reportes);

  Swal.fire({
    title: "Reportes",
    html:
      table +
      `
      <div style="text-align: center; margin-top: 10px;">
          <span style="cursor: pointer;" id="prevPage">&lt;</span>
          <span> ${pagina} de ${totalPaginas} </span>
          <span style="cursor: pointer;" id="nextPage">&gt;</span>
      </div>
      `,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Reportar",
    cancelButtonText: "Cancelar",
    didRender: () => {
      const prevPageButton = document.getElementById("prevPage");
      const nextPageButton = document.getElementById("nextPage");

      if (prevPageButton) {
        prevPageButton.addEventListener("click", () => {
          if (paginaActual > 1) {
            paginaActual--;
            mostrarAlerta(paginaActual, reportes, Enlace);
          }
        });
      }

      if (nextPageButton) {
        nextPageButton.addEventListener("click", () => {
          if (paginaActual < totalPaginas) {
            paginaActual++;
            mostrarAlerta(paginaActual, reportes, Enlace);
          }
        });
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      ReportarEnlace(Enlace);
    }
  });
}

// Fetch de los reportes desde la API
function obtenerReportes(Enlace) {
  const data = {
    Enlace: Enlace,
  };
  fetch("https://www.appsegura.somee.com/api/VerReportes", {
    method: "Post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos recibidos:", data); // Verificar la estructura de la respuesta
      let reportes = data.map((item) => ({
        razon: item.Razon,
        fecha: item.FechaReporte,
      }));

      totalPaginas = Math.ceil(reportes.length / reportesPorPagina);
      mostrarAlerta(paginaActual, reportes, Enlace);
    })
    .catch((error) => {
      console.error("Error al obtener los reportes:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron obtener los reportes. Por favor, inténtalo de nuevo más tarde.",
      });
    });
}

function ReportarEnlace(Enlace) {
  Swal.fire({
    title: "Reportar Enlace",
    text: "Inserte la Razon Del Reporte",
    input: "text",
    confirmButtonText: "Reportar",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    preConfirm: async (Razon) => {
      if (!Razon) {
        Swal.showValidationMessage("Debes ingresar una razón para el reporte.");
        return false;
      }
      try {
        const Url = `https://www.appsegura.somee.com/api/ReportarEnlace`;
        const data = {
          Enlace: Enlace,
          IdUsuario: "7",
          RazonReporte: Razon,
        };
        const response = await fetch(Url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          return Swal.showValidationMessage(`
                  ${JSON.stringify(await response.json())}
                `);
        }
        return response.json();
      } catch (error) {
        Swal.showValidationMessage(`
              Request failed: ${error}
            `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: `El enlace: ${Enlace} \n Ha sido reportado con éxito`,
        confirmButtonText: "Ok",
      }).then(() => {
        forms.forEach((form) => {
          form.reset();
        });
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Limpiar todos los formularios
      forms.forEach((form) => {
        form.reset();
      });
    }
  });
}
