//const { envs } = require ("./config/env");
import { envs } from "./config/env.js";
//const { startServer } = require("./server/server");
import { startServer } from "./server/server.js";



const main = () => {
    startServer({
       port:envs.PORT,
       public_path: envs.PUBLIC_PATCH
    })
}

//funcion agnostica autoconvocada:
//agnostica: porque no tiene nombre
// autoconvocada: porque se ejecuta con los parentesis al final
(async() => {
    main()
})();

