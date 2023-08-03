import axios from 'axios';

interface LoadImage {
    url: string;
    query: string;
    text: string;
}

class BBabamAssetsService {
    baseUrl = 'http://43.201.32.219:4827';

    async loadImages(): Promise<LoadImage[]> {
        const response = await axios.get<LoadImage[]>(
            `${this.baseUrl}/loadimage`
        );
        return response.data;
    }
}

export default BBabamAssetsService;
