import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Axios from "axios";

class GistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.fetchForkUsers();
  }

  fetchForkUsers = () => {
    const { forkUrl } = this.props;
    Axios.get(forkUrl)
      .then(response => {
        let sortedData = response.data.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        let recentThreeData = sortedData.reverse().splice(0,3);
        this.setState({ users: recentThreeData.map(el => el.owner.login) });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { id, name, username } = this.props;
    const { users } = this.state;
    return (
      <Link key={name} to={`${username}/${id}`}>
        <div className="left">{name}</div>
        <div className="right">{users.join()}</div>
      </Link>
    );
  }
}

GistItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  forkUrl: PropTypes.string.isRequired
};

export default GistItem;
