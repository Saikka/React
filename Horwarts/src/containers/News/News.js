import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './News.module.css';
import * as actions from '../../store/actions';
import SmallArticle from '../../components/Article/SmallArticle/SmallArticle';
import BigArticle from '../../components/Article/BigArticle/BigArticle';
import Layout from '../../components/UI/Layouts/Layout/Layout';
import Spinner from '../../components/UI/Spinner/Spinner';

class News extends Component {
  state = {
    showBigArticle: false,
    chosenArticle: null
  };

  componentDidMount() {
    this.props.onFetchNews();
  }

  openBigArticle = (id) => {
    const news = this.props.news.find((el) => el._id === id);
    this.setState({ showBigArticle: true, chosenArticle: news });
  };

  closeBigArticle = () => {
    this.setState({ showBigArticle: false });
  };

  render() {
    let news = <Spinner />;
    if (!this.props.loading) {
      news = this.props.news.map((el) => (
        <SmallArticle
          key={el._id}
          title={el.title}
          clicked={() => this.openBigArticle(el._id)}
        />
      ));
    }
    return (
      <Layout>
        <div className={classes.News}>{news}</div>
        {this.state.showBigArticle ? (
          <BigArticle
            show={this.state.showBigArticle}
            articleClosed={this.closeBigArticle}
            title={this.state.chosenArticle.title}
            content={this.state.chosenArticle.content}
            author={this.state.chosenArticle.author}
          />
        ) : null}
      </Layout>
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
    onFetchNews: () => dispatch(actions.fetchNews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
