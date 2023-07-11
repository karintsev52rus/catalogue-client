import { IState } from "../reducers/partListReducer";
import { ISparePart } from "../../types/sparePart";
import { stockSorter, titleSorter } from "./sortController";
import { searchStringFilterFunction } from "./searchStringController";
import { rootGroupFilterFunction } from "./rootGroupController";
import { parentGroupsFilterFunction } from "./parentGroupController";

interface IFilter {
  name: string;
  filterFunction: (partList: ISparePart[], state: IState) => ISparePart[];
}

type Sorter = (partList: ISparePart[]) => ISparePart[];

interface IPartListController {
  filters: IFilter[];
  sorters: Sorter[];
}

const searchStringFilter: IFilter = {
  name: "searchStringFilter",
  filterFunction: searchStringFilterFunction,
};

const rootGroupFilter: IFilter = {
  name: "rootGroupFilter",
  filterFunction: rootGroupFilterFunction,
};

const parentGroupsFilter: IFilter = {
  name: "parentGroupsFilter",
  filterFunction: parentGroupsFilterFunction,
};

export const PartListController: IPartListController = {
  filters: [rootGroupFilter, parentGroupsFilter, searchStringFilter],
  sorters: [titleSorter, stockSorter],
};
