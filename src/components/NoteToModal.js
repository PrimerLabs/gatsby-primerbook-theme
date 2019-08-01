/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import React, { useContext, useRef } from 'react';
import styled from '@emotion/styled';
import { ModalContext } from './Modal/Modal';
import ModalA from '../../content/ModalA.mdx';
import ModalB from '../../content/ModalB.mdx';

const SideNote = styled(`div`)`
  width: 50%;
  padding-bottom: 1rem;
  float: ${(props) => (props.float === 'left' ? 'left' : 'right')};
  margin: ${(props) => (props.float === 'left' ? '0.5rem 3rem 2rem 0' : '0.5rem 0 2rem 3rem')};
  transition: all 0.5s;
  position: relative;
  cursor: pointer;
  display: block;
  padding: 1.75rem 2rem;
  :hover {
    transform: scale(1.01);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

const FullNote = styled(`div`)`
  width: 100%;
  background: orange;
  float: none;
  margin: 0;
  margin-top: 1rem
`;

const BoxA = styled(`div`)`
  padding: 1.75rem 2rem;
  cursor: pointer;
  transition: all 0.5s;
  position: relative;
  display: block;

  :hover {
    transform: scale(1.01);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.75rem;
    margin: 0;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.4;
    margin: 0;
  }
`;

const BoxB = styled(BoxA)`
  width: 100%;
  background: orange;
  float: none;
  margin: 0;
  margin-top: 1rem
`;

const boxes = {
	BoxA: { box: BoxA, bg: 'pink', modal: ModalA },
	BoxB: { box: BoxB, bg: 'orange', modal: ModalB }
};

export default ({ children, variant = 'A', subtitle = '', float = 'right' }) => {
	const { showModal } = useContext(ModalContext);
	const { colorMode, theme } = useThemeUI();
	const backgroundColor =
		colorMode === 'light' ? theme['colors']['background'] : theme['colors']['modes'][colorMode]['background'];
	const primaryColor =
		colorMode === 'light' ? theme['colors']['primary'] : theme['colors']['modes'][colorMode]['primary'];
	const originRef = useRef(null);
	const Box = boxes[`Box${variant}`].box;
	const bg = boxes[`Box${variant}`].bg;
	const Modal = boxes[`Box${variant}`].modal;
	if (variant === 'B') {
		return (
			<Box
				ref={originRef}
				float={float}
				style={{ background: bg }}
				onClick={() => {
					showModal({
						Component: Modal,
						props: {
							sourceRef: originRef.current,
							background: backgroundColor,
							textColor: primaryColor
						}
					});
				}}
			>
				{children}
				{subtitle !== '' ? <hr style={{ margin: 0 }} /> : ''}
			</Box>
		);
	}

	return (
		<SideNote
			onClick={() => {
				showModal({
					Component: Modal,
					props: {
						sourceRef: originRef.current,
						background: backgroundColor,
						textColor: primaryColor
					}
				});
			}}
		>
			<Box
				ref={originRef}
				float={float}
				sx={{
					backgroundColor: 'background'
				}}
				onClick={() => {
					showModal({
						Component: Modal,
						props: {
							sourceRef: originRef.current,
							background: bg,
							textColor: primaryColor
						}
					});
				}}
			>
				{children}
			</Box>
			<p style={{ textAlign: 'center', fontVariant: 'all-small-caps', letterSpacing: '1px' }}>{subtitle}</p>
		</SideNote>
	);
};
