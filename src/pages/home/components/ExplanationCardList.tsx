import { styled } from 'styled-components';
import { observer } from 'mobx-react-lite';
import { animated, useTransition } from '@react-spring/web';

import { useBBabam } from '../../../hooks/bbabam_provier';

const ExplanationCardlistContainer = styled.div`
    width: 100%;
    margin-bottom: 18px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 22px;
`;

const ExplanationCardContainer = styled.div`
    flex: 1;
    height: 161px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    position: relative;

    padding: 23px 20px;

    border-radius: 15px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 4px 16px 2px rgba(59, 138, 182, 0.08);
    backdrop-filter: blur(7px);

    white-space: pre-wrap;

    & > .title {
        position: absolute;
        top: 23px;
        color: #000;
        width: calc(100% - 40px);

        font-family: Pretendard, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    & > .discription {
        position: absolute;
        top: 40px;
        width: calc(100% - 40px);
        min-width: 0;

        margin-top: 14px;

        color: #222;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;

        &.question {
            line-height: 200%;
        }

        &.small {
            font-size: 12.5px;
        }
    }
`;

function ExplanationCardlist() {
    const { language } = useBBabam();

    const transition = useTransition(language, {
        from: { opacity: 0, transform: 'translateY(10px)' },
        enter: { opacity: 1, transform: 'translateY(0px)' },
        leave: { opacity: 0, transform: 'translateY(10px)' },
    });

    return (
        <ExplanationCardlistContainer>
            <ExplanationCardContainer>
                {transition((style, item) => (
                    <animated.div style={style} className="title">
                        {item === 'kr'
                            ? '📝  입력 형식'
                            : '📝  Question format'}
                    </animated.div>
                ))}
                {transition((style, item) => (
                    <animated.div style={style} className="discription">
                        {item === 'kr'
                            ? '원하는 형식의 문장으로 요청 혹은 문의를 진행하세요!'
                            : 'Get answers to requests or inquiries with free-form questions!'}
                    </animated.div>
                ))}
            </ExplanationCardContainer>
            <ExplanationCardContainer>
                {transition((style, item) => (
                    <animated.div style={style} className="title">
                        {item === 'kr' ? '📚  입력 범위' : '📚  Input range'}
                    </animated.div>
                ))}
                {transition((style, item) => (
                    <animated.div style={style} className="discription">
                        {item === 'kr'
                            ? '한국 문화, 관광 명소, 최신 트렌드 등 모두 물어보세요!'
                            : 'Ask about Korean culture, tourist attractions, latest trends, and more!'}
                    </animated.div>
                ))}
            </ExplanationCardContainer>
            <ExplanationCardContainer>
                {transition((style, item) => (
                    <animated.div style={style} className="title">
                        {item === 'kr' ? '💭  예시' : '💭  Example Question'}
                    </animated.div>
                ))}

                {transition((style, item) => (
                    <animated.div
                        style={style}
                        className={[
                            'discription',
                            'question',
                            language === 'en' && 'small',
                        ].join(' ')}
                    >
                        {item === 'kr'
                            ? '“한국 관광을 위한 팁 알려줘”\n“경복궁 근처에 화장실 어디있어?”\n“한국의 카페 문화”'
                            : '“Tell me some tips for sightseeing in Korea.”\n“Where is the restroom near Gyeongbokgung?”\n“Korean age culture”'}
                    </animated.div>
                ))}
            </ExplanationCardContainer>
        </ExplanationCardlistContainer>
    );
}

export default observer(ExplanationCardlist);
