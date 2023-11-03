import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISparePart, IPartGroup } from "../../types/sparePart";
import { setLoadedList } from "../thunks/partListThunk";
import { PartListController } from "../controllers/partListController";
import {
  getParentGroups,
  updateParentGroupList,
} from "../controllers/parentGroupController";

export interface IState {
  loadedList: ISparePart[] | [];
  renderedList: ISparePart[] | [];
  selectedList: ISparePart[] | [];
  loading: boolean;
  renderCount: number;
  error: { errorText: string } | null;
  rootGroup: { active: boolean; groupName: string };
  parentGroups: { active: boolean; groups: IPartGroup[] };
  searchString: { active: boolean; value: string };
}

export interface IPartListAction {
  type: string;
  payload: {
    partsLoaderLimit?: number;
    partList: ISparePart[];
    group: IPartGroup;
    rootGroup: string;
    searchString: string;
  };
}

const initialState: IState = {
  loadedList: [],
  renderedList: [],
  renderCount: 0,
  selectedList: [],
  loading: false,
  error: null,
  parentGroups: { active: false, groups: [] },
  rootGroup: { active: false, groupName: "" },
  searchString: { active: false, value: "" },
};

const { sorters, filters } = PartListController;

const partListSlice = createSlice({
  name: "partList",
  initialState,
  reducers: {
    setSelectedList(state: IState) {
      let newSelectedList = state.loadedList;
      filters.forEach((filter) => {
        newSelectedList = filter.filterFunction(newSelectedList, state);
      });

      let sortedList = newSelectedList;
      sorters.forEach((sorter) => {
        sortedList = sorter(newSelectedList);
      });
      state.selectedList = sortedList;
    },

    clearRenderedList(state: IState) {
      state.renderedList = [];
    },

    addRenderedList(
      state: IState,
      action: PayloadAction<{ partsLoaderLimit: number }>
    ) {
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
      state.renderedList = [...state.renderedList, ...newParts];
    },

    setRootGroupFilter(
      state: IState,
      action: PayloadAction<{ rootGroup: string }>
    ) {
      state.rootGroup.active = true;
      state.rootGroup.groupName = action.payload.rootGroup;
    },

    createParentGroupsList(state: IState) {
      const parentGroups = getParentGroups(state.selectedList);
      state.parentGroups.groups = parentGroups;
    },

    setParentGroupList(
      state: IState,
      action: PayloadAction<{ group: IPartGroup }>
    ) {
      const newParentGroups = updateParentGroupList(
        action.payload.group,
        state.parentGroups.groups
      );
      state.parentGroups.active = true;
      state.parentGroups.groups = newParentGroups;
    },

    clearParentGroupList(state: IState) {
      state.parentGroups.active = false;
    },

    setSearchStringFilter(
      state: IState,
      action: PayloadAction<{ searchString: string }>
    ) {
      state.searchString.value = action.payload.searchString;
      state.searchString.active = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(setLoadedList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      setLoadedList.fulfilled,
      (state, action: PayloadAction<Array<ISparePart>>) => {
        state.loading = false;
        state.loadedList = action.payload;
      }
    );
  },
});

const partListSliceActions = partListSlice.actions;
export { partListSliceActions };
export default partListSlice.reducer;
