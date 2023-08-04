import { styled } from 'styled-components';

import RoughPaperBox from '../../../components/RoughPaperBox';
import { useBBabamFlow } from '../../../hooks/bbabam_flow_provider';
import Spinner from '../../../components/Spinner';

import LogoImage from '../../../assets/img/logo.png';

const CenteredContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    padding: 0px 20px;

    box-sizing: border-box;
`;

const GeneratingStatusBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const GeneratingStatusBoxTitle = styled.div`
    color: #3b56b6;
    font-family:
        Nunito Sans,
        sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;

    display: flex;
    align-items: center;
    gap: 26px;

    margin-bottom: 13px;
`;

const GeneratingStatusBoxDescription = styled.div`
    color: #000;
    font-family:
        Nunito Sans,
        sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    align-items: baseline;
    gap: 13px;
    margin-bottom: 20px;

    & > img {
        height: 21px;
        object-fit: contain;
        transform: translateY(2px);
    }
`;

function GeneratingStatusBox() {
    const bbabamFlowStore = useBBabamFlow();

    return (
        <RoughPaperBox small>
            <CenteredContainer>
                <GeneratingStatusBoxContainer>
                    <GeneratingStatusBoxTitle>
                        <Spinner />
                        <div>{bbabamFlowStore.userInput}</div>
                    </GeneratingStatusBoxTitle>
                    <GeneratingStatusBoxDescription>
                        <div>
                            Final Step, Generating answer... Answer will pop up
                            soon
                        </div>
                        <img src={LogoImage} alt="logo" />
                    </GeneratingStatusBoxDescription>
                </GeneratingStatusBoxContainer>
            </CenteredContainer>
        </RoughPaperBox>
    );
}

export default GeneratingStatusBox;
