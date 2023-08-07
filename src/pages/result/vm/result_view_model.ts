import { makeAutoObservable } from 'mobx';
import BBabamFlowStore from '../../../stores/bbabam_flow_store';
import BBaBamStore from '../../../stores/bbabam_store';
import { PlaceImageCardData } from '../../../services/bbabam_assets_service';

class ResultViewModel {
    isSearchBarActive = false;

    isExploringAssociatedKeywords = false;

    currentShortKeyword = '';

    currentLongKeyword = '';

    searchBarText = '';

    bbabamFlowStore: BBabamFlowStore;

    bbabamStore: BBaBamStore;

    selectedGallary: PlaceImageCardData | null = null;

    constructor(bbabanFlowStore: BBabamFlowStore, bbabamStore: BBaBamStore) {
        this.bbabamFlowStore = bbabanFlowStore;
        this.bbabamStore = bbabamStore;

        this.searchBarText = this.bbabamFlowStore.userInput;
        makeAutoObservable(this);
    }

    setSearchBarActive(isActive: boolean) {
        this.isSearchBarActive = isActive;
    }

    setSearchBarText(text: string) {
        if (this.isExploringAssociatedKeywords) {
            this.isExploringAssociatedKeywords = false;
            this.currentShortKeyword = '';
            this.currentLongKeyword = '';
        }
        this.searchBarText = text;
    }

    search() {
        if (this.searchBarText.trim() === '') {
            return;
        }
        this.bbabamStore.startFlow(this.searchBarText);
    }

    selectNextLongKeyword() {
        if (this.isExploringAssociatedKeywords) {
            const keywords = this.bbabamFlowStore.associatedKeywords.find(
                (associatedKeyword) =>
                    associatedKeyword.keyword === this.currentShortKeyword
            )?.queries;

            if (keywords) {
                const index = keywords.indexOf(this.currentLongKeyword);
                if (index < keywords.length - 1) {
                    this.currentLongKeyword = keywords[index + 1];
                } else {
                    // eslint-disable-next-line prefer-destructuring
                    this.currentLongKeyword = keywords[0];
                }

                this.searchBarText = this.currentLongKeyword;
            }
        }
    }

    selectPrevLongKeyword() {
        if (this.isExploringAssociatedKeywords) {
            const keywords = this.bbabamFlowStore.associatedKeywords.find(
                (associatedKeyword) =>
                    associatedKeyword.keyword === this.currentShortKeyword
            )?.queries;

            if (keywords) {
                const index = keywords.indexOf(this.currentLongKeyword);
                if (index > 0) {
                    this.currentLongKeyword = keywords[index - 1];
                } else {
                    // eslint-disable-next-line prefer-destructuring
                    this.currentLongKeyword = keywords[keywords.length - 1];
                }

                this.searchBarText = this.currentLongKeyword;
            }
        }
    }

    selectShortKeyword(keyword: string) {
        if (
            this.isExploringAssociatedKeywords &&
            this.currentShortKeyword === keyword
        ) {
            this.selectPrevLongKeyword();
            return;
        }

        const findedKeyword = this.bbabamFlowStore.associatedKeywords.find(
            (associatedKeyword) => associatedKeyword.keyword === keyword
        );

        if (!findedKeyword) {
            return;
        }

        this.isExploringAssociatedKeywords = true;
        this.currentShortKeyword = keyword;
        // eslint-disable-next-line prefer-destructuring
        this.currentLongKeyword = findedKeyword.queries[0];
        this.searchBarText = this.currentLongKeyword;
    }

    selectPlaceGallery(place: PlaceImageCardData) {
        this.selectedGallary = place;
    }

    consumeSelectedGallery() {
        this.searchBarText = this.selectedGallary?.english_title || '';
        this.selectedGallary = null;
    }
}

export default ResultViewModel;
