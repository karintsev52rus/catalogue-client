interface IFilter {
  name: string;
  filterFunction: Function;
}

interface IPartListController {
  filters: IFilter[];
  sorters: Function[];
}
