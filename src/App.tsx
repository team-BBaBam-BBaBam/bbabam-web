/* eslint-disable react/no-unused-prop-types */
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';

import { BBabamProvider, useBBabam } from './hooks/bbabam_provier';

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
        const navigate = useNavigate();
        const location = useLocation();
        const bbabamStore = useBBabam();

        console.log(location.pathname, bbabamFlowStore.step);

        const [searchParams] = useSearchParams();
        if (location.pathname === '/ask' && searchParams.has('query')) {
            const query = searchParams.get('query') || '';
            if (bbabamFlowStore.step === BBabamFlowStep.INIT) {
                console.log("start flow triggered by 'ask'");
                bbabamStore.startFlow(query);
            }
        }

        if (bbabamFlowStore.step === BBabamFlowStep.INIT) {
            console.log('init');
            if (location.pathname !== '/home') navigate('/home');
            return <HomeScreen />;
        }

        if (
            bbabamFlowStore.step === BBabamFlowStep.STARTING ||
            bbabamFlowStore.step === BBabamFlowStep.CRAWLING
        ) {
            if (location.pathname !== '/ask') {
                console.log('ask');
                navigate({
                    pathname: `/ask`,
                    search: createSearchParams({
                        query: bbabamFlowStore.userInput,
                    }).toString(),
                });
            }

            return <CrawlingScreen />;
        }
        if (bbabamFlowStore.step === BBabamFlowStep.GENERATING) {
            if (location.pathname !== '/ask')
                navigate({
                    pathname: `/ask`,
                    search: createSearchParams({
                        query: bbabamFlowStore.userInput,
                    }).toString(),
                });
            return <GeneratingScreen />;
        }
        if (bbabamFlowStore.step === BBabamFlowStep.Error) {
            if (location.pathname !== '/error') navigate(`/error`);
            return <ErrorScreen />;
        }
        if (bbabamFlowStore.step === BBabamFlowStep.RESULT) {
            if (location.pathname !== '/result')
                navigate({
                    pathname: `/result`,
                    search: createSearchParams({
                        query: bbabamFlowStore.userInput,
                    }).toString(),
                });
            return <ResultScreen />;
        }
        return <div>Unknown step</div>;
    }
);

const AppContent = observer(({ bbabamStore }: { bbabamStore: BBaBamStore }) => {
    const { bbabamFlowStore } = bbabamStore;

    return (
        <BBabamFlowProvider value={bbabamFlowStore}>
            <BBabamFlowContent bbabamFlowStore={bbabamFlowStore} />
        </BBabamFlowProvider>
    );
});

function App() {
    const [bbabamStore] = useState(() => new BBaBamStore());

    useEffect(() => {
        bbabamStore.loadImages();
    }, [bbabamStore]);

    const router = createBrowserRouter([
        {
            path: '/home',
            element: <AppContent bbabamStore={bbabamStore} />,
        },
        {
            path: '/ask',
            element: <AppContent bbabamStore={bbabamStore} />,
        },
        {
            path: '/result',
            element: <AppContent bbabamStore={bbabamStore} />,
        },
        {
            path: '/error',
            element: <AppContent bbabamStore={bbabamStore} />,
        },
        {
            path: '*',
            element: <Navigate to="/home" />,
        },
    ]);

    return (
        <BBabamProvider value={bbabamStore}>
            <RouterProvider router={router} />
        </BBabamProvider>
    );
}

export default App;
