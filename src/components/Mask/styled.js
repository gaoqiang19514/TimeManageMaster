import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    z-index: 2147483647;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
`;

export const Btn = styled.button`
    font-size: 16px;
    font-weight: bold;
    padding: 3px 15px;
`;
