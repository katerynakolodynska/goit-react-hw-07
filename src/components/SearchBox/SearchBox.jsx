import s from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();
  return (
    <div className={s.search}>
      <p className={s.text}>Find contacts by name</p>
      <input
        type="text"
        name="username"
        className={s.input}
        value={value}
        onChange={(event) => dispatch(changeFilter(event.target.value))}
      />
    </div>
  );
};

export default SearchBox;
