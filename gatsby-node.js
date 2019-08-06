const fs = require('fs-extra');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const uuid = require('uuid');

Object.defineProperty(Array.prototype, 'flat', {
	value: function(depth = 1) {
		return this.reduce(function(flat, toFlatten) {
			return flat.concat(Array.isArray(toFlatten) && depth > 1 ? toFlatten.flat(depth - 1) : toFlatten);
		}, []);
	}
});

const defaultOptions = {
	contentPath: 'books',
	books: [
		{
			name: 'Machine Learning',
			index: true
		},
		{
			name: 'Logistic Regression',
			index: true
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

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;
	const typeDefs = `
	type MdxFrontmatter @infer {
		author: String
		top: Boolean
		slug: String
		colNumber: Int
	}

	type Book implements Node {
		id: ID!
		name: String
		slug: String
		path: String
		index: Boolean
		chapters: [Chapter] 
		pages: [SoloPage]
		cards: [Card]
		getTableOfContent: [Content]
	}

	type SoloPage implements Node {
		id: ID!
		title: String!
		slug: String
		path: String
		top: Boolean
		bookSlug: String
		serial: Int
		book: Book
		body: String!
	}

	type Chapter implements Node  {
		id: ID!
		title: String!
		slug: String!
		path: String
		bookSlug: String
		topics: [Topic]
		number: Int
		book: Book 
		cards: [Card]
		modals: [Modal]
		body: String!
		colNumber: Int
	}

	type Topic implements Node  {
		id: ID!
		title: String!
		slug: String
		path: String
		number: Int
		chapterNumber: Int
		chapter: Chapter
		book: Book
		body: String!
		colNumber: Int		
		
	}

	type Card implements Node {
		id: ID!
		number: Int
		bookSlug: String
		chapterNumber: Int
		chapter: Chapter
		body: String!
	}

	type Modal implements Node {
		id: ID!
		number: Int
		bookSlug: String
		chapterNumber: Int
		chapter: Chapter
		body: String!
	}
  
	type Mdx implements Node @infer {
	  frontmatter: MdxFrontmatter
	}

	type Content implements Node {
		title: String
		path: String
		id: ID!
		type: String
	}

	`;
	createTypes(typeDefs);
};

//
// ─── CREATE RESOLVERS ───────────────────────────────────────────────────────────
//

exports.createResolvers = ({ createResolvers, schema }) => {
	createResolvers({
		Chapter: {
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			},
			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					return resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
				}
			},
			path: {
				type: `String`,
				resolve(source, args, context, info) {
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;
					const book = context.nodeModel
						.getAllNodes({ type: `Book` })
						.find((book) => book.slug === source.bookSlug);

					const bookPath = indexBooks > 1 ? `${book.slug}/` : book.index === true ? '/' : `${book.slug}/`;
					const path = `/${bookPath}${source.slug}/`;
					return path;
				}
			},
			topics: {
				type: `[Topic]`,
				resolve(source, args, context, info) {
					const topics = context.nodeModel
						.getAllNodes({ type: `Topic` })
						.filter((topic) => topic.chapterNumber === source.number && topic.bookSlug === source.bookSlug)
						.sort((a, b) => a.number - b.number);
					return topics;
				}
			},
			cards: {
				type: `[Card]`,
				resolve(source, args, context, info) {
					const cards = context.nodeModel
						.getAllNodes({ type: `Card` })
						.filter((card) => card.chapterNumber === source.number && card.bookSlug === source.bookSlug)
						.sort((a, b) => a.number - b.number);
					return cards;
				}
			}
		},

		Book: {
			getTableOfContent: {
				type: `[Content]`,
				resolve(source, args, context, info) {
					// Generate Path Name
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;

					const book = context.nodeModel
						.getAllNodes({ type: `Book` })
						.find((book) => book.slug === source.slug);

					const bookPath = indexBooks > 1 ? `${source.slug}/` : book.index === true ? '/' : `${source.slug}/`;

					const path = `/${bookPath}${source.slug}/`;

					const topPages = context.nodeModel
						.getAllNodes({ type: 'SoloPage' })
						.filter((page) => page.bookSlug === source.slug)
						.filter((page) => page.top === true)
						.sort((a, b) => a.serial - b.serial)
						.map((page) => {
							let path = `/${bookPath}${page.slug}/`;
							return { id: page.id, title: page.title, type: SOLO_PAGE, path: path };
						});

					const chapters = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.filter((chapter) => chapter.bookSlug === source.slug)
						.sort((a, b) => a.number - b.number)
						.map((chapter) => {
							let path = `/${bookPath}${chapter.slug}/`;
							const chapterNode = {
								id: chapter.id,
								title: chapter.title,
								type: CHAPTER_PAGE,
								path: path
							};
							const topics = context.nodeModel
								.getAllNodes({ type: `Topic` })
								.filter(
									(topic) =>
										topic.chapterNumber === chapter.number && topic.bookSlug === chapter.bookSlug
								)
								.sort((a, b) => a.number - b.number);

							const topicNode = topics.map((topic) => {
								let path1 = `/${bookPath}${chapter.slug}/${topic.slug}/`;
								return {
									id: topic.id,
									title: topic.title,
									type: TOPIC_PAGE,
									path: path1
								};
							});

							return [ chapterNode, ...topicNode ];
						});
					const flattenedChapters = chapters.flat();

					const bottomPages = context.nodeModel
						.getAllNodes({ type: 'SoloPage' })
						.filter((page) => page.bookSlug === source.slug)
						.filter((page) => page.top === false)
						.sort((a, b) => a.serial - b.serial)
						.map((page) => {
							let path = `/${bookPath}${page.slug}/`;
							return { id: page.id, title: page.title, type: SOLO_PAGE, path: path };
						});

					const nodes = [ ...topPages, ...flattenedChapters, ...bottomPages ];
					return nodes;
				}
			},
			chapters: {
				type: `[Chapter]`,
				resolve(source, args, context, infor) {
					const chapters = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.filter((chapter) => chapter.bookSlug === source.slug)
						.sort((a, b) => a.number - b.number);
					return chapters;
				}
			},
			path: {
				type: `String`,
				resolve(source, args, context, info) {
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;
					const path = indexBooks > 1 ? `/${source.slug}/` : source.index === true ? '/' : `/${source.slug}/`;
					return path;
				}
			},
			cards: {
				type: `[Card]`,
				resolve(source, args, context, info) {
					const cards = context.nodeModel
						.getAllNodes({ type: `Card` })
						.filter((card) => card.bookSlug === source.slug);
					return cards;
				}
			},
			pages: {
				type: `[SoloPage]`,
				resolve(source, args, context, info) {
					const pages = context.nodeModel
						.getAllNodes({ type: `SoloPage` })
						.filter((page) => page.bookSlug === source.slug)
						.sort((a, b) => a.number - b.number);
					return pages;
				}
			}
		},
		Topic: {
			chapter: {
				type: `Chapter`,
				resolve(source, args, context, info) {
					const chapter = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.find(
							(chapter) => chapter.number === source.chapterNumber && chapter.bookSlug === source.bookSlug
						);
					return chapter;
				}
			},
			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					return resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
				}
			},
			path: {
				type: `String`,
				resolve(source, args, context, info) {
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;
					const book = context.nodeModel
						.getAllNodes({ type: `Book` })
						.find((book) => book.slug === source.bookSlug);
					const chapter = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.find(
							(chapter) => chapter.number === source.chapterNumber && chapter.bookSlug === source.bookSlug
						);
					const bookPath = indexBooks > 1 ? `${book.slug}/` : book.index === true ? '/' : `${book.slug}/`;
					const path = `/${bookPath}${chapter.slug}/${source.slug}/`;
					return path;
				}
			},
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			}
		},
		SoloPage: {
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			},

			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					return resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
				}
			},
			path: {
				type: `String`,
				resolve(source, args, context, info) {
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;
					const book = context.nodeModel
						.getAllNodes({ type: `Book` })
						.find((book) => book.slug === source.bookSlug);

					const bookPath = indexBooks > 1 ? `${book.slug}/` : book.index === true ? '/' : `${book.slug}/`;
					const path = `/${bookPath}${source.slug}/`;
					return path;
				}
			}
		},
		Card: {
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			},
			chapter: {
				type: `Chapter`,
				resolve(source, args, context, info) {
					const chapter = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.find((chapter) => chapter.number === source.chapterNumber);
					return chapter;
				}
			},
			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					return resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
				}
			}
		},
		Modal: {
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			},
			chapter: {
				type: `Chapter`,
				resolve(source, args, context, info) {
					const chapter = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.find((chapter) => chapter.number === source.chapterNumber);
					return chapter;
				}
			},
			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					const result = resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
					return result;
				}
			}
		}
	});
};

exports.sourceNodes = ({ actions, createNodeId, reporter, createContentDigest }, options) => {
	options = defaultOptions;
	const { createNode } = actions;
	// Create Book Nodes
	options.books.forEach((book) => {
		const bookData = {
			name: book.name,
			slug: slugify(book.name),
			index: book.index ? book.index : false,
			type: 'Book'
		};

		const nodeContent = JSON.stringify(bookData);
		const id = createNodeId(uuid());
		const nodeMeta = {
			id: id,
			parent: null,
			children: [],
			internal: {
				type: `Book`,
				mediaType: `text/json`,
				content: nodeContent,
				contentDigest: createContentDigest(bookData)
			}
		};

		const node = { ...bookData, ...nodeMeta };
		createNode(node);
		reporter.info(`Created Book node for ${book.name}`);
	});
};

//
// ─── ON CREATE NODE ─────────────────────────────────────────────────────────────
//
// gatsby-node.js

exports.onCreateNode = ({ node, actions, getNode, reporter, createNodeId, createContentDigest }, options) => {
	options = defaultOptions;
	const { createNodeField, createNode, createParentChildLink } = actions;
	const fileNode = getNode(node.parent);
	const books = options.books.map((book) => ({ ...book, slug: slugify(book.name) }));
	const bookSlugs = books.map((book) => book.slug);
	if (_.get(node, 'internal.type') === `Mdx` && fileNode.sourceInstanceName === 'books') {
		const details = getPageDetail(fileNode, bookSlugs);
		if (PAGE_ARRAY.includes(details.type)) {
			createNodeField({
				node,
				name: 'book',
				value: books.find((elem) => elem.slug === details.book)
			});
			createNodeField({
				node,
				name: 'type',
				value: details.type
			});
			if (details.type === CHAPTER_PAGE) {
				//
				// CREATE CHAPTER PAGE NODE
				//

				const { frontmatter } = node;
				const parent = getNode(node.parent);

				const fieldData = {
					title: frontmatter.title,
					slug: frontmatter.slug ? frontmatter.slug : slugify(frontmatter.title),
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					// topics:
					number: details.chapterNumber,
					colNumber: frontmatter.colNumber || 2
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Chapter`),
					parent: node.id,
					children: [],
					internal: {
						type: `Chapter`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Chapter Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
				reporter.info(`Created Chapter ${fieldData.title} Node`);
			} else if (details.type === TOPIC_PAGE) {
				//
				// CREATE TOPIC PAGE NODE
				//

				const { frontmatter } = node;
				const parent = getNode(node.parent);

				const fieldData = {
					title: frontmatter.title,
					slug: frontmatter.slug ? frontmatter.slug : slugify(frontmatter.title),
					number: details.topicNumber,
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					chapterNumber: details.chapterNumber,
					colNumber: frontmatter.colNumber || 2
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Topic`),
					parent: node.id,
					children: [],
					internal: {
						type: `Topic`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Topic Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
				reporter.info(`Created Topic ${fieldData.title} Node`);
			} else if (details.type === MODAL_PAGE) {
				//
				// CREATE MODAL PAGE NODE
				//

				const parent = getNode(node.parent);

				const fieldData = {
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					chapterNumber: details.chapterNumber,
					number: details.modalNumber
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Modal`),
					parent: node.id,
					children: [],
					internal: {
						type: `Modal`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Modal Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
				reporter.info(`Created Modal Node`);
			} else if (details.type === CARD_PAGE) {
				//
				// CREATE CARD PAGE NODE
				//

				const parent = getNode(node.parent);

				const fieldData = {
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					chapterNumber: details.chapterNumber,
					number: details.cardNumber
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Card`),
					parent: node.id,
					children: [],
					internal: {
						type: `Card`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Card Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
				reporter.info(`Created Card  Node`);
			} else if (details.type === SOLO_PAGE) {
				//
				// CREATE SOLO PAGE NODE
				//

				const { frontmatter } = node;
				const parent = getNode(node.parent);

				const fieldData = {
					title: frontmatter.title,
					slug: frontmatter.slug ? frontmatter.slug : slugify(frontmatter.title),
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					top: frontmatter.top === true ? true : false,
					serial: details.serial
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Solo`),
					parent: node.id,
					children: [],
					internal: {
						type: `SoloPage`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Solo Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
				reporter.info(`Created Solo ${fieldData.title} Node`);
			}
		}
	}
};

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

const PAGE = 'PAGE';
const SOLO_PAGE = 'SOLO_PAGE';
const TOPIC_PAGE = 'TOPIC_PAGE';
const CHAPTER_PAGE = 'CHAPTER_PAGE';
const CARD_PAGE = 'CARD_PAGE';
const MODAL_PAGE = 'MODAL_PAGE';
const PAGE_ARRAY = [ SOLO_PAGE, TOPIC_PAGE, CHAPTER_PAGE, CARD_PAGE, MODAL_PAGE ];

//
// ─── GET PAGE DETAIL ────────────────────────────────────────────────────────────
//

const getPageDetail = (node, bookSlugs) => {
	const pathArray = node.relativePath.split('/').filter((elem) => elem !== '');

	// Identify the Type of Page

	/*
			Types
				1. Chapter
					relPath: ["book-slug/chapter-{1}/index.mdx"]
				2. Topic
					relPath: ["book-slug"/chapter-{1}/topic-{1}.mdx]
				3. Solo Page
					relPath: ["book-slug"/abx.mdx]
				4. Cards
					relPath: [book-slug/chapter-1/cards/card1.mdx]
				5. Modal
					relPath: [book-slug/chapter-1/modals/modal1.mdx]
		
		*/

	if (bookSlugs.includes(pathArray[0])) {
		if (pathArray.length === 2) {
			if (pathArray[1].match(/^(\d+)-(.+)(.mdx?)$/) !== null) {
				return {
					type: SOLO_PAGE,
					book: pathArray[0],
					serial: pathArray[1].match(/^(\d+)-(.+)(.mdx?)$/)[1]
				};
			}
			// Check if its a Solo Page
			return {
				type: PAGE
			};
		} else if (pathArray.length === 3) {
			// Check if its a Chapter Index Page
			if (pathArray[1].match(/^chapter-(\d+)(-.+)?$/) !== null && pathArray[2] === 'index.mdx') {
				return {
					type: CHAPTER_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)(-.+)?$/)[1]
				};
			} else if (
				pathArray[1].match(/^chapter-(\d+)(-.+)?$/) !== null &&
				pathArray[2].match(/^topic-(\d+)(.+)?(.mdx?)$/) !== null
			) {
				// Check if its a Topic Page
				return {
					type: TOPIC_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)(-.+)?$/)[1],
					topicNumber: pathArray[2].match(/^topic-(\d+)(.+)?(.mdx?)$/)[1]
				};
			} else {
				return { type: PAGE };
			}
		} else if (pathArray.length === 4) {
			// Check if its a Card Page
			if (
				pathArray[1].match(/^chapter-(\d+)(-.+)?$/) !== null &&
				pathArray[2] === 'cards' &&
				pathArray[3].match(/^card(\d+)(.+)?(.mdx?)$/) !== null
			) {
				return {
					type: CARD_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)(-.+)?$/)[1],
					cardNumber: pathArray[3].match(/^card(\d+)(.+)?(.mdx?)$/)[1]
				};
			} else if (
				pathArray[1].match(/^chapter-(\d+)(-.+)?$/) !== null &&
				pathArray[2] === 'modals' &&
				pathArray[3].match(/^card(\d+)(.+)?(.mdx?)$/) !== null
			) {
				return {
					type: MODAL_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)(-.+)?$/)[1],
					modalNumber: pathArray[3].match(/^card(\d+)(.+)?(.mdx?)$/)[1]
				};
			} else {
				return { type: PAGE };
			}
		} else {
			return {
				type: 'Page'
			};
		}
	} else {
		return {
			type: 'Page'
		};
	}
};

//
// ─── CREATE BOOK PAGES ──────────────────────────────────────────────────────────
//

exports.createPages = async ({ actions, graphql, reporter }, options) => {
	options = defaultOptions;

	const indice = options.books.filter((book) => book.index === true).length;

	if (indice > 1) {
		reporter.info(`Multiple Index Books Defined !`);
		reporter.info(`Creating books at their own slugs`);
		// Creating books at their own slugs
		options.books.forEach((book) => {
			actions.createPage({
				path: slugify(book.name),
				component: require.resolve('./src/templates/frontPage.jsx'),
				context: { slug: slugify(book.name) }
			});
		});
	} else {
		options.books.forEach((book) => {
			// Creating an Index Book and other books at their respective slug
			actions.createPage({
				path: book.index ? '/' : slugify(book.name),
				component: require.resolve('./src/templates/frontPage.jsx'),
				context: { slug: slugify(book.name) }
			});
		});
	}

	// Query for All books content

	const result = await graphql(`
		query {
			allBook {
				edges {
				  node {
					  id
					  slug
					  name
					  index
					pages {
					  id
					  title
					  slug
					}
					chapters {
					  id
					  title
					  slug
					  topics {
						id
						title
						slug
					  }
					}
				  }
				}
			  }
		}`);

	if (result.errors) {
		reporter.panic('error loading events', reporter.errors);
		return;
	}

	const books = result.data.allBook.edges;

	books.forEach((book) => {
		const bookSlug = indice > 1 ? `${book.node.slug}/` : book.node.index ? '/' : `${book.node.slug}/`;
		// Create Chapter Page
		book.node.chapters.forEach((chapter) => {
			actions.createPage({
				path: `${bookSlug}${chapter.slug}`,
				component: require.resolve('./src/templates/chapterPage.jsx'),
				context: { id: chapter.id }
			});
			chapter.topics.forEach((topic) => {
				actions.createPage({
					path: `${bookSlug}${chapter.slug}/${topic.slug}`,
					component: require.resolve('./src/templates/topicPage.jsx'),
					context: { id: topic.id }
				});
			});
		});

		// Create Solo Page
		book.node.pages.forEach((page) => {
			actions.createPage({
				path: `${bookSlug}${page.slug}`,
				component: require.resolve('./src/templates/soloPage.jsx'),
				context: { id: page.id }
			});
		});
	});
};
