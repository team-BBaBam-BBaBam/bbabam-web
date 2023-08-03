import { useState } from 'react';
import HomeViewModel from './vm/home_view_model';
import HomeView from './view/HomeView';

function HomeScreen() {
    const [homeViewModel] = useState(() => new HomeViewModel());

    return <HomeView homeViewModel={homeViewModel} />;
}

export default HomeScreen;
