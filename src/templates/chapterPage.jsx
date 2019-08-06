import React from 'react';
import { graphql } from 'gatsby';
import TopicLayout from '../components/topicLayout';
import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Section, TableOfContent, TableOfContentSectionList, Content } from '../components/styles/styles';

const ChapterPage = ({ data }) => {
	const tableOfContent = data.chapter.book.getTableOfContent;
	const currentIndex = tableOfContent.findIndex((node) => node.id === data.chapter.id);
	const nextIndex =
		currentIndex !== -1
			? currentIndex + 1 < tableOfContent.length ? data.chapter.book.getTableOfContent[currentIndex + 1] : null
			: null;
	console.log(nextIndex);
	return (
		<TopicLayout
			topics={data.chapter.topics}
			chapterPath={data.chapter.path}
			chapterNumber={data.chapter.number}
			chapterTitle={data.chapter.title}
			bookPath={data.chapter.book.path}
			colNumber={data.chapter.colNumber}
			next={nextIndex}
		>
			<Content>
				<h1>{data.chapter.title}</h1>
				<MDXRenderer>{data.chapter.body}</MDXRenderer>
			</Content>
		</TopicLayout>
	);
};

export default ChapterPage;

export const pageQuery = graphql`
	query ChapterPageQuery($id: String) {
		chapter(id: { eq: $id }) {
			id
			title
			slug
			number
			body
			path
			colNumber
			topics {
				id
				title
				path
			}
			book {
				id
				path
				getTableOfContent {
					id
					title
					path
					type
				}
			}
		}
	}
`;
