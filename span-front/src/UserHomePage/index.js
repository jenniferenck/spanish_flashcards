import React, { Component } from 'react';
import LibraryCardList from '../LibraryCardList/index';
import './UserHomePage.css';

class UserHomePage extends Component {
  render() {
    return (
      <>
        <h2 className="section-header">Your most recent libraries:</h2>
        <LibraryCardList />
        <h2 className="section-header">Your other Libraries:</h2>
        <LibraryCardList />
      </>
    );
  }
}

export default UserHomePage;
