import { ISparePart, IPartGroup } from "../../types/sparePart";

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

interface IPartListAction {
  type: string;
  payload: {
    partsLoaderLimit?: number;
    partList: ISparePart[];
    group: IPartGroup;
    rootGroup: string;
    searchString: string;
  };
}

interface IFilter {
  name: string;
  filterFunction: Function;
}

export const partListActions = {
  SET_LOADED_LIST: "SET_LOADED_LIST",
  ADD_LOADED_LIST: "ADD_LOADED_LIST",
  SET_SELECTED_LIST: "SET_SELECTED_LIST",
  ADD_RENDERED_LIST: "ADD_RENDERED_LIST",
  SET_RENDERED_LIST: "SET_RENDERED_LIST",
  CLEAR_RENDERED_LIST: "CLEAR_RENDERED_LIST",
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
  UPDATE_PARENT_GROUP_LIST: "UPDATE_PARENT_GROUP_LIST",
  SET_ROOT_GROUP_FILTER: "SET_ROOT_GROUP_FILTER",
  CREATE_PARENT_GROUPS_LIST: "CREATE_PARENT_GROUPS_LIST",
  SET_SEARCH_STRING_FILTER: "SET_SEARCH_STRING_FILTER",
  CLEAR_PARENT_GROUP_LIST: "CLEAR_PARENT_GROUP_LIST",
};

const getParentGroups = (partList: ISparePart[]) => {
  let parentGroups: any[] = [];
  if (partList.length > 0) {
    let parentGroupsSet = new Set();
    partList.forEach((part) => {
      parentGroupsSet.add(part.parentGroup);
    });
    let parentGroupsArray = Array.from(parentGroupsSet);
    let selectedPartGroups = parentGroupsArray.map((groupName, index) => {
      return {
        name: groupName,
        checked: false,
        index: index,
      };
    });

    return selectedPartGroups;
  } else return parentGroups;
};

const updateParentGroupList = (group: IPartGroup, groupList: IPartGroup[]) => {
  const { index, name, checked } = group;
  const before = groupList.slice(0, index);
  const after = groupList.slice(index + 1, groupList.length);
  const arr = [...before, { name, index, checked }, ...after];
  return arr;
};

const parentGroupsFilterFunction = (partList: ISparePart[], state: IState) => {
  if (!state.parentGroups.active) {
    return partList;
  }
  const parentGroups = state.parentGroups.groups.filter((group) => {
    return group.checked === true;
  });
  if (parentGroups.length > 0) {
    const filterNames = parentGroups.map((parentGroup) => {
      return parentGroup.name;
    });
    const filteredPartList = partList.filter((part: ISparePart) => {
      return filterNames.includes(part.parentGroup);
    });

    return filteredPartList;
  } else {
    return partList;
  }
};

const parentGroupsFilter: IFilter = {
  name: "parentGroupsFilter",
  filterFunction: parentGroupsFilterFunction,
};

const rootGroupFilterFunction = (partList: ISparePart[], state: IState) => {
  if (state.rootGroup.active) {
    const rootGroup = state.rootGroup;
    const result = partList.filter((part) => {
      return part.rootGroup === rootGroup.groupName;
    });
    return result;
  } else {
    return partList;
  }
};

const rootGroupFilter: IFilter = {
  name: "rootGroupFilter",
  filterFunction: rootGroupFilterFunction,
};

const searchStringFilterFunction = (partList: ISparePart[], state: IState) => {
  if (!state.searchString.active) {
    return partList;
  }
  if (state.searchString.value.length === 0) {
    return partList;
  }
  const copyPartList = partList.slice(0, partList.length);

  const searchStringArray = state.searchString.value.split(" ");
  if (searchStringArray.length > 1) {
    console.log(searchStringArray);
    const result = copyPartList.filter((item) => {
      let includes = true;
      searchStringArray.forEach((string) => {
        if (item.title.toLowerCase().indexOf(string.toLowerCase()) < 0) {
          includes = false;
        }
      });
      return includes === true;
    });
    return result;
  }

  const filteredData = copyPartList.filter((item) => {
    return (
      item.title
        .toLowerCase()
        .indexOf(state.searchString.value.toLowerCase()) >= 0
    );
  });
  return filteredData;
};

const searchStringFilter: IFilter = {
  name: "searchStringFilter",
  filterFunction: searchStringFilterFunction,
};

const titleSort = (a: ISparePart, b: ISparePart) => {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  if (a.title === b.title) {
    return 0;
  }
};

const titleSorter = (partList: ISparePart[]) => {
  return partList.sort(titleSort);
};

const stockSorter = (partList: ISparePart[]) => {
  let notInStock: ISparePart[] = [];
  let inStock: ISparePart[] = [];
  partList.forEach((part) => {
    if (part.quantity === 0) {
      notInStock.push(part);
    } else {
      inStock.push(part);
    }
  });
  const result = [...inStock, ...notInStock];
  return result;
};

const sorters = [titleSorter, stockSorter];

const filters: IFilter[] = [
  rootGroupFilter,
  parentGroupsFilter,
  searchStringFilter,
];

const defaultState: IState = {
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
      let newSelectedList = state.loadedList.slice(
        0,
        state.loadedList.length - 1
      );
      filters.forEach((filter) => {
        newSelectedList = filter.filterFunction(newSelectedList, state);
      });

      let sortedList = newSelectedList;

      sorters.forEach((sorter) => {
        sortedList = sorter(newSelectedList);
      });

      return {
        ...state,
        selectedList: sortedList,
      };

    case partListActions.SET_ROOT_GROUP_FILTER:
      return {
        ...state,
        rootGroup: {
          ...state.rootGroup,
          active: true,
          groupName: action.payload.rootGroup,
        },
      };

    case partListActions.CREATE_PARENT_GROUPS_LIST:
      const parentGroups = getParentGroups(state.selectedList);
      return {
        ...state,
        parentGroups: { ...state.parentGroups, groups: parentGroups },
      };

    case partListActions.UPDATE_PARENT_GROUP_LIST:
      const newParentGroups = updateParentGroupList(
        action.payload.group,
        state.parentGroups.groups
      );
      return {
        ...state,
        parentGroups: {
          ...state.parentGroups,
          groups: newParentGroups,
          active: true,
        },
      };

    case partListActions.CLEAR_PARENT_GROUP_LIST:
      return {
        ...state,
        parentGroups: { ...state.parentGroups, active: false },
      };

    case partListActions.SET_SEARCH_STRING_FILTER:
      return {
        ...state,
        searchString: {
          ...state.searchString,
          active: true,
          value: action.payload.searchString,
        },
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
