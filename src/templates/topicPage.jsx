import React from 'react';
import { graphql } from 'gatsby';
import TopicLayout from '../components/topicLayout';
import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Side, Full, FlashCards } from '../components/Notes';
import { Section, TableOfContent, TableOfContentSectionList, Content } from '../components/styles/styles';
import Topic from '../../content/topic.mdx';

const Question = ({ children }) => <MDXRenderer>{children}</MDXRenderer>;

const TopicPage = ({ data, ...props }) => {
	console.log(data);
	const tableOfContent = data.topic.book.getTableOfContent;
	const currentIndex = tableOfContent.findIndex((node) => node.id === data.topic.id);
	const nextIndex =
		currentIndex !== -1
			? currentIndex + 1 < tableOfContent.length ? data.topic.book.getTableOfContent[currentIndex + 1] : null
			: null;
	const prevIndex = currentIndex !== 0 ? data.topic.book.getTableOfContent[currentIndex - 1] : null;
	return (
		<TopicLayout
			topics={data.topic.chapter.topics}
			chapterPath={data.topic.chapter.path}
			chapterNumber={data.topic.chapter.number}
			chapterTitle={data.topic.chapter.title}
			bookPath={data.topic.book.path}
			colNumber={data.topic.chapter.colNumber}
			next={nextIndex}
			prev={prevIndex}
		>
			<Content>
				<h1>{data.topic.title}</h1>
				<MDXRenderer components={{ Question }}>{data.topic.body}</MDXRenderer>
			</Content>
		</TopicLayout>
	);
};

export default TopicPage;

export const pageQuery = graphql`
	query TopicPageQuery($id: String) {
		topic(id: { eq: $id }) {
			id
			title
			slug
			number
			body
			chapter {
				id
				title
				number
				path
				colNumber
				topics {
					id
					title
					path
				}
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
