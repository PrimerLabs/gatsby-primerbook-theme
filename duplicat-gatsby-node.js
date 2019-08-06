const fs = require('fs-extra');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const uuid = require('uuid');
const crypto = require('crypto');

// These are customizable theme options we only need to check once
let basePath;
let contentPath;

const defaultOptions = {
	contentPath: 'books',
	books: [
		{
			name: 'Machine Learning',
			index: false
		},
		{
			name: 'Logistic Regression',
			index: false
		}
	],
	autoGenerate: true
};

const slugify = (str) => {
	const slug = str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
	return slug;
};
// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
	options = defaultOptions;
	const contentPath = options.contentPath || 'books';

	if (!fs.existsSync(contentPath)) {
		reporter.info(`creating the ${contentPath} directory`);
		fs.mkdirSync(contentPath);
		options.books.forEach((book) => {
			const bookPath = `${contentPath}/${slugify(book.name)}`;
			if (!fs.existsSync(bookPath)) {
				reporter.info(`creating the ${bookPath} directory`);
				fs.mkdirSync(bookPath);

				// Copying Example Content
				try {
					fs.copySync('src/example', bookPath);
					reporter.info(`Copied the example book to ${bookPath} directory`);
				} catch (err) {
					reporter.info(`Error copying example book to ${bookPath} directory`);
					console.log(err);
				}
			}
		});
	} else {
		options.books.forEach((book) => {
			const bookPath = `${contentPath}/${slugify(book.name)}`;
			if (!fs.existsSync(bookPath)) {
				reporter.info(`creating the ${bookPath} directory`);
				fs.mkdirSync(bookPath);
			}
		});
	}
};

// exports.sourceNodes = ({ actions, createNodeId, createContentDigest }, options) => {
// 	options = defaultOptions;
// 	const { createNode } = actions;

// 	options.books.forEach((book) => {
// 		const bookData = {
// 			name: book.name,
// 			slug: slugify(book.name),
// 			index: book.index ? book.index : false,
// 			type: 'Book'
// 		};

// 		const nodeContent = JSON.stringify(bookData);

// 		const nodeMeta = {
// 			id: createNodeId(`book-${bookData.name}`),
// 			parent: null,
// 			children: [],
// 			internal: {
// 				type: `Book`,
// 				mediaType: `text/markdown`,
// 				content: nodeContent,
// 				contentDigest: createContentDigest(bookData)
// 			}
// 		};

// 		const node = { ...bookData, ...nodeMeta };
// 		createNode(node);
// 		console.log(`Created book node for ${book.name}`);
// 	});
// };

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;
	const typeDefs = `
	type MdxFrontmatter @infer {
	  author: String
	  top: Boolean
	  slug: String
	}

	type Book implements Node {
		id: ID!
		name: String
		slug: String
		index: Boolean
		chapters: [Chapter]
		
	}

	type SoloPage implements Node {
		id: ID!
		name: String
		slug: String
		top: Boolean
		content: Mdx
		book: Book
	}

	type Chapter implements Node {
		id: ID!
		name: String
		slug: String
		topics: [Topic]
		content: Mdx 
		book: Book
	}

	type Topic implements Node {
		id: ID!
		name: String
		slug: String
		cards: [Card]
		content: Mdx
		chapter: Chapter
		book: Book
	}

	type Card implements Node {
		id: ID!
		content: Card
		topic: Topic
	}
  
	type Mdx implements Node @infer {
	  frontmatter: MdxFrontmatter
	}
	`;
	createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers, schema }) => {
	createResolvers({
		Query: {
			allBook: {
				type: `Book`,
				resolve(source, args, context, info) {
					console.log('Running');
					return { id: 1 };
				}
			}
		}
	});
};

// // // Define resolvers for custom fields
// exports.createResolvers = ({ createResolvers }, options) => {
// 	const basePath = options.basePath || '/';
// 	// Quick-and-dirty helper to convert strings into URL-friendly slugs.
// 	const slugify = (str) => {
// 		const slug = str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
// 		return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
// 	};
// 	createResolvers({
// 		Book: {
// 			slug: {
// 				resolve: (source) => {
// 					console.log(source);
// 					return slugify(source.name);
// 				}
// 			}
// 		}
// 	});
// };

const SOLO_PAGE = 'SOLO_PAGE';
const TOPIC_PAGE = 'TOPIC_PAGE';
const CHAPTER_PAGE = 'CHAPTER_PAGE';
const CARD_PAGE = 'CARD_PAGE';
const PAGE_ARRAY = [ SOLO_PAGE, TOPIC_PAGE, CHAPTER_PAGE, CARD_PAGE ];

// const getPageDetail = (node, bookSlugs) => {
// 	const pathArray = node.relativePath.split('/').filter((elem) => elem !== '');

// 	// Identify the Type of Page

// 	/*
// 			Types
// 				1. Chapter
// 					relPath: ["book-slug/chapter-{1}/index.mdx"]
// 				2. Topic
// 					relPath: ["book-slug"/chapter-{1}/topic-{1}.mdx]
// 				3. Solo Page
// 					relPath: ["book-slug"/abx.mdx]
// 				4. Cards
// 					relPath: ["book-slug"/chapter-1/cards/card1.mdx]

// 			Method:
// 				Add Fields {

// 				}

// 		*/

// 	if (bookSlugs.include(pathArray[0])) {
// 		if (pathArray.length === 2) {
// 			// Check if its a Solo Page
// 			return {
// 				type: SOLO_PAGE,
// 				book: pathArray[0]
// 			};
// 		} else if (pathArray.length === 3) {
// 			// Check if its a Chapter Index Page
// 			if (pathArray[1].match(/^chapter-(\d+)$/) !== null && pathArray[2] === 'index.mdx') {
// 				return {
// 					type: CHAPTER_PAGE,
// 					book: pathArray[0],
// 					chapterNumber: pathArray[1].match(/^chapter-(\d+)$/)[1]
// 				};
// 			} else if (pathArray[1].match(/^chapter-(\d+)$/) !== null && pathArray[2].match(/^topic-(\d+)$/) !== null) {
// 				// Check if its a Topic Page
// 				return {
// 					type: TOPIC_PAGE,
// 					book: pathArray[0],
// 					chapterNumber: pathArray[1].match(/^chapter-(\d+)$/)[1],
// 					topicNumber: pathArray[2].match(/^topic-(\d+)$/)[1]
// 				};
// 			}
// 		} else if (pathArray.length === 4) {
// 			// Check if its a Card Page
// 			if (
// 				pathArray[1].match(/^chapter-(\d+)$/) !== null &&
// 				pathArray[2].match(/^topic-(\d+)$/) !== null &&
// 				pathArray[3] === 'cards' &&
// 				pathArray[3].match(/^card-(\d+)$/) !== null
// 			) {
// 				return {
// 					type: CARD_PAGE,
// 					book: pathArray[0],
// 					chapterNumber: pathArray[1].match(/^chapter-(\d+)$/)[1],
// 					topicNumber: pathArray[2].match(/^topic-(\d+)$/),
// 					cardNumber: pathArray[3].match(/^card-(\d+)$/)
// 				};
// 			}
// 		} else {
// 			return {
// 				type: 'Page'
// 			};
// 		}
// 	}
// };

// exports.onCreateNode = ({ node, actions, getNode }, options) => {
// 	options = defaultOptions;
// 	const { createNodeField } = actions;
// 	const fileNode = getNode(node.parent);
// 	const books = options.books.map((book) => ({ ...book, slug: slugify(book.name) }));
// 	const bookSlugs = books.map((book) => book.slug);
// 	if (_.get(node, 'internal.type') === `Mdx` && fileNode.sourceInstanceName === 'books') {
// 		/*
// 			1. First Identify the Type
// 				A. SoloPage
// 				B. Chapter Page
// 				C. Topic Page
// 				D. Card Page
// 				E. All Page
// 			2. Provide Fields For A-D
// 				1. Book Name
// 					- From Slugs
// 				2. Chapter Name
// 					- Find Chapter Index Node and get the Front Matter
// 				3. Topic Name
// 					- Find the Topic Page Node and get the Front Matter
// 			3. Figure out what to return to which page
// 				A. SoloPage
// 					a. Book Name
// 				B. Chapter Page
// 					a. Book Name
// 					b. Chapter Name
// 				C. Topic Page
// 				D. Card Page
// 		*/
// 		const details = getPageDetail(node, bookSlugs);
// 		if (PAGE_ARRAY.includes(details.type)) {
// 			createNodeField({
// 				node,
// 				name: 'book',
// 				value: books.find((elem) => slug === details.book).name
// 			});
// 			createNodeField({
// 				node,
// 				name: 'bookSlug',
// 				value: details.book
// 			});
// 			createNodeField({
// 				node,
// 				name: 'bookSlug',
// 				value: details.book
// 			});

// 			if (details.type === SOLO_PAGE) {
// 				/*
// 					1. Add Location
// 					2. Add
// 				*/
// 				createNodeField({
// 					node,
// 					name: 'location',
// 					value: location
// 				});
// 			}

// 			if (details.type === CHAPTER_PAGE) {
// 			} else {
// 			}
// 		}
// 	}
// };

// https://github.com/gatsbyjs/gatsby/issues/6764
exports.onCreateNode = ({ node, actions, getNode }, options) => {
	options = defaultOptions;
	const { createNodeField } = actions;
	const fileNode = getNode(node.parent);

	if (_.get(node, 'internal.type') === `Mdx` && fileNode.sourceInstanceName === 'books') {
		// Get the parent node
		const parent = getNode(_.get(node, 'parent'));
		const collection = _.get(parent, 'sourceInstanceName');
		// console.log(fileNode.relativePath);
		// console.log(fileNode);

		const nodePath = createFilePath({ node, getNode });

		if (nodePath && collection === options.contentPath) {
			const splitPath = nodePath.split('/').filter((elem) => elem !== '');
			const type = splitPath[splitPath.length - 1].includes('chapter')
				? 'chapter'
				: splitPath[splitPath.length - 1].includes('topic') ? 'topic' : null;
			const chapterNumber =
				type === 'topic'
					? splitPath[splitPath.length - 2].match(/^chapter-(\d+)$/)
					: type === 'chapter' ? splitPath[splitPath.length - 1].match(/^chapter-(\d+)$/) : null;
			const topicNumber = type === 'topic' ? splitPath[splitPath.length - 1].match(/^topic-(\d+)$/) : null;
			const bookSlug = splitPath[0] || '';
			createNodeField({
				node,
				name: 'chapterNumber',
				value: chapterNumber !== null ? chapterNumber[1] : null
			});

			createNodeField({
				node,
				name: 'topicNumber',
				value: topicNumber !== null ? topicNumber[1] : null
			});
			createNodeField({
				node,
				name: 'type',
				value: type
			});
		}

		const { slug, title } = node.frontmatter;
		const postPath = slug || _.kebabCase(title);

		createNodeField({
			node,
			name: 'slug',
			getter: (node) => node.frontmatter.slug, // eslint-disable-line no-shadow
			value: postPath
		});

		createNodeField({
			node,
			name: 'url',
			value: postPath
		});
		createNodeField({
			node,
			name: 'path',
			value: nodePath
		});
	}
};

// // Define the "Event" type
// exports.sourceNodes = ({ actions }, props) => {
// 	actions.createTypes(`
//       type Event implements Node @dontInfer {
//         id: ID!
//         name: String!
//         location: String!
//         startDate: Date! @dateformat @proxy(from: "start_date")
//         endDate: Date! @dateformat @proxy(from: "end_date")
//         url: String!
//         slug: String!
//       }
//     `);
// };

// query for events and create pages
// exports.createPages = async ({ actions, graphql, reporter }, options) => {
// 	// 	const basePath = options.basePath || '/events';
// 	// 	// console.log(basePath);
// 	// 	// actions.createPage({
// 	// 	// 	path: basePath,
// 	// 	// 	component: require.resolve('./src/templates/events.js')
// 	// 	// });
// 	// 	const result = await graphql(`
// 	//   query {
// 	//     allEvent(sort: { fields: startDate, order: ASC }) {
// 	//       nodes {
// 	//         id
// 	//         slug
// 	//       }
// 	//     }
// 	//   }
// 	// `);
// 	// 	if (result.errors) {
// 	// 		reporter.panic('error loading events', result.errors);
// 	// 		return;
// 	// 	}
// 	// 	const events = result.data.allEvent.nodes;
// 	// 	events.forEach((event) => {
// 	// 		const slug = event.slug;
// 	// 		actions.createPage({
// 	// 			path: slug,
// 	// 			component: require.resolve('./src/templates/event.js'),
// 	// 			context: {
// 	// 				eventID: event.id
// 	// 			}
// 	// 		});
// 	// 	});
// };
