import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import faker from 'faker';
import { Link as UnStyledLink } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Section, TableOfContent, TableOfContentSectionList } from '../components/styles/styles';

const Link = (props) => (
	<UnStyledLink style={{ textDecoration: 'none' }} {...props}>
		{props.children}
	</UnStyledLink>
);

const FrontPage = ({ data, ...rest }) => {
	const book = data.book;
	const topPages = book.pages.filter((page) => page.top === true).sort((a, b) => a.serial - b.serial);
	const bottomPages = book.pages.filter((page) => page.top !== true).sort((a, b) => a.serial - b.serial);
	const chapters = book.chapters;

	return (
		<Layout>
			<TableOfContent>
				{topPages.map((page) => (
					<Section key={page.id}>
						<Link to={page.path}>{page.title}</Link>
					</Section>
				))}

				{chapters.map((chapter) => (
					<React.Fragment key={chapter.id}>
						<Section key={chapter.id}>
							<Link to={chapter.path}>
								Chapter {chapter.number} : {chapter.title}
							</Link>
						</Section>
						{chapter.topics.length !== 0 && (
							<TableOfContentSectionList colNumber={chapter.colNumber}>
								{chapter.topics.map((topic) => (
									<li style={{ textDecoration: 'none' }} key={topic.id}>
										<Link to={topic.path}>{topic.title}</Link>
									</li>
								))}
							</TableOfContentSectionList>
						)}
					</React.Fragment>
				))}

				{bottomPages.map((page) => (
					<Section key={page.id}>
						<Link to={page.path}>{page.title}</Link>
					</Section>
				))}
			</TableOfContent>
		</Layout>
	);
};

export default FrontPage;

export const pageQuery = graphql`
	query FrontPageQuery($slug: String) {
		book(slug: { eq: $slug }) {
			id
			name
			path
			slug
			pages {
				id
				title
				path
				slug
				top
				serial
			}
			chapters {
				id
				title
				slug
				path
				number
				colNumber
				topics {
					id
					path
					title
					slug
				}
			}
		}
	}
`;
