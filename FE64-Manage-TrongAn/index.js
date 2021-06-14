import { Product } from "../FE64-ES6-TrongAn/model/Product.js";
let mappedProductList;
const fetchProductList = () => {
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then(function (res) {
      mappedProductList = mapData(res.data);
      //console.log(mappedProductList);
      renderProductList(mappedProductList);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const renderProductList = (prodLst) => {
  let content = "";
  for (let item in prodLst) {
    content += prodLst[item].renderProdListTable();
  }

  document.getElementById("prodLst").innerHTML = content;
};

const mapData = (prodLst) => {
  const mappedData = prodLst.map((item) => {
    const {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      desc,
      type,
      image,
      inventory,
      rating,
    } = item;
    return new Product(
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      desc,
      type,
      image,
      inventory,
      rating
    );
  });

  return mappedData;
};
fetchProductList();

async function addProduct() {
  const productAdd = new Product();
  productAdd.id = document.getElementById("id").value;
  productAdd.name = document.getElementById("name").value;
  productAdd.desc = document.getElementById("desc").value;
  productAdd.image = document.getElementById("image").value;
  productAdd.frontCamera = document.getElementById("frontCamera").value;
  productAdd.backCamera = document.getElementById("backCamera").value;
  productAdd.type = document.getElementById("type").value;
  productAdd.rating = document.getElementById("rating").value;
  productAdd.inventory = document.getElementById("inventory").value;
  productAdd.price = document.getElementById("price").value;
  productAdd.screen = document.getElementById("screen").value;

  try {
    var result = axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "POST",
      data: productAdd,
    });
    alert("Thêm thành công");
    fetchProductList();
  } catch (error) {
    console.log("error", error.response.data);
  }
}

async function deleteProduct(id) {
  try {
    var result = await axios({
      url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
      method: "DELETE",
    });
    alert("Xóa thành công");
    fetchProductList();
  } catch (error) {
    console.log(error.response.data);
  }
  //   axios({
  //     url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
  //     method: "DELETE",
  //   })
  //     .then({
  //       fetchProductList,
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
}

async function findProduct(id) {
  try {
    var result = await axios({
      url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
      method: "GET",
    });
    fetchProductList(result.data);
  } catch (error) {
    console.log(error.response.data);
  }

  //   axios({
  //     url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
  //     method: "GET",
  //   })
  //     .then({
  //       fetchProductList,
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
}
//const id = document.getElementById("idSearch").value;
document.getElementById("search").onclick = findProduct(
  document.getElementById("idSearch").value
);

document.getElementById("btnSave").onclick = addProduct;
