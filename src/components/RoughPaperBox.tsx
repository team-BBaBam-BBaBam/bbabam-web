import { styled } from 'styled-components';

import RoughPaperImage from '../assets/svg/rough_paper.svg';

const RoughPaperBoxContainer = styled.div`
    width: 731px;
    height: 436px;
    position: relative;
    padding: 40px;
`;

const RoughPaperBoxBackground = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    position: absolute;
    top: 0;
    left: 0;
`;

const RoughPaperBoxContent = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

function RoughPaperBox({ children }: { children: React.ReactNode }) {
    return (
        <RoughPaperBoxContainer>
            <RoughPaperBoxBackground src={RoughPaperImage} />
            <RoughPaperBoxContent>{children}</RoughPaperBoxContent>
        </RoughPaperBoxContainer>
    );
}

export default RoughPaperBox;
