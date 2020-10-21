import React, { Component } from 'react';

import classes from './SidebarManage.module.css';
import SidebarNestedItem from './SidebarNestedItem/SidebarNestedItem';

class SidebarManage extends Component {
  state = {
    items: [
      { name: 'News', isOpen: false, path: '/manage/news/' },
      { name: 'Quidditch', isOpen: false, path: '/manage/matches/' },
      { name: 'Teachers', isOpen: false, path: '/manage/teachers/' },
      { name: 'Students', isOpen: false, path: '/manage/students/' }
    ]
  };

  openMenuItem = (id) => {
    const updatedItem = {
      ...this.state.items[id],
      isOpen: !this.state.items[id].isOpen
    };
    const updatedItems = [...this.state.items];
    updatedItems[id] = updatedItem;
    this.setState({ items: updatedItems });
  };

  render() {
    const items = this.state.items.map((item, id) => (
      <SidebarNestedItem
        key={item.name}
        name={item.name}
        isOpen={item.isOpen}
        path={item.path}
        clicked={() => this.openMenuItem(id)}
      />
    ));
    return <div className={classes.SidebarManage}>{items}</div>;
  }
}

export default SidebarManage;
