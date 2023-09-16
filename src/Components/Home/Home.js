import React, { useContext, useState } from "react";
import Image from "../../Assets/google-logo.png";
import Classes from "./Home.module.css";
import { GiAbstract050 } from 'react-icons/gi';
import SearchBar from "../Ui/SearchBar";
import Avatar from "../Ui/Avatar/Avatar";
import { faker } from '@faker-js/faker';
import { useHistory } from "react-router-dom";
import QueryContext from "../../Context/QueryContext";

export default function Home() {
  const Context = useContext(QueryContext);
  const History = useHistory();
  const [Query, setQuery] = useState(Context.Term);
  localStorage.clear();
  const user = {
    avatar: faker.image.avatar(),
    alt: faker.internet.userName()
  }
  const handelSubmit = (event) => {
    event.preventDefault();
    Context.UpdateTerm(Query);
    History.push("/search");
    setQuery("");
  };

  return (
    <div className={`${Classes.home} flex`}>
      <div className={Classes.foot_bottom}>
        <div>
          <div className={`${Classes.header_left} flex`}>
            <div style={{ fontSize: '0.7rem' }} className="flex">
              <div><b>Agile Content </b><span >Frontend test</span></div>

            </div>
          </div>
          <div className={`${Classes.header} flex`}>
            <GiAbstract050 />
            <Avatar imageUrl={user.avatar} altText={user.alt} />
          </div>
          <hr className={`${Classes.hr}`} />
        </div>
      </div>
      <div className={Classes.logo}>
        <img src={Image} alt="google logo" />
      </div>
      <SearchBar />
      <div className={`${Classes.home_box} flex`}>
        <div className="flex">
          <button className={Classes.btn} onClick={handelSubmit}>Buscar</button>
        </div>
      </div>
    </div>
  );
}
