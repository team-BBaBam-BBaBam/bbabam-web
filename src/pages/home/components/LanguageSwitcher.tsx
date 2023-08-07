import { observer } from 'mobx-react-lite';

import { styled } from 'styled-components';
import { useBBabam } from '../../../hooks/bbabam_provier';

const LanguageSwitcherContainer = styled.div`
    position: absolute;

    top: 20px;
    right: 20px;

    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
`;

const LanguageSwitcherButton = styled.button<{
    selected: boolean;
}>`
    width: 66px;
    height: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    transition:
        border 0.2s,
        background 0.2s,
        color 0.2s;

    border-radius: 16px;
    border: ${(props) =>
        props.selected
            ? '1px solid rgba(0, 0, 128, 0.2)'
            : '1px solid rgba(0, 0, 0, 0.10)'};
    background: ${(props) =>
        props.selected ? 'rgba(0, 0, 128, 0.1)' : 'rgba(255, 255, 255, 0.20)'};

    color: ${(props) => (props.selected ? '#000080' : 'rgba(0, 0, 0, 0.70)')};
    text-align: center;
    font-family: Nunito Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    &:hover {
        background: rgba(0, 0, 128, 0.1);
        color: #000080;
    }

    &:active {
        background: rgba(0, 0, 128, 0.2);
        color: #000080;
    }
`;

function LanguageSwitcher() {
    const bbabamStore = useBBabam();
    const { language } = bbabamStore;

    return (
        <LanguageSwitcherContainer>
            <LanguageSwitcherButton
                selected={language === 'kr'}
                onClick={() => {
                    bbabamStore.setLanguage('kr');
                }}
            >
                한국어
            </LanguageSwitcherButton>
            <LanguageSwitcherButton
                selected={language === 'en'}
                onClick={() => {
                    bbabamStore.setLanguage('en');
                }}
            >
                English
            </LanguageSwitcherButton>
        </LanguageSwitcherContainer>
    );
}

export default observer(LanguageSwitcher);
