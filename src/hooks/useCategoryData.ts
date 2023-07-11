import { useEffect } from "react";
import { usePartList } from "./usePartList";
import { partListSelectors } from "../store/selectors";
import { useTypedSelector } from "./useTypedSelector";
import { useAppDispatch } from "./useAppDispatch";
import { partListSliceActions } from "../store/reducers/partListReducer";

const useCategoryData = (categoryData: string) => {
  const appDispatch = useAppDispatch();
  const { onLoadParts } = usePartList();

  const loadedList = useTypedSelector(partListSelectors.loadedListSelector);
  const loader = useTypedSelector(partListSelectors.loaderSelector);

  const {
    setSearchStringFilter,
    clearParentGroupList,
    clearRenderedList,
    setRootGroupFilter,
    setSelectedList,
    createParentGroupsList,
  } = partListSliceActions;

  useEffect(() => {
    appDispatch(setSearchStringFilter({ searchString: "" }));

    if (loadedList.length > 0 && !loader) {
      appDispatch(clearParentGroupList());
      appDispatch(clearRenderedList());
      appDispatch(setRootGroupFilter({ rootGroup: categoryData }));
      appDispatch(setSelectedList());
      appDispatch(createParentGroupsList());
      onLoadParts();
    }
  }, [loadedList]);

  return;
};

export { useCategoryData };
