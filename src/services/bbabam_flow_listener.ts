import { io, Socket } from 'socket.io-client';

export interface POIData {
    name: string;
    address: string;
    loc_X: number;
    loc_Y: number;
    url: string;
    cate1: string;
    cate2: string;
    callnum: string;
}

export interface AssociatedKeyword {
    keyword: string;
    queries: string[];
}

abstract class BBabamFlowServiceListener {
    socket: Socket;

    constructor() {
        this.socket = io('https://bbabam.dshs.site/search', {
            autoConnect: false,
        });
        this.socket.connect();

        this.socket.on('start_crawling', (data) => {
            this.onStartCrawling(data.search_keywords);
        });
        this.socket.on('error', () => {
            this.onError(0);
        });
        this.socket.on('finish_crawling', (data) => {
            this.onFinishCrawling(data.search_keyword);
        });
        this.socket.on('finish_generation', (data) => {
            this.onFinishGeneration(data.urls, data.result);
        });
        this.socket.on('poi_generation', (data) => {
            this.onPoiGeneration(data.place_keywords, data.place_crawled_data);
        });
        this.socket.on('path_generation', (data) => {
            this.onPathGeneration(data.path_keywords, data.path_crawled_data);
        });
        this.socket.on('associated_ketwords', (data) => {
            // data.associated_keywords is like this:
            /*
            {
                
                "associated_keywords": [
                    {
                        "Ulsan": [
                            "What are the tourist attractions in Ulsan?",
                            "How can I get to Ulsan from Seoul?",
                            "What is the weather like in Ulsan?"
                        ]
                    },
                ]
            }
            */

            // convert data.associated_keywords to AssociatedKeyword[]
            /*
            [
                {
                    keyword: "Ulsan",
                    queries: [
                        "What are the tourist attractions in Ulsan?",
                        "How can I get to Ulsan from Seoul?",
                        "What is the weather like in Ulsan?"
                    ]
                },
            ]
            */

            const associatedKeywords: AssociatedKeyword[] = [];
            // Traverse the array
            // eslint-disable-next-line no-restricted-syntax
            for (const obj of data.associated_keywords) {
                // Traverse each object in the array
                // eslint-disable-next-line no-restricted-syntax
                for (const [key, value] of Object.entries(obj)) {
                    // Push a new object to the associatedKeywords array
                    associatedKeywords.push({
                        keyword: key,
                        queries: value as string[],
                    });
                }
            }

            // write code here
            this.onAssociatedKeywordsGeneration(associatedKeywords);
        });
    }

    startFlow(message: string) {
        this.socket.emit('start', { search_text: message });
    }

    abstract onStartCrawling(searchKeywords: string[]): void;
    abstract onError(errorCode: number): void;
    abstract onFinishCrawling(searchKeyword: string): void;
    abstract onFinishGeneration(urls: string[], result: string): void;
    abstract onPoiGeneration(
        placeKeywords: string[],
        placeCrawledData: POIData[]
    ): void;
    abstract onPathGeneration(
        pathKeywords: string[],
        pathCrawledData: POIData[]
    ): void;
    abstract onAssociatedKeywordsGeneration(
        associatedKeywords: AssociatedKeyword[]
    ): void;
}

export { BBabamFlowServiceListener };
