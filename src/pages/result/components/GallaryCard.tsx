/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { styled } from 'styled-components';
import { animated, useSpring } from '@react-spring/web';
import { observer } from 'mobx-react-lite';
import useClientWidthHeight from '../../../hooks/use_client_width_height';
import { ContentAreaWidth } from '../../../components/ContentArea';
import ResultViewModel from '../vm/result_view_model';

import GoodIcon from '../../../assets/svg/good_icon.svg';
import BadIcon from '../../../assets/svg/bad_icon.svg';

const GallaryCardContainer = styled.div<{
    width: number;
    height: number;
}>`
    position: absolute;
    right: 0;
    top: 16px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;

    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 32px;

    box-sizing: border-box;
`;
const StickyContainer = styled.div`
    position: sticky;
    width: 176px;
    top: 100px;
    left: 0;

    flex-direction: column;
    align-items: start;
`;

const GallaryListContainer = styled.div`
    width: 100%;
    height: 454px;
    flex-shrink: 0;

    border-radius: 8px;
    border: 1px solid #e7e7e7;
    background: #fbfdfe;
    box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.04);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    padding: 22px 0;
`;

const FeedbackContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: 14px;

    margin-top: 52px;

    & > .title {
        width: 100%;
        display: flex;
        flex-direction: row;

        color: #363636;
        font-family: Nunito Sans;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    & .divider {
        width: 4px;
        height: 33px;
        flex-shrink: 0;
        border-radius: 2px;
        background: #d9d9d9;
        margin-right: 10px;
    }

    & .feedback {
        width: 100%;
        height: 47px;
        flex-shrink: 0;
        border-radius: 8px;
        background: #f5f5f5;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        padding: 0px 38px;
        box-sizing: border-box;
    }

    & .button {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        flex-shrink: 0;
        background: #bebebe;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;

        transition: background 0.2s ease-in-out;

        &.selected {
            background: #a3a3a3;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14);
        }

        &:hover {
            background: #d9d9d9;
        }

        &:active {
            background: #b0b0b0;
        }

        & > img {
            width: 16px;
            height: 16px;
            flex-shrink: 0;

            object-fit: contain;
        }
    }
`;

const GallaryContainer = styled.div`
    width: 139.33px;
    height: 99.139px;
    flex-shrink: 0;

    border-radius: 8px;
    background:
        url(<path-to-image>),
        lightgray 50% / cover no-repeat;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);

    transition:
        box-shadow 0.2s ease-in-out,
        scale 0.2s ease-in-out;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }
    cursor: pointer;

    &:hover {
        box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.04);
        scale: 1.06;
    }

    &:active {
        box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.04);
        scale: 0.96;
    }
`;

function GallaryCard({
    heightParentRef,
    resultViewModel,
    appearAnimation,
}: {
    heightParentRef: React.RefObject<HTMLDivElement>;
    resultViewModel: ResultViewModel;
    appearAnimation: any;
}) {
    const { height } = useClientWidthHeight(heightParentRef);

    const width = Math.max(0, (window.innerWidth - ContentAreaWidth) / 2 - 10);

    const showGallary = width >= 200;

    const transition = useSpring({
        from: {
            opacity: showGallary ? 0 : 1,
            transform: showGallary ? 'translateX(100%)' : 'translateX(0%)',
        },
        to: {
            opacity: showGallary ? 1 : 0,
            transform: showGallary ? 'translateX(0%)' : 'translateX(100%)',
        },
    });

    return (
        <GallaryCardContainer width={width} height={height}>
            <StickyContainer>
                <animated.div style={appearAnimation}>
                    <animated.div style={transition}>
                        <GallaryListContainer>
                            {resultViewModel.bbabamStore.placeImageCardData
                                .slice(0, 3)
                                .map((placeImageCardData) => {
                                    return (
                                        <GallaryContainer
                                            key={placeImageCardData.url}
                                            onClick={() => {
                                                resultViewModel.selectPlaceGallery(
                                                    placeImageCardData
                                                );
                                            }}
                                        >
                                            <img
                                                src={placeImageCardData.url}
                                                alt="place"
                                            />
                                        </GallaryContainer>
                                    );
                                })}
                        </GallaryListContainer>
                        <FeedbackContainer>
                            <div className="title">
                                <div className="divider" />
                                <div>
                                    Do you
                                    <br />
                                    like this result?
                                </div>
                            </div>
                            <div className="feedback">
                                <div
                                    className={[
                                        'button',
                                        resultViewModel.feedback_selected ===
                                            'good' && 'selected',
                                    ].join(' ')}
                                    onClick={() => {
                                        resultViewModel.selectFeedback('good');
                                    }}
                                >
                                    <img src={GoodIcon} alt="like" />
                                </div>
                                <div
                                    className={[
                                        'button',
                                        resultViewModel.feedback_selected ===
                                            'bad' && 'selected',
                                    ].join(' ')}
                                    onClick={() => {
                                        resultViewModel.selectFeedback('bad');
                                    }}
                                >
                                    <img src={BadIcon} alt="dislike" />
                                </div>
                            </div>
                        </FeedbackContainer>
                    </animated.div>
                </animated.div>
            </StickyContainer>
        </GallaryCardContainer>
    );
}

export default observer(GallaryCard);
