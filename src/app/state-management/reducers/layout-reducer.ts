import * as layout from '../actions/layout-action';
import { INITIAL_LAYOUT_STATE, LayoutState } from '../states/layout-state';

export function reducer(state = INITIAL_LAYOUT_STATE, action: layout.Actions): LayoutState {
  switch (action.type) {
    case layout.ActionTypes.CLOSE_SIDENAV:
      return {
        showSidenav: false
      };

    case layout.ActionTypes.OPEN_SIDENAV:
      return {
        showSidenav: true
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: LayoutState) => state.showSidenav;
