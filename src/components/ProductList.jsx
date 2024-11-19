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
    <main className="productContainer">
      {productList.map((product) => (
        <article className="productButton">
          <img className="image" src={product.productImage} />
          <h3 className="nameOfProduct">{product.productName}</h3>
          <p className="description">{product.productDescription}</p>
          <p className="priceTag">${product.productPrice}</p>
        </article>
      ))}
    </main>
  );
};

export default ProductList;
