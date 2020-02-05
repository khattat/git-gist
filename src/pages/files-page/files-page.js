import React from "react";
import { Link, withRouter } from "react-router-dom";
import { get, isEmpty } from "lodash";
import Axios from "axios";

import { FileItem, Listing } from "../../components";

class FilesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gist: {}
    };
  }

  componentDidMount() {
    const id = get(this.props, ["match", "params", "id"]);
    const username = get(this.props, ["match", "params", "username"]);
    if (username && id) {
      this.setState({ id, username });
      this.fetchGistInfo(id);
    }
  }

  fetchGistInfo = id => {
    Axios.get(`https://api.github.com/gists/${id}`)
      .then(resp => {
        console.log(resp.data);
        this.setState({ gist: resp.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { gist, username } = this.state;
    if (isEmpty(gist)) return <Link to={`/${username}`}>Back</Link>;

    return (
      <React.Fragment>
        <Link to={`/${username}`}>Back</Link>
        <Listing>
          {Object.keys(gist.files).map(fileKey => (
            <FileItem
              key={gist.id}
              filename={gist.files[fileKey].filename}
              mimetype={gist.files[fileKey].type}
            />
          ))}
        </Listing>
      </React.Fragment>
    );
  }
}


export default withRouter(FilesPage);
