const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrape() {
  // Lanzamos Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Vamos al sitio web
  await page.goto('https://books.toscrape.com/');

  // Extraemos los datos del libro "A Light in the Attic"
  const books = await page.evaluate(() => {
    const bookElements = document.querySelectorAll('.product_pod');
    const booksData = [];
    
    bookElements.forEach(book => {
      const title = book.querySelector('h3 a').getAttribute('title');
      const price = book.querySelector('.price_color').textContent;
      
      // Si el título coincide con "A Light in the Attic", lo añadimos a los datos
      if (title === 'A Light in the Attic') {
        booksData.push({ title, price });
      }
    });

    return booksData;
  });

  // Guardamos los datos en un archivo .json
  fs.writeFileSync('books.json', JSON.stringify(books, null, 2));

  // También los mostramos en consola
  console.log(books);

  // Cerramos el navegador
  await browser.close();
}

scrape();
