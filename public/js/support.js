let language = 'de'
let data = {}

function renderCard (path) {
  console.log(path)
  let currentData = data
  path.forEach(item => {
    currentData = currentData.data[item]
  })
  if (path.length > 0 && path[path.length-1] == -1) {
    return data[-1][language]
  }
  return currentData.card[language] || currentData.card['en']
}

function showCards () {
  const cardsWrapper = document.getElementById('cards-list')
  cardsWrapper.innerHTML = ""
  const path = document.getElementById('inp-code').value.split('-').map(i => parseInt(i)).concat([-1])
  const cards = path.map((_, i) => ({html: renderCard(path.slice(0,i)), clickedId: i < path.length ? path.slice(i,i+1) : -1}))
  cards.forEach(card => {
    const newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.innerHTML = card.html
    console.log(card)
    newCard.querySelector('*[data-actionid="'+card.clickedId+'"]').classList.add('highlighted')
    cardsWrapper.appendChild(newCard)
  })
  return false
}

function toggleLanguageMenu() {
  document.querySelector('.language-menu').classList.toggle('visible')
  if (document.querySelector('.language-menu').classList.contains('visible')) { //now visible
    document.querySelector('.language-picker .btn-menu').classList.add('opened')
  } else {
    document.querySelector('.language-picker .btn-menu').classList.remove('opened')
  }
}

function setLanguage (lang) {
  language = lang
  toggleLanguageMenu()
  showCards()
}

function action () {}

(function () {
  qwest.get('/templates.json', {}, {responseType: 'json'})
  .then((_, res) => {
    data = res
  })
})()