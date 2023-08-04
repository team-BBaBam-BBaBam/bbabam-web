import { styled } from 'styled-components';
import AnimatedGradientBackground from '../../../components/AnimatedGradientBackground';
import GeneratingStatusBox from '../components/GeneratingStatusBox';
import ImageCardGallary from '../components/ImageCardGallary';

const GeneratingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 40px;
    margin: 0;
    box-sizing: border-box;

    position: relative;
    overflow: hidden;

    display: flex;
    flex-direction: column;
`;

const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const GeneratingStatusBoxContainer = styled.div`
    flex: 1;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 70px;
`;

const GallaryContainer = styled.div`
    flex: 2;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
`;

function GeneratingView() {
    return (
        <GeneratingContainer>
            <BackgroundContainer>
                <AnimatedGradientBackground />
            </BackgroundContainer>
            <GeneratingStatusBoxContainer>
                <GeneratingStatusBox />
            </GeneratingStatusBoxContainer>
            <GallaryContainer>
                <ImageCardGallary />
            </GallaryContainer>
        </GeneratingContainer>
    );
}

export default GeneratingView;
