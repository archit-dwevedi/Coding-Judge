import React, { Component } from "react";
import Submit from "../../components/SubmitComponent";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../../Pagination.css";
import { Link } from "react-router-dom";
import "./SubmissionList.css";

class SubmissionListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 0,
      submissionsPerPage: 10,
      slug: ``,
      submissionlist: {},
    };
  }
  receivedData = () => {
    var token = localStorage.getItem("token");

    if (token === null) window.open("/login", "_self");
    axios
      .get(`http://localhost:8000/submissions/${this.state.slug}`, {
        headers: {
          authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        const list = data.results;

        const printdata = (
          <div classname="submissionList__table">
            <table
              className="table table-sm table-bordered "
              style={{ color: "black", padding: "10px" }}
            >
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">User</th>
                  <th scope="col">Problem </th>
                  <th scope="col">Language </th>
                  <th scope="col">code</th>
                  <th scope="col">verdict</th>
                </tr>
              </thead>
              <tbody>
                {list.map((object) => (
                  <React.Fragment>
                    <tr key={object.id}>
                      <th scope="row">{object.id}</th>
                      <td scope="row">{object.username}</td>
                      <td scope="row">
                        <Link
                          to={`/problem/${object.problems}`}
                          style={{ color: "black" }}
                        >
                          {object.problem_name}
                        </Link>
                      </td>
                      <td>{object.language}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/submission/${object.id}`,
                            details: { code: object.code },
                          }}
                        >
                          Click
                        </Link>
                      </td>
                      <td>{object.verdict}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        );
        this.setState({
          pageCount: data.count / this.state.submissionsPerPage,
          printdata,
        });
      })
      .catch((error) => {
        window.alert("Error");
        console.log("here in submissions error = ", error);
      });
  };
  componentDidMount() {
    this.receivedData();
  }
  handlePageClick = (e) => {
    const selectedpage = e.selected + 1;
    const slug = `?page=${selectedpage}`;
    this.setState({ slug: slug }, () => this.receivedData());
  };
  render() {
    return (
      <div class="submissionList">
        <h1>Submissions</h1>
        {this.state.printdata}
        <div class="footer">
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
      </div>
    );
  }
}

export default SubmissionListView;
