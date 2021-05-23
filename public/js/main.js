let language = 'de'
let currentPath = []
let data = {}

const cardsWrapper = document.querySelector('.cards-wrapper')

function setBackBtnVisibility () {
  const backBtn = document.querySelector('.back-btn')
  if (currentPath.length)
    backBtn.classList.add('visible')
  else
    backBtn.classList.remove('visible')
}

function back () {
  if (!currentPath.length) return
  currentPath.pop()
  const content = renderCard(currentPath)
  const oldCard = cardsWrapper.lastElementChild
  const newCard = document.createElement('div')
  newCard.classList.add('card', 'offscreen')
  newCard.innerHTML = content
  cardsWrapper.appendChild(newCard)
  setTimeout(() => {
    newCard.classList.remove('offscreen')
  }, 30)
  setTimeout(() => {
    cardsWrapper.removeChild(oldCard)
  }, 500)
  setBackBtnVisibility()
}

function showNextCard (content) {
  const oldCard = cardsWrapper.lastElementChild
  const newCard = document.createElement('div')
  newCard.classList.add('card')
  newCard.innerHTML = content
  cardsWrapper.insertBefore(newCard, oldCard)
  oldCard.classList.add('offscreen')
  setTimeout(() => {
    cardsWrapper.removeChild(oldCard)
  }, 500)
  setBackBtnVisibility()
}

function renderCard (path) {
  let currentData = data
  path.forEach(item => {
    currentData = currentData.data[item]
  })
  if (path.length > 0 && path[path.length-1] == -1) {
    return data[-1].card[language].replace('---PATHCODE---', path.slice(0,-1).join('-'))
  }
  return currentData.card[language] || currentData.card['en']
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
  const content = renderCard(currentPath)
  const oldCard = cardsWrapper.lastElementChild
  const newCard = document.createElement('div')
  newCard.classList.add('card', 'newlang')
  newCard.innerHTML = content
  cardsWrapper.insertBefore(newCard, oldCard)
  setTimeout(() => {
    oldCard.classList.add('oldlang')
    newCard.classList.remove('newlang')
  }, 30)
  setTimeout(() => {
    cardsWrapper.removeChild(oldCard)
  }, 500)
}

function action (num) {
  if (!pathExists(currentPath.concat([num]))) return
  currentPath.push(num)
  showNextCard(renderCard(currentPath))
}

function pathExists (path) {
  let currentData = data
  for (let i = 0; i < path.length; i++) {
    currentData = currentData.data[path[i]]
    if (!currentData && !(i == path.length-1 && path[i] == -1)) return false
  }
  return true
}

(function () {
  qwest.get('/templates.json', {}, {responseType: 'json'})
  .then((_, res) => {
    data = res
  })
  .then(() => {
    if (window.location.hash.length) {
      const hashPath = window.location.hash.substring(1).split('-')
      if (!pathExists(hashPath)) return
      currentPath = hashPath
    }
    showNextCard(renderCard(currentPath))
  })
})()


function hashHandler() {
  const hashPath = window.location.hash.substring(1).split('-')
  if (!pathExists(hashPath)) return
  currentPath = hashPath
  showNextCard(renderCard(currentPath))
}

window.addEventListener('hashchange', hashHandler, false)