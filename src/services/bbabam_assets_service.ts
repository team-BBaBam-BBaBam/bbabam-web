/* eslint-disable max-classes-per-file */
import axios from 'axios';

export interface PlaceImageCardData {
    url: string;
    query: string;
    text: string;
}

class BBabamAssetsService {
    baseUrl = 'https://bbabam.dshs.site';

    async loadImages(): Promise<PlaceImageCardData[]> {
        const response = await axios.get<PlaceImageCardData[]>(
            `${this.baseUrl}/loadimage`
        );
        return response.data;
    }
}

export class FakeBBabamAssetsService extends BBabamAssetsService {
    // eslint-disable-next-line class-methods-use-this
    async loadImages(): Promise<PlaceImageCardData[]> {
        return [
            {
                url: 'https://picsum.photos/300/200?random=1',
                query: 'I want to know about this very nice place',
                text: 'very nice place1',
            },
            {
                url: 'https://picsum.photos/300/200?random=2',
                query: 'I want to know about this very nice place',
                text: 'very nice place2',
            },
            {
                url: 'https://picsum.photos/300/200?random=3',
                query: 'I want to know about this very nice place',
                text: 'very nice place3',
            },
            {
                url: 'https://picsum.photos/300/200?random=4',
                query: 'I want to know about this very nice place',
                text: 'very nice place4',
            },
            {
                url: 'https://picsum.photos/300/200?random=5',
                query: 'I want to know about this very nice place',
                text: 'very nice place5',
            },
            {
                url: 'https://picsum.photos/300/200?random=6',
                query: 'I want to know about this very nice place',
                text: 'very nice place6',
            },
            {
                url: 'https://picsum.photos/300/200?random=7',
                query: 'I want to know about this very nice place',
                text: 'very nice place7',
            },
            {
                url: 'https://picsum.photos/300/200?random=8',
                query: 'I want to know about this very nice place',
                text: 'very nice place8',
            },
            {
                url: 'https://picsum.photos/300/200?random=9',
                query: 'I want to know about this very nice place',
                text: 'very nice place9',
            },
            {
                url: 'https://picsum.photos/300/200?random=10',
                query: 'I want to know about this very nice place',
                text: 'very nice place10',
            },
        ];
    }
}

export default BBabamAssetsService;
