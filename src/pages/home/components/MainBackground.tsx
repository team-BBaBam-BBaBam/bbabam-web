import { styled } from 'styled-components';

import BackgroundImage from '../../../assets/img/background.png';

const MainBackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;

    & .top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 50vh;

        background: linear-gradient(180deg, #00ced1 0%, #b5e5e5 100%);
    }

    & .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 50vh;
        object-fit: cover;
    }
`;

function MainBackground() {
    return (
        <MainBackgroundContainer>
            <div className="top" />
            <img className="bottom" src={BackgroundImage} alt="background" />
        </MainBackgroundContainer>
    );
}

export default MainBackground;
