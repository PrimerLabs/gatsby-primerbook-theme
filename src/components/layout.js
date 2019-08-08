import React from 'react';
import { Layout as ThemeLayout, Main } from 'theme-ui';
import {
	Sidebar,
	BookTitle,
	BookSubTitle,
	Container,
	BookAuthor,
	Divider,
	ThemeButton,
	MainTitle
} from './styles/styles';
import { ModalProvider } from './Modal/Modal';
// import Sidebar from './sidebar';

const Layout = ({ children, book }) => {
	return (
		<ThemeLayout>
			<ModalProvider>
				<Main>
					<Sidebar visible={true}>
						<MainTitle>
							<BookTitle>{book.name}</BookTitle>
							<BookSubTitle>{book.subtitle}</BookSubTitle>
							<BookAuthor>{book.author}</BookAuthor>
						</MainTitle>
						<ThemeButton />
					</Sidebar>
					<Divider />

					<Container>{children}</Container>
				</Main>
			</ModalProvider>
		</ThemeLayout>
	);
};

export default Layout;
