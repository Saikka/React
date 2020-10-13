import React, { Component } from 'react';

import classes from './Timetable.module.css';
import LayoutScroll from '../../components/UI/Layouts/LayoutScroll/LayoutScroll';

class Timetalbe extends Component {
  render() {
    return (
      <LayoutScroll>
        <div className={classes.Timetable}>
          <h1>Timetable</h1>
          <table>
            <thead>
              <tr>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thurday</th>
                <th>Friday</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>8.00 - 9.45</td>
              </tr>
              <tr>
                <td>10.00 - 11.45</td>
              </tr>
              <tr>
                <td>13.00 - 14.45</td>
              </tr>
              <tr>
                <td>15.00 - 16.45</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LayoutScroll>
    );
  }
}

export default Timetalbe;
