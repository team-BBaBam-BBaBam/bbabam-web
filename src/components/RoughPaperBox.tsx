import { styled } from 'styled-components';

import RoughPaperImage from '../assets/svg/rough_paper.svg';
import SmallRoughPaperImage from '../assets/svg/rough_paper_small.svg';

const RoughPaperBoxContainer = styled.div<{
    small?: boolean;
}>`
    width: ${(props) => (props.small ? '872px' : '731px')};
    height: ${(props) => (props.small ? '160px' : '436px')};
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

function RoughPaperBox({
    small = false,
    children,
}: {
    small?: boolean;
    children: React.ReactNode;
}) {
    return (
        <RoughPaperBoxContainer small={small}>
            <RoughPaperBoxBackground
                src={small ? SmallRoughPaperImage : RoughPaperImage}
            />
            <RoughPaperBoxContent>{children}</RoughPaperBoxContent>
        </RoughPaperBoxContainer>
    );
}

export default RoughPaperBox;
