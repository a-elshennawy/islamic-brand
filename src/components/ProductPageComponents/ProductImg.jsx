function ProductImg({ product }) {
  return (
    <>
      <div className="imgSide p-0 col-xl-5 col-lg-5 col-md-10 col-sm-12 col-12">
        <img src={product.main_image} alt={product.name} loading="lazy" />
      </div>
    </>
  );
}

export default ProductImg;
