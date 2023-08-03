import { createContext, useContext } from 'react';

import BBaBamStore from '../stores/bbabam_store';

export const BBabamContext = createContext<BBaBamStore>({} as BBaBamStore);

export const BBabamProvider = BBabamContext.Provider;

export const BBabamConsumer = BBabamContext.Consumer;

export const useBBabam = () => {
    const store = useContext(BBabamContext);

    if (!store) {
        throw new Error('useBBabam must be used within a BBabamProvider.');
    }

    return store;
};
