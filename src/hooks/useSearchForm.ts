import { useState, useEffect } from "react";
import { partListSelectors } from "../store/selectors";
import { useTypedSelector } from "./useTypedSelector";
import { ISparePart } from "../types/sparePart";
import { partListActions } from "../store/reducers/partListReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPartList } from "../actions/dataActions";

const useSearchForm = () => {
  const loadedList = useTypedSelector(partListSelectors.loadedListSelector);
  const {
    SET_SELECTED_LIST,
    CREATE_PARENT_GROUPS_LIST,
    SET_RENDERED_LIST,
    START_LOADING,
    STOP_LOADING,
  } = partListActions;

  const [dropDownList, setDropdownList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const findData = () => {
    if (inputValue.length === 0) {
      dispatch({ type: SET_SELECTED_LIST });
      return;
    }
    const copyPartList = loadedList.slice(0, loadedList.length);
    const filteredData = copyPartList.filter((item) => {
      return item.title.toLowerCase().indexOf(inputValue) >= 0;
    });

    console.log(filteredData);

    dispatch({ type: SET_SELECTED_LIST });
    dispatch({ type: SET_RENDERED_LIST, payload: { partList: filteredData } });
    dispatch({
      type: CREATE_PARENT_GROUPS_LIST,
    });
    navigate(`/search/${inputValue}`);
  };

  const onInput: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchPhrase = e.target.value.toLowerCase();
    setInputValue(searchPhrase);
    const filteredData = loadedList.filter((part: ISparePart) => {
      return part.title.toLocaleLowerCase().indexOf(searchPhrase) >= 0;
    });
    setDropdownList(filteredData);
  };

  return { onInput, dropDownList, findData };
};

export { useSearchForm };
