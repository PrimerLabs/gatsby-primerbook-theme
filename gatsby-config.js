const path = require(`path`);

// Default Option
const options = {
	contentPath: 'books',
	books: [
		{
			name: 'machine-learning',
			index: true
		},
		{
			name: 'logistic-regression'
		}
	]
};

module.exports = {
	plugins: [
		'gatsby-plugin-theme-ui',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'books',
				path: options.contentPath
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: 'content'
			}
		},

		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: [ '.mdx', '.md' ],
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
					},
					{
						resolve: `gatsby-remark-autolink-headers`,
						options: {
							offsetY: `100`,
							icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
							className: `anchor-link`,
							maintainCase: true,
							removeAccents: true
						}
					}
				],
				plugins: [ `gatsby-remark-images` ],
				remarkPlugins: [ require('remark-math'), require('remark-html-katex') ]
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/${options.contentPath}/images`
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
