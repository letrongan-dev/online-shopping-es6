import { Product } from "./model/Product.js";

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
    content += prodLst[item].renderProdList();
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

const filterData = (condition) => {
  const mappedData = mappedProductList.map((item) => {
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
    if (item.type === condition) {
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
    }
  });
  //console.log(mappedData);
  return mappedData;
};

// const filterData = (condition) => {
//   let dataFilter = "";
//   for (let item of mappedProductList) {
//     debugger;
//     if (item.type === "samsung") {
//       //dataFilter += mappedProductList[item].renderProdList();
//       console.log(mappedProductList[item]);
//     }
//   }

//   //document.getElementById("prodLst").innerHTML = dataFilter;
// };

document.getElementById("filter").onchange = () => {
  let condition = document.getElementById("filter").value;
  //console.log(condition);
  renderProductList(filterData(condition));
};

fetchProductList();
