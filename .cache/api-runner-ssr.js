var plugins = [{
      plugin: require('/home/primer/Primer/Gatsby/Production/node_modules/gatsby-plugin-theme-ui/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/primer/Primer/Gatsby/Production/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"extensions":[".mdx",".md",".mdxs"],"defaultLayouts":{"default":"/home/primer/Primer/Gatsby/Production/gatsby-primerbook-theme/src/components/mdxLayout.js"},"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-prismjs","options":{}},{"resolve":"gatsby-remark-images","options":{"maxWidth":1035,"sizeByPixelDensity":true}}],"remarkPlugins":[null,null]},
    },{
      plugin: require('/home/primer/Primer/Gatsby/Production/node_modules/gatsby-plugin-prefetch-google-fonts/gatsby-ssr'),
      options: {"plugins":[],"fonts":[{"family":"Open Sans","variants":["300","400","700"]},{"family":"Crimson Text","variants":["400","600","700"]},{"family":"Quicksand","variants":["300","400","700"]}]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
