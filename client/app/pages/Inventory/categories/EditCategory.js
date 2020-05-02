import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../../constants/hoc/_Aux";
import middleware from "../../../../middleware";
import { Card, Alert } from "react-bootstrap";
import AddCategory from "./AddCategory";

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props
      .dispatch(middleware("categories").getSingle(this.props.match.params.id))
      .then(res => {
        this.setState({
          category: res.data
        });
      })
      .catch(error => {
        this.setState({
          error: error
        });
      });
  }
  render() {
    return (
      <Aux>
        {this.state.category ? (
          <AddCategory category={this.state.category[0]} edit={true} />
        ) : (
          <Card>
            <Card.Header>
              {this.state.error ? (
                <Alert variant="danger">{this.state.error.toString()}</Alert>
              ) : (
                "Loading..."
              )}
            </Card.Header>
          </Card>
        )}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    category: state.categories.data
  };
};
export default connect(mapStateToProps)(EditCategory);
