import { RefObject, useEffect, useState } from 'react';

const useClientWidthHeight = (
    ref: RefObject<HTMLElement>,
    dependencies: any[] = []
) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            if (ref.current) {
                setWidth(ref.current.getBoundingClientRect().width);
                setHeight(ref.current.getBoundingClientRect().height);
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, ...dependencies]);

    return { width, height };
};

export default useClientWidthHeight;
