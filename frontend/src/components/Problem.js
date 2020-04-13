import React, { Component } from "react";
import { connect } from "react-redux";
import Pages from "./Pagination";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "../Pagination.css";

class Problems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pageCount: 1,
      problemsPerPage: 10,
      currentPage: 0,
      slug: ``,
      next: "",
      prev: "",
    };
  }

  receivedData() {
    axios
      .get(`http://127.0.0.1:8000/problem/${this.state.slug}`)
      .then((res) => {
        const data = res.data;
        const slice = data.results;
        const postData = (
          <table className="table table-hover table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Frequency</th>
                <th scope="col">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((object) => (
                <React.Fragment>
                  <tr key={object.id}>
                    <th scope="row">{object.id}</th>
                    <td
                      onClick={() =>
                        window.open(
                          `http://127.0.0.1:3000/problem/${object.id}`,
                          "_self"
                        )
                      }
                    >
                      {object.problem_name}
                    </td>
                    <td>Frequency</td>
                    <td>{object.problem_level}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        );

        this.setState({
          pageCount: data.count / this.state.problemsPerPage,
          next: data.next,
          prev: data.prev,

          postData,
        });
      });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    const slug = `?page=${selectedPage}`;
    this.setState(
      {
        currentPage: selectedPage,
        slug: slug,
      },
      () => {
        this.receivedData();
      }
    );
  };
  componentDidMount() {
    this.receivedData();
  }

  render() {
    return (
      <div>
        {this.state.postData}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default Problems;

/*<div>
        <table className="table table-hover table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Frequency</th>
              <th scope="col">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((object) => {
              return (
                <tr key={object.problem_id}>
                  <th scope="row">{object.problem_id}</th>
                  <td
                    onClick={() =>
                      window.open(
                        `http://127.0.0.1:3000/problem/${object.problem_id}`,
                        "_self"
                      )
                    }
                  >
                    {object.problem_name}
                  </td>
                  <td>Frequency</td>
                  <td>{object.problem_level}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>*/
