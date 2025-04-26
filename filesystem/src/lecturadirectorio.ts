// Ejercicios con file system de NodeJs
import path from 'path'
import  fs from 'fs'
// const __filename = fileURLToPath(import.meta.url)

const directorio = process.cwd();
const extensionesPermitidas = ['.jpg', '.jpeg', '.png']

export const lecturaDirectorio = () => {
    const files = fs.readdirSync(`${directorio}/src/archivos1`, { withFileTypes: true})
    const archivos = files.filter( file => {
        const ext = path.extname(file.name).toLowerCase()
        return extensionesPermitidas.includes(ext)
    })

    return archivos
}



