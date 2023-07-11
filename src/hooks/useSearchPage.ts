import { usePartList } from "./usePartList";
import { useEffect } from "react";
import { partListSelectors } from "../store/selectors";
import { useTypedSelector } from "./useTypedSelector";
import { partListSliceActions } from "../store/reducers/partListReducer";
import { useAppDispatch } from "./useAppDispatch";

const useSearchPage = (searchString: string) => {
  const { onLoadParts } = usePartList();

  const loadedList = useTypedSelector(partListSelectors.loadedListSelector);
  const appDispatch = useAppDispatch();

  const {
    setSearchStringFilter,
    clearRenderedList,
    clearParentGroupList,
    setSelectedList,
    createParentGroupsList,
  } = partListSliceActions;

  const findData = () => {
    appDispatch(setSearchStringFilter({ searchString: searchString }));
    appDispatch(clearRenderedList());
    appDispatch(clearParentGroupList());
    appDispatch(setSelectedList());
    onLoadParts();
    appDispatch(createParentGroupsList());
  };

  useEffect(() => {
    if (loadedList.length > 0) {
      findData();
    }
  }, [searchString, loadedList]);

  return { findData };
};

export { useSearchPage };
