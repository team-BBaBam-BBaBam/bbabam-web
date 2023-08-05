import { useState } from 'react';
import { useBBabamFlow } from '../../hooks/bbabam_flow_provider';
import ResultView from './view/ResultView';
import ResultViewModel from './vm/result_view_model';
import { useBBabam } from '../../hooks/bbabam_provier';

function ResultScreen() {
    const bbabamFlowStore = useBBabamFlow();
    const bbabamStore = useBBabam();

    const [resultViewModel] = useState(
        () => new ResultViewModel(bbabamFlowStore, bbabamStore)
    );

    return <ResultView resultViewModel={resultViewModel} />;
}

export default ResultScreen;
