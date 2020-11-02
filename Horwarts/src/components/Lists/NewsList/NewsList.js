import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './NewsList.module.css';
import * as actions from '../../../store/actions';
import axios from '../../../axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import LayoutScroll from '../../UI/Layouts/LayoutScroll/LayoutScroll';
import Spinner from '../../UI/Spinner/Spinner';

class NewsList extends Component {
  componentDidMount() {
    this.props.onFetchNews();
  }

  storeNewsHandler = () => {
    localStorage.setItem('news', JSON.stringify(this.props.news));
  };

  render() {
    let table = <Spinner />;
    if (!this.props.loading) {
      table = (
        <table>
          <tbody>
            {this.props.news.map((el) => (
              <tr key={el._id}>
                <td>{el.title}</td>
                <td>
                  <NavLink
                    to={this.props.match.path + '/' + el._id}
                    key='edit'
                    onClick={this.storeNewsHandler}
                  >
                    EDIT
                  </NavLink>
                </td>
                <td onClick={() => this.props.onDeleteNews(el._id)}>DELETE</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <LayoutScroll>
        <div className={classes.NewsList}>
          <h1>List of news</h1>
          {table}
        </div>
      </LayoutScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news.news,
    loading: state.news.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchNews: () => dispatch(actions.fetchNews()),
    onDeleteNews: (id) => dispatch(actions.deleteNews(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(NewsList, axios));
