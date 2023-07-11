import { IState } from "../reducers/partListReducer";
import { ISparePart, IPartGroup } from "../../types/sparePart";

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

const getParentGroups = (partList: ISparePart[]): IPartGroup[] => {
  let parentGroups: any[] = [];
  if (partList.length > 0) {
    const partGroupsNames = partList.map((part) => {
      return part.parentGroup;
    });
    let parentGroupsSet = new Set(partGroupsNames);
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

const updateParentGroupList = (
  group: IPartGroup,
  groupList: IPartGroup[]
): IPartGroup[] => {
  const { index, name, checked } = group;
  const before = groupList.slice(0, index);
  const after = groupList.slice(index + 1, groupList.length);
  const arr = [...before, { name, index, checked }, ...after];
  return arr;
};

export { parentGroupsFilterFunction, getParentGroups, updateParentGroupList };
