import React, { useState, useEffect, useRef } from 'react';
import {
    DataTable,
    Column,
    Button,
    Toolbar,
    Toast,
    Dialog,
    InputText,
} from 'src/elements';
import { FilterMatchMode, FilterOperator } from 'src/api/Api';
import classNames from 'classnames';

interface ProductProps {
    code: string;
    category: string;
    tokens: number;
    price: number;
    profit: number;
}

const SampleData = [
    {
        code: '1',
        category: 'Bronze',
        tokens: 50,
        price: 5,
        profit: 0,
    },
    {
        code: '2',
        category: 'Silver',
        tokens: 210,
        price: 20,
        profit: 5,
    },
    {
        code: '3',
        category: 'Gold',
        tokens: 550,
        price: 50,
        profit: 10,
    },
    {
        code: '4',
        category: 'Platinum',
        tokens: 1150,
        price: 100,
        profit: 15,
    },
];

const DataTablePage = () => {
    const emptyProduct: ProductProps = {
        code: '',
        category: '',
        tokens: 0,
        price: 0,
        profit: 0,
    };

    const [products, setProducts] = useState<ProductProps[]>([]);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [filters, setFilters] = useState<any>({
        code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setProducts(SampleData);
        initFilters();
    }, []);

    const initFilters = () => {
        setFilters({
            code: { value: null, matchMode: FilterMatchMode.CONTAINS },
            //'code': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // 'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // 'representative': { value: null, matchMode: FilterMatchMode.IN },
            // 'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            // 'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            // 'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            // 'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
            // 'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
        });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        const _products = [...products];
        const _product = { ...product };
        if (product.code) {
            const index = findIndexById(product.code);

            _products[index] = _product;
            toast?.current?.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Updated',
                life: 3000,
            });
        } else {
            _product.code = createId();
            _products.push(_product);
            toast.current.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Created',
                life: 3000,
            });
        }

        setProducts(_products);
        setProductDialog(false);
        setProduct(emptyProduct);
    };

    const editProduct = (product: ProductProps) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product: ProductProps) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        const _products = products.filter((val) => val.code !== product.code);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000,
        });
    };

    const findIndexById = (code: string) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].code === code) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        const _products = products.filter(
            (val) => !selectedProducts?.includes(val)
        );
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000,
        });
    };

    const onCategoryChange = (e: any) => {
        const val = (e.target && e.target.value) || '';
        const _product = { ...product };
        _product['category'] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e: any, name: string) => {
        //TODO: validate numeric input
        const val = (e.target && e.target.value) || '';
        const _product = { ...product };
        switch (name) {
            case 'tokens':
                _product['tokens'] = val;
                break;
            case 'price':
                _product['price'] = val;
                break;
            case 'profit':
                _product['profit'] = val;
                break;
        }

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="New"
                    icon="csi csi-plus"
                    className="cs-button-success mr-2"
                    onClick={openNew}
                />
                <Button
                    label="Delete"
                    icon="csi csi-trash"
                    className="cs-button-danger"
                    onClick={confirmDeleteSelected}
                    disabled={!selectedProducts || !selectedProducts.length}
                />
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button
                label="Export"
                icon="csi csi-upload"
                className="cs-button-help"
                onClick={exportCSV}
            />
        );
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Button
                    icon="csi csi-pencil"
                    className="cs-button-rounded cs-button-success mr-2"
                    onClick={() => editProduct(rowData)}
                />
                <Button
                    icon="csi csi-trash"
                    className="cs-button-rounded cs-button-warning"
                    onClick={() => confirmDeleteProduct(rowData)}
                />
            </React.Fragment>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Products</h5>
            <span className="cs-input-icon-left">
                <i className="csi csi-search" />
                <InputText
                    type="search"
                    onInput={(e) =>
                        setGlobalFilter(e.target as HTMLInputElement)
                    }
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button
                label="Cancel"
                icon="csi csi-times"
                className="cs-button-text"
                onClick={hideDialog}
            />
            <Button
                label="Save"
                icon="csi csi-check"
                className="cs-button-text"
                onClick={saveProduct}
            />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="csi csi-times"
                className="cs-button-text"
                onClick={hideDeleteProductDialog}
            />
            <Button
                label="Yes"
                icon="csi csi-check"
                className="cs-button-text"
                onClick={deleteProduct}
            />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="csi csi-times"
                className="cs-button-text"
                onClick={hideDeleteProductsDialog}
            />
            <Button
                label="Yes"
                icon="csi csi-check"
                className="cs-button-text"
                onClick={deleteSelectedProducts}
            />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar
                    className="mb-4"
                    left={leftToolbarTemplate}
                    right={rightToolbarTemplate}
                ></Toolbar>

                <DataTable
                    ref={dt}
                    value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => {
                        setSelectedProducts(e.value);
                    }}
                    dataKey="id"
                    paginator
                    rows={products.length}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    header={header}
                    responsiveLayout="scroll"
                    filters={filters}
                    filterDisplay="menu"
                    emptyMessage="No results found."
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: '3rem' }}
                        exportable={false}
                    ></Column>
                    <Column
                        field="code"
                        header="Code"
                        filterPlaceholder="Search by code"
                        dataType="text"
                        filterType="text"
                        cellEditValidatorEvent="click"
                        rowReorderIcon="csi csi-bars"
                        exportable
                        reorderable
                        resizeable
                        filter
                        showFilterMenu
                        showFilterOperator
                        showFilterMenuOptions
                        showClearButton
                        showApplyButton
                        showFilterMatchModes
                        showAddButton
                        sortable
                        style={{ minWidth: '12rem' }}
                    ></Column>
                    <Column
                        field="category"
                        header="Category"
                        sortable
                        style={{ minWidth: '12rem' }}
                    ></Column>
                    <Column
                        field="tokens"
                        header="Tokens"
                        sortable
                        style={{ minWidth: '8rem' }}
                    ></Column>
                    <Column
                        field="price"
                        header="Price(€)"
                        sortable
                        style={{ minWidth: '12rem' }}
                    ></Column>
                    <Column
                        field="profit"
                        header="Profit(%)"
                        sortable
                        style={{ minWidth: '12rem' }}
                    ></Column>
                    <Column
                        body={actionBodyTemplate}
                        exportable={false}
                        style={{ minWidth: '8rem' }}
                    ></Column>
                </DataTable>
            </div>

            <Dialog
                visible={productDialog}
                style={{ width: '450px' }}
                header="Product Details"
                modal
                className="cs-fluid"
                footer={productDialogFooter}
                onHide={hideDialog}
            >
                <div className="field">
                    <label htmlFor="category">Category</label>
                    <InputText
                        id="category"
                        value={product.category}
                        onChange={(e) => onCategoryChange(e)}
                        required
                        autoFocus
                        className={classNames({
                            'cs-invalid': submitted && !product.category,
                        })}
                    />
                    {submitted && !product.category && (
                        <small className="cs-error">
                            Category is required.
                        </small>
                    )}
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="tokens">Tokens</label>
                        <InputText
                            id="tokens"
                            value={product.tokens}
                            onChange={(e) => onInputNumberChange(e, 'tokens')}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="field col">
                        <label htmlFor="price">Price</label>
                        <InputText
                            id="price"
                            value={product.price}
                            onChange={(e) => onInputNumberChange(e, 'price')}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="field col">
                        <label htmlFor="profit">Profit</label>
                        <InputText
                            id="profit"
                            value={product.profit}
                            onChange={(e) => onInputNumberChange(e, 'profit')}
                            required
                            autoFocus
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog
                visible={deleteProductDialog}
                style={{ width: '450px' }}
                header="Confirm"
                modal
                footer={deleteProductDialogFooter}
                onHide={hideDeleteProductDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="csi csi-exclamation-triangle mr-3"
                        style={{ fontSize: '2rem' }}
                    />
                    {product && (
                        <span>
                            Are you sure you want to delete{' '}
                            <b>{product.code}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteProductsDialog}
                style={{ width: '450px' }}
                header="Confirm"
                modal
                footer={deleteProductsDialogFooter}
                onHide={hideDeleteProductsDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="csi csi-exclamation-triangle mr-3"
                        style={{ fontSize: '2rem' }}
                    />
                    {product && (
                        <span>
                            Are you sure you want to delete the selected
                            products?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default DataTablePage;
