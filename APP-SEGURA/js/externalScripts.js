// Importar los scripts externos

// SweetAlert2
const script1 = document.createElement("script");
script1.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
document.head.appendChild(script1);

// Popper.js
const script2 = document.createElement("script");
script2.src =
  "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js";
script2.integrity =
  "sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r";
script2.crossOrigin = "anonymous";
document.head.appendChild(script2);

// Bootstrap JavaScript
const script3 = document.createElement("script");
script3.src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js";
script3.integrity =
  "sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+";
script3.crossOrigin = "anonymous";
document.head.appendChild(script3);
