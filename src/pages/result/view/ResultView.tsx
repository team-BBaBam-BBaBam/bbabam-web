import { styled } from 'styled-components';

import ContentArea from '../../../components/ContentArea';
import SearchBar from '../components/SearchBar';
import ResultViewModel from '../vm/result_view_model';

const ResultViewContainer = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    background: #fbfdfe;
`;

const SearchBarContainer = styled.div`
    width: 100%;
    height: 94px;
    z-index: 1;

    box-sizing: border-box;
    background: linear-gradient(
        180deg,
        #fff 78.44%,
        rgba(255, 255, 255, 0) 100%
    );

    padding-top: 13px;
`;

function ResultView({ resultViewModel }: { resultViewModel: ResultViewModel }) {
    return (
        <ResultViewContainer>
            <SearchBarContainer>
                <ContentArea>
                    <SearchBar resultViewModel={resultViewModel} />
                </ContentArea>
            </SearchBarContainer>
        </ResultViewContainer>
    );
}

export default ResultView;
