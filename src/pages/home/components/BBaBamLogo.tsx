import { styled } from 'styled-components';

import BBaBamLogoImage from '../../../assets/img/logo.png';

const BBaBamLogoContainer = styled.div`
    height: 90px;
    position: relative;

    display: flex;
    justify-content: center;

    margin-bottom: 82px;

    & > img {
        object-fit: contain;
        position: relative;
        height: 100%;
    }
`;

function BBaBamLogo() {
    return (
        <BBaBamLogoContainer>
            <img src={BBaBamLogoImage} alt="BBaBam Logo" />
        </BBaBamLogoContainer>
    );
}

export default BBaBamLogo;
