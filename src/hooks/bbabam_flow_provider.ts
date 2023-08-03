import { createContext, useContext } from 'react';
import BBabamFlowStore from '../stores/bbabam_flow_store';

export const BBabamFlowContext = createContext<BBabamFlowStore>(
    {} as BBabamFlowStore
);

export const BBabamFlowProvider = BBabamFlowContext.Provider;

export const BBabamFlowConsumer = BBabamFlowContext.Consumer;

export const useBBabamFlow = () => {
    const store = useContext(BBabamFlowContext);

    if (!store) {
        throw new Error(
            'useBBabamFlow must be used within a BBabamFlowProvider.'
        );
    }

    return store;
};
