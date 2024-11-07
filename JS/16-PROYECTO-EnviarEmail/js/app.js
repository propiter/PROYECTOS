document.addEventListener("DOMContentLoaded", function(){

    const email = {
        email: "",
        emailCC:"",
        asunto: "",
        mensaje: ""
    };


    // seleccioar los elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputmensaje = document.querySelector("#mensaje");
    const inputEmailCC = document.querySelector("#emailCC")
    const formulario = document.querySelector("#formulario")
    const btnSubmit = document.querySelector(`#formulario button[type = "submit"]` )
    const btnReset = document.querySelector(`#formulario button[type = "reset"]` )
    const spiner = document.querySelector("#spin");

    console.log(inputEmail, inputAsunto, inputmensaje )

    //asignar eventos 
    inputEmail.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    inputmensaje.addEventListener("input", validar);
    inputEmailCC.addEventListener("input", validar);
    formulario.addEventListener("submit", enviarEmail);
    btnReset.addEventListener("click", function(e){
        e.preventDefault();

        reiniciarForm()
    });

    function enviarEmail(e){
        e.preventDefault()
        spiner.classList.add("flex")
        spiner.classList.remove("hidden")

        setTimeout(() => {
            spiner.classList.remove("flex")
            spiner.classList.add("hidden") 

            reiniciarForm();
            // crear alerta de exito
            const alertaexito = document.createElement("P");
            alertaexito.classList.add("bg-green-500", "text-white", "p-2", "font-bold")
            alertaexito.textContent = "enviado"
            formulario.appendChild(alertaexito)
            
            setTimeout(()=>{
                    alertaexito.remove()
            },3000);

        }, 3000);
    }

    function validar(e){
        console.log(e.target.parentElement)
       if(e.target.value.trim()=== "" && e.target.id !== "emailCC"){
        mostraralerta(`el campo ${e.target.id} es Obligatorio`, e.target.parentElement)
        email[e.target.name] = ""
        comprobarEmail()
        return
    }
    if((e.target.id === "email" || e.target.id === "emailCC") && 
        (e.target.value.trim() !== "" &&!validarEmail(e.target.value))
    ){
        mostraralerta(`el campo ${e.target.id} no es valido`, e.target.parentElement)
        email[e.target.name] = ""
        comprobarEmail()
        return;
    }

    limpiarAlerta(e.target.parentElement)

    // asignar los valores al objeto email
    email[e.target.name] = e.target.value.trim().toLowerCase();
    comprobarEmail()
    }

    function mostraralerta (mensaje, referencia){
        // comprueba si ya esta la alerta 
       limpiarAlerta(referencia)

        //generar alerta
        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2");
        referencia.appendChild(error);

    }

    function limpiarAlerta(referencia){
      const alerta = referencia.querySelector(".bg-red-600")
        if (alerta){
            alerta.remove();
        }
    }

    function validarEmail (email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return(resultado)
    }

    function comprobarEmail(){
        console.log(email);
        if(Object.values(email).includes("")){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.ariaDisabled = true
            return
        } 
            btnSubmit.classList.remove("opacity-50");
            btnSubmit.disabled = false
        
    }

    function reiniciarForm(){
        // reiniciar el objeto
        email.email = "";
        email.emailCC = "";
        email.asunto = "";
        email.mensaje = "";
        formulario.reset();
        comprobarEmail();
    }

})






