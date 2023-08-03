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
    padding: 40px;

    box-sizing: border-box;
`;

const CrawlingStatusBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CrawlingStatusBoxTitle = styled.div`
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

const CrawlingStatusBoxDescription = styled.div`
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
    margin-bottom: 56px;

    & > img {
        height: 21px;
        object-fit: contain;
        transform: translateY(2px);
    }
`;

const KeywordList = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 10px;

    margin-bottom: 36px;
`;

const KeywordItem = styled.div`
    display: flex;
    align-items: center;

    & .num {
        width: 18px;
        height: 18px;
        flex-shrink: 0;

        fill: #f9fdfe;
        border-radius: 50%;
        border: 1px solid #dadada;

        display: flex;
        justify-content: center;
        align-items: center;

        color: #363636;
        font-family: Pretendard;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        margin-right: 17px;
    }

    & .keyword {
        color: #52afcc;
        font-family: Pretendard, sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        margin-right: 12px;
    }

    & .text {
        color: #313131;
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

function CrawlingStatusBox() {
    const bbabamFlowStore = useBBabamFlow();

    return (
        <RoughPaperBox>
            <CenteredContainer>
                <CrawlingStatusBoxContainer>
                    <CrawlingStatusBoxTitle>
                        <Spinner />
                        <div>{bbabamFlowStore.userInput}</div>
                    </CrawlingStatusBoxTitle>
                    <CrawlingStatusBoxDescription>
                        <div>Please wait a moment ... Answer will pop up</div>
                        <img src={LogoImage} alt="logo" />
                    </CrawlingStatusBoxDescription>
                    <KeywordList>
                        {bbabamFlowStore.searchKeywords.map(
                            (keyword, index) => (
                                <KeywordItem key={keyword}>
                                    <div className="num">{index + 1}</div>
                                    <div className="keyword">{keyword}</div>
                                    <div className="text">searching...</div>
                                </KeywordItem>
                            )
                        )}
                    </KeywordList>
                </CrawlingStatusBoxContainer>
            </CenteredContainer>
        </RoughPaperBox>
    );
}

export default CrawlingStatusBox;
