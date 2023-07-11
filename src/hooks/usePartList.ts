import { useState, useEffect } from "react";
import { partListSelectors } from "../store/selectors";
import { useTypedSelector } from "./useTypedSelector";
import { partListSliceActions } from "../store/reducers/partListReducer";
import { useAppDispatch } from "./useAppDispatch";

const usePartList = () => {
  const appDispatch = useAppDispatch();
  const partsLoaderLimit = 10;

  const { loaderSelector } = partListSelectors;

  const loading = useTypedSelector(loaderSelector);

  const [partsCount, setPartsCount] = useState(0);

  const { addRenderedList } = partListSliceActions;

  const onLoadParts = () => {
    console.log("add");
    appDispatch(addRenderedList({ partsLoaderLimit: partsLoaderLimit }));
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
