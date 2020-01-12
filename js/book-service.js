'use strict'

const BOOK_KEY = 'books';
const ID_KEY = 'id';
const booksInPageCount = 4;
var gCurrPage = 0;

var gBooks;
var gNextId;
var gSortByName = false;
var gBooksImg = createBookImages();

createBooks();

function createBook(name, price = 20, ) {
    var imgUrl = gBooksImg[getRandomInt(0, gBooksImg.length - 1)]
    var book = {
        id: gNextId++,
        name: name,
        price,
        currency: getTransKey('currency'),
        details: { img: imgUrl, rate: 0 }
    }
    return book;
}


function createBooks() {
    var books = loadBooksFromStorage(BOOK_KEY);
    if (!books || books.length === 0) {
        gNextId = 101;
        books = [createBook('The dog'), createBook('This is avi'), createBook('make hummus')];
    }
    gBooks = books;
    gNextId = getNextId() + 1;
    saveBooksToStorage(BOOK_KEY, gBooks);
}


function createBookImages() {
    return ['book1.png', 'book2.png', 'book3.png', 'book4.png', 'book5.png', 'book6.png'];
}

function getNextId() {
    var max = -Infinity;
    gBooks.forEach(function (book) {
        if (book.id > max) max = book.id;
    })
    return max;
}

function getBooksToShow() {
    var startIdx = booksInPageCount * gCurrPage;
    return gBooks.slice(startIdx, startIdx + booksInPageCount);
    // return gBooks;
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    });
    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1);
    saveBooksToStorage(BOOK_KEY, gBooks);
}


function addBook(title, price, url) {
    if (!title) return;
    if (!url) url = gBooksImg[getRandomInt(0, 5)]
    if (!price) price = 20;
    var book = createBook(title, price, url);
    gBooks.unshift(book);
    saveBooksToStorage(BOOK_KEY, gBooks);
}


function updateBook(bookId, price) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    if (!book) return;
    book.price = price;
    saveBooksToStorage(BOOK_KEY, gBooks);
}

function getBookDetails(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    return book.details;
}

function updateRating(bookId, diff) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    });
    var rate = book.details.rate;
    rate += diff;
    if (rate < 0) rate = 0;
    if (rate > 10) rate = 10;

    book.details.rate = rate;

    saveBooksToStorage(BOOK_KEY, gBooks);
    return rate;
}



function sortBooks() {
    gSortByName = !gSortByName;
    if (gSortByName) {
        gBooks.sort(function (book1, book2) {
            if (book1.name.toUpperCase() < book2.name.toUpperCase()) return -1;
            if (book1.name.toUpperCase() > book2.name.toUpperCase()) return 1;
            return 0;
        })
    }
    else {
        gBooks.sort(function (book1, book2) {
            return book1.price - book2.price;
        })
    }

}


function nextPage(diff) {
    if (gCurrPage + diff < 0) gCurrPage = 0;
    else if ((gCurrPage + diff) > (gBooks.length / booksInPageCount)) gCurrPage = parseInt((gBooks.length / booksInPageCount))
    else gCurrPage += diff;
}




function saveBooksToStorage(BOOK_KEY, gBooks) {
    localStorage.setItem(BOOK_KEY, JSON.stringify(gBooks));
}
function loadBooksFromStorage(BOOK_KEY) {
    var str = localStorage.getItem(BOOK_KEY);
    var value = JSON.parse(str)
    return value;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}