import { styled } from 'styled-components';

const ExplanationCardlistContainer = styled.div`
    width: 100%;
    margin-bottom: 18px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 22px;
`;

const ExplanationCardContainer = styled.div`
    flex: 1;
    height: 161px;

    display: flex;
    flex-direction: column;

    border-radius: 15px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 4px 16px 2px rgba(59, 138, 182, 0.08);
    backdrop-filter: blur(7px);
`;

function ExplanationCardlist() {
    return (
        <ExplanationCardlistContainer>
            <ExplanationCardContainer />
            <ExplanationCardContainer />
            <ExplanationCardContainer />
        </ExplanationCardlistContainer>
    );
}

export default ExplanationCardlist;
