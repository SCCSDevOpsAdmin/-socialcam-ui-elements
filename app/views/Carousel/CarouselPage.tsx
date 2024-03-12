import React, { useState, useEffect } from 'react';
import { Carousel } from 'src/elements/carousel/Carousel';
import { Button } from 'src/elements/buttons/Button';
import { ProductService } from 'app/sample/ProductService';
import './CarouselDemo.css';

type Props = {};

const CarouselPage = (props: Props) => {
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const productService = new ProductService();

    useEffect(() => {
        productService
            .getProducts()
            .then((data) => setProducts(data.slice(0, 9)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const productTemplate = (product) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="mb-3">
                        <img
                            src={`images/product/${product.image}`}
                            alt={product.name}
                            className="product-image"
                        />
                    </div>
                    <div>
                        <h4 className="mb-1">{product.name}</h4>
                        <h6 className="mt-0 mb-3">${product.price}</h6>
                        <span
                            className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}
                        >
                            {product.inventoryStatus}
                        </span>
                        <div className="car-buttons mt-5">
                            <Button
                                icon="csi csi-search"
                                className="cs-button cs-button-rounded mr-2"
                            />
                            <Button
                                icon="csi csi-star-fill"
                                className="cs-button-success cs-button-rounded mr-2"
                            />
                            <Button
                                icon="csi csi-cog"
                                className="cs-button-help cs-button-rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel-demo">
            <div className="card">
                <Carousel
                    value={products}
                    numVisible={3}
                    numScroll={3}
                    responsiveOptions={responsiveOptions}
                    itemTemplate={productTemplate}
                    header={<h5>Basic</h5>}
                />
            </div>

            <div className="card">
                <Carousel
                    value={products}
                    numVisible={3}
                    numScroll={3}
                    responsiveOptions={responsiveOptions}
                    itemTemplate={productTemplate}
                    header={<h5>Basic</h5>}
                />
            </div>

            <div className="card">
                <Carousel
                    value={products}
                    numVisible={3}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    className="custom-carousel"
                    circular
                    autoplayInterval={3000}
                    itemTemplate={productTemplate}
                    header={
                        <h5>
                            Circular, AutoPlay, 3 Items per Page and Scroll by 1
                        </h5>
                    }
                />
            </div>

            <div className="card">
                <Carousel
                    value={products}
                    numVisible={1}
                    numScroll={1}
                    orientation="vertical"
                    verticalViewPortHeight="360px"
                    itemTemplate={productTemplate}
                    header={<h5>Vertical</h5>}
                    style={{ maxWidth: '400px', marginTop: '2em' }}
                />
            </div>
        </div>
    );
};

export default CarouselPage;
