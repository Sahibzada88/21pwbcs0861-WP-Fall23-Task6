document.getElementById('add-book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;

    var existingBooks = JSON.parse(localStorage.getItem('books')) || [];
    var isDuplicate = existingBooks.some(function(book) {
        return book.title === title && book.author === author;
    });

    if (!isDuplicate) {
        existingBooks.push({title: title, author: author});
        localStorage.setItem('books', JSON.stringify(existingBooks));
        updateBookList();
    } else {
        alert('This book already exists in the library.');
    }

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
});

document.getElementById('search-button').addEventListener('click', function() {
    var searchTerm = document.getElementById('search').value.toLowerCase();
    var books = JSON.parse(localStorage.getItem('books')) || [];
    var filteredBooks = books.filter(function(book) {
        return book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
    });
    updateSearchResults(filteredBooks);
});

function updateBookList() {
    var bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    var allBooks = JSON.parse(localStorage.getItem('books')) || [];
    allBooks.forEach(function(book) {
        var li = document.createElement('li');
        li.textContent = book.title + ' - ' + book.author;
        bookList.appendChild(li);
    });
}

function updateSearchResults(books) {
    var searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    if (books) {
        books.forEach(function(book) {
            var div = document.createElement('div');
            div.textContent = book.title + ' - ' + book.author;
            searchResults.appendChild(div);
        });
    }
}

// Initial book list update
updateBookList();
