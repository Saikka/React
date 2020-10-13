import React, { Component } from 'react';
import classes from './News.module.css';

import SmallArticle from '../../components/Article/SmallArticle/SmallArticle';
import BigArticle from '../../components/Article/BigArticle/BigArticle';
import Layout from '../../components/UI/Layouts/Layout/Layout';

class News extends Component {
  state = {
    showBigArticle: false
  };

  openBigArticle = () => {
    this.setState({ showBigArticle: true });
  };

  closeBigArticle = () => {
    this.setState({ showBigArticle: false });
  };

  render() {
    return (
      <Layout>
        <div className={classes.News}>
          <SmallArticle
            title='Quidditch match is next friday!'
            clicked={this.openBigArticle}
          />
          <SmallArticle
            title='Exams are starting in 2 weeks!'
            clicked={this.openBigArticle}
          />
        </div>
        <BigArticle
          show={this.state.showBigArticle}
          articleClosed={this.closeBigArticle}
          title='Quidditch match is next friday!'
        />
      </Layout>
    );
  }
}

export default News;
