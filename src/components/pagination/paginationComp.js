import React, { Component } from "react";
import "./paginationComp.css";

class paginationComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNumberPage: this.props.currentNumberPage,
      pages: this.props.pages !== undefined ? this.props.pages : [],
      currentShowPages: this.props.currentShowPages,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.pages?.length !== state.pages?.length ||
      props.currentNumberPage !== state.currentNumberPage
    ) {
      return {
        currentShowPages: props.currentShowPages,
        currentNumberPage: props.currentNumberPage,
        pages: props.pages,
      };
    }
    return null;
  }

  setShowPagesInterval = (currentNumberPage) => {
    const { pages } = this.state;
    let currentShowPages = this.state.currentShowPages;
    let lastPage = pages[pages.length - 1] + 1;
    let firstPosition =
      currentNumberPage - 5 < 0
        ? 0
        : lastPage - currentNumberPage < 5
        ? currentNumberPage - 10 + Math.abs(lastPage - currentNumberPage)
        : currentNumberPage - 5;
    let lastPosition = currentNumberPage < 6 ? 10 : currentNumberPage + 5;
    currentShowPages = pages.slice(firstPosition, lastPosition);
    this.setState({
      currentShowPages,
      currentNumberPage,
    });
    this.props.refreshTable(currentNumberPage);
  };

  setButtonPage = (position) => {
    const { pages } = this.state;
    let currentNumberPage = this.state.currentNumberPage;
    let currentShowPages = this.state.currentShowPages;
    currentNumberPage =
      position === "after"
        ? currentShowPages[currentShowPages.length - 1] + 1
        : currentShowPages[currentShowPages.length - 1] - 10;
    let lastPage = pages[pages.length - 1] + 1;
    let firstPosition =
      currentNumberPage - 5 < 0
        ? 0
        : lastPage - currentNumberPage < 5
        ? currentNumberPage - 10 + Math.abs(lastPage - currentNumberPage)
        : currentNumberPage - 5;
    let lastPosition = currentNumberPage < 6 ? 10 : currentNumberPage + 5;
    currentShowPages = pages.slice(firstPosition, lastPosition);
    this.setState({
      currentShowPages,
      currentNumberPage,
    });
    this.props.refreshTable(currentNumberPage);
  };

  render() {
    const { pages, currentShowPages, currentNumberPage } = this.state;

    return (
      <div className="d-flex justify-content-end">
        <span className="px-1">Página</span>
        {pages && currentNumberPage > 5 ? (
          <span
            className={
              currentNumberPage === currentShowPages
                ? "pag-col-page-black"
                : "pag-col-page-blue"
            }
            onClick={() => this.setButtonPage("before")}
          >
            ...
          </span>
        ) : null}
        {currentShowPages
          ? currentShowPages.map((item, i) => {
              const lastIndex = currentShowPages?.length - 1;
              if (
                pages?.[pages?.length - 1] - currentNumberPage > 5 &&
                lastIndex === i
              ) {
                return null;
              }
              if (pages && currentNumberPage > 5 && i === 0) {
                return null;
              }
              return (
                <span
                  className={
                    currentNumberPage === item
                      ? "pag-col-page-black"
                      : "pag-col-page-blue"
                  }
                  onClick={() => this.setShowPagesInterval(item)}
                  key={i}
                >
                  {item + 1}
                </span>
              );
            })
          : null}
        {pages?.[pages?.length - 1] - currentNumberPage > 5 ? (
          <span
            className={
              currentNumberPage === currentShowPages.length
                ? "pag-col-page-black"
                : "pag-col-page-blue"
            }
            onClick={() => this.setButtonPage("after")}
          >
            ...
          </span>
        ) : null}
      </div>
    );
  }
}

export default paginationComp;
