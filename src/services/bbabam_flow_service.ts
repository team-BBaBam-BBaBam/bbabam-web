/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
import {
    AssociatedKeyword,
    BBabamFlowServiceListener,
    POIData,
    PathData,
} from './bbabam_flow_listener';

class BBabamFlowService extends BBabamFlowServiceListener {
    _onStartCrawling: ((searchKeywords: string[]) => void) | null = null;

    _onError: ((errorCode: number) => void) | null = null;

    _onFinishCrawling: ((searchKeyword: string) => void) | null = null;

    _onFinishGeneration: ((urls: string[], result: string) => void) | null =
        null;

    _onPoiGeneration:
        | ((placeKeywords: string[], placeCrawledData: POIData[]) => void)
        | null = null;

    _onPathGeneration:
        | ((pathKeywords: string[], pathCrawledData: PathData[]) => void)
        | null = null;

    _onAssociatedKeywordsGeneration:
        | ((associatedKeywords: AssociatedKeyword[]) => void)
        | null = null;

    registerOnStartCrawling(callback: (searchKeywords: string[]) => void) {
        this._onStartCrawling = callback;
    }

    registerOnError(callback: (errorCode: number) => void) {
        this._onError = callback;
    }

    registerOnFinishCrawling(callback: (searchKeyword: string) => void) {
        this._onFinishCrawling = callback;
    }

    registerOnFinishGeneration(
        callback: (urls: string[], result: string) => void
    ) {
        this._onFinishGeneration = callback;
    }

    registerOnPoiGeneration(
        callback: (placeKeywords: string[], placeCrawledData: POIData[]) => void
    ) {
        this._onPoiGeneration = callback;
    }

    registerOnPathGeneration(
        callback: (pathKeywords: string[], pathCrawledData: PathData[]) => void
    ) {
        this._onPathGeneration = callback;
    }

    registerOnAssociatedKeywordsGeneration(
        callback: (associatedKeywords: AssociatedKeyword[]) => void
    ) {
        this._onAssociatedKeywordsGeneration = callback;
    }

    onStartCrawling(searchKeywords: string[]) {
        console.log('start crawling');
        console.log(searchKeywords);
        if (this._onStartCrawling) {
            this._onStartCrawling(searchKeywords);
        }
    }

    onError(errorCode: number) {
        console.log('error');
        console.log(errorCode);
        if (this._onError) {
            this._onError(errorCode);
        }
    }

    onFinishCrawling(searchKeyword: string) {
        console.log('finish crawling');
        if (this._onFinishCrawling) {
            this._onFinishCrawling(searchKeyword);
        }
    }

    onFinishGeneration(urls: string[], result: string) {
        console.log('finish generation');
        console.log(urls);
        console.log(result);
        if (this._onFinishGeneration) {
            this._onFinishGeneration(urls, result);
        }
    }

    onPoiGeneration(placeKeywords: string[], placeCrawledData: POIData[]) {
        console.log('poi generation');
        console.log(placeKeywords);
        console.log(placeCrawledData);
        if (this._onPoiGeneration) {
            this._onPoiGeneration(placeKeywords, placeCrawledData);
        }
    }

    onPathGeneration(pathKeywords: string[], pathCrawledData: PathData[]) {
        console.log('path generation');
        console.log(pathKeywords);
        console.log(pathCrawledData);
        if (this._onPathGeneration) {
            this._onPathGeneration(pathKeywords, pathCrawledData);
        }
    }

    onAssociatedKeywordsGeneration(associatedKeywords: AssociatedKeyword[]) {
        console.log('associated keywords generation');
        console.log(associatedKeywords);
        if (this._onAssociatedKeywordsGeneration) {
            this._onAssociatedKeywordsGeneration(associatedKeywords);
        }
    }
}

class FakeBBabamFlowService extends BBabamFlowService {
    startFlow(): void {
        setTimeout(() => {
            this.onStartCrawling([
                '유니스트란',
                '유니스트 위치',
                '유니스트 연혁',
            ]);
            setTimeout(() => {
                this.onFinishCrawling('유니스트란');
                setTimeout(() => {
                    this.onFinishGeneration(
                        ['https://www.unist.ac.kr/'],
                        'This is UNIST'
                    );
                    setTimeout(() => {
                        this.onAssociatedKeywordsGeneration([
                            {
                                keyword: 'UNIST',
                                queries: [
                                    'What courses does UNIST offer?',
                                    'What is the tuition fee at UNIST?',
                                    'What is the student population of UNIST?',
                                    'What accolades has UNIST received?',
                                    'Where is UNIST located?',
                                ],
                            },
                            {
                                keyword: 'Ulsan',
                                queries: [
                                    'What are the tourist attractions in Ulsan?',
                                    'How to get to Ulsan from Seoul?',
                                    'What is the best time to visit Ulsan?',
                                ],
                            },
                            {
                                keyword:
                                    'Times Higher Education World University Rankings',
                                queries: [
                                    'What is the ranking of UNIST in the Times Higher Education World University Rankings?',
                                    'What other South Korean universities are ranked in the Times Higher Education World University Rankings?',
                                    'How are the Times Higher Education World University Rankings calculated?',
                                ],
                            },
                        ]);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }
}

export { FakeBBabamFlowService };

export default BBabamFlowService;
