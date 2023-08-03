import {makeAutoObservable} from "mobx";

class HomeViewModel {
    isWhatIsBBaBamVisible = true;
    
    isSearchActive = false;

    searchInput = "";

    constructor(){
        makeAutoObservable(this); 
    }

    showWhatIsBBaBam(){
        this.isWhatIsBBaBamVisible = true;
    }

    hideWhatIsBBaBam(){
        this.isWhatIsBBaBamVisible = false;
    }

    activateSearch(){
        this.isSearchActive = true;
    }

    deactivateSearch(){
        this.isSearchActive = false;
    }

    setSearchInput(input: string){
        this.searchInput = input;
    }
}

export default HomeViewModel;