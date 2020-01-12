




var gCurrLang = 'en';

var gTrans = {
    headTitle: {
        en: 'Book Shop',
        ger: 'Bücherladen',
        heb: 'חנות ספרים'
    },

    id: {
        en: 'ID',
        ger: 'ID',
        heb: 'מספר סידורי'
    },

    bookTitle: {
        en: 'Title',
        ger: 'Buchtitel',
        heb: 'שם הספר'
    },

    price: {
        en: 'Price',
        ger: 'Preis',
        heb: 'מחיר'
    },

    action: {
        en: 'Action',
        ger: 'Aktion',
        heb: 'פעולות נוספות'
    },

    read: {
        en: 'Read',
        ger: 'Lesen',
        heb: 'קרא עוד'
    },

    update: {
        en: 'Update',
        ger: 'Aufdatieren',
        heb: 'עדכן'
    },

    delete: {
        en: 'Delete',
        ger: 'Löschen',
        heb: 'מחק'
    },

    addNewBook: {
        en: 'Add new book',
        ger: 'Neues Buch hinzufügen',
        heb: 'הוסף ספר חדש'
    },

    placeholderName: {
        en: 'Enter book title',
        ger: 'Buchtitle eingeben',
        heb: 'שם הספר'

    },
    placeholderPrice: {
        en: 'Enter book price',
        ger: 'Buchpreis eingeben',
        heb: 'מחיר הספר'
    },
    placeholderUrl: {
        en: 'Enter url image',
        ger: 'Bild url eingeben',
        heb: 'כתובת לתמונה'
    },
    add: {
        en: 'Add',
        ger: 'Hinzufügen',
        heb: 'הוסף'
    },
    close: {
        en: 'Close',
        ger: 'Schlissen',
        heb: 'סגור'
    },
    prompt: {
        en: 'Enter new price',
        ger: 'Neu Preis eingeben',
        heb: 'הכנס מחיר חדש'
    },
    currency: {
        en: '$',
        ger: '€',
        heb: '₪'
    }
}


function setLang(lang) {
    gCurrLang = lang;
}


function doTranslation() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;
        var txt = getTransKey(transKey);
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}




function getTransKey(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKOWN';
    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans['en'];
    return txt;
}


function formatCurrency(price, currency) {
    var convertedPrice;
    switch (gCurrLang) {
        case 'en':
            if (currency === '₪') convertedPrice = price * 0.3
            else if (currency === '€') convertedPrice = price * 1.1;
            else convertedPrice = price;
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(convertedPrice);
        case 'ger':
            if (currency === '₪') convertedPrice = price * 0.25
            else if (currency === '$') convertedPrice = price * 0.9;
            else convertedPrice = price;
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(convertedPrice);
        case 'heb':
            if (currency === '€') convertedPrice = price * 3.9
            else if (currency === '$') convertedPrice = price * 3.5;
            else convertedPrice = price;
            return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(convertedPrice);
    }
}


