import xlsx from 'xlsx'
import fs from 'fs'
// const fs = require('fs')

console.log('Pasando Excel a JSON')

const excelToJson = (filePath, sheetName, outputFilePath) => {
    const workbook = xlsx.readFile(filePath)
    const worksheet = workbook.Sheets[sheetName]
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
    const headers = data[0]

    const jsonData = data.slice(1).map(row => {
        const entry = {}
        headers.forEach((header, index) => {
            entry[header] = row[index]
        })
        return entry
    });
    fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 4), 'utf8')
    console.log(`Datos convertidos y guardados en ${outputFilePath}`)
}

// Ejecutamos la función
const filePath = 'ListaPersonas.xlsx'
const sheetName = 'Personas'
const outputFilePatch = 'personasNode.json'

excelToJson(filePath, sheetName, outputFilePatch )
