import React, { Component } from "react";
class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  printdata = () => {
    console.log(this.props);
    let d = {};
    d = this.props.location.details;
    var code = "";
    if (d) code = d.code;
    console.log(code);

    return (
      <div class="container ">
        <div class="form-group ">
          <h5 style={{ textAlign: "center" }}>Code</h5>

          <textarea
            autoFocus
            type="text"
            disabled
            class="form-control col-sm-11"
            id="CODE"
            rows="25"
            style={{
              padding: "10px",
              fontWeight: "400",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {code}
          </textarea>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div class="container-fluid ">
        <br />
        <this.printdata />
      </div>
    );
  }
}

export default Code;
