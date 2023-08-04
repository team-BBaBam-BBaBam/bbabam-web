import { styled } from 'styled-components';

const CardDiv = styled.div`
    width: 335px;
    height: 266px;
    box-sizing: border-box;
    flex-shrink: 0;

    padding: 8px 10px;
    padding-bottom: 0;

    display: flex;
    flex-direction: column;

    border-radius: 14px;
    border: 1px solid #dbdbdb;
    background: #fff;
    box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, 0.04);

    & > img {
        width: 100%;
        height: 206px;
        object-fit: cover;

        border-radius: 14px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
    }

    & > .place-image-card-title {
        flex: 1;

        margin-right: 10px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        color: #363636;
        text-align: right;
        font-family: ABeeZee;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

interface PlaceImageCardProps {
    imgUrl: string;
    title: string;
}

function PlaceImageCard({ imgUrl, title }: PlaceImageCardProps) {
    return (
        <CardDiv className="place-image-card">
            <img src={imgUrl} alt={title} />
            <div className="place-image-card-title">{title}</div>
        </CardDiv>
    );
}

export default PlaceImageCard;
