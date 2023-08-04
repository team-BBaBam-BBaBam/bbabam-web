/* eslint-disable max-classes-per-file */
import axios from 'axios';

export interface PlaceImageCardData {
    galContentId: string;
    galContentTypeId: string;
    galTitle: string;
    galWebImageUrl: string;
    galCreatedtime: string;
    galModifiedtime: string;
    galPhotographyMonth: string;
    galPhotographyLocation: string;
    galPhotographer: string;
    galSearchKeyword: string;
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
                galContentId: '1',
                galContentTypeId: '1',
                galTitle: 'very nice place1',
                galWebImageUrl: 'https://picsum.photos/300/200?random=1',
                galCreatedtime: '2021-01-01',
                galModifiedtime: '2021-01-01',
                galPhotographyMonth: '',
                galPhotographyLocation: '',
                galPhotographer: '',
                galSearchKeyword: '',
            },
            {
                galContentId: '2',
                galContentTypeId: '2',
                galTitle: 'very nice place2',
                galWebImageUrl: 'https://picsum.photos/300/200?random=2',
                galCreatedtime: '2021-01-01',
                galModifiedtime: '2021-01-01',
                galPhotographyMonth: '',
                galPhotographyLocation: '',
                galPhotographer: '',
                galSearchKeyword: '',
            },
            {
                galContentId: '3',
                galContentTypeId: '3',
                galTitle: 'very nice place3',
                galWebImageUrl: 'https://picsum.photos/300/200?random=3',
                galCreatedtime: '2021-01-01',
                galModifiedtime: '2021-01-01',
                galPhotographyMonth: '',
                galPhotographyLocation: '',
                galPhotographer: '',
                galSearchKeyword: '',
            },
            {
                galContentId: '4',
                galContentTypeId: '4',
                galTitle: 'very nice place4',
                galWebImageUrl: 'https://picsum.photos/300/200?random=4',
                galCreatedtime: '2021-01-01',
                galModifiedtime: '2021-01-01',
                galPhotographyMonth: '',
                galPhotographyLocation: '',
                galPhotographer: '',
                galSearchKeyword: '',
            },
            {
                galContentId: '5',
                galContentTypeId: '5',
                galTitle: 'very nice place5',
                galWebImageUrl: 'https://picsum.photos/300/200?random=5',
                galCreatedtime: '2021-01-01',
                galModifiedtime: '2021-01-01',
                galPhotographyMonth: '',
                galPhotographyLocation: '',
                galPhotographer: '',
                galSearchKeyword: '',
            },
            {
                galContentId: '6',
                galContentTypeId: '6',
                galTitle: 'very nice place6',
                galWebImageUrl: 'https://picsum.photos/300/200?random=6',
                galCreatedtime: '2021-01-01',
                galModifiedtime: '2021-01-01',
                galPhotographyMonth: '',
                galPhotographyLocation: '',
                galPhotographer: '',
                galSearchKeyword: '',
            },
            {
                galContentId: '7',
                galContentTypeId: '7',
                galTitle: 'very nice place7',
                galWebImageUrl: 'https://picsum.photos/300/200?random=7',
                galCreatedtime: '2021-01-01',
                galModifiedtime: '2021-01-01',
                galPhotographyMonth: '',
                galPhotographyLocation: '',
                galPhotographer: '',
                galSearchKeyword: '',
            },
            {
                galContentId: '8',
                galContentTypeId: '8',
                galTitle: 'very nice place8',
                galWebImageUrl: 'https://picsum.photos/300/200?random=8',
                galCreatedtime: '2021-01-01',
                galModifiedtime: '2021-01-01',
                galPhotographyMonth: '',
                galPhotographyLocation: '',
                galPhotographer: '',
                galSearchKeyword: '',
            },
            {
                galContentId: '9',
                galContentTypeId: '9',
                galTitle: 'very nice place9',
                galWebImageUrl: 'https://picsum.photos/300/200?random=9',
                galCreatedtime: '2021-01-01',
                galModifiedtime: '2021-01-01',
                galPhotographyMonth: '',
                galPhotographyLocation: '',
                galPhotographer: '',
                galSearchKeyword: '',
            },
            {
                galContentId: '10',
                galContentTypeId: '10',
                galTitle: 'very nice place10',
                galWebImageUrl: 'https://picsum.photos/300/200?random=10',
                galCreatedtime: '2021-01-01',
                galModifiedtime: '2021-01-01',
                galPhotographyMonth: '2021-01-01',
                galPhotographyLocation: '',
                galPhotographer: '',
                galSearchKeyword: '',
            },
        ];
    }
}

export default BBabamAssetsService;
