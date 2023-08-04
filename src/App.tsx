import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BBabamProvider } from './hooks/bbabam_provier';

import HomeScreen from './pages/home/index';
import BBaBamStore from './stores/bbabam_store';
import { BBabamFlowProvider } from './hooks/bbabam_flow_provider';
import BBabamFlowStore, { BBabamFlowStep } from './stores/bbabam_flow_store';
import CrawlingScreen from './pages/crawling';
import GeneratingScreen from './pages/generating';
import ErrorScreen from './pages/error';
import ResultScreen from './pages/result';

const BBabamFlowContent = observer(
    ({ bbabamFlowStore }: { bbabamFlowStore: BBabamFlowStore }) => {
        if (
            bbabamFlowStore.step === BBabamFlowStep.STARTING ||
            bbabamFlowStore.step === BBabamFlowStep.CRAWLING
        ) {
            return <CrawlingScreen />;
        }
        if (bbabamFlowStore.step === BBabamFlowStep.GENERATING) {
            return <GeneratingScreen />;
        }
        if (bbabamFlowStore.step === BBabamFlowStep.Error) {
            return <ErrorScreen />;
        }
        if (bbabamFlowStore.step === BBabamFlowStep.RESULT) {
            return <ResultScreen />;
        }
        return <div>Unknown step</div>;
    }
);

const AppContent = observer(({ bbabamStore }: { bbabamStore: BBaBamStore }) => {
    if (!bbabamStore.isInBBaBamFlow || !bbabamStore.bbabamFlowStore) {
        return <HomeScreen />;
    }
    return (
        <BBabamFlowProvider value={bbabamStore.bbabamFlowStore}>
            <BBabamFlowContent bbabamFlowStore={bbabamStore.bbabamFlowStore} />
        </BBabamFlowProvider>
    );
});

function App() {
    const [bbabamStore] = useState(() => new BBaBamStore());

    useEffect(() => {
        bbabamStore.loadImages();
    }, [bbabamStore]);

    return (
        <BBabamProvider value={bbabamStore}>
            <AppContent bbabamStore={bbabamStore} />
        </BBabamProvider>
    );
}

export default App;
