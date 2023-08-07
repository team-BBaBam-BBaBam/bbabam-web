import { styled } from 'styled-components';
import { animated, useChain, useSpring, useSpringRef } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

import { observer } from 'mobx-react-lite';
import QuestionIcon from '../../../assets/svg/question_icon.svg';
import { useBBabam } from '../../../hooks/bbabam_provier';

const WhatIsBBaBamButtonContainer = styled.div`
    width: 100%;
    height: 40px;
    margin-bottom: 72px;

    position: relative;
`;

const WhatIsBBaBamButtonDiv = styled.div`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;

    & > img {
        width: 16px;
        height: 16px;
        margin-right: 10px;
    }

    & > .discription {
        color: #000;
        text-align: center;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        & > b {
            font-weight: 700;
        }
    }

    & > .bbabam {
        flex-shrink: 0;

        color: #222222;
        text-align: center;
        font-family: Nunito Sans;
        font-size: 12px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
    }
`;

function WhatIsBBaBamButton() {
    const { language } = useBBabam();

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender) {
            isFirstRender.current = false;
        }
    }, []);

    const [open, setOpen] = useState(false);

    const closedButtonStyle = {
        width: '180px',
        height: '40px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.6)',
    };

    const openedButtonStyle = {
        width: '620px',
        height: '86px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 1)',
    };

    const buttonSizeAnimationRef = useSpringRef();
    const buttonSizeAnimation = useSpring({
        ref: buttonSizeAnimationRef,
        from:
            open || isFirstRender.current
                ? closedButtonStyle
                : openedButtonStyle,
        to: open ? openedButtonStyle : closedButtonStyle,
    });

    const openedExplanationStyle = {
        opacity: 1,
        scale: 1,
        width: '618px',
    };

    const closedExplanationStyle = {
        opacity: 0,
        scale: 0.5,
        width: '0px',
    };

    const explanationAnimationRef = useSpringRef();
    const explanationAnimation = useSpring({
        ref: explanationAnimationRef,
        from:
            open || isFirstRender.current
                ? closedExplanationStyle
                : openedExplanationStyle,
        to: open ? openedExplanationStyle : closedExplanationStyle,
    });

    useChain(
        open
            ? [buttonSizeAnimationRef, explanationAnimationRef]
            : [explanationAnimationRef, buttonSizeAnimationRef],
        [0, 0.2]
    );

    return (
        <WhatIsBBaBamButtonContainer>
            <animated.div
                style={{
                    ...buttonSizeAnimation,
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    boxShadow: '0px 4px 14px 2px rgba(59, 138, 182, 0.08)',
                    backdropFilter: 'blur(7px)',
                }}
            >
                <WhatIsBBaBamButtonDiv
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <img src={QuestionIcon} alt="question_icon" />
                    <animated.div
                        style={{
                            ...explanationAnimation,
                            // make no wrap
                            whiteSpace: 'pre',
                            // make no wrap
                            overflow: 'hidden',
                        }}
                        className="discription"
                    >
                        {language === 'kr'
                            ? '맛집? 축제? 문화? 한국에 관한 것이라면 '
                            : 'Restaurants? Festivals? Culture? '}
                        <b>
                            {language === 'kr'
                                ? '무엇이든지 물어보세요!\n'
                                : 'Ask anything about Korea!\n'}
                        </b>
                        {language === 'kr'
                            ? '(BBa-BAM은  "Ta-da," "ダー塔" 와 의미가 같은 한국의 의성어입니다.)'
                            : '(Bba-BAM is the Korean onomatopoeia same as  "Ta-da," "ダー塔")'}
                    </animated.div>

                    <div className="bbabam">
                        {language === 'kr'
                            ? '빠밤이 무엇인가요?'
                            : 'What is BBaBAM?'}
                    </div>
                </WhatIsBBaBamButtonDiv>
            </animated.div>
        </WhatIsBBaBamButtonContainer>
    );
}

export default observer(WhatIsBBaBamButton);
