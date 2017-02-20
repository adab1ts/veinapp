export enum SearchingStates {
  Waiting,
  HasResults,
  HasNoResults
}
export interface SearchResultState {
  result: SearchingStates;
}

export const INITIAL_SEARCH_RESULT_STATE: SearchResultState = {
  result: SearchingStates.HasResults
};
