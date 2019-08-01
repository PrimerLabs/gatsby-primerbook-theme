const path = require(`path`);

module.exports = {
	plugins: [
		'gatsby-plugin-theme-ui',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: 'content'
			}
		},

		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: [ '.mdx', '.md', '.mdxs' ],
				defaultLayouts: {
					default: require.resolve(`./src/components/mdxLayout.js`)
				},
				gatsbyRemarkPlugins: [
					{
						resolve: `gatsby-remark-prismjs`,
						options: {}
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 1035,
							sizeByPixelDensity: true
						}
					}
				],
				remarkPlugins: [ require('remark-math'), require('remark-html-katex') ]
			}
		},
		{
			resolve: `gatsby-plugin-page-creator`,
			options: {
				path: path.join(__dirname, `src/pages`)
			}
		},
		{
			resolve: `gatsby-plugin-prefetch-google-fonts`,
			options: {
				fonts: [
					{
						family: `Open Sans`,
						variants: [ `300`, `400`, `700` ]
					},
					{
						family: `Crimson Text`,
						variants: [ `400`, `600`, `700` ]
					},
					{
						family: `Quicksand`,
						variants: [ `300`, `400`, `700` ]
					}
				]
			}
		}
	]
};
