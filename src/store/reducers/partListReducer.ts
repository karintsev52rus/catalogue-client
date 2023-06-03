import { ISparePart } from "../../types/sparePart";

export interface IState {
  loadedList: ISparePart[] | [];
  renderedList: ISparePart[] | [];
  selectedList: ISparePart[] | [];
  loading: boolean;
  renderCount: number;
  error: { errorText: string } | null;
}

interface IPartListAction {
  type: string;
  payload: {
    partsLoaderLimit?: number;
    partList: ISparePart[];
  };
}

const defaultState: IState = {
  loadedList: [],
  renderedList: [],
  renderCount: 0,
  selectedList: [],
  loading: false,
  error: null,
};

export const partListActions = {
  SET_LOADED_LIST: "SET_LOADED_LIST",
  ADD_LOADED_LIST: "ADD_LOADED_LIST",
  SET_SELECTED_LIST: "SET_SELECTED_LIST",
  ADD_RENDERED_LIST: "ADD_RENDERED_LIST",
  SET_RENDERED_LIST: "SET_RENDERED_LIST",
  CLEAR_RENDERED_LIST: "CLEAR_RENDERED_LIST",
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
};

export const partListReducer = (
  state = defaultState,
  action: IPartListAction
): IState => {
  switch (action.type) {
    case partListActions.SET_LOADED_LIST:
      return {
        ...state,
        loadedList: action.payload.partList,
      };

    case partListActions.CLEAR_RENDERED_LIST:
      return {
        ...state,
        renderedList: [],
      };

    case partListActions.SET_RENDERED_LIST:
      return {
        ...state,
        renderedList: action.payload.partList,
      };

    case partListActions.ADD_RENDERED_LIST:
      let newParts;
      const renderedListLength = state.renderedList.length;
      const selectedListLength = state.selectedList.length;
      const partsLoaderLimit = action.payload.partsLoaderLimit;
      if (selectedListLength - renderedListLength > partsLoaderLimit) {
        newParts = state.selectedList.slice(
          renderedListLength,
          renderedListLength + partsLoaderLimit
        );
      } else {
        newParts = state.selectedList.slice(
          renderedListLength,
          selectedListLength
        );
      }
      return {
        ...state,
        renderedList: [...state.renderedList, ...newParts],
      };

    case partListActions.SET_SELECTED_LIST:
      return {
        ...state,
        selectedList: action.payload.partList,
      };

    case partListActions.START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case partListActions.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
