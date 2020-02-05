import React from "react";
import PropTypes from "prop-types";

const FileItem = ({ filename, mimetype }) => {
  return (
    <div className="list-item">
      <div className="left">{filename}</div>
      <div className="right">{mimetype}</div>
    </div>
  );
};

FileItem.propTypes = {
  filename: PropTypes.string.isRequired,
  mimetype: PropTypes.string.isRequired
}

export default FileItem;
