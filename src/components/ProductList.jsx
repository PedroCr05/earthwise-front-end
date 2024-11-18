import { useNavigate } from "react-router-dom";
import productService from "../services/productService";
import { useEffect, useState } from "react";

const ProductList = (props) => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getProducts();
        if (products.error) {
          throw new Error(products.error);
        }
        setProductList(products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  console.log("product list", productList);

  return (
    <div className="productContainer">
      {productList.map((product) => (
        <div className="productButton">
          <img src={product.productImage} />
          <div>{product.productName}</div>
          <div>{product.productDescription}</div>
          <div>{product.productPrice}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
