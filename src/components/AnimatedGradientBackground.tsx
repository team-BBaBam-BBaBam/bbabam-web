import { useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import useClientWidthHeight from '../hooks/use_client_width_height';

const AnimatedGradientBackgroundDiv = styled.div`
    width: 100%;
    height: 100%;
`;

function useCanvas(
    width: number,
    height: number,
    onRender: (
        ctx: CanvasRenderingContext2D,
        timestamp: DOMHighResTimeStamp
    ) => void,
    canvasRef: React.RefObject<HTMLCanvasElement>
) {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!canvas || !ctx) return () => {};

        const setCanvasSize = () => {
            const scale = window.devicePixelRatio ?? 1;
            canvas.width = width * scale;
            canvas.height = height * scale;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(scale, scale);
        };

        setCanvasSize();

        let frameRequestId: number | null = null;

        const render = (timestamp: DOMHighResTimeStamp) => {
            onRender(ctx, timestamp);
            frameRequestId = requestAnimationFrame(render);
        };

        frameRequestId = requestAnimationFrame(render);

        return () => {
            if (frameRequestId) cancelAnimationFrame(frameRequestId);
        };
    }, [width, height, canvasRef, onRender]);
}

function AnimatedGradientBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const { width, height } = useClientWidthHeight(divRef);

    const offsetRef = useRef(0);
    const lastTimestampRef = useRef(0);

    const onRender = (
        ctx: CanvasRenderingContext2D,
        timestamp: DOMHighResTimeStamp
    ) => {
        const elapsed = (timestamp - lastTimestampRef.current) / 1000;

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#BDF9FA');
        gradient.addColorStop(1, '#F5F6FF');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Fill the canvas with the gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw the lines
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';

        for (let y = -84; y < height; y += 168) {
            ctx.fillRect(0, y + offsetRef.current, width, 84);
        }

        // Update
        const speed = 0.5; // one line height per second
        offsetRef.current = (offsetRef.current + elapsed * speed * 84) % 168;
        lastTimestampRef.current = timestamp;
    };

    useCanvas(width, height, onRender, canvasRef);

    return (
        <AnimatedGradientBackgroundDiv ref={divRef}>
            <canvas ref={canvasRef} />
        </AnimatedGradientBackgroundDiv>
    );
}

export default AnimatedGradientBackground;
