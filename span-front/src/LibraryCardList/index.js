import React, { Component } from 'react';
import LibraryCardItem from '../LibraryCardItem/index';
import './LibraryCardList.css';

class LibraryCardList extends Component {
  render() {
    return (
      <div className="library-list">
        <LibraryCardItem />
        <LibraryCardItem />
        <LibraryCardItem />
      </div>
    );
  }
}

export default LibraryCardList;
