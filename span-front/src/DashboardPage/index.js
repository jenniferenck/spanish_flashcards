import React, { Component } from 'react';
import LibrariesTable from './LibrariesTable';
import CardsTable from './CardsTable';

/** Displays 2 tables:
 * 
 * Table #1: Libraries with the following columns (uses pagination to show top 10): 
 *  1. Library Name
 *  2. Last Active Date
 *  3. Number of Cards in Library
 *  4. Short description of Library
 *  5. Created dated.  
 * 
 * Table #2: All cards - use pagination to only show top 20
 *  1. Card Name
 *  2. Definition
 *  3. Library Name
 *  4. Last flagged date (if applicable)
 *  5. Last Active Date
 *  6. Date Created
*/
class DashBoard extends Component {
  render() {
    return (
      <div>
        <LibrariesTable />
        <CardsTable />
      </div>
    );
  }
}

export default DashBoard;
