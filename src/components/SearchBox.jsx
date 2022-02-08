const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        id="search"
        placeholder="search here"
        value={props.value}
        onChange={(e) => props.setSearchValue(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBox;
