import React from 'react';
import { Layout as ThemeLayout, Main } from 'theme-ui';
import { Sidebar, BookTitle, BookSubTitle, Container, BookAuthor, Divider, ThemeButton } from './styles/styles';
import { ModalProvider } from './Modal/Modal';
// import Sidebar from './sidebar';

const Layout = ({ children }) => {
	return (
		<ThemeLayout>
			<ModalProvider>
				<Main>
					<Sidebar visible={true}>
						<div
							style={{
								textAlign: 'right'
							}}
						>
							<BookTitle>MACHINE LEARNING & REGRESSION</BookTitle>
							<BookSubTitle> Teaching machines to think like humans </BookSubTitle>
							<BookAuthor>Primerlabs</BookAuthor>
							<ThemeButton />
						</div>
					</Sidebar>
					<Divider />

					<Container>{children}</Container>
				</Main>
			</ModalProvider>
		</ThemeLayout>
	);
};

export default Layout;
