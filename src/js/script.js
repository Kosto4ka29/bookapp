class BooksList {
  constructor() {
    this.favoriteBooks = [];
    this.filters = [];

    this.getElements();
    this.initData();
    this.render();
    this.initActions();
  }
  initData(){
    this.data = dataSource.books;
  }

  getElements() {
    this.booksList = document.querySelector('.books-list');
    this.form = document.querySelector('.filters');
  }

  render() {
    const templateSource = document.querySelector('#template-book').innerHTML;
    const template = Handlebars.compile(templateSource);

    for (let book of this.data) {
      const rating = book.rating;
      const ratingBg = this.determineRatingBg(rating);
      const ratingWidth = rating * 10;

      book.ratingStyle = `width: ${ratingWidth}%; background: ${ratingBg}`;

      const generatedHTML = template(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      this.booksList.appendChild(element);
    }
  }

  determineRatingBg(rating) {
    if (rating < 6) return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    else if (rating <= 8) return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    else if (rating <= 9) return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    else return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }

  initActions() {
    this.booksList.addEventListener('dblclick', (event) => {
      event.preventDefault();
      const clickedElement = event.target.offsetParent;

      if (clickedElement.classList.contains('book__image')) {
        const bookId = clickedElement.getAttribute('data-id');

        if (!this.favoriteBooks.includes(bookId)) {
          this.favoriteBooks.push(bookId);
          clickedElement.classList.add('favorite');
        } else {
          const index = this.favoriteBooks.indexOf(bookId);
          this.favoriteBooks.splice(index, 1);
          clickedElement.classList.remove('favorite');
        }
      }
    });

    this.form.addEventListener('click', (event) => {
      const clickedElement = event.target;

      if (
        clickedElement.tagName === 'INPUT' &&
        clickedElement.type === 'checkbox' &&
        clickedElement.name === 'filter'
      ) {
        const value = clickedElement.value;

        if (clickedElement.checked && !this.filters.includes(value)) {
          this.filters.push(value);
        } else {
          const index = this.filters.indexOf(value);
          if (index !== -1) {
            this.filters.splice(index, 1);
          }
        }

        this.filterBooks();
      }
    });
  }

  filterBooks() {
    for (let book of this.data) {
      let shouldBeHidden = false;

      for (let filter of this.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);

      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }
}

const app = new BooksList();
window.app = app;