import React, { Component } from "react";
import Aux from "../../../constants/hoc/_Aux";
import CustomCard from "../../../components/CustomCard";
import { Tabs, Tab, Row, Col, Form, Alert, Button } from "react-bootstrap";
import FormInput from "../../../components/FormInput/Index";
import { connect } from "react-redux";
import axios from "../../../../Services/Http";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Required from "../../../components/Required";
import DatePicker from "react-datepicker";
import middleware from "../../../../middleware";
import CustomSelect from "../../../components/CustomSelect.js";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      tax: "",
      discount: "",
      categoryDescription: "",
      parent_ref_id: {},
      edit: "",
      error: "",
      isValidate: false,
      categories: []
    };
  }

  componentDidMount() {
    if (this.props.edit && this.props.category) {
      this.setState({
        ...this.props.category
      });
    }

    axios
      .get("/categories")
      .then(res => {
        if (this.props.edit) {
          let category = this.props.category;
          let parent_ref_id = category.parent_ref_id
            ? res.data.filter(c => c.id === category.parent_ref_id)
            : {};
          this.setState({
            parent_ref_id
          });
        }
        this.setState({
          categories: res.data
        });
      })
      .catch(err => {
        this.setState({
          categoryError: err.data.toString()
        });
      });
  }

  resetForm = () => {
    this.setState({
      categoryName: "",
      tax: "",
      discount: "",
      categoryDescription: "",
      parent_ref_id: "",
      edit: "",
      error: "",
      isValidate: false
    });
  };

  handleStartDate = date => {
    this.setState({
      promotional_start_date: date
    });
  };

  handleEndDate = date => {
    this.setState({
      promotional_end_date: date
    });
  };

  handleCategory = e => {
    const parent_ref_id = e;
    this.setState(() => ({ parent_ref_id }));
  };

  handleInput = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      success: undefined,
      categoryError: undefined
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      error: undefined
    });

    if (this.props.edit && this.props.category) {
      this.props
        .dispatch(
          middleware("categories").update(
            {
              categoryName: this.state.categoryName,
              categoryDescription: this.state.categoryDescription,
              parent_ref_id: this.state.parent_ref_id.value
            },
            `/${this.props.category.id}`
          )
        )
        .then(result => {
          this.setState(
            {
              success: result.message,
              categories: result.categories
            },
            () => {
              this.scrollToTop();
            }
          );
        })
        .catch(error => {
          this.setState(
            {
              error
            },
            () => {
              this.scrollToTop();
            }
          );
        });
    }

    this.props
      .dispatch(
        middleware("categories").postNew({
          categoryName: this.state.categoryName,
          categoryDescription: this.state.categoryDescription,
          parent_ref_id: this.state.parent_ref_id.value
        })
      )
      .then(result => {
        this.setState(
          {
            success: result.message,
            categories: result.categories
          },
          () => {
            this.resetForm();
            this.scrollToTop();
          }
        );
      })
      .catch(error => {
        this.setState(
          {
            error
          },
          () => {
            this.scrollToTop();
          }
        );
      });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      type: "smooth"
    });
  };

  render() {
    const categoryOptions = this.state.categories.map(category => {
      return { value: category.id, label: category.categoryName };
    });
    return (
      <Aux>
        <CustomCard>
          <Form onSubmit={this.onSubmit}>
            {this.state.success && (
              <Alert
                size="sm"
                variant="success"
                className="py-2"
                dismissible
                onClose={() => this.setState({ success: undefined })}
              >
                {this.state.success}
              </Alert>
            )}
            {this.state.error && (
              <Alert
                size="sm"
                variant="danger"
                className="py-2"
                dismissible
                onClose={() => this.setState({ error: undefined })}
              >
                {this.state.error}
              </Alert>
            )}
            <FormInput
              size="sm"
              type="text"
              label="Category Name"
              name="categoryName"
              value={this.state.categoryName}
              required
              onChange={this.handleInput}
            />
            <CustomSelect
              name="parent_ref_id"
              label="Parent Category"
              options={categoryOptions}
              onChange={this.handleCategory}
              value={this.state.parent_ref_id}
            />
            <FormInput
              as="textarea"
              rows={5}
              label="Category Description"
              name="categoryDescription"
              value={this.state.categoryDescription}
              onChange={this.handleInput}
            />
            <div className="d-inline float-right">
              <Button
                variant="success"
                size="sm"
                type="submit"
                title={
                  this.state.categoryError ? "Please add category first" : ""
                }
              >
                Save
              </Button>
              <Button variant="danger" className="ml-2" size="sm" type="button">
                Cancel
              </Button>
            </div>
          </Form>
        </CustomCard>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.data
  };
};
export default connect(mapStateToProps)(AddCategory);
