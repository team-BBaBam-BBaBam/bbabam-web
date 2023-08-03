import { styled } from 'styled-components';

const WhatIsBBaBamButtonContainer = styled.div`
    width: 100%;
    margin-bottom: 72px;
`;

const WhatIsBBaBamButtonDiv = styled.div`
    width: 167px;
    height: 40px;
    flex-shrink: 0;

    position: absolute;
    right: 0;

    border-radius: 39px;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 4px 14px 2px rgba(59, 138, 182, 0.08);
    backdrop-filter: blur(7px);
`;

function WhatIsBBaBamButton() {
    return (
        <WhatIsBBaBamButtonContainer>
            <WhatIsBBaBamButtonDiv />
        </WhatIsBBaBamButtonContainer>
    );
}

export default WhatIsBBaBamButton;
