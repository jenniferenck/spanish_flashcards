import React, { Component } from 'react';
import './LibraryCardItem.css';
 
    class LibraryCardItem extends Component {
        render() {
            return(
                <div className="library-card">
                    <h3>Insert Library Name Here</h3>
                    <p>Insert a short description of the library contents</p>
                </div>
            );
        }
    }
 
export default LibraryCardItem;