export const SOLO_PAGE = 'SOLO_PAGE';
export const TOPIC_PAGE = 'TOPIC_PAGE';
export const CHAPTER_PAGE = 'CHAPTER_PAGE';
export const CARD_PAGE = 'CARD_PAGE';
export const PAGE_ARRAY = [ SOLO_PAGE, TOPIC_PAGE, CHAPTER_PAGE, CARD_PAGE ];

export const getPageDetail = (node, bookSlugs) => {
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
					relPath: ["book-slug"/chapter-1/cards/card1.mdx]

			Method:
				Add Fields {

				}

		*/

	if (bookSlugs.include(pathArray[0])) {
		if (pathArray.length === 2) {
			// Check if its a Solo Page
			return {
				type: SOLO_PAGE,
				book: pathArray[0]
			};
		} else if (pathArray.length === 3) {
			// Check if its a Chapter Index Page
			if (pathArray[1].match(/^chapter-(\d+)$/) !== null && pathArray[2] === 'index.mdx') {
				return {
					type: CHAPTER_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)$/)[1]
				};
			} else if (pathArray[1].match(/^chapter-(\d+)$/) !== null && pathArray[2].match(/^topic-(\d+)$/) !== null) {
				// Check if its a Topic Page
				return {
					type: TOPIC_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)$/)[1],
					topicNumber: pathArray[2].match(/^topic-(\d+)$/)[1]
				};
			}
		} else if (pathArray.length === 4) {
			// Check if its a Card Page
			if (
				pathArray[1].match(/^chapter-(\d+)$/) !== null &&
				pathArray[2].match(/^topic-(\d+)$/) !== null &&
				pathArray[3] === 'cards' &&
				pathArray[3].match(/^card-(\d+)$/) !== null
			) {
				return {
					type: CARD_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)$/)[1],
					topicNumber: pathArray[2].match(/^topic-(\d+)$/),
					cardNumber: pathArray[3].match(/^card-(\d+)$/)
				};
			}
		} else {
			return {
				type: 'Page'
			};
		}
	}
};
