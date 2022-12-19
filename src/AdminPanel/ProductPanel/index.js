import React, { Component } from "react";
import "./productPanel.css";
import { Modal, Row, Col } from "react-bootstrap";
import Devider from "@material-ui/core/Divider";
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react/button";
import Toolbar, { Item } from "devextreme-react/toolbar";
import BackdropLoader from "../../Components/BackdropLoader";
import axios from "axios";

class ProductPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      title: "",
      brand: "",
      price: null,
      category: "",
      description: "",
      img: "",
      imgUrl: "",
      categories: [],
      categoryId: "",
      articalCode: "",
      products: [],
      selectedProduct: {},
      modalShow: false,
      bdl: {
        open: false,
        message: "",
      },
      mode: "add",
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
  getProducts = async () => {
    // GETTING CATEGORIES...!
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}/getproducts`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response.status === 200
      ? this.setState({ products: response.data.products })
      : this.state({ products: [] });
  };

  async componentDidMount() {
    await this.getProducts();
    await this.getCategories();
  }

  handleChange = (e) => {
    // this.setState({
    //   [e.target.name]:
    //     e.target.type === "file" ? e.target.files[0] : e.target.value,
    //   imgUrl:
    //     e.target.type === "file" && URL.createObjectURL(e.target.files[0]),
    // });
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
  selectCategory = (e) => {
    const { categoryId, category } = JSON.parse(e.target.value);

    this.setState({
      categoryId: categoryId,
      category: category,
    });
  };
  createProduct = (e) => {
    this.setState((st) => ({
      bdl: {
        open: true,
        message:
          st.mode === "edit" ? "Updating Product" : "Creating New Product",
      },
    }));
    e.preventDefault();
    const {
      price,
      title,
      productName,
      brand,
      categoryId,
      category,
      img,
      description,
      articalCode,
      mode,
      selectedProduct,
    } = this.state;
    const formData = new FormData();
    formData.append("price", price);
    formData.append("productName", productName);
    formData.append("title", title);
    formData.append("brand", brand);
    formData.append("categoryId", categoryId);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("articalCode", articalCode);
    if (img !== "") {
      formData.append("img", img, img.name);
    }
    const config = {
      url:
        mode === "edit"
          ? `${process.env.REACT_APP_API_URI}/product/${selectedProduct._id}`
          : `${process.env.REACT_APP_API_URI}/createproduct`,
      method: mode === "edit" ? "PUT" : "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    axios(config)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            bdl: { open: false, message: "" },
            articalCode: "",
            brand: "",
            categoryId: "",
            description: "",
            price: 0,
            productName: "",
            title: "",
            modalShow: false,
          });
          this.getProducts();
        } else {
          this.setState({
            bdl: { open: true, message: "Problem In Creating Product" },
          });
          setTimeout(() => {
            this.setState({ bdl: { open: false, message: "" } });
          }, 3000);
        }
      })
      .catch((err) => {
        this.setState({
          bdl: { open: true, message: "Problem In Creating Product" },
        });
        setTimeout(() => {
          this.setState({ bdl: { open: false, message: "" } });
        }, 3000);
      });
  };

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
                "Are You Sure To Delete This Product?"
              );
              if (!answer) {
                return;
              }
              this.setState({
                bdl: { open: true, message: "Deleting Product" },
              });

              const res = await axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_API_URI}/product/${cellData.data._id}`,
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (res.status === 200) {
                this.setState({ bdl: { open: false, message: "" } });
                this.getProducts();
              }
            }}
          />
        </div>
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
              const {
                articalCode,
                brand,
                categoryId,
                category,
                description,
                price,
                productName,
                title,
                _id,
              } = cellData.data;
              var imgUrl = document.getElementById(`prodimgid${_id}`).src;
              this.setState({
                mode: "edit",
                modalShow: true,
                selectedProduct: cellData.data,
                articalCode: articalCode,
                brand: brand,
                categoryId: categoryId,
                description: description,
                price: price,
                productName: productName,
                title: title,
                imgUrl: imgUrl,
                category: category,
              });
            }}
          />
        </div>
      </div>
    );
  };

  // IMAGE CELL RENDER
  imgCellRender = (cellData) => {
    return (
      <div>
        <img
          src={`${process.env.REACT_APP_API_URI}/product/photo/${cellData.data._id}`}
          onClick={() => this.openImageViewer(0)}
          width="65"
          height="65"
          key={cellData.data._id}
          style={{ margin: "2px" }}
          alt={`meezamimpex-${cellData.data.heading}`}
          id={`prodimgid${cellData.data._id}`}
        />
        {/* {this.state.isViewerOpen && (
        <ImageViewer
          src={imgSrc}
          
          onClose={this.closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
        />
      )} */}
      </div>
    );
  };

  render() {
    const {
      productName,
      title,
      brand,
      price,
      category,
      description,
      articalCode,
      img,
      imgUrl,
      products,
      modalShow,
      selectedProduct,
    } = this.state;
    return (
      <>
        <div className="category-panel">
          <div className="side-panel-space"></div>
          <div className="panel-space container-fluid">
            <div
              style={{ margin: "0", marginTop: "20px" }}
              className="row aim-mainheading"
            >
              <h3>Products List </h3>
            </div>
          </div>
          {/* toolbar */}
          <BackdropLoader
            open={this.state.bdl.open}
            message={this.state.bdl.message}
          />
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
                    articalCode: "",
                    brand: "",
                    categoryId: "",
                    description: "",
                    price: 0,
                    productName: "",
                    category: "",
                    title: "",
                    imgUrl: "",
                  });
                },
              }}
            />
          </Toolbar>

          <DataGrid dataSource={products} showBorders={true}>
            <HeaderFilter visible={true} />
            <FilterRow visible={true} />
            <Column caption="Image" cellRender={this.imgCellRender} />
            <Column
              caption="Product Title"
              dataField="title"
              dataType="string"
            />

            <Column caption="Category" dataField="category" dataType="string" />
            <Column
              caption="Description"
              dataField="description"
              dataType="string"
            >
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column
              caption="Artical Code"
              dataField="articalCode"
              dataType="string"
            />
            <Column caption="Price" dataField="price" format="currency" />

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

        <Modal
          show={modalShow}
          onHide={() => this.setState({ modalShow: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.createProduct}>
              <Row>
                <Col md={12}>
                  <div style={{ margin: "auto" }} className="img-frame">
                    <img src={imgUrl} alt="product-img" />
                  </div>
                  <input
                    onChange={this.handleChange}
                    accept="image/*"
                    name="img"
                    type="file"
                    placeholder="Category"
                  />
                </Col>
                <Devider />
                <Col style={{ marginTop: "15px" }} md={12}>
                  <select
                    name="category"
                    onChange={this.selectCategory}
                    selected={selectedProduct.category}
                    required
                  >
                    <option value=""> Select Category</option>
                    {this.state.categories.map((cat) => (
                      <option
                        value={JSON.stringify({
                          categoryId: cat._id,
                          category: cat.category,
                        })}
                        key={cat._id}
                      >
                        {" "}
                        {cat.category}{" "}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={12}>
                  {" "}
                  <strong>
                    Selected Category:{" "}
                    <span style={{ color: "red" }}> {category} </span>{" "}
                  </strong>{" "}
                </Col>
                <Col md={6}>
                  <input
                    value={productName}
                    className="category-panel-width"
                    onChange={this.handleChange}
                    required
                    name="productName"
                    type="text"
                    placeholder="Product Name"
                  />
                </Col>
                <Col md={6}>
                  <input
                    value={title}
                    className="category-panel-width"
                    onChange={this.handleChange}
                    required
                    name="title"
                    type="text"
                    placeholder="Title of Product"
                  />
                </Col>
                <Col md={6}>
                  <input
                    value={brand}
                    className="category-panel-width"
                    onChange={this.handleChange}
                    required
                    name="brand"
                    type="text"
                    placeholder="Brand Name"
                  />
                </Col>
                <Col md={6}>
                  <input
                    value={price}
                    className="category-panel-width"
                    onChange={this.handleChange}
                    name="price"
                    type="number"
                    placeholder="Price If exist"
                  />
                </Col>
                <Col md={6}>
                  <input
                    value={description}
                    className="category-panel-width"
                    onChange={this.handleChange}
                    required
                    name="description"
                    type="text"
                    placeholder="Description of Product"
                  />
                </Col>

                <Col md={6}>
                  <input
                    onChange={this.handleChange}
                    name="articalCode"
                    type="text"
                    required
                    placeholder="Artical Code"
                    value={articalCode}
                  />
                </Col>
                <Col md={3}>
                  {" "}
                  <input
                    className="btn btn-filled large-btn"
                    type="submit"
                    value="Add Product"
                  />{" "}
                </Col>
              </Row>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default ProductPanel;
