import styled from 'styled-components';

export const Container = styled.div`
    width: 300px;
    min-height: 200px;
`;

export const BoxPrimary = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;

    .select {
        flex: 1;
        margin-right: 15px;
    }
`;

export const SeparatePrimary = styled.div`
    display: inline-block;
    width: 10px;
`;

export const TimeView = styled.div`
    padding: 0 20px 20px 20px;
    text-align: center;
    font-size: 100px;
    line-height: 1;
`;
