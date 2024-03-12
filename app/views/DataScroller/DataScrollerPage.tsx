import React, { useState, useEffect } from 'react';
import { ProductService } from 'app/sample/ProductService';
import { Button } from 'src/elements';
import { Rating } from 'src/elements/rating/Rating';
import { DataScroller } from 'src/elements/datascroller/DataScroller';
import './DataScrollerPage.scss';

export const DataScrollerPage = () => {
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const itemTemplate = (data) => {
        return (
            <div className="product-item">
                <img src={`images/product/${data.image}`} alt={data.name} />
                <div className="product-detail">
                    <div className="product-name">{data.name}</div>
                    <div className="product-description">
                        {data.description}
                    </div>
                    <Rating
                        value={data.rating}
                        readOnly
                        cancel={false}
                    ></Rating>
                    <i className="pi pi-tag product-category-icon"></i>
                    <span className="product-category">{data.category}</span>
                </div>
                <div className="product-action">
                    <span className="product-price">${data.price}</span>
                    <Button
                        icon="pi pi-shopping-cart"
                        label="Add to Cart"
                        disabled={data.inventoryStatus === 'OUTOFSTOCK'}
                    ></Button>
                    <span
                        className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
                    >
                        {data.inventoryStatus}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="datascroller-demo">
            <div className="card">
                <DataScroller
                    value={products}
                    itemTemplate={itemTemplate}
                    rows={5}
                    inline={true}
                    scrollHeight="500px"
                    header="Scroll Down to Load More"
                />
            </div>
        </div>
    );
};
