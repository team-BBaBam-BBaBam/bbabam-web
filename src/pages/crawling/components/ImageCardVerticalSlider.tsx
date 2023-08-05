import { useRef, useEffect, useState, useCallback } from 'react';
import { styled } from 'styled-components';
import { observer } from 'mobx-react-lite';

import { animated, useSpring, useTransition } from '@react-spring/web';
import { useBBabam } from '../../../hooks/bbabam_provier';
import PlaceImageCard from '../../../components/PlaceImageCard';
import useClientWidthHeight from '../../../hooks/use_client_width_height';

const ImageCardVerticalSliderContainer = styled.div`
    height: 100%;
    width: 335px;
    position: relative;
    top: 0;
`;

interface ImageCardItem {
    id: number;
    url: string;
    text: string;
    index: number;
}

function ImageCardVerticalSlider() {
    const counterRef = useRef(0);

    const bbabamStore = useBBabam();
    const containerRef = useRef<HTMLDivElement>(null);
    const { height } = useClientWidthHeight(containerRef);

    const speed = 4000;

    const generateNewImageCardData = useCallback(() => {
        const imageCardData = bbabamStore.placeImageCardData;
        const numImageCards = Math.ceil(height / (266 + 33)) + 1;

        const result = [];
        while (numImageCards - result.length > imageCardData.length) {
            result.push(...imageCardData);
        }
        const numImageCardsToAdd = numImageCards - imageCardData.length;
        result.push(...imageCardData.slice(0, numImageCardsToAdd));

        // shuffle result list
        for (let i = result.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result.map((item, index) => {
            const id = counterRef.current + 1;
            counterRef.current += 1;
            return {
                url: item.galWebImageUrl,
                text: item.galTitle,
                id,
                index,
            };
        });
    }, [bbabamStore.placeImageCardData, height]);

    const [newImageCardData, setNewImageCardData] = useState<ImageCardItem[]>(
        generateNewImageCardData
    );

    const newImageCardDataRef = useRef(newImageCardData);
    useEffect(() => {
        newImageCardDataRef.current = newImageCardData;
    }, [newImageCardData]);

    const [slideAnimations, setSlideAnimations] = useSpring(() => ({
        immediate: true,
        from: { translateY: -266 - 33 },
        to: { translateY: 0 },
        config: { duration: speed },
    }));

    useEffect(() => {
        setNewImageCardData(generateNewImageCardData());
        setSlideAnimations({
            from: { translateY: -266 - 33 },
            to: { translateY: 0 },
        });
    }, [generateNewImageCardData, setSlideAnimations]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNewImageCardData([
                {
                    ...newImageCardDataRef.current[newImageCardData.length - 1],
                    index: 0,
                },
                ...newImageCardDataRef.current
                    .slice(0, newImageCardData.length - 1)
                    .map((item) => ({
                        ...item,
                        index: item.index + 1,
                    })),
            ]);

            setSlideAnimations({
                from: { translateY: -266 - 33 },
                to: { translateY: 0 },
            });
        }, speed);
        return () => clearInterval(interval);
    }, [
        generateNewImageCardData,
        newImageCardDataRef,
        newImageCardData.length,
        setSlideAnimations,
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            // newImageCardData 중 랜덤 한개를 다른 이미지로 바꿈
            const newImageCardDataCopy = [...newImageCardDataRef.current];
            const randomIndex = Math.floor(
                Math.random() * (newImageCardDataCopy.length - 1)
            );
            const randomImageCardData =
                bbabamStore.placeImageCardData[
                    Math.floor(
                        Math.random() * bbabamStore.placeImageCardData.length
                    )
                ];
            const id = counterRef.current + 1;
            counterRef.current += 1;
            newImageCardDataCopy[randomIndex] = {
                url: randomImageCardData.galWebImageUrl,
                text: randomImageCardData.galTitle,
                id,
                index: randomIndex,
            };
            setNewImageCardData(newImageCardDataCopy);
        }, 4200);
        return () => clearInterval(interval);
    }, [
        bbabamStore.placeImageCardData,
        generateNewImageCardData,
        newImageCardDataRef,
        setSlideAnimations,
    ]);

    const cardVisibleTransition = useTransition(newImageCardData, {
        key: (item: ImageCardItem) => item.id,
        trail: 200,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    });

    return (
        <ImageCardVerticalSliderContainer ref={containerRef}>
            <animated.div
                style={{
                    ...slideAnimations,
                    position: 'absolute',
                    top: 0,
                }}
            >
                {cardVisibleTransition((style, item) => (
                    <animated.div
                        style={{
                            ...style,
                            position: 'absolute',
                            top: `${item.index * (266 + 33)}px`,
                        }}
                        key={item.id}
                    >
                        <PlaceImageCard imgUrl={item.url} title={item.text} />
                    </animated.div>
                ))}
            </animated.div>
        </ImageCardVerticalSliderContainer>
    );
}

export default observer(ImageCardVerticalSlider);
