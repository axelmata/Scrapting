// Cargar los datos del archivo JSON
fetch('books.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#booksTable tbody');
    data.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${book.title}</td><td>${book.price}</td>`;
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error('Error al cargar los datos:', error));
