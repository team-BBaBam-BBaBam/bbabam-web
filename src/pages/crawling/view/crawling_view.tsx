import { styled } from 'styled-components';
import AnimatedGradientBackground from '../../../components/AnimatedGradientBackground';
import CrawlingStatusBox from '../components/CrawlingStatusBox';

const CrawlingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    position: relative;
    overflow: hidden;

    display: flex;
    flex-direction: row;
`;

const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const CrawlingStatusBoxContainer = styled.div`
    flex: 4;
    flexp-shrink: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function CrawlingView() {
    return (
        <CrawlingContainer>
            <BackgroundContainer>
                <AnimatedGradientBackground />
            </BackgroundContainer>

            <CrawlingStatusBoxContainer>
                <CrawlingStatusBox />
            </CrawlingStatusBoxContainer>
        </CrawlingContainer>
    );
}

export default CrawlingView;
