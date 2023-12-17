import app from "./server.js";
import { conectar } from "./database/database-conector.js";

app.listen(app.get('port'), () =>{
    conectar();
    console.log('Server on port '+ app.get('port'));
})