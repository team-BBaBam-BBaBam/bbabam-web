import { io, Socket } from 'socket.io-client';

interface POIData {
    name: string;
    address: string;
    loc_X: number;
    loc_Y: number;
    url: string;
    cate1: string;
    cate2: string;
    callnum: string;
}

abstract class BBabamFlowServiceListener {
    socket: Socket;

    constructor() {
        this.socket = io('http://43.201.32.219:4827/search');

        this.socket.on('start_crawling', (data) => {
            this.onStartCrawling(data.search_keywords);
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
    }

    startFlow(message: string) {
        this.socket.emit('start', message);
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
}

export { type POIData, BBabamFlowServiceListener };
