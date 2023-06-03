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

  const { SET_SELECTED_LIST } = partListActions;

  const loadedList = useTypedSelector(partListSelectors.loadedListSelector);
  const loader = useTypedSelector(partListSelectors.loaderSelector);

  const getCategoryData = (categoryData: string, allData: ISparePart[]) => {
    const resultData = allData.filter((SP) => {
      return SP.rootGroup === categoryData;
    });
    console.log(resultData);
    return resultData;
  };

  useEffect(() => {
    if (loadedList.length > 0 && !loader) {
      dispatch({
        type: SET_SELECTED_LIST,
        payload: { partList: getCategoryData(categoryData, loadedList) },
      });
      onLoadParts();
    }
  }, [loadedList]);

  return;
};

export { useCategoryData };
