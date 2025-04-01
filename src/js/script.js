// Używamy globalnego utils tylko jeśli jeszcze go nie ma
window.utils = window.utils || {};

utils.createDOMFromHTML = function(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

// Tablica ulubionych
const favoriteBooks = [];

// Funkcja renderująca książki
function render() {
  const booksList = document.querySelector('.books-list');
  const templateSource = document.querySelector('#template-book').innerHTML;
  const template = Handlebars.compile(templateSource);

  for (let book of dataSource.books) {
    const generatedHTML = template(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(element);
  }
}

// Obsługa dwuklików
function initActions() {
  const booksImages = document.querySelectorAll('.book__image');

  for (let image of booksImages) {
    image.addEventListener('dblclick', function (event) {
      event.preventDefault();

      const bookId = image.getAttribute('data-id');

      if (!favoriteBooks.includes(bookId)) {
        favoriteBooks.push(bookId);
        image.classList.add('favorite');
      } else {
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
        image.classList.remove('favorite');
      }
    });
  }
}

// Uruchom wszystko po załadowaniu strony
render();
initActions();
