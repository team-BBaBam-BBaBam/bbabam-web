import { makeAutoObservable, runInAction } from 'mobx';
import BBabamFlowService from '../services/bbabam_flow_service';
import { POIData } from '../services/bbabam_flow_listener';

export enum BBabamFlowStep {
    INIT,
    STARTING,
    Error,
    CRAWLING,
    GENERATING,
    RESULT,
}

class BBabamFlowStore {
    service: BBabamFlowService;

    step: BBabamFlowStep = BBabamFlowStep.INIT;

    userInput = '';

    searchKeywords: string[] = [];

    errorCode = 0;

    result = '';

    urls: string[] = [];

    poiGenerated = false;

    pathGenerated = false;

    poiData: POIData[] | null = null;

    poiKeywords: string[] = [];

    pathData: POIData[] | null = null;

    pathKeywords: string[] = [];

    constructor(bbabamFlowService: BBabamFlowService) {
        this.service = bbabamFlowService;
        this.processFlowService();

        makeAutoObservable(this, {
            processFlowService: false,
        });
    }

    startFlow(userInput: string) {
        this.userInput = userInput;
        this.step = BBabamFlowStep.STARTING;
        this.service.startFlow(userInput);
    }

    processFlowService() {
        this.service.registerOnStartCrawling(this.onStartCrawling.bind(this));
        this.service.registerOnError(this.onError.bind(this));
        this.service.registerOnFinishCrawling(this.onFinishCrawling.bind(this));
        this.service.registerOnFinishGeneration(
            this.onFinishGeneration.bind(this)
        );
        this.service.registerOnPoiGeneration(this.onPoiGeneration.bind(this));
        this.service.registerOnPathGeneration(this.onPathGeneration.bind(this));
    }

    onStartCrawling(searchKeywords: string[]) {
        runInAction(() => {
            this.searchKeywords = searchKeywords;
            this.step = BBabamFlowStep.CRAWLING;
        });
    }

    onError(errorCode: number) {
        runInAction(() => {
            this.step = BBabamFlowStep.Error;
            this.errorCode = errorCode;
        });
    }

    onFinishCrawling() {
        runInAction(() => {
            this.step = BBabamFlowStep.GENERATING;
        });
    }

    onFinishGeneration(urls: string[], result: string) {
        runInAction(() => {
            this.result = result;
            this.urls = urls;
            this.step = BBabamFlowStep.RESULT;

            this.poiGenerated = false;
            this.pathGenerated = false;
        });
    }

    onPoiGeneration(placeKeywords: string[], poiData: POIData[]) {
        runInAction(() => {
            this.poiKeywords = placeKeywords;
            this.poiData = poiData;
            this.poiGenerated = true;
        });
    }

    onPathGeneration(pathKeywords: string[], pathData: POIData[]) {
        runInAction(() => {
            this.pathKeywords = pathKeywords;
            this.pathData = pathData;
            this.pathGenerated = true;
        });
    }
}

export default BBabamFlowStore;
