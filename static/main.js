const template = document.getElementById('tmpl-card-picklng').innerHTML;
const rendered = Mustache.render(template, {});

const cardsWrapper = document.querySelector('.cards-wrapper')

function start (language) {
  console.log(language)
  showNextCard(language + '<br><button class="primary">test</button>')
}

function showNextCard (content) {
  let oldCard = cardsWrapper.childElementCount > 1 ? cardsWrapper.lastChild : null
  const newCard = document.createElement('div')
  newCard.classList.add('card')
  newCard.innerHTML = content
  if (oldCard) {
    cardsWrapper.insertBefore(newCard, oldCard)
    oldCard.classList.add('offscreen')
    setTimeout(() => {
      cardsWrapper.removeChild(oldCard)
    }, 500)
  } else
    cardsWrapper.appendChild(newCard)
}

showNextCard(rendered)