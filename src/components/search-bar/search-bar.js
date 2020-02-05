import React from "react";
import PropTypes from "prop-types";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onValueChange = e => {
    this.setState({ value: e.target.value });
  };

  onButtonClick = e => {
    const { onSearch } = this.props;
    const { value } = this.state;
    if (onSearch instanceof Function) onSearch(value);
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.onButtonClick}>
        <div className="full-width">
          <input value={value} onChange={this.onValueChange} />
          <button type="submit">Search</button>
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
};

export default SearchBar;
