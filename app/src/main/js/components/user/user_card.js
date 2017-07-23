import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ITEM } from '../../consts/types';
import rantscript from '../../consts/rantscript';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    const { userID } = this.props;
    if (userID) {
      rantscript.profile(userID)
        .then((res) => {
          this.setState({ user: res });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  openProfile() {
    this.props.open(ITEM.PROFILE.NAME, this.props.userID);
  }
  getUser() {
    const user = this.state.user;

    let imageSource = 'res/images/invis.png';
    if (user.avatar.i) {
      imageSource = `https://avatars.devrant.io/${user.avatar.i.replace('c-1', 'c-3').replace('png', 'jpg')}`;
    }

    return (
      <div className="user_details">
        <div style={{ position: 'relative', display: 'flex' }}>
          <div className="image">
            <img alt="" src={imageSource} style={{ background: `#${user.avatar.b}` }} />
          </div>
          {this.state.userCardOpen ?
            <UserCard userID={user.id} closeCard={() => this.closeCard()} /> : null}
          <div className="details">
            <p>{user.username}</p>
            <span
              className="score"
              style={{ backgroundColor: 'rgb(84, 85, 110)' }}
            >{user.score}</span>
            {user.dpp === 1 && <span
              className="score"
              style={{ background: `#${user.avatar.b}` }}
            ><span>Supporter</span></span>}
          </div>
        </div>

        <div className="user_details_desc">
          <ul>
            { user.about !== '' && <li><i className="ion-person" /><p>{user.about}</p></li>}
            { user.skills !== '' && <li><i className="ion-code" /><p>{user.skills}</p></li>}
            { user.location !== '' && <li><i className="ion-ios-location" /><p>{user.location}</p></li>}
            { user.github !== '' && <li><i className="ion-social-github" /><p>{user.github}</p></li>}
            { user.website !== '' && <li><i className="ion-earth" /><p>{user.website}</p></li>}
          </ul>
        </div>

        <button
          className="user_openprofile"
          style={{ backgroundColor: `#${user.avatar.b}` }}
          onClick={() => this.openProfile()}
        >Open Profile</button>
      </div>
    );
  }
  render() {
    if (!this.state.user) {
      return <div />;
    }
    return (
      <div className="user_card" id="user_card">
        <div
          className="close"
          onClick={() => this.props.closeCard()}
        ><p><i className="ion-android-close" /></p></div>
        {
          this.getUser()
        }
      </div>
    );
  }
}

UserCard.propTypes = {
  userID: PropTypes.number.isRequired,
  closeCard: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
};

export default UserCard;
