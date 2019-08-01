module.exports = [{
      plugin: require('/home/primer/Primer/Gatsby/Production/node_modules/gatsby-plugin-theme-ui/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/primer/Primer/Gatsby/Production/node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"extensions":[".mdx",".md",".mdxs"],"defaultLayouts":{"default":"/home/primer/Primer/Gatsby/Production/gatsby-primerbook-theme/src/components/mdxLayout.js"},"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-prismjs","options":{}},{"resolve":"gatsby-remark-images","options":{"maxWidth":1035,"sizeByPixelDensity":true}}],"remarkPlugins":[null,null]},
    },{
      plugin: require('/home/primer/Primer/Gatsby/Production/gatsby-primerbook-theme/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
