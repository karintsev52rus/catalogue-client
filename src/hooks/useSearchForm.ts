import { useState, useEffect } from "react";
import { partListSelectors } from "../store/selectors";
import { useTypedSelector } from "./useTypedSelector";
import { ISparePart } from "../types/sparePart";
import { useNavigate } from "react-router-dom";
import { usePartList } from "./usePartList";
import { useAppDispatch } from "./useAppDispatch";
import { setLoadedList } from "../store/thunks/partListThunk";
import { partListSliceActions } from "../store/reducers/partListReducer";

const useSearchForm = () => {
  const loadedList = useTypedSelector(partListSelectors.loadedListSelector);

  const searchStringValue = useTypedSelector(
    partListSelectors.searchStringSelector
  ).value;

  const [dropDownList, setDropdownList] = useState([]);
  const [inputValue, setInputValue] = useState(searchStringValue);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { onLoadParts } = usePartList();

  const {
    setSearchStringFilter,
    clearRenderedList,
    setSelectedList,
    createParentGroupsList,
  } = partListSliceActions;

  useEffect(() => {
    if (loadedList.length === 0) {
      appDispatch(setLoadedList());
    }
  }, []);

  useEffect(() => {
    setInputValue(searchStringValue);
  }, [searchStringValue]);

  const findData = () => {
    if (inputValue.length > 0) {
      navigate(`/search/${inputValue}`);
    }
  };

  const onInput: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchPhrase = e.target.value.toLowerCase();
    setInputValue(searchPhrase);

    const searchStringArray = searchPhrase.split(" ");
    if (searchStringArray.length > 1) {
      const result = loadedList.filter((part: ISparePart) => {
        let includes = true;
        searchStringArray.forEach((string) => {
          if (part.title.toLowerCase().indexOf(string.toLowerCase()) < 0) {
            includes = false;
          }
        });
        return includes === true;
      });
      setDropdownList(result);
    } else {
      const filteredData = loadedList.filter((part: ISparePart) => {
        return part.title.toLocaleLowerCase().indexOf(searchPhrase) >= 0;
      });
      setDropdownList(filteredData);
    }

    if (searchPhrase.length === 0) {
      appDispatch(setSearchStringFilter({ searchString: searchPhrase }));
      appDispatch(clearRenderedList());
      appDispatch(setSelectedList());
      onLoadParts();
      appDispatch(createParentGroupsList());
    }
  };

  return { onInput, dropDownList, findData, inputValue, setInputValue };
};

export { useSearchForm };
