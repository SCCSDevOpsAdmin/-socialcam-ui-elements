import React, { useState, useEffect, useRef } from 'react';
import { OverlayPanel } from 'src/elements/overlaypanel/OverlayPanel';
import { Button } from 'src/elements/buttons/Button';
import { Toast } from 'src/elements/toast/Toast';
import { Column } from 'src/elements';
import { DataTable } from 'src/elements/datatable/DataTable';
import { ProductService } from 'app/sample/ProductService';
import './OverlayPanelDemo.scss';
import { DataTableSelectionChangeParams } from 'src/elements/datatable/types';

type ProductItem = {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    quantity?: number;
    inventoryStatus?: string;
    rating?: number;
};

const OverlayPanelPage = () => {
    const [products, setProducts] = useState<ProductItem[] | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
        null
    );
    const productService = new ProductService();
    const op = useRef(null);
    const toast = useRef(null);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current && selectedProduct) {
            op.current?.hide();
            toast.current?.show({
                severity: 'info',
                summary: 'Product Selected',
                detail: selectedProduct?.name,
                life: 3000,
            });
        }
    }, [selectedProduct]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        productService
            .getProducts()
            .then((data) => setProducts(data.slice(0, 9)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    const onProductSelect = (e: DataTableSelectionChangeParams) => {
        setSelectedProduct(e.value);
    };

    const imageBody = (rowData: ProductItem) => {
        return (
            <img
                src={`images/product/${rowData.image}`}
                onError={(e) =>
                    (e.currentTarget.src =
                        'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                }
                alt={rowData.image}
                className="product-image"
            />
        );
    };

    const priceBody = (rowData: ProductItem) => {
        return formatCurrency(rowData.price ?? 0);
    };

    return (
        <div>
            <Toast ref={toast} />
            {new Array(20).fill(1).map((a) => {
                return <br />;
            })}
            <div className="card">
                <Button
                    type="button"
                    icon="pi pi-search"
                    label={
                        selectedProduct
                            ? selectedProduct.name
                            : 'Select a Product'
                    }
                    onClick={(e) => op.current?.toggle(e)}
                    aria-haspopup
                    aria-controls="overlay_panel"
                    className="select-product-button"
                />

                <OverlayPanel
                    ref={op}
                    showCloseIcon
                    id="overlay_panel"
                    style={{ width: '450px' }}
                    className="overlaypanel-demo"
                >
                    <DataTable
                        value={products ?? []}
                        selectionMode="single"
                        paginator
                        rows={5}
                        selection={selectedProduct}
                        onSelectionChange={onProductSelect}
                    >
                        <Column field="name" header="Name" sortable />
                        <Column header="Image" body={imageBody} />
                        <Column
                            field="price"
                            header="Price"
                            sortable
                            body={priceBody}
                        />
                    </DataTable>
                </OverlayPanel>
            </div>
            {new Array(200).fill(1).map((a) => {
                return <br />;
            })}
        </div>
    );
};

export default OverlayPanelPage;
