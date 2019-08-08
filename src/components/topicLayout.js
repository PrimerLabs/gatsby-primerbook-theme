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

const TopicLayout = ({
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
	if (solo) {
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
										<Link to={bookPath} style={{ paddingTop: '10%' }}>
											Back to Home
										</Link>
										<TopicSidebarTitle>
											<ChapterTitle>{chapterTitle}</ChapterTitle>
										</TopicSidebarTitle>
										{next !== null ? next.type === 'CHAPTER_PAGE' ? (
											<SidebarLink to={next.path}>Next Chapter : {next.title}</SidebarLink>
										) : (
											<SidebarLink to={next.path}>Next : {next.title}</SidebarLink>
										) : (
											<p />
										)}
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
	}
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
									<Link to={bookPath} style={{ paddingTop: '10%' }}>
										Back to Home
									</Link>
									<TopicSidebarTitle>
										<ChapterNumber>
											<Link style={{ textDecoration: 'none' }} to={chapterPath}>
												Chapter {chapterNumber}
											</Link>
										</ChapterNumber>
										<ChapterTitle>{chapterTitle}</ChapterTitle>
										<SidebarTopicList columns={colNumber}>
											{topics.map((topic) => (
												<TopicListItem
													key={topic.id}
													topic={topic}
													bookPath={bookPath}
													chapterPath={chapterPath}
												/>
											))}
										</SidebarTopicList>
									</TopicSidebarTitle>
									{next !== null ? next.type === 'CHAPTER_PAGE' ? (
										<SidebarLink to={next.path}>Next Chapter : {next.title}</SidebarLink>
									) : (
										<SidebarLink to={next.path}>Next : {next.title}</SidebarLink>
									) : (
										<p />
									)}
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

export default TopicLayout;
