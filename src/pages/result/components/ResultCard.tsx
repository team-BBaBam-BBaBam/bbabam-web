import { styled } from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useBBabamFlow } from '../../../hooks/bbabam_flow_provider';
import ContentArea from '../../../components/ContentArea';

import LinkIcon from '../../../assets/svg/link_icon.svg';

const ResultCardContainer = styled.div`
    width: 100%;
    flex-shrink: 0;
    box-sizing: border-box;

    border-radius: 8px;
    border: 1px solid #e7e7e7;
    background: #fff;
    box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.04);

    padding: 28px;
`;

const ResultCardTitle = styled.div`
    color: #000080;
    font-family: Nunito Sans;
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;

    margin-bottom: 22px;
`;

const ResultCardContnet = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 180%; /* 28.8px */
    letter-spacing: 0.32px;

    margin-bottom: 22px;
`;

const ResultCardLinkList = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 8px;
`;

const ResultCardLinkPreview = styled.a`
    width: 478px;
    height: 52px;
    flex-shrink: 0;

    border-radius: 8px;
    border: 1px solid #e7e7e7;
    background: #fff;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    transition: background 0.2s ease-in-out;

    text-decoration: none;

    &:hover {
        background: #f2f2f2;
    }

    & > img {
        height: 100%;
        width: 52px;
        object-fit: contain;
        padding: 0 18px;
        box-sizing: border-box;
        background: #d2d2d24d;

        border-radius: 8px 0 0 8px;
    }

    & > div {
        flex: 1;

        min-width: 0;
        padding: 0 16px;
        box-sizing: border-box;

        height: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        word-break: break-all;

        color: #292929;
        font-family: Abel;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

function ResultCard() {
    const bbabamFlowStore = useBBabamFlow();

    const parseResult = (
        result: string
    ): { urls: string[]; cleanedResult: string } => {
        // Extract URLs
        let urls: string[] = [];
        const urlMatch = result.match(
            /\[(Links?|LINKS?|links?|link?|LINK?|링크)\]\s*\[(.*?)\]/
        );

        if (urlMatch && urlMatch[2]) {
            const urlStrings = urlMatch[2].split(',');

            urls = urlStrings.map((s) =>
                s.trim().replace(/'/g, '').replace(/"/g, '')
            );
        }

        // Remove [Links] and URLs from the original string
        const cleanedResult = result
            .replace(
                /\[(Links?|LINKS?|links?|link?|LINK?|링크)\]\s*\[(.*?)\]/,
                ''
            )
            .trim();

        return { urls, cleanedResult };
    };

    const { urls, cleanedResult } = useMemo(
        () => parseResult(bbabamFlowStore.result),
        [bbabamFlowStore.result]
    );

    return (
        <ContentArea>
            <ResultCardContainer>
                <ResultCardTitle>📚 ANSWER</ResultCardTitle>
                <ResultCardContnet>
                    <ReactMarkdown linkTarget="_blank">
                        {cleanedResult}
                    </ReactMarkdown>
                </ResultCardContnet>
                <ResultCardLinkList>
                    {urls.map((url) => (
                        <ResultCardLinkPreview href={url} target="_blank">
                            <img src={LinkIcon} alt="link_icon" />
                            <div>{url}</div>
                        </ResultCardLinkPreview>
                    ))}
                </ResultCardLinkList>
            </ResultCardContainer>
        </ContentArea>
    );
}

export default observer(ResultCard);
