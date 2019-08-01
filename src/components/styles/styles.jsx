/** @jsx jsx */
import { jsx } from 'theme-ui';
import styled from '@emotion/styled';
import faker from 'faker';
import { useColorMode } from 'theme-ui';

export const GlossaryList = ({ children }) => (
	<div sx={{ padding: 5, paddingTop: 0 }}>
		<h1>Glossary</h1>
		<ul>{children}</ul>
	</div>
);

export const Term = ({ name, children }) => (
	<li
		sx={{
			padding: 3
		}}
	>
		<span
			sx={{
				fontFamily: 'title',
				fontWeight: 'bolder'
			}}
		>
			{name}
		</span>{' '}
		<span
			sx={{
				fontFamily: 'subtitle',
				fontSize: 1
			}}
		>
			{children}
		</span>
	</li>
);

export const Container = (props) => (
	<div
		sx={{
			padding: 4,
			width: '100%',
			marginLeft: [ '0%', '0%', `${!props.expand ? '470px' : '0px'}` ]
		}}
	>
		{props.children}
	</div>
);

export const Sidebar = (props) => (
	<div
		sx={{
			backgroundColor: 'background',
			position: [ 'unset', 'unset', 'fixed' ],
			width: [ '100%', '100%', `${!props.visible ? '0px' : '450px'}` ],
			opacity: [ '1', '1', `${!props.visible ? '0' : '1'}` ],
			transform: [
				'translateX(0)',
				'translateX(0)',
				`${!props.visible ? 'translateX(-450px)' : 'translateX(0px)'}`
			],
			display: [ 'flex', 'flex', `${!props.visible ? 'flex' : 'flex'}` ],
			flexDirection: 'column',
			justifyContent: 'space-around',
			padding: 4,
			paddingTop: [ 4, 4, 6 ],
			height: '100vh',
			color: 'primary',
			transition: [ '1s', '1s', `transform 1s, opacity 1s, width 0s linear ${!props.visible ? '2s' : '0s'}` ],
			overflowY: 'auto',
			zIndex: '50'
		}}
	>
		{props.children}
	</div>
);

export const IconButton = (props) => (
	<button
		onClick={props.handleClick}
		sx={{
			backgroundColor: 'primary',
			color: 'background',
			display: [ 'none', 'none', 'flex' ],
			border: (theme) => `1px solid ${theme.colors.primary}`,
			padding: '10px',
			position: 'fixed',
			top: '20px',
			left: '20px',
			cursor: 'pointer',
			zIndex: '999'
		}}
	>
		{props.children}
	</button>
);

export const ThemeButton = (props) => {
	const [ colorMode, setColorMode ] = useColorMode();
	return (
		<header>
			<button
				onClick={(e) => {
					setColorMode(colorMode === 'light' ? 'dark' : 'light');
				}}
			>
				Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
			</button>
		</header>
	);
};

export const Divider = (props) => <hr sx={{ display: [ 'block', 'block', 'none' ] }} />;

export const BookTitle = (props) => (
	<h1
		sx={{
			title: 'title',
			color: 'primary',
			borderBottom: (theme) => `5px solid ${theme.colors.primary}`
		}}
	>
		{props.children}
	</h1>
);

export const BookSubTitle = (props) => (
	<h2
		className="subtitle"
		sx={{
			fontFamily: 'subtitle',
			color: 'primary',
			fontWeight: '100',
			marginTop: 1,
			fontSize: [ 3, 4, 5 ]
		}}
	>
		{props.children}
	</h2>
);

export const BookAuthor = (props) => (
	<p
		sx={{
			fontFamily: 'title',
			letterSpacing: '1px',
			fontSize: [ 3, 4, 5 ],
			fontVariant: 'all-small-caps',
			fontWeight: 'bold'
		}}
	>
		{props.children}
	</p>
);

export const ChapterTitle = (props) => (
	<h1
		sx={{
			fontFamily: 'title',
			color: 'primary',
			borderBottom: (theme) => `5px solid ${theme.colors.primary}`,
			marginTop: 0
		}}
	>
		{props.children}
	</h1>
);

export const SidebarTopicList = (props) => (
	<ol
		sx={{
			paddingLeft: 4,
			columnCount: [ 2, 2, `${props.columns}` ],
			fontFamily: 'body',
			listStylePosition: 'inside'
		}}
	>
		{props.children}
	</ol>
);

export const SidebarBottomButton = styled.div`
	display: flex;
	justify-content: space-around;
`;

export const Button = ({ children }) => (
	<button
		sx={{
			padding: 2,
			border: (theme) => `1px solid ${theme.colors.primary}`,
			color: 'background',
			backgroundColor: 'primary',
			cursor: 'pointer',
			fontFamily: 'body',
			fontSize: '2',
			borderRadius: 0,
			boxShadow: '3px 3px 5px 3px #888888'
		}}
	>
		{children}
	</button>
);

export const TopicListItem = ({ listItem, selected }) => (
	<li
		sx={{
			cursor: 'pointer',
			textDecoration: selected === listItem ? 'underline' : 'none',
			fontWeight: selected === listItem ? 'bolder' : 'normal'
		}}
		key={listItem}
	>
		{faker.lorem.words()}
	</li>
);
