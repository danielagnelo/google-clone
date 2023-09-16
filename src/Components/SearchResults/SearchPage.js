import React from 'react';
import Classes from './Search.module.css';
import logo from '../../Assets/google-logo.png';
import SearchBar from '../Ui/SearchBar';

import Avatar from "../Ui/Avatar/Avatar";
import { GiAbstract050 } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';

function SearchPage() {
  const user = {
    avatar: faker.image.avatar(),
    alt: faker.internet.userName()
  }
  return (
    <div>
      <div className={Classes.header}>
        <div className={Classes.header__box + ' flex'}>
          <div className={Classes.header__left + ' flex'}>
            <Link to='/'>
              <img src={logo} alt='logo' />
            </Link>
            <SearchBar />
          </div>
          <div className={Classes.Header__right + ' flex'} >
            <GiAbstract050 style={{ cursor: 'pointer' }} />
            <Avatar imageUrl={user.avatar} altText={user.alt} />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default SearchPage;
