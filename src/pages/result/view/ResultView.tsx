import { styled } from 'styled-components';

import ContentArea from '../../../components/ContentArea';
import SearchBar from '../components/SearchBar';
import ResultViewModel from '../vm/result_view_model';
import ResultCard from '../components/ResultCard';
import PlaceCard from '../components/PlaceCard';
import PathCard from '../components/PathCard';

const ResultViewContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    background: #fbfdfe;
`;

const SearchBarContainer = styled.div`
    width: 100%;
    height: 94px;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    box-sizing: border-box;
    background: linear-gradient(
        180deg,
        #fff 78.44%,
        rgba(255, 255, 255, 0) 100%
    );

    padding-top: 13px;
`;

const ResultContentContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;

    overflow: auto;

    padding-top: 94px;
`;

const SizedBox = styled.div<{
    width?: number;
    height?: number;
}>`
    flex-shrink: 0;
    width: ${(props) => props.width ?? 0}px;
    height: ${(props) => props.height ?? 0}px;
`;

function ResultView({ resultViewModel }: { resultViewModel: ResultViewModel }) {
    return (
        <ResultViewContainer>
            <SearchBarContainer>
                <ContentArea>
                    <SearchBar resultViewModel={resultViewModel} />
                </ContentArea>
            </SearchBarContainer>
            <ResultContentContainer>
                <SizedBox height={16} />
                <ResultCard />
                <SizedBox height={57.6} />
                <PlaceCard />
                <SizedBox height={57.6} />
                <PathCard />
                <SizedBox height={72} />
            </ResultContentContainer>
        </ResultViewContainer>
    );
}

export default ResultView;
