import { useEffect } from "react";
import { getPartList } from "../actions/dataActions";
import { useDispatch } from "react-redux";
import { partListActions } from "../store/reducers/partListReducer";
import { usePartList } from "./usePartList";
import { partListSelectors } from "../store/selectors";
import { useTypedSelector } from "./useTypedSelector";
import { ISparePart } from "../types/sparePart";
const useCategoryData = (categoryData: string) => {
  const dispatch = useDispatch();
  const { onLoadParts } = usePartList();

  const {
    SET_SELECTED_LIST,
    CREATE_PARENT_GROUPS_LIST,
    SET_ROOT_GROUP_FILTER,
    SET_SEARCH_STRING_FILTER,
    CLEAR_PARENT_GROUP_LIST,
    CLEAR_RENDERED_LIST,
  } = partListActions;

  const loadedList = useTypedSelector(partListSelectors.loadedListSelector);
  const loader = useTypedSelector(partListSelectors.loaderSelector);

  useEffect(() => {
    dispatch({ type: SET_SEARCH_STRING_FILTER, payload: { searchString: "" } });

    if (loadedList.length > 0 && !loader) {
      dispatch({ type: CLEAR_PARENT_GROUP_LIST });
      dispatch({ type: CLEAR_RENDERED_LIST });

      dispatch({
        type: SET_ROOT_GROUP_FILTER,
        payload: { rootGroup: categoryData },
      });

      dispatch({
        type: SET_SELECTED_LIST,
      });

      dispatch({
        type: CREATE_PARENT_GROUPS_LIST,
      });
      onLoadParts();
    }
  }, [loadedList]);

  return;
};

export { useCategoryData };
