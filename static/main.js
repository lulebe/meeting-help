const template = document.getElementById('tmpl-card-picklng').innerHTML;
const rendered = Mustache.render(template, {});

const cardsWrapper = document.querySelector('.cards-wrapper')

if (cardsWrapper.childElementCount > 1) {
  cardsWrapper.removeChild(cardsWrapper.lastChild)
}
const newChild = document.createElement('div')
newChild.classList.add('card')
newChild.innerHTML = rendered
cardsWrapper.appendChild(newChild)

function start (language) {
  alert(language)
}