// Creamos un servidor
console.clear()
import express from 'express';
import path from 'path';
import { lecturaDirectorio } from './lecturadirectorio';

const app = express()
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send({
        "message": "OK"
    })
})

app.get('/archivos', (req,res) => {
    const archivos = lecturaDirectorio()
    res.send({
        "message": "Ok",
        "archivos": archivos
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
