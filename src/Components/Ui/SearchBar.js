import React, { useContext, useState } from "react";
import Classes from "./SearchBar.module.css";
import { useHistory } from "react-router-dom";
import QueryContext from "../../Context/QueryContext";
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

function SearchBar(props) {
  const Context = useContext(QueryContext);
  const History = useHistory();
  const [Query, setQuery] = useState(Context.Term);
  const handelSubmit = (event) => {
    event.preventDefault();
    Context.UpdateTerm(Query);
    History.push("/search");
  };
  const HandelChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <form onSubmit={handelSubmit}>
      <div className={Classes.Search_Box + " flex"}>
        <div>
          <AiOutlineSearch style={{ marginLeft: '-10%' }} />
        </div>
        <input type="search" value={Query} onChange={HandelChange} autoFocus />
        <div>
          <IoMdClose style={{ marginLeft: '10%', cursor: 'pointer' }} onClick={() => setQuery('')} />
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
