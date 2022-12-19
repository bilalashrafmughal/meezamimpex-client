import React, { Component } from "react";
import "./categoryPanel.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Alert, Modal, Row, Col } from "react-bootstrap";
import DataGrid, { Column, FilterRow } from "devextreme-react/data-grid";
import { Button } from "devextreme-react/button";
import Toolbar, { Item } from "devextreme-react/toolbar";
import axios from "axios";
import BackdropLoader from "../../Components/BackdropLoader";

class CategoryPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: "",
      slogan: "",
      category: "",
      img: "",
      imgUrl: null,
      sent: false,
      loader: false,
      categories: [],
      isViewerOpen: false,
      modalShow: false,
      selectedCategory: {},
      mode: "add",
      bdl: {
        open: false,
        message: "",
      },
    };
  }

  getCategories = async () => {
    // GETTING CATEGORIES...!
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}/getcategories`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response.status === 200
      ? this.setState({ categories: response.data.categories })
      : this.state({ categories: [] });
  };

  async componentDidMount() {
    this.getCategories();
  }

  handleChange = (e) => {
    if (e.target.type === "file") {
      this.setState({
        [e.target.name]: e.target.files[0],
        imgUrl: URL.createObjectURL(e.target.files[0]),
      });

      return;
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createCategory = (e) => {
    e.preventDefault();
    this.setState({ bdl: { open: true, message: "Creating New Category" } });
    const { heading, slogan, img, category, mode } = this.state;
    const { _id } = this.state.selectedCategory;

    let dataGroup = new FormData();
    dataGroup.append("heading", heading);
    dataGroup.append("slogan", slogan);
    dataGroup.append("category", category);
    img !== "" && dataGroup.append("img", img, img.name);

    const config = {
      method: `${mode === "edit" ? "PUT" : "POST"}`,
      url:
        mode === "edit"
          ? `${process.env.REACT_APP_API_URI}/category/${_id}`
          : `${process.env.REACT_APP_API_URI}/createcategory`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: dataGroup,
    };
    axios(config)
      .then((res) => {
        if (res.data !== undefined || res.status === 200) {
          this.setState({
            sent: true,
            loader: false,
            category: "",
            slogan: "",
            heading: "",
            img: "",
            imgUrl: "",
            modalShow: false,
            bdl: { open: false, message: "" },
          });

          this.getCategories();

          setTimeout(() => {
            this.setState({
              sent: false,
            });
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  closeImageViewer = () => {
    this.setState({
      isViewerOpen: false,
    });
  };

  openImageViewer = () => {
    this.setState({
      isViewerOpen: true,
    });
  };

  // IMAGE CELL RENDER
  imgCellRender = (cellData) => {
    return (
      <div>
        <img
          src={`${process.env.REACT_APP_API_URI}/category/photo/${cellData.data._id}`}
          onClick={() => this.openImageViewer(0)}
          width="65"
          height="65"
          key={cellData.data._id}
          style={{ margin: "2px" }}
          alt={`meezamimpex-${cellData.data.heading}`}
          id={`catimgid${cellData.data._id}`}
        />
      </div>
    );
  };

  // EDIT CELL RENDER

  editCellRender = (cellData) => {
    return (
      <div className="dx-field">
        <div className="dx-field-value">
          <Button
            className="send"
            icon="far fa-edit"
            text="Edit"
            disabled
            onClick={async () => {
              const { heading, slogan, category, _id } = cellData.data;
              var imgUrl = document.getElementById(`catimgid${_id}`).src;
              this.setState({
                heading: heading,
                slogan: slogan,
                category: category,
                imgUrl: imgUrl,
                modalShow: true,
                mode: "edit",
                selectedCategory: cellData.data,
              });
            }}
          />
        </div>
      </div>
    );
  };
  // EDIT CELL RENDER

  delCellRender = (cellData) => {
    return (
      <div className="dx-field">
        <div className="dx-field-value">
          <Button
            className="send"
            icon="fas fa-trash"
            text="Delete"
            disabled
            onClick={async () => {
              const answer = window.confirm(
                "Are You Sure To Delete This Category"
              );
              if (!answer) {
                return;
              }
              this.setState({
                bdl: { open: true, message: "Deleting Category" },
              });

              const res = await axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_API_URI}/deletecategory/${cellData.data._id}`,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (res.status === 200) {
                this.setState({ bdl: { open: false, message: "" } });
                this.getCategories();
              }
            }}
          />
        </div>
      </div>
    );
  };

  render() {
    const {
      sent,
      loader,
      img,
      imgUrl,
      heading,
      slogan,
      category,
      categories,
      mode,
    } = this.state;
    return (
      <>
        <div className="category-panel">
          <div className="side-panel-space"></div>
          <div className="panel-space container-fluid">
            {sent && <Alert variant="success">Category Saved ...!</Alert>}

            <BackdropLoader
              open={this.state.bdl.open}
              message={this.state.bdl.message}
            />

            <div
              style={{ margin: "0", marginTop: "20px" }}
              className="row aim-mainheading"
            >
              <h3>Categories List </h3>
            </div>

            {/* toolbar */}
            <Toolbar>
              <Item
                location="after"
                locateInMenu="auto"
                widget="dxButton"
                options={{
                  icon: "plus",
                  onClick: () => {
                    this.setState({
                      modalShow: true,
                      mode: "add",
                      heading: "",
                      category: "",
                      imgUrl: "",
                      slogan: "",
                    });
                  },
                }}
              />
            </Toolbar>

            {/* datagrid */}
            <DataGrid dataSource={categories} showBorders={true}>
              <FilterRow visible={true} />
              <Column caption="Image" cellRender={this.imgCellRender} />

              <Column
                caption="Category Name"
                dataField="heading"
                dataType="string"
              />

              <Column
                caption="Category"
                dataField="category"
                dataType="string"
              />
              <Column caption="Slogan" dataField="slogan" dataType="string" />
              <Column
                caption="Edit"
                cellRender={this.editCellRender}
                width="200"
                alignment="center"
              />
              <Column
                caption="Delete"
                cellRender={this.delCellRender}
                width="200"
                alignment="center"
              />
            </DataGrid>
          </div>
        </div>

        <Modal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              {mode === "edit" ? "Edit Category" : "Add Category"}{" "}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="category-form">
              <form onSubmit={this.createCategory}>
                <Row>
                  <Col md={12}>
                    <div style={{ margin: "auto" }} className="img-frame">
                      <img src={imgUrl} alt="category" />
                    </div>
                    <input
                      style={{ margin: "auto" }}
                      onChange={this.handleChange}
                      accept="image/*"
                      name="img"
                      type="file"
                      placeholder="Category"
                    />
                  </Col>

                  <Col md={12}>
                    <input
                      value={heading}
                      className="category-panel-width"
                      onChange={this.handleChange}
                      required
                      name="heading"
                      type="text"
                      placeholder="Category Heading"
                    />
                  </Col>
                  <Col md={12}>
                    <input
                      value={slogan}
                      className="category-panel-width"
                      onChange={this.handleChange}
                      required
                      name="slogan"
                      type="text"
                      placeholder="Slogan Against Category"
                    />
                  </Col>
                  <Col md={12}>
                    <input
                      value={category}
                      className="category-panel-width"
                      onChange={this.handleChange}
                      required
                      name="category"
                      type="text"
                      placeholder="Category"
                    />
                  </Col>

                  <Col md={2}>
                    {loader ? (
                      <input
                        className="btn btn-filled large-btn"
                        disabled
                        type="submit"
                        value={mode === "edit" ? "Updating..." : "Creating..."}
                      />
                    ) : (
                      <input
                        className="btn btn-filled large-btn"
                        onChange={this.handleChange}
                        required
                        type="submit"
                        value={mode === "edit" ? "Update" : "Create"}
                      />
                    )}
                  </Col>
                </Row>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default CategoryPanel;
