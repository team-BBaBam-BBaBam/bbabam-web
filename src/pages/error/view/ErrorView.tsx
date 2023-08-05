import { styled } from 'styled-components';
import AnimatedGradientBackground from '../../../components/AnimatedGradientBackground';
import ErrorStatusBox from '../components/ErrorStatusBox';

const ErrorContainer = styled.div`
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

const ErrorStatusBoxContainer = styled.div`
    flex: 2;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function ErrorView() {
    return (
        <ErrorContainer>
            <BackgroundContainer>
                <AnimatedGradientBackground />
            </BackgroundContainer>

            <ErrorStatusBoxContainer>
                <ErrorStatusBox />
            </ErrorStatusBoxContainer>
        </ErrorContainer>
    );
}

export default ErrorView;
