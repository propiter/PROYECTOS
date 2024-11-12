import express from "express";
import morgan from "morgan";
import {engine} from "express-handlebars"
import {join, dirname} from "path"
import {fileURLToPath} from "url"
import exp from "constants";

// Initializacion 
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

//settings
app.set("port", process.env.PORT || 4000)
app.set("views", join(__dirname, "views"));
app.engine(".hbs", engine({
    defaultLayouts: "main",
    layoutsDir: join(app.get ("views"), "layouts"),
    partialDir: join(app.get("views"), "partials") ,
    extName: ".hbs"
}));
app.set ("view engine", ".hbs");

//middlewares
app.use (morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes


//public files 


//server 
app.listen(app.get("port"), () => {
    console.log("server listening on port", app.get("port"))
});
