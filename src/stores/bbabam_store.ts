import { makeAutoObservable, runInAction } from 'mobx';

import BBabamFlowStore from './bbabam_flow_store';
import { FakeBBabamFlowService } from '../services/bbabam_flow_service';
import {
    FakeBBabamAssetsService,
    PlaceImageCardData,
} from '../services/bbabam_assets_service';

class BBaBamStore {
    isInBBaBamFlow = false;

    bbabamFlowStore: BBabamFlowStore | null = null;

    placeImageCardData: PlaceImageCardData[] = [];

    bbabamAssetsService = new FakeBBabamAssetsService();

    constructor() {
        makeAutoObservable(this, {
            bbabamAssetsService: false,
        });

        this.loadImages();
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
        runInAction(() => {
            this.bbabamFlowStore = new BBabamFlowStore(
                new FakeBBabamFlowService()
            );
            this.isInBBaBamFlow = true;
            this.bbabamFlowStore.startFlow(userInput);
        });
    }
}

export default BBaBamStore;
