import React, { Component } from "react";

export default class Newzitem extends Component {
  render() {
    let { title, description, img, url } = this.props;

    return (
      <div
        className="card bg-dark text-light"
        style={{ border: "2px solid rgb(101,175,0.5)" }}
      >
        <img src={img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}
