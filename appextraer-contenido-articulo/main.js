import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'

console.log('Esto es un ejercicio')

const url = 'https://www.elespectador.com/colombia-20/paz-y-memoria/deforestacion-en-amazonia-asi-la-combaten-exfarc-en-putumayo-iran-a-la-cop16-con-vivero/'

const res = await fetch(url)
const text = await res.text()

const doc = new JSDOM( text, { url })
const reader = new Readability(doc.window.document)
const { title, byline, lang, excerpt, siteName, textContent } = reader.parse()
// const { title, byline, lang, excerpt, siteName, textContent } = reader.parse()

console.log(title)
console.log("=".repeat(100))
console.log(byline,"/", lang,"/",  siteName)
console.log(" * ".repeat(35))
console.log(textContent)
