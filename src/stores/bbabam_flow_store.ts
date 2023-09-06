import { makeAutoObservable, runInAction } from 'mobx';
import BBabamFlowService from '../services/bbabam_flow_service';
import {
    AssociatedKeyword,
    POIData,
    PathData,
} from '../services/bbabam_flow_listener';

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

    associatedKeywordsGenerated = false;

    poiData: POIData[] = [];

    poiKeywords: string[] = [];

    pathData: PathData[] = [];

    pathKeywords: string[] = [];

    associatedKeywords: AssociatedKeyword[] = [];

    constructor(bbabamFlowService: BBabamFlowService) {
        this.service = bbabamFlowService;
        this.processFlowService();

        makeAutoObservable(this, {
            processFlowService: false,
        });
    }

    startFlow(userInput: string) {
        this.userInput = userInput;

        // reset
        this.searchKeywords = [];
        this.errorCode = 0;
        this.result = '';
        this.urls = [];
        this.poiGenerated = false;
        this.pathGenerated = false;
        this.associatedKeywordsGenerated = false;
        this.poiData = [];
        this.poiKeywords = [];
        this.pathData = [];
        this.pathKeywords = [];
        this.associatedKeywords = [];

        this.step = BBabamFlowStep.STARTING;
        this.service.startFlow(userInput);
    }

    processFlowService() {
        this.service.registerOnStartCrawling(this.onStartCrawling.bind(this));
        this.service.registerOnError(this.onError.bind(this));
        this.service.registerOnFinishCrawling(this.onFinishCrawling.bind(this));
        this.service.registerOnUrlGeneration(this.onUrlGeneration.bind(this));
        this.service.registerOnResultGeneration(
            this.onResultGeneration.bind(this)
        );
        this.service.registerOnPoiGeneration(this.onPoiGeneration.bind(this));
        this.service.registerOnPathGeneration(this.onPathGeneration.bind(this));
        this.service.registerOnAssociatedKeywordsGeneration(
            this.onAssociatedKeywordsGeneration.bind(this)
        );
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

    onUrlGeneration(urls: string[]) {
        runInAction(() => {
            this.urls = urls;
            this.step = BBabamFlowStep.RESULT;

            this.poiGenerated = false;
            this.pathGenerated = false;
        });
    }

    onResultGeneration(result: string) {
        runInAction(() => {
            this.result += result;
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

    onPathGeneration(pathKeywords: string[], pathData: PathData[]) {
        runInAction(() => {
            this.pathKeywords = pathKeywords;
            this.pathData = pathData;
            this.pathGenerated = true;
        });
    }

    onAssociatedKeywordsGeneration(associatedKeywords: AssociatedKeyword[]) {
        runInAction(() => {
            this.associatedKeywords = associatedKeywords;
            this.associatedKeywordsGenerated = true;
        });
    }
}

export default BBabamFlowStore;
