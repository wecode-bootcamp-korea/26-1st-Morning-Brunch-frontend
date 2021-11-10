import React, { Component } from 'react';
import './Bloglist.scss';

class Bloglist extends Component {
  render() {
    const { title, subtitle, articlecontent, img } = this.props;
    return (
      <li className="blogList">
        <div className="post">
          <strong className="title">{title}</strong>
          <div className="wrapContent">
            <span className="subTitle">{subtitle}</span>
            <span className="icoBar">|</span>
            <span className="articleContent">{articlecontent}</span>
          </div>
        </div>
        <img className="coverImg" src={img} alt="coverimg" />
      </li>
    );
  }
}

export default Bloglist;