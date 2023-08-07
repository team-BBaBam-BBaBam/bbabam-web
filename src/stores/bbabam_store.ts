import { makeAutoObservable, runInAction } from 'mobx';

import BBabamFlowStore from './bbabam_flow_store';
import BBabamFlowService, {
    FakeBBabamFlowService,
} from '../services/bbabam_flow_service';
import BBabamAssetsService, {
    PlaceImageCardData,
} from '../services/bbabam_assets_service';

class BBaBamStore {
    isInBBaBamFlow = false;

    bbabamFlowStore: BBabamFlowStore | null = null;

    placeImageCardData: PlaceImageCardData[] = [];

    bbabamAssetsService = new BBabamAssetsService();

    language: 'kr' | 'en' = 'kr';

    constructor() {
        makeAutoObservable(this, {
            bbabamAssetsService: false,
        });

        this.loadImages();
    }

    setLanguage(language: 'kr' | 'en') {
        this.language = language;
    }

    async loadImages() {
        const data = await this.bbabamAssetsService.loadImages();
        runInAction(() => {
            this.placeImageCardData = data;
        });
    }

    async startFlow(userInput: string) {
        if (this.placeImageCardData.length === 0) {
            await this.loadImages();
        }

        const isFake = false;
        runInAction(() => {
            this.bbabamFlowStore = new BBabamFlowStore(
                isFake ? new FakeBBabamFlowService() : new BBabamFlowService()
            );
            this.isInBBaBamFlow = true;
            this.bbabamFlowStore.startFlow(userInput);
        });
    }

    reset() {
        this.isInBBaBamFlow = false;
        this.bbabamFlowStore = null;
    }
}

export default BBaBamStore;
