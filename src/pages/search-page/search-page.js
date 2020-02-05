import React from "react";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import Axios from "axios";

import { GistItem, Listing, SearchBar } from "../../components";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gists: []
    };
  }

  componentDidMount() {
    const username = get(this.props, ["match", "params", "username"]);
    if (username) {
      this.setState({ username });
      this.fetchGistsForUser(username);
    }
  }

  fetchGistsForUser = username => {
    Axios.get(`https://api.github.com/users/${username}/gists`)
      .then(resp => {
        console.log(resp.data);
        this.setState({ gists: resp.data });
      })
      .catch(err => console.log(err));
  };

  extractGistName = gist => {
    // files are not in form of array rather they are in form of dictionary.
    // And Git itself uses the name of first file as the name of Gist.
    // So I am just following the same pattern.
    let firstFileName = Object.keys(gist.files)[0];
    return gist.files[firstFileName].filename;
  };

  onSearch = value => {
    this.props.history.push(`/${value}`);
  };

  render() {
    const { gists, username } = this.state;
    const shortGists = gists.splice(0,2);
    return (
      <React.Fragment>
        <SearchBar onSearch={this.onSearch} />
        {gists.length > 0 && (
          <Listing>
            {shortGists.map(gist => (
              <GistItem
                key={gist.id}
                id={gist.id}
                name={this.extractGistName(gist)}
                username={username}
                forkUrl={gist.forks_url}
              />
            ))}
          </Listing>
        )}
      </React.Fragment>
    );
  }
}


export default withRouter(SearchPage);
