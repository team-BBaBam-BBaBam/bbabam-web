import { styled } from 'styled-components';

const SpinnerDiv = styled.div<{
    size: number;
    thickness: number;
    color: string;
}>`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border: ${(props) => props.thickness}px solid ${(props) => props.color};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

function Spinner({
    size = 22,
    thickness = 5,
    color = '#3B56B6',
}: {
    size?: number;
    thickness?: number;
    color?: string;
}) {
    return <SpinnerDiv size={size} thickness={thickness} color={color} />;
}

export default Spinner;
