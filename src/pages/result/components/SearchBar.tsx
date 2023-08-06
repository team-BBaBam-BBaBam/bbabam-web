import { styled } from 'styled-components';

import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import LogoImage from '../../../assets/img/logo.png';
import ResultViewModel from '../vm/result_view_model';

const SearchBarContainer = styled.div`
    width: 100%;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 32px;
    border: 1px solid #3b8ab6;
    background: #fbfdfe;
    box-shadow: 0px 4px 18px 2px rgba(59, 138, 182, 0.08);

    transition:
        background 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out,
        scale 0.2s ease-in-out;
`;

const SearchBarInputContainer = styled.div`
    width: 100%;
    height: 64px;

    display: flex;
    flex-direction: row;
    align-items: center;

    & > .logo {
        width: 126px;
        height: 23px;
        box-sizing: border-box;
        padding: 0 23.5px;
        object-fit: contain;
    }

    & > .divider {
        height: 20px;
        width: 1px;
        flex-shrink: 0;
        background: #e1e5e5;
        border-radius: 0.5px;
    }
`;

const SearchBarInput = styled.input<{
    isExploringAssociatedKeywords?: boolean;
}>`
    z-index: 1;
    flex: 1;
    height: 100%;
    padding: 0 23.5px;
    font-size: 18px;
    font-weight: 400;

    border: none;
    outline: none;
    background: none;

    color: ${(props) =>
        props.isExploringAssociatedKeywords ? '#000080' : '#000'};

    font-family: Pretendard, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    &::placeholder {
        color: #ccc;
        font-family: Pretendard, sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

const GuideText = styled.div<{
    active?: boolean;
}>`
    position: absolute;
    right: 42px;

    transition: opacity 0.2s ease-in-out;

    opacity: ${(props) => (props.active ? 1 : 0)};
    color: #ccc;
    text-align: right;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const HorizontalDivider = styled.div`
    width: calc(100% - 40px);
    box-sizing: border-box;
    height: 1px;
    background: #e1e5e5;
    border-radius: 0.5px;
`;

const SearchBarKeywordContainer = styled.div`
    width: 100%;
    padding-left: 126px;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    flex-wrap: wrap;
    gap: 14px;

    min-height: 76px;
`;

const KeywordItem = styled.div<{
    selected?: boolean;
}>`
    height: 32px;
    flex-shrink: 0;

    display: flex;
    align-items: center;
    padding: 0 18px;

    border-radius: 47px;
    border: 1px solid #e7e7e7;
    transition:
        background 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out,
        scale 0.2s ease-in-out;

    background: ${(props) =>
        props.selected
            ? 'linear-gradient(180deg, #BDF9FA 0%, #E0F0FF 100%);'
            : '#fff'};

    box-shadow: ${(props) =>
        props.selected
            ? '0px 4px 4px 0px rgba(0, 0, 0, 0.06)'
            : '0px 4px 4px 0px rgba(0, 0, 0, 0)'};

    scale ${(props) => (props.selected ? '1.1' : '1')};

    &:hover {
        background: linear-gradient(180deg, #bdf9fa 0%, #e0f0ff 100%);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
        scale: 1.05;
    }

    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    cursor: pointer;
`;

function SearchBar({ resultViewModel }: { resultViewModel: ResultViewModel }) {
    const [isSearchBarActive, setSearchBarActive] = useState(false);
    const [isSearchBarContainerActive, setSearchBarContainerActive] =
        useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchBarActive || isSearchBarContainerActive) {
            resultViewModel.setSearchBarActive(true);
        } else {
            resultViewModel.setSearchBarActive(false);
        }
    }, [isSearchBarActive, isSearchBarContainerActive, resultViewModel]);

    return (
        <SearchBarContainer
            tabIndex={0}
            onFocus={() => {
                setSearchBarContainerActive(true);
            }}
            onBlur={() => {
                setSearchBarContainerActive(false);
            }}
        >
            <SearchBarInputContainer>
                <GuideText active={resultViewModel.isSearchBarActive}>
                    {resultViewModel.isExploringAssociatedKeywords
                        ? 'Use ↑/↓ keys'
                        : 'Press Enter ↵'}
                </GuideText>
                <img className="logo" src={LogoImage} alt="logo" />
                <div className="divider" />
                <SearchBarInput
                    ref={inputRef}
                    isExploringAssociatedKeywords={
                        resultViewModel.isExploringAssociatedKeywords
                    }
                    type="text"
                    value={resultViewModel.searchBarText}
                    placeholder="Ask anything about Korea."
                    onFocus={() => {
                        setSearchBarActive(true);
                    }}
                    onBlur={() => {
                        setSearchBarActive(false);
                    }}
                    onChange={(e) =>
                        resultViewModel.setSearchBarText(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            resultViewModel.selectPrevLongKeyword();
                        } else if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            resultViewModel.selectNextLongKeyword();
                        } else if (e.key === 'Enter') {
                            resultViewModel.search();
                        }
                    }}
                />
            </SearchBarInputContainer>
            {resultViewModel.isSearchBarActive && <HorizontalDivider />}
            {resultViewModel.isSearchBarActive && (
                <SearchBarKeywordContainer>
                    <div className="divider" />
                    {!resultViewModel.bbabamFlowStore
                        .associatedKeywordsGenerated && (
                        <div>Thinking of related search terms.</div>
                    )}
                    {resultViewModel.bbabamFlowStore
                        .associatedKeywordsGenerated &&
                        resultViewModel.bbabamFlowStore.associatedKeywords.map(
                            (keyword) => (
                                <KeywordItem
                                    role="button"
                                    key={keyword.keyword}
                                    selected={
                                        resultViewModel.currentShortKeyword ===
                                        keyword.keyword
                                    }
                                    onMouseUp={() => {
                                        inputRef.current?.focus();
                                        resultViewModel.selectShortKeyword(
                                            keyword.keyword
                                        );
                                    }}
                                >
                                    {`# ${keyword.keyword}`}
                                </KeywordItem>
                            )
                        )}
                </SearchBarKeywordContainer>
            )}
        </SearchBarContainer>
    );
}

export default observer(SearchBar);
