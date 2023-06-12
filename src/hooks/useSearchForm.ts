import { useState, useEffect } from "react";
import { partListSelectors } from "../store/selectors";
import { useTypedSelector } from "./useTypedSelector";
import { ISparePart } from "../types/sparePart";
import { partListActions } from "../store/reducers/partListReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPartList } from "../actions/dataActions";
import { usePartList } from "./usePartList";

const useSearchForm = () => {
  const loadedList = useTypedSelector(partListSelectors.loadedListSelector);

  const {
    SET_SELECTED_LIST,
    CREATE_PARENT_GROUPS_LIST,
    START_LOADING,
    STOP_LOADING,
    SET_SEARCH_STRING_FILTER,
    CLEAR_RENDERED_LIST,
    CLEAR_PARENT_GROUP_LIST,
  } = partListActions;

  const searchStringValue = useTypedSelector(
    partListSelectors.searchStringSelector
  ).value;

  const [dropDownList, setDropdownList] = useState([]);
  const [inputValue, setInputValue] = useState(searchStringValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { onLoadParts } = usePartList();

  useEffect(() => {
    if (loadedList.length === 0) {
      dispatch({ type: START_LOADING });
      getPartList().then((data) => {
        dispatch({
          type: partListActions.SET_LOADED_LIST,
          payload: { partList: data },
        });
        dispatch({ type: STOP_LOADING });
      });
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
      dispatch({
        type: SET_SEARCH_STRING_FILTER,
        payload: { searchString: searchPhrase },
      });

      dispatch({ type: CLEAR_RENDERED_LIST });
      dispatch({ type: SET_SELECTED_LIST });
      onLoadParts();
      dispatch({
        type: CREATE_PARENT_GROUPS_LIST,
      });
    }
  };

  return { onInput, dropDownList, findData, inputValue };
};

export { useSearchForm };
