import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '../Button/Button';
import Header from '../Header/Header';
import './Nav.scss';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      isHamburgerClicked: false,
      userLists: {},
    };
    this.hamburgerRef = React.createRef();
  }

  handleUserData() {
    fetch('/data/userData.json')
      .then(res => res.json())
      .then(data =>
        this.setState({
          userLists: data,
        })
      );
  }

  moveToContent = link => {
    const { history } = this.props;
    history.push(`${link}`);
  };

  handleClickOutside = event => {
    const condition = this.hamburgerRef.current.contains(event.target);
    this.setState({
      isHamburgerClicked: condition ? true : false,
    });
  };

  handleClick = () => {
    const { isHamburgerClicked } = this.state;
    this.setState({ isHamburgerClicked: !isHamburgerClicked });
  };

  handleNavStop = e => {
    e.stopPropagation();
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.handleUserData();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const { isHamburgerClicked, userLists } = this.state;
    const { userImg, userNickName, content } = userLists;

    return (
      <nav className="nav">
        <Header
          onClick={this.handleClick}
          targetHamburger={this.hamburgerRef}
        />
        <div
          className={`popup ${isHamburgerClicked ? '' : 'hide'}`}
          onMouseDown={this.handleNavStop}
          id="slideNav"
        >
          <div className="userInfo">
            <div className="infoWrapper">
              <div
                className="userImg"
                style={{
                  backgroundImage: `url(${userImg})`,
                }}
              />
              <h4>{userNickName}</h4>
              <p>{content}</p>
            </div>
          </div>
          <div className="mainNav">
            <div>
              <Link to="/main">브런치 홈</Link>
            </div>
            <div>
              <Link to="/mypage">내 브런치</Link>
            </div>
          </div>
          <div className="buttonWrapper">
            <div
              className="hotTopic"
              onClick={() => {
                this.moveToContent('/articles');
              }}
            >
              <h4>
                지금-핫한 <br />
                게시물 보러가기
              </h4>
            </div>
            <div className="settings">
              <Button
                text="설정"
                onClick={() => this.moveToContent('/mypage')}
              />
              <Button
                text="로그아웃"
                onClick={() => this.moveToContent('/login')}
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
