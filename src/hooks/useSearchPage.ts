import { useDispatch } from "react-redux";
import { usePartList } from "./usePartList";
import { partListActions } from "../store/reducers/partListReducer";
import { useEffect } from "react";
import { partListSelectors } from "../store/selectors";
import { useTypedSelector } from "./useTypedSelector";

const useSearchPage = (searchString: string) => {
  const dispatch = useDispatch();
  const { onLoadParts } = usePartList();
  const {
    SET_SEARCH_STRING_FILTER,
    CLEAR_PARENT_GROUP_LIST,
    CLEAR_RENDERED_LIST,
    SET_SELECTED_LIST,
    CREATE_PARENT_GROUPS_LIST,
  } = partListActions;

  const loadedList = useTypedSelector(partListSelectors.loadedListSelector);

  const findData = () => {
    dispatch({
      type: SET_SEARCH_STRING_FILTER,
      payload: { searchString: searchString },
    });
    dispatch({ type: CLEAR_RENDERED_LIST });
    dispatch({ type: CLEAR_PARENT_GROUP_LIST });
    dispatch({ type: SET_SELECTED_LIST });
    onLoadParts();
    dispatch({
      type: CREATE_PARENT_GROUPS_LIST,
    });
  };

  useEffect(() => {
    if (loadedList.length > 0) {
      findData();
    }
  }, [searchString, loadedList]);

  return { findData };
};

export { useSearchPage };
