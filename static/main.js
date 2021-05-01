//const rendered = Mustache.render(template, {});
let language = 'de'
let currentPath = []

const cardsWrapper = document.querySelector('.cards-wrapper')

function start (language) {
  console.log(language)
  showNextCard(language + '<br><button class="primary">test</button>')
}

function showNextCard (content) {
  let oldCard = cardsWrapper.lastElementChild
  const newCard = document.createElement('div')
  newCard.classList.add('card')
  newCard.innerHTML = content
  cardsWrapper.insertBefore(newCard, oldCard)
  oldCard.classList.add('offscreen')
  setTimeout(() => {
    cardsWrapper.removeChild(oldCard)
  }, 500)
}

function renderCard (path) {
  let currentData = data[language]
  path.forEach(item => {
    currentData = currentData.actions[item].data
  })
  const renderOpts = {
    title: currentData.title,
    text: currentData.text,
    actions: currentData.actions.map((a, i) => ({text: a.text, num: i}))
  }
  return Mustache.render(document.getElementById('tmpl-card-std').innerHTML, renderOpts)
}

function toggleLanguageMenu() {
  document.querySelector('.language-menu').classList.toggle('visible')
}

function setLanguage (lang) {
  language = lang
  document.querySelector('.language-menu').classList.remove('visible')
  showNextCard(renderCard(currentPath))
}

function action (num) {
  currentPath.push(num)
  showNextCard(renderCard(currentPath))
}

(function () {
  showNextCard(renderCard([]))
})()