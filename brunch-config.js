exports.config = {
  sourceMaps: false,
  paths: {
    public: './public',
    watched: ['scss', 'templates']
  },
  files: {
    stylesheets: {
      joinTo: 'style.css'
    }
  },
  plugins: {
    sass: {
      options: {
        includePaths: ['scss']
      }
    }
  },
  hooks: {
    onCompile () {
      compileTemplates()
    }
  }
}

const fs = require('fs')
const path = require('path')
const htmlmin = require('html-minifier').minify

function compileTemplates () {
  const startTime = (new Date()).getTime()
  const templates = compileTemplatesInFolder('./templates')
  templates[-1] = compileTemplatesInFolder('./templates/-1')
  fs.writeFileSync('./public/templates.json', JSON.stringify(templates))
  const duration = (new Date()).getTime() - startTime
  const d = new Date()
  const time = (""+d.getHours()).padStart(2, "0") + ":" + (""+d.getMinutes()).padStart(2, "0") + ":" + (""+d.getSeconds()).padStart(2, "0")
  console.info(time + ' - \x1b[32minfo\x1b[0m: %s', "compiled templates in " + duration + "ms.")
}

function compileTemplatesInFolder (dirPath) {
  const templates = {card: {}}
  const listing = fs.readdirSync(dirPath)
  listing
        .filter(item => fs.lstatSync(path.join(dirPath, item)).isFile())
        .filter(item => item.substr(-4) == 'html')
        .forEach(item => {
          const html = htmlmin(fs.readFileSync(path.join(dirPath, item), 'utf-8'), {
            removeAttributeQuotes: true,
            removeComments: true,
            removeAttributeQuotes: true,
            removeTagWhitespace: true
          })
          templates.card[item.split('.')[0]] = html
        })
  templates.data = listing
                          .filter(item => fs.lstatSync(path.join(dirPath, item)).isDirectory() && item != "-1")
                          .sort((a, b) => parseInt(path.basename(a)) - parseInt(path.basename(b)))
                          .map(item => compileTemplatesInFolder(path.join(dirPath, item)))
  return templates
}