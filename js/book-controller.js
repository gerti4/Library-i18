'use strict'


function onInit() {
    renderBooks();
}



function renderBooks() {
    var books = getBooksToShow();
    var strHTML = `<tr class="head-table" onclick="onSortBooks()"><td data-trans="id">${getTransKey('id')}</td><td data-trans="bookTitle">${getTransKey('bookTitle')}</td><td data-trans="price">${getTransKey('price')}</td><td></td><td data-trans="action">${getTransKey('action')}</td><td></td>`;
    for (var i = 0; i < books.length; i++) {
        strHTML += `<tr>`
        strHTML += `<td>${books[i].id}</td><td>${books[i].name}</td><td>${formatCurrency(books[i].price,books[i].currency)}</td>`;
        strHTML += `<td><button class="btn btn-primary" onclick="onReadBook(${books[i].id})" data-trans="read">${getTransKey('read')}</button></td>`
        strHTML += `<td><button class="btn btn-warning" onclick="readAndUpdateBook(${books[i].id})" data-trans="update">${getTransKey('update')}</button></td>`
        strHTML += `<td><button class="btn btn-danger" onclick="onDeleteBook(${books[i].id})" data-trans="delete">${getTransKey('delete')}</button></td>`
        strHTML += `</tr>`;
    }

    var elBooks = document.querySelector('tbody');
    elBooks.innerHTML = strHTML;
}



function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
    doTranslation();

}


function readAndAddNewBook() {
    var elPopup2 = document.querySelector('.popup2');
    elPopup2.style.display = 'initial';
    var elBg = document.querySelector('.bg');
    elBg.style.display = 'block';
}

function onAddBook() {
    var elBookName = document.querySelector('.name');
    var elBookPrice = document.querySelector('.price');
    var elBookUrl = document.querySelector('.url');
    var elPopup2 = document.querySelector('.popup2');
    var elBg = document.querySelector('.bg');
    elBg.style.display = 'none';
    


    var name = elBookName.value;
    var price = elBookPrice.value;
    var url = elBookUrl.value;

    elBookName.value = '';
    elBookPrice.value = '';
    elBookUrl.value = '';
    addBook(name, price, url);
    renderBooks();
    elPopup2.style.display = 'none';

}

function readAndUpdateBook(bookId) {
    var price = +prompt(getTransKey('prompt'));
    updateBook(bookId, price);
    renderBooks();
}


function onReadBook(bookId) {
    var details = getBookDetails(bookId)
    var elBg = document.querySelector('.bg');
    var elPopup = document.querySelector('.popup');
    var elImg = document.querySelector('img');
    var elRate = document.querySelector('.rate');
    elBg.style.display = 'block';
    elPopup.style.display = 'initial';
    elImg.src = `image/${details.img}`;
    elRate.innerHTML = `<button onclick="onRateBook(${bookId},-1)">-</button><span> ${details.rate} </span>
    <button onclick="onRateBook(${bookId},1)">+</button>`
}

function onFinishReading() {
    var elBg = document.querySelector('.bg');
    var elPopup = document.querySelector('.popup');
    elBg.style.display = 'none';
    elPopup.style.display = 'none';
}

function onRateBook(bookId, diff) {
    var rate = updateRating(bookId, diff);
    var elSpan = document.querySelector('span');
    elSpan.innerText = rate;
}

function onSortBooks() {
    sortBooks();
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'heb') {
        document.body.classList.add('rtl');
    }
    else {
        document.body.classList.remove('rtl');
    }
    doTranslation();
    renderBooks();
}

function onNextPage(elBtn) {
    var diff = +(elBtn.dataset.nav);
    nextPage(diff);
    renderBooks();
    
}