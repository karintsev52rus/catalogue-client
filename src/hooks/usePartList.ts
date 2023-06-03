import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { partListActions } from "../store/reducers/partListReducer";
import { partListSelectors } from "../store/selectors";
import { useTypedSelector } from "./useTypedSelector";

const usePartList = () => {
  const dispatch = useDispatch();

  const partsLoaderLimit = 10;

  const { ADD_RENDERED_LIST } = partListActions;

  const { loaderSelector } = partListSelectors;

  const loading = useTypedSelector(loaderSelector);

  const [partsCount, setPartsCount] = useState(0);

  const onLoadParts = () => {
    console.log("add");
    dispatch({
      type: ADD_RENDERED_LIST,
      payload: { partsLoaderLimit: partsLoaderLimit },
    });
  };

  const onScrollEnd = () => {
    setPartsCount((prevCount) => prevCount + partsLoaderLimit);
  };

  useEffect(() => {
    if (!loading) {
      onLoadParts();
    }
  }, [partsCount]);

  return {
    onScrollEnd,
    setPartsCount,
    onLoadParts,
  };
};

export { usePartList };
