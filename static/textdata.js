const ACTION_TYPE_BTN = 0
const ACTION_TYPE_PIC_BTN = 1
const ACTION_TYPE_MIX_BTN = 2

const data = {
  de: {
    title: "Willkommen",
    text: "Dieser Assistent hilft, Probleme mit heiconf oder Webex zu beheben. Falls keine geeignete Lösung zur Verfügung steht, ist eine Weiterleitung an das zuständige Technikteam der Veranstaltung möglich.",
    actions: [{
      type: ACTION_TYPE_BTN,
      text: "Weiter",
      data: {
        title: "Plattform",
        text: "Bitte die betroffene Plattform wählen",
        actions: [
          {
            type: ACTION_TYPE_MIX_BTN,
            text: "Cisco WebEx",
            img: "webex.png",
            data: {}
          },
          {
            type: ACTION_TYPE_MIX_BTN,
            text: "heiconf",
            img: "heiconf.png",
            data: {}
          }
        ]
      }
    }]
  },
  en: {

  }
}