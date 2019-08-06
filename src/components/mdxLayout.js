import React from 'react';
import { ModalProvider } from './Modal/Modal';
import styled from '@emotion/styled';
import 'katex/dist/katex.min.css';

export default ({ children }) => <ModalProvider>{children}</ModalProvider>;

const Content = styled(`div`)`


  .gatsby-highlight {
    max-height: 30rem;
    overflow-y: auto;
    border-radius: 0.2rem;
    margin: 3rem 0;

    pre {
      margin: 0;
      padding: 1rem 1.5rem;
    }

    /* width */
    &::-webkit-scrollbar {
      width: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #222;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #666;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #999;
    }
  }
`;
