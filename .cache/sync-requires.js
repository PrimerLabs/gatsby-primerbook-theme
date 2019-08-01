const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/primer/Primer/Gatsby/Production/gatsby-primerbook-theme/.cache/dev-404-page.js"))),
  "component---src-pages-glossary-jsx": hot(preferDefault(require("/home/primer/Primer/Gatsby/Production/gatsby-primerbook-theme/src/pages/glossary.jsx"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/primer/Primer/Gatsby/Production/gatsby-primerbook-theme/src/pages/index.js"))),
  "component---src-pages-topic-js": hot(preferDefault(require("/home/primer/Primer/Gatsby/Production/gatsby-primerbook-theme/src/pages/topic.js")))
}

