import React, { useState } from 'react';
import { Layout as ThemeLayout, Main } from 'theme-ui';
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
	Container
} from './styles/styles';
import { FiMenu, FiX } from 'react-icons/fi';
const SidebarLinkStyle = {
	textDecoration: 'underline',
	fontFamily: 'Crimson Text ; serif'
};

const TopicLayout = ({ children }) => {
	const [ open, handleOpen ] = useState(true);
	return (
		<ThemeLayout>
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
								<Link to="/" style={SidebarLinkStyle}>
									Back to Home
								</Link>
								<div
									style={{
										textAlign: 'left'
									}}
								>
									<span
										style={{
											fontFamily: 'Quicksand',
											fontVariant: 'all-small-caps',
											fontWeight: '100'
										}}
									>
										Chapter 1
									</span>
									<ChapterTitle>Introduction</ChapterTitle>
									<SidebarTopicList columns={2}>
										{[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map((elem) => (
											<TopicListItem key={elem} listItem={elem} selected={4} />
										))}
									</SidebarTopicList>
								</div>
								<SidebarBottomButton>
									<Button>Next: {faker.lorem.words()} </Button>
								</SidebarBottomButton>
							</React.Fragment>
						}
					</Sidebar>
					<Divider />
					<Container expand={!open}>{children}</Container>
				</Main>
			</IconContext.Provider>
		</ThemeLayout>
	);
};

export default TopicLayout;
