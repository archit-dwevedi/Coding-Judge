import React, { Component } from "react";
import Problems from "./Problem";
const Pages = (props) => {
  console.log(props);
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="/problems/page1">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="/problems/page2">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="/problems/page3">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="/problems/next">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pages;
