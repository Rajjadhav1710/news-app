import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    console.log("Constructor");
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72b6acab7efe4bc1879f303e12209b14&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(data);//data is a promise
    console.log(parsedData);
    this.setState({
      // page: pageNo,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    console.log("from componentDidMount");

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72b6acab7efe4bc1879f303e12209b14&pageSize=${this.props.pageSize}`;

    // this.setState({ loading: true });

    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(data);//data is a promise
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // });
    this.updateNews();
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72b6acab7efe4bc1879f303e12209b14&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

    // this.setState({ loading: true });

    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(data);//data is a promise
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // });

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handleNextClick = async () => {

    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    // } else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72b6acab7efe4bc1879f303e12209b14&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    //   this.setState({ loading: true });

    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   // console.log(data);//data is a promise
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   });
    // }

    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72b6acab7efe4bc1879f303e12209b14&page=${this.state.page}&pageSize=${this.props.pageSize}`;


    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(data);//data is a promise
    console.log(parsedData);
    this.setState({
      // page: pageNo,
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  };

  render() {
    console.log("from render()");
    return (
      <>
        <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                // console.log(element);
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://cdn.pixabay.com/photo/2017/06/26/19/32/news-2444888_1280.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}

            </div>
          </div>

        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>

    )
  }
}
