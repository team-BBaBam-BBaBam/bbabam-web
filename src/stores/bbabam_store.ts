import { makeAutoObservable } from 'mobx';

import BBabamFlowStore from './bbabam_flow_store';
import BBabamFlowService from '../services/bbabam_flow_service';

class BBaBamStore {
    isInBBaBamFlow = false;

    bbabamFlowStore: BBabamFlowStore | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    startFlow(userInput: string) {
        this.bbabamFlowStore = new BBabamFlowStore(new BBabamFlowService());
        this.isInBBaBamFlow = true;
        this.bbabamFlowStore.startFlow(userInput);
    }
}

export default BBaBamStore;
