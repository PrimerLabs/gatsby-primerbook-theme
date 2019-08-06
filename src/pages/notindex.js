/** @jsx jsx */
import { jsx } from 'theme-ui';
import Layout from '../components/layout';
import faker from 'faker';
import { Link } from 'gatsby';

//
// ─── TYPES OF PAGES ─────────────────────────────────────────────────────────────
//

/*
				1. Chapter Name
					- Topic
					- Exericises
					- Exercise File
				2. Single Pages Before Chapters
				3. Single Pages After Chapters
				4. Special Pages
					1. Glossary
					2. Source Codes
					3. Equations
				5. Question Pool
	*/

const sectionStyle = {
	fontFamily: 'Open Sans',
	fontVariant: 'all-small-caps'
};

const sectionTopicStyle = {
	paddingLeft: [ 1, 2, 4 ],
	columnCount: [ 1, 2, 2 ],
	fontFamily: 'Crimson Text'
};

const Section = ({ children }) => <h3 style={sectionStyle}>{children}</h3>;

const TOCStyle = ({ children }) => <div sx={{ width: [ '100%', '100%', '85%' ], padding: '20px' }}>{children}</div>;

const BookHome = () => (
	<Layout>
		<TOCStyle>
			<img src="https://source.unsplash.com/random/800x600" width="85%" />
			<Section>Why this book</Section>
			<Section>Grand new adventure</Section>
			<Section>Foreward</Section>
			<Section>Chapter 1 : Introduction</Section>
			<ol sx={sectionTopicStyle}>
				{[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map((elem) => (
					<li key={elem}>
						<Link to="/topic">{faker.lorem.words()}</Link>
					</li>
				))}
			</ol>
			<Section>Chapter 2 : {faker.lorem.sentence()}</Section>
			<ol sx={sectionTopicStyle}>
				{[ 1, 2, 3 ].map((elem) => (
					<li key={elem}>
						<Link to="/topic">{faker.lorem.words()}</Link>
					</li>
				))}
			</ol>
			<Section>Chapter 3: {faker.lorem.sentence()}</Section>
			<ol sx={sectionTopicStyle}>
				{[ 1, 2, 3, 4 ].map((elem) => (
					<li key={elem}>
						<Link to="/topic">{faker.lorem.words()}</Link>
					</li>
				))}
			</ol>
			<Section>Chapter 4: {faker.lorem.sentence()}</Section>
			<ol sx={sectionTopicStyle}>
				{[ 1, 2, 3, 4, 5 ].map((elem) => (
					<li key={elem}>
						<Link to="/topic">{faker.lorem.words()}</Link>
					</li>
				))}
			</ol>
			<Section>
				<Link to="/glossary">Glossary</Link>
			</Section>
			<Section>Equations</Section>
			<Section>Exercises</Section>
		</TOCStyle>
	</Layout>
);

export default BookHome;

// {[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map((elem) => {
// 	return (
// 		<React.Fragment key={elem}>
// 			<p>{faker.lorem.paragraphs()}</p>
// 			<p>{faker.lorem.paragraphs()}</p>
// 		</React.Fragment>
// 	);
// })}
// {
// 	/* <img src="https://source.unsplash.com/random/600x400" alt="Header Image" /> */
// }
