import React, { Component } from "react";
import Newzitem from "./Newzitem";
import Spinner from "./Spinner2.js";
import myimage from "./download.jpg";
import LoadingBar from "react-top-loading-bar";
import InfiniteScroll from "react-infinite-scroll-component";

export default class Newcontainer extends Component {
  articles = [];
  firstcap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    // str.charAt(0).toUpperCase() + str.slice(1)
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      page: 1,
      pageSize: 5,
      loading: false,
      progress: 10,
      totalResults: 0,
    };
    document.title = `${this.firstcap(this.props.category)} -Newz Monkey`;
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  async fetchNewz() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e4614554d174210b46f60703d77890d&page=${this.state.page}&page&pageSize=${this.props.pageSize}`;
    this.setProgress(40);
    this.setState({ loading: true });
    const data = await fetch(url);

    const news = await data.json();

    this.setState({
      // page: this.state.page,
      articles: news.articles,
      totalResults: news.totalResults,
      loading: false,
    });
    this.setProgress(100);
  }
  async componentDidMount() {
    this.fetchNewz();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e4614554d174210b46f60703d77890d&page=${this.state.page}&page&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);

    const news = await data.json();

    this.setState({
      // page: this.state.page,
      articles: this.state.articles.concat(news.articles),

      loading: false,
    });
  };
  handlePrevClick = async () => {
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=6f6d72c8746b45568526fc53d5d7a7d1&page=${
    //   this.state.page - 1
    // }&page&pageSize=${this.props.pageSize}`;
    // const data = await fetch(url);
    // const news = await data.json();
    // this.setState(
    //   {
    //     loading: false,
    //     page: this.state.page - 1,
    //     articles: news.articles,
    //   }
    // ,
    // () => console.log(this.state));
    // Here correct value  of state is reflecting because setState is asyn function  but we have passed console call back function
    await this.setState({ page: this.state.page - 1 });
    await this.fetchNewz();
    // console.log(this.state);
  };
  handleNextClick = async () => {
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=6f6d72c8746b45568526fc53d5d7a7d1&page=${
    //   this.state.page + 1
    // }&page&pageSize=${this.props.pageSize}`;
    // const data = await fetch(url);
    // const news = await data.json();

    // this.setState({
    //   loading: false,
    //   page: this.state.page + 1,
    //   articles: news.articles,
    // });
    //Here previous value of state is reflecting because setState is asyn function  but in handel previous it is reflecting correct coz we passed it as call back function
    // console.log(this.state);
    await this.setState({ page: this.state.page + 1 });
    await this.fetchNewz();
  };

  render() {
    return (
      <>
        <LoadingBar color="red" progress={this.state.progress} />

        <div className="container my-3">
          <h1 style={{ margin: "30px", textAlign: "center", color: "red" }}>
            <b style={{ textDecoration: "underline" }}>
              News Monkey -{" "}
              <i>Top Headlines In {this.firstcap(this.props.category)}</i>
            </b>
          </h1>

          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            // hasMore={this.state.hasMore}
            loader={this.state.loading && <Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((e, i) => {
                  return (
                    <div className="col-md-4 my-3" key={i}>
                      <Newzitem
                        title={
                          e.title === "[Removed]"
                            ? "unknow"
                            : e.title.slice(0, 45)
                        }
                        description={
                          !e.description
                            ? "no description found"
                            : e.description.slice(0, 61)
                        }
                        img={!e.urlToImage ? myimage : e.urlToImage}
                        url={e.url}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
          {/* if we are not using infine loop then we can simply write the code like this to display our news and go to next page below codes for next button  */}
          {/* <div className="row">
            {!this.state.loading &&
              this.state.articles.map((e) => {
                return (
                  <div className="col-md-4 my-3" key={e.url}>
                    <Newzitem
                      title={
                        e.title === "[Removed]"
                          ? "unknow"
                          : e.title.slice(0, 45)
                      }
                      description={
                        !e.description
                          ? "no description found"
                          : e.description.slice(0, 61)
                      }
                      img={!e.urlToImage ? myimage : e.urlToImage}
                      url={e.url}
                    />
                  </div>
                );
              })}
          </div> */}
          {/* Below code and we used state.load for spinner while content is loading after this these apply--> this is showing pagination previous and next button  */}
          {/* {!this.state.loading && (
            <div className="d-flex justify-content-between my-3">
              <button
                disabled={this.state.page <= 1}
                type="button"
                className="btn btn-primary"
                onClick={this.handlePrevClick}
              >
                &larr; Previous
              </button>
              <button
                disabled={
                  this.state.totalResults <=
                  Math.ceil(this.state.page * this.state.pageSize)
                }
                type="button"
                className="btn btn-primary"
                onClick={this.handleNextClick}
              >
                NEXT &rarr;
              </button>
            </div>
          )} */}
        </div>
      </>
    );
  }
}
