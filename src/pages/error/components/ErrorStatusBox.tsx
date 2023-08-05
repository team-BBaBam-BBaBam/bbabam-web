import { styled } from 'styled-components';

import { observer } from 'mobx-react-lite';
import RoughPaperBox from '../../../components/RoughPaperBox';
import { useBBabamFlow } from '../../../hooks/bbabam_flow_provider';

import BanIcon from '../../../assets/svg/ban_icon.svg';
import ErrorIcon from '../../../assets/svg/error_icon.svg';
import BackIcon from '../../../assets/svg/back_icon.svg';
import LogoImage from '../../../assets/img/logo.png';
import { useBBabam } from '../../../hooks/bbabam_provier';

const CenteredContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 40px;

    box-sizing: border-box;
`;

const CrawlingStatusBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ErrorStatusBoxTitle = styled.div`
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

    margin-bottom: 48px;
`;
const ErrorStatusBoxSubtitle = styled.div`
    color: #f13c3c;
    font-family: Pretendard, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    align-items: center;
    gap: 8px;

    margin-bottom: 8px;
`;

const ErrorStatusDiscription = styled.div`
    color: #313131;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    margin-bottom: 64px;
`;

const GoBackButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const GoBackButton = styled.div`
    width: 241px;
    height: 56px;
    flex-shrink: 0;

    border-radius: 148px;
    border: 1px solid #e7e7e7;
    background: #fff;
    box-shadow: 0px 4px 16px 0px rgba(59, 86, 182, 0.08);

    display: flex;
    justify-content: center;
    align-items: center;

    transition: transform 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(1);
    }

    & > .back {
        height: 14px;
        margin-right: 29.22px;
    }

    & > div {
        color: #333;
        text-align: center;
        font-family: Bangers;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        margin-right: 4px;
    }

    & > .icon {
        height: 18px;
    }
`;

function ErrorStatusBox() {
    const bbabamStore = useBBabam();
    const bbabamFlowStore = useBBabamFlow();

    return (
        <RoughPaperBox>
            <CenteredContainer>
                <CrawlingStatusBoxContainer>
                    <ErrorStatusBoxTitle>
                        <img src={BanIcon} alt="error icon" />
                        <div>{bbabamFlowStore.userInput}</div>
                    </ErrorStatusBoxTitle>
                    <ErrorStatusBoxSubtitle>
                        <img src={ErrorIcon} alt="error icon" />
                        <div>BBa-Bam cannot anwer to this question</div>
                    </ErrorStatusBoxSubtitle>
                    <ErrorStatusDiscription>
                        Your question may be non-tourism related. If not, try
                        rewording the question a bit and ask the question again.
                    </ErrorStatusDiscription>
                    <GoBackButtonContainer>
                        <GoBackButton
                            onClick={() => {
                                bbabamStore.reset();
                            }}
                        >
                            <img
                                className="back"
                                src={BackIcon}
                                alt="back icon"
                            />
                            <div>Go Back To</div>
                            <img className="icon" src={LogoImage} alt="logo" />
                        </GoBackButton>
                    </GoBackButtonContainer>
                </CrawlingStatusBoxContainer>
            </CenteredContainer>
        </RoughPaperBox>
    );
}

export default observer(ErrorStatusBox);
