import { styled } from 'styled-components';
import AnimatedGradientBackground from '../../../components/AnimatedGradientBackground';
import CrawlingStatusBox from '../components/CrawlingStatusBox';
import ImageCardVerticalSlider from '../components/ImageCardVerticalSlider';

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

    gap: 20px;
`;

const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const CrawlingStatusBoxContainer = styled.div`
    flex: 2;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ImageCardSliderContainer = styled.div`
    flex: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: flex-start;
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

            <ImageCardSliderContainer>
                <ImageCardVerticalSlider />
            </ImageCardSliderContainer>
        </CrawlingContainer>
    );
}

export default CrawlingView;
