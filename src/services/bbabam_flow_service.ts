import { BBabamFlowServiceListener, POIData } from './bbabam_flow_listener';

class BBabamFlowService extends BBabamFlowServiceListener {
  _onStartCrawling: ((searchKeywords: string[]) => void) | null = null;

  _onError: ((errorCode: number) => void) | null = null;

  _onFinishCrawling: ((searchKeyword: string) => void) | null = null;

  _onFinishGeneration: ((urls: string[], result: string) => void) | null = null;

  _onPoiGeneration:
    | ((placeKeywords: string[], placeCrawledData: POIData[]) => void)
    | null = null;

  _onPathGeneration:
    | ((pathKeywords: string[], pathCrawledData: POIData[]) => void)
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
    callback: (pathKeywords: string[], pathCrawledData: POIData[]) => void
  ) {
    this._onPathGeneration = callback;
  }

  onStartCrawling(searchKeywords: string[]) {
    if (this._onStartCrawling) {
      this._onStartCrawling(searchKeywords);
    }
  }

  onError(errorCode: number) {
    if (this._onError) {
      this._onError(errorCode);
    }
  }

  onFinishCrawling(searchKeyword: string) {
    if (this._onFinishCrawling) {
      this._onFinishCrawling(searchKeyword);
    }
  }

  onFinishGeneration(urls: string[], result: string) {
    if (this._onFinishGeneration) {
      this._onFinishGeneration(urls, result);
    }
  }

  onPoiGeneration(placeKeywords: string[], placeCrawledData: POIData[]) {
    if (this._onPoiGeneration) {
      this._onPoiGeneration(placeKeywords, placeCrawledData);
    }
  }

  onPathGeneration(pathKeywords: string[], pathCrawledData: POIData[]) {
    if (this._onPathGeneration) {
      this._onPathGeneration(pathKeywords, pathCrawledData);
    }
  }
}

export default BBabamFlowService;
