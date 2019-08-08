import React, { useState } from 'react';
import { Layout as ThemeLayout, Main } from 'theme-ui';
import { ModalProvider } from './Modal/Modal';
import faker from 'faker';
import { Link } from 'gatsby';
import { IconContext } from 'react-icons';
import {
	TopicListItem,
	Sidebar,
	ChapterTitle,
	SidebarTopicList,
	SidebarBottomButton,
	Button,
	Divider,
	IconButton,
	Container,
	SidebarLink,
	ChapterNumber,
	StyledButtonLink,
	TopicSidebarTitle
} from './styles/styles';
import { FiMenu, FiX } from 'react-icons/fi';
const SidebarLinkStyle = {
	textDecoration: 'underline',
	fontFamily: 'Crimson Text ; serif'
};

const QuestionLayout = ({
	children,
	topics,
	chapterTitle,
	chapterPath,
	chapterNumber,
	bookPath,
	solo,
	colNumber,
	next,
	prev,
	...rest
}) => {
	const [ open, handleOpen ] = useState(true);
	console.log(rest);
	return (
		<ThemeLayout>
			<ModalProvider>
				<IconContext.Provider value={{ size: '1.3em' }}>
					<Main>
						<div>
							<IconButton
								handleClick={() => {
									if (open) {
										handleOpen(false);
									} else {
										handleOpen(true);
									}
								}}
							>
								{open ? <FiX /> : <FiMenu />}
							</IconButton>{' '}
						</div>
						<Sidebar visible={open}>
							{
								<React.Fragment>
									<Link style={{ paddingTop: '10%' }} to={bookPath}>
										Back to Home
									</Link>
									<TopicSidebarTitle>
										<ChapterTitle>Question Pool</ChapterTitle>
									</TopicSidebarTitle>
									<div />
								</React.Fragment>
							}
						</Sidebar>
						<Divider />
						<Container expand={!open}>
							{children}
							<Divider />
							<div style={{ display: 'flex', justifyContent: 'space-around' }}>
								{prev !== null ? prev.type === 'CHAPTER_PAGE' ? (
									<StyledButtonLink to={prev.path}>Prev</StyledButtonLink>
								) : (
									<StyledButtonLink to={prev.path}>Prev</StyledButtonLink>
								) : (
									<p />
								)}
								{next !== null ? next.type === 'CHAPTER_PAGE' ? (
									<StyledButtonLink to={next.path}>Next</StyledButtonLink>
								) : (
									<StyledButtonLink to={next.path}>Next</StyledButtonLink>
								) : (
									<p />
								)}
							</div>
						</Container>
					</Main>
				</IconContext.Provider>
			</ModalProvider>
		</ThemeLayout>
	);
};

export default QuestionLayout;
