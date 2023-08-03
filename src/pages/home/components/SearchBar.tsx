import { styled } from 'styled-components';
import { useEffect, useState } from 'react';

import SearchIcon from '../../../assets/svg/search.svg';

const SearchBarContainer = styled.div<{
    active: boolean;
}>`
    width: 100%;
    height: 64px;
    box-sizing: border-box;
    margin-bottom: 36px;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-radius: 55px;
    border: 1.5px solid #3b8ab6;
    padding: 0 25px;

    transition:
        background 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out,
        scale 0.2s ease-in-out;

    scale: ${(props) => (props.active ? 1.005 : 1)};

    &: hover {
        scale: 1.005;
    }

    background: ${(props) =>
        props.active ? '#f9fdfe' : 'rgba(249, 253, 254, 0.9)'};

    box-shadow: ${(props) =>
        props.active
            ? '2px 4px 4px 0px rgba(0, 0, 0, 0.04) inset, 0px 4px 18px 2px rgba(59, 138, 182, 0.16)'
            : '2px 4px 4px 0px rgba(0, 0, 0, 0.12) inset, 0px 4px 18px 2px rgba(59, 138, 182, 0.16)'};
`;

const SearchBarInput = styled.input`
    flex: 1;
    height: 100%;
    padding: 0 8px;
    font-size: 18px;
    font-weight: 400;

    border: none;
    outline: none;
    background: none;

    color: #000;
    font-family: Pretendard, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
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
    active: boolean;
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

interface SearchBarProps {
    value: string;
    onActivationChange?: (active: boolean) => void;
    onChange: (value: string) => void;
    onSearch: () => void;
}

function SearchBar({
    value,
    onActivationChange,
    onChange,
    onSearch,
}: SearchBarProps) {
    const [isActivated, setIsActivated] = useState(false);
    useEffect(() => {
        onActivationChange?.(isActivated);
    }, [isActivated, onActivationChange]);

    return (
        <SearchBarContainer active={isActivated}>
            <GuideText active={isActivated}>Press Enter ↵</GuideText>
            <img alt="Search" src={SearchIcon} style={{ marginRight: 10 }} />
            <SearchBarInput
                type="text"
                value={value}
                placeholder="Ask anything about Korea."
                onFocus={() => {
                    setIsActivated(true);
                }}
                onBlur={() => {
                    setIsActivated(false);
                }}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearch();
                    }
                }}
            />
        </SearchBarContainer>
    );
}

export default SearchBar;
