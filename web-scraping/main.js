import { chromium } from 'playwright'
console.log('Web Scrapping')

const browser = await chromium.launch(
    { headless: true }
)

const page = await browser.newPage()

await page.goto('https://publicacionesprocesales.ramajudicial.gov.co/c/portal/layout?p_l_id=6098928&p_p_id=co_com_avanti_efectosProcesales_PublicacionesEfectosProcesalesPortlet_INSTANCE_qOzzZevqIWbb&p_p_lifecycle=0&p_p_state=normal&_co_com_avanti_efectosProcesales_PublicacionesEfectosProcesalesPortlet_INSTANCE_qOzzZevqIWbb_action=filterCategories&_co_com_avanti_efectosProcesales_PublicacionesEfectosProcesalesPortlet_INSTANCE_qOzzZevqIWbb_tipoCategoria=despacho&_co_com_avanti_efectosProcesales_PublicacionesEfectosProcesalesPortlet_INSTANCE_qOzzZevqIWbb_idDespacho=7938631')

const elements = await page.evaluate(() => {
    // return document.querySelectorAll('h1')
    const nodes = document.querySelectorAll('.efecto')
    return Array.from(nodes).map(node => {
        // Obtenemos el nombre del tag y el contenido de texto
        const tagName = node.tagName;
        const innerText = node.innerText;
        
        // Buscamos elementos 'a' dentro del nodo para extraer sus links
        const links = Array.from(node.querySelectorAll('a')).map(link => ({
            href: link.href,
            text: link.innerText
        }));

        return { tagName, innerText, links };
    });

})

// console.log(elements)
console.log('*'.repeat(35))
elements.map( element => console.log(element.links))

await browser.close()

console.log('Hemos acabado...???')