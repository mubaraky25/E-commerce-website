import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from './../../redux/Products/products.actions';
import { addProduct } from './../../redux/Cart/cart.actions';
import Button from './../forms/Button';
import './styles.scss';

const mapState = state => ({
  product: state.productsData.product
});

const ProductCard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  const {
    productThumbnail,
    productName,
    productPrice,
    productDesc,
  } = product || {};

  useEffect(() => {
    if (productID) {
      dispatch(fetchProductStart(productID));
    }

    return () => {
      dispatch(setProduct({}));
    };
  }, [productID, dispatch]);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push('/cart');
  }

  const configAddToCartBtn = {
    type: 'button'
  }

  return (
    <div className="productCard">
      <div className="productHero">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="productDetails">
        <h1 className="productName">{productName}</h1>
        <span className="productPrice">£{productPrice}</span>
        <div className="productDesc" dangerouslySetInnerHTML={{ __html: productDesc }} />
        <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
