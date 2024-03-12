import React from 'react';
import { Skeleton, DataTable, Column } from 'src/elements';
import './SkeletonDemo.scss';

const SkeletonPage = () => {
    const products = Array.from({ length: 5 });

    const bodyTemplate = () => {
        return <Skeleton></Skeleton>;
    };

    return (
        <div>
            <div className="card">
                <div className="grid formgrid">
                    <div className="field col-12 md:col-6">
                        <h5>Rectangle</h5>
                        <Skeleton className="mb-2"></Skeleton>
                        <h5>Rectangle</h5>

                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                        <Skeleton width="10rem" height="4rem"></Skeleton>
                    </div>
                    <div className="field col-12 md:col-6">
                        <h5>Rounded</h5>
                        <Skeleton
                            className="mb-2"
                            borderRadius="16px"
                        ></Skeleton>
                        <Skeleton
                            width="10rem"
                            className="mb-2"
                            borderRadius="16px"
                        ></Skeleton>
                        <Skeleton
                            width="5rem"
                            borderRadius="16px"
                            className="mb-2"
                        ></Skeleton>
                        <Skeleton
                            height="2rem"
                            className="mb-2"
                            borderRadius="16px"
                        ></Skeleton>
                        <Skeleton
                            width="10rem"
                            height="4rem"
                            borderRadius="16px"
                        ></Skeleton>
                    </div>
                    <div className="field col-12 md:col-6">
                        <h5 className="mt-3">Square</h5>
                        <div className="flex align-items-end">
                            <Skeleton size="2rem" className="mr-2"></Skeleton>
                            <Skeleton size="3rem" className="mr-2"></Skeleton>
                            <Skeleton size="4rem" className="mr-2"></Skeleton>
                            <Skeleton size="5rem"></Skeleton>
                        </div>
                    </div>
                    <div className="field col-12 md:col-6">
                        <h5 className="mt-3">Circle</h5>
                        <div className="flex align-items-end">
                            <Skeleton
                                shape="circle"
                                size="2rem"
                                className="mr-2"
                            ></Skeleton>
                            <Skeleton
                                shape="circle"
                                size="3rem"
                                className="mr-2"
                            ></Skeleton>
                            <Skeleton
                                shape="circle"
                                size="4rem"
                                className="mr-2"
                            ></Skeleton>
                            <Skeleton shape="circle" size="5rem"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="grid formgrid">
                    <div className="field col-12 md:col-6 md:pr-6 pr-0">
                        <h5>Card</h5>
                        <div className="custom-skeleton cs-4">
                            <div className="flex mb-3">
                                <Skeleton
                                    shape="circle"
                                    size="4rem"
                                    className="mr-2"
                                ></Skeleton>
                                <div>
                                    <Skeleton
                                        width="10rem"
                                        className="mb-2"
                                    ></Skeleton>
                                    <Skeleton
                                        width="5rem"
                                        className="mb-2"
                                    ></Skeleton>
                                    <Skeleton height=".5rem"></Skeleton>
                                </div>
                            </div>
                            <Skeleton width="100%" height="150px"></Skeleton>
                            <div className="flex justify-content-between mt-3">
                                <Skeleton width="4rem" height="2rem"></Skeleton>
                                <Skeleton width="4rem" height="2rem"></Skeleton>
                            </div>
                        </div>
                    </div>

                    <div className="field col-12 md:col-6">
                        <h5>List</h5>
                        <div className="custom-skeleton cs-4">
                            <ul className="m-0 cs-0">
                                <li className="mb-3">
                                    <div className="flex">
                                        <Skeleton
                                            shape="circle"
                                            size="4rem"
                                            className="mr-2"
                                        ></Skeleton>
                                        <div style={{ flex: '1' }}>
                                            <Skeleton
                                                width="100%"
                                                className="mb-2"
                                            ></Skeleton>
                                            <Skeleton width="75%"></Skeleton>
                                        </div>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <div className="flex">
                                        <Skeleton
                                            shape="circle"
                                            size="4rem"
                                            className="mr-2"
                                        ></Skeleton>
                                        <div style={{ flex: '1' }}>
                                            <Skeleton
                                                width="100%"
                                                className="mb-2"
                                            ></Skeleton>
                                            <Skeleton width="75%"></Skeleton>
                                        </div>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <div className="flex">
                                        <Skeleton
                                            shape="circle"
                                            size="4rem"
                                            className="mr-2"
                                        ></Skeleton>
                                        <div style={{ flex: '1' }}>
                                            <Skeleton
                                                width="100%"
                                                className="mb-2"
                                            ></Skeleton>
                                            <Skeleton width="75%"></Skeleton>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex">
                                        <Skeleton
                                            shape="circle"
                                            size="4rem"
                                            className="mr-2"
                                        ></Skeleton>
                                        <div style={{ flex: '1' }}>
                                            <Skeleton
                                                width="100%"
                                                className="mb-2"
                                            ></Skeleton>
                                            <Skeleton width="75%"></Skeleton>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h5>DataTable</h5>
                <DataTable value={products} className="cs-datatable-striped">
                    <Column
                        field="code"
                        header="Code"
                        style={{ width: '25%' }}
                        body={bodyTemplate}
                    ></Column>
                    <Column
                        field="name"
                        header="Name"
                        style={{ width: '25%' }}
                        body={bodyTemplate}
                    ></Column>
                    <Column
                        field="category"
                        header="Category"
                        style={{ width: '25%' }}
                        body={bodyTemplate}
                    ></Column>
                    <Column
                        field="quantity"
                        header="Quantity"
                        style={{ width: '25%' }}
                        body={bodyTemplate}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default SkeletonPage;
