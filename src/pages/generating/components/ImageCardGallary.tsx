import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { animated, useTransition } from '@react-spring/web';
import { observer } from 'mobx-react-lite';
import { useBBabam } from '../../../hooks/bbabam_provier';
import useClientWidthHeight from '../../../hooks/use_client_width_height';
import PlaceImageCard from '../../../components/PlaceImageCard';

const ImageCardGallaryContainer = styled.div`
    width: 100%;
    max-width: 1080px;
    height: 100%;
    position: relative;
`;

interface ImageCardItem {
    id: number;
    url: string;
    text: string;
    index: number;
}

function ImageCardGallary() {
    const counterRef = useRef(0);

    const bbabamStore = useBBabam();
    const containerRef = useRef<HTMLDivElement>(null);
    const { height } = useClientWidthHeight(containerRef);

    const generateNewImageCardData = useCallback(() => {
        const imageCardData = bbabamStore.placeImageCardData;
        const numImageCards =
            Math.min(2, Math.max(1, Math.floor((height + 24) / (266 + 24)))) *
            3;

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
                url: item.url,
                text: item.english_title,
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

    useEffect(() => {
        const interval = setInterval(() => {
            // newImageCardData 중 랜덤 한개를 다른 이미지로 바꿈
            const newImageCardDataCopy = [...newImageCardDataRef.current];
            const randomIndex = Math.floor(
                Math.random() * newImageCardDataCopy.length
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
                url: randomImageCardData.url,
                text: randomImageCardData.english_title,
                id,
                index: randomIndex,
            };

            setNewImageCardData(newImageCardDataCopy);
        }, 4200);
        return () => clearInterval(interval);
    }, [bbabamStore.placeImageCardData]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNewImageCardData(generateNewImageCardData());
        }, 14000);
        return () => clearInterval(interval);
    }, [bbabamStore.placeImageCardData, generateNewImageCardData]);

    const cardVisibleTransition = useTransition(newImageCardData, {
        key: (item: ImageCardItem) => item.id,
        trail: 200,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    });

    useEffect(() => {
        setNewImageCardData(generateNewImageCardData());
    }, [generateNewImageCardData]);

    return (
        <ImageCardGallaryContainer ref={containerRef}>
            {cardVisibleTransition((style, item) => (
                <animated.div
                    style={{
                        ...style,
                        position: 'absolute',
                        left: (item.index % 3) * (335 + 36),
                        top: Math.floor(item.index / 3) * (266 + 24),
                    }}
                    key={item.id}
                >
                    <PlaceImageCard imgUrl={item.url} title={item.text} />
                </animated.div>
            ))}
        </ImageCardGallaryContainer>
    );
}

export default observer(ImageCardGallary);
