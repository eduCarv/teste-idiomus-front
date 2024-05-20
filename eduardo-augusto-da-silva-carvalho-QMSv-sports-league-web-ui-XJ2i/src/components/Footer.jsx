import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
        <div className="footer">
            <p>API Version: 1.0</p>
        </div>
    </Container>
  );
}

const Container = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    color: #4B5C68;
    background-color: #F6F7F7;

    .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 2.5rem;
    }
`;
