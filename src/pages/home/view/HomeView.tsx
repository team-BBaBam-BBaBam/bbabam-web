import { styled } from 'styled-components';
import { observer } from 'mobx-react-lite';

import ContentArea from '../../../components/ContentArea';
import SearchBar from '../components/SearchBar';
import BBaBamLogo from '../components/BBaBamLogo';
import MainBackground from '../components/MainBackground';
import ExplanationCardlist from '../components/ExplanationCardList';
import WhatIsBBaBamButton from '../components/WhatIsBBaBamButton';
import HomeViewModel from '../vm/home_view_model';
import { useBBabam } from '../../../hooks/bbabam_provier';

const HomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    position: relative;
    overflow: hidden;
`;

const ContentsContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;

    & > * {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`;

function HomeView({ homeViewModel }: { homeViewModel: HomeViewModel }) {
    const bbabamStore = useBBabam();

    return (
        <HomeContainer>
            <MainBackground />
            <ContentArea>
                <ContentsContainer>
                    <div>
                        <BBaBamLogo />
                        <SearchBar
                            onActivationChange={(active) => {
                                if (active) {
                                    homeViewModel.activateSearch();
                                } else {
                                    homeViewModel.deactivateSearch();
                                }
                            }}
                            onChange={(v) => {
                                homeViewModel.setSearchInput(v);
                            }}
                            onSearch={() => {
                                bbabamStore.startFlow(
                                    homeViewModel.searchInput
                                );
                            }}
                            value={homeViewModel.searchInput}
                        />
                        <ExplanationCardlist />
                        <WhatIsBBaBamButton />
                    </div>
                </ContentsContainer>
            </ContentArea>
        </HomeContainer>
    );
}

export default observer(HomeView);
