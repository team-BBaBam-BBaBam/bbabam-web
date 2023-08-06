import { styled } from 'styled-components';

import { animated, useSprings } from '@react-spring/web';
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

    overflow-y: auto;
`;

const SearchBarContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 94px;

    position: sticky;
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
    position: relative;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;

    padding-top: 4px;
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
    const [appearAnimation] = useSprings(
        3,
        () => ({
            from: {
                opacity: 0,
                transform: 'translateY(20px)',
            },
            to: {
                opacity: 1,
                transform: 'translateY(0px)',
            },
            delay: 200,
        }),
        []
    );

    return (
        <ResultViewContainer>
            <SearchBarContainer>
                <ContentArea>
                    <SearchBar resultViewModel={resultViewModel} />
                </ContentArea>
            </SearchBarContainer>
            <ResultContentContainer>
                <SizedBox height={16} />
                <animated.div style={appearAnimation[0]}>
                    <ResultCard />
                </animated.div>
                <SizedBox height={57.6} />
                <animated.div style={appearAnimation[1]}>
                    <PlaceCard />
                </animated.div>
                <SizedBox height={57.6} />
                <animated.div style={appearAnimation[2]}>
                    <PathCard />
                </animated.div>
                <SizedBox height={72} />
            </ResultContentContainer>
        </ResultViewContainer>
    );
}

export default ResultView;
