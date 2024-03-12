import React, { useState, useEffect, useRef } from 'react';
import { ActionLabel } from 'src/elements';
import { MultiSelect } from 'src/elements/multiselect/MultiSelect';
//import './MultiSelectDemo.css';
//import { Skeleton } from 'src/elements/skeleton';

type Props = {};

const MultiSelectPage: React.FC<Props> = (props) => {
    const [lazyItems, setLazyItems] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [selectedCities1, setSelectedCities1] = useState(null);
    const [selectedCities2, setSelectedCities2] = useState(null);
    const [selectedCountries, setSelectedCountries] = useState(null);
    const [selectedGroupedCities, setSelectedGroupedCities] = useState(null);
    const [selectedItems1, setSelectedItems1] = useState(null);
    const [selectedItems2, setSelectedItems2] = useState(null);
    const [selectAll, setSelectAll] = useState(false);

    const [items] = useState(
        Array.from({ length: 100000 }).map((_, i) => ({
            label: `Item #${i}`,
            value: i,
        }))
    );

    const loadLazyTimeout = useRef(null);

    useEffect(() => {
        setLazyItems(Array.from({ length: 100000 }));
        setLazyLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const countryTemplate = (option) => {
        return (
            <div className="country-item">
                <img
                    alt={option.name}
                    src="images/flag/flag_placeholder.png"
                    onError={(e: any) =>
                        (e.target.src =
                            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                    }
                    className={`flag flag-${option.code.toLowerCase()}`}
                />
                <div>{option.name}</div>
            </div>
        );
    };

    const selectedCountriesTemplate = (option) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <img
                        alt={option.name}
                        src="images/flag/flag_placeholder.png"
                        onError={(e: any) =>
                            (e.target.src =
                                'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                        }
                        className={`flag flag-${option.code.toLowerCase()}`}
                    />
                    <div>{option.name}</div>
                </div>
            );
        }

        return 'Select Countries';
    };

    const onLazyLoad = (event) => {
        setLazyLoading(true);

        if (loadLazyTimeout.current) {
            clearTimeout(loadLazyTimeout.current);
        }

        //imitate delay of a backend call
        loadLazyTimeout.current = setTimeout(() => {
            const { first, last } = event;
            const _lazyItems = [...lazyItems];

            for (let i = first; i < last; i++) {
                _lazyItems[i] = { label: `Item #${i}`, value: i };
            }

            setLazyItems(_lazyItems);
            setLazyLoading(false);
        }, Math.random() * 1000 + 250);
    };

    const panelFooterTemplate = () => {
        const selectedItems = selectedCountries;
        const length = selectedItems ? selectedItems.length : 0;
        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    };

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex align-items-center country-item">
                <img
                    alt={option.label}
                    src="images/flag/flag_placeholder.png"
                    onError={(e: any) =>
                        (e.target.src =
                            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                    }
                    className={`flag flag-${option.code.toLowerCase()}`}
                />
                <div>{option.label}</div>
            </div>
        );
    };

    return (
        <>
            <h1>MultiSelectPage</h1>
            <h4>
                See notes&nbsp;
                <a href="https://www.primefaces.org/primereact/multiselect/">
                    here
                </a>
            </h4>
            <div className="multiselect-demo">
                <div className="card">
                    <h5>Basic</h5>
                    <MultiSelect
                        value={selectedCities1}
                        options={cities}
                        onChange={(e) => setSelectedCities1(e.value)}
                        optionLabel="name"
                        placeholder="Select a City"
                        maxSelectedLabels={3}
                        filter
                    />
                    <ActionLabel 
                        label={selectedCities1 ? (selectedCities1.length > 0 ? 'Clear' :'Select All') : 'Select All'}
                        value={selectedCities1}
                        onSelect={() => {
                            setSelectedCities1(cities);
                        }}
                        onClear={() => {setSelectedCities1(null)}}
                        selectLabel= 'Select All'
                        clearLabel= 'Clear'
                    />

                    <h5>Chips</h5>
                    <MultiSelect
                        value={selectedCities2}
                        options={cities}
                        onChange={(e) => setSelectedCities2(e.value)}
                        optionLabel="name"
                        placeholder="Select a City"
                        display="chip"
                    />

                    <h5>Grouped</h5>
                    <MultiSelect
                        value={selectedGroupedCities}
                        options={groupedCities}
                        onChange={(e) => setSelectedGroupedCities(e.value)}
                        optionLabel="label"
                        optionGroupLabel="label"
                        optionGroupChildren="items"
                        optionGroupTemplate={groupedItemTemplate}
                        placeholder="Select Cities"
                    />

                    <h5>Advanced with Templating and Filtering</h5>
                    <MultiSelect
                        value={selectedCountries}
                        options={countries}
                        onChange={(e) => setSelectedCountries(e.value)}
                        optionLabel="name"
                        placeholder="Select Countries"
                        filter
                        className="multiselect-custom"
                        itemTemplate={countryTemplate}
                        selectedItemTemplate={selectedCountriesTemplate}
                        panelFooterTemplate={panelFooterTemplate}
                    />

                    <h5>Virtual Scroll (100000 Items)</h5>
                    <MultiSelect
                        value={selectedItems1}
                        options={items}
                        onChange={(e) => {
                            setSelectedItems1(e.value);
                            setSelectAll(e.value.length === items.length);
                        }}
                        selectAll={selectAll}
                        onSelectAll={(e) => {
                            setSelectedItems1(
                                e.checked ? [] : items.map((item) => item.value)
                            );
                            setSelectAll(!e.checked);
                        }}
                        virtualScrollerOptions={{ itemSize: 43 }}
                        maxSelectedLabels={3}
                        placeholder="Select Item"
                    />

                    <h5>Virtual Scroll (100000 Items) and Lazy</h5>
                    <MultiSelect
                        value={selectedItems2}
                        options={lazyItems}
                        onChange={(e) => setSelectedItems2(e.value)}
                        virtualScrollerOptions={{
                            lazy: true,
                            onLazyLoad: onLazyLoad,
                            itemSize: 43,
                            showLoader: true,
                            loading: lazyLoading,
                            delay: 250,
                            loadingTemplate: (options) => {
                                return (
                                    <div
                                        className="flex align-items-center p-2"
                                        style={{ height: '43px' }}
                                    >
                                        loadingTemplate
                                        {/*<Skeleton
                                            width={options.even ? '70%' : '60%'}
                                            height="1.5rem"
                                        />*/}
                                    </div>
                                );
                            },
                        }}
                        maxSelectedLabels={3}
                        placeholder="Select Item"
                        showSelectAll={false}
                    />
                </div>
            </div>
        </>
    );
};

export default React.memo(MultiSelectPage);

const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
];

const countries = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' },
];

const groupedCities = [
    {
        label: 'Germany',
        code: 'DE',
        items: [
            { label: 'Berlin', value: 'Berlin' },
            { label: 'Frankfurt', value: 'Frankfurt' },
            { label: 'Hamburg', value: 'Hamburg' },
            { label: 'Munich', value: 'Munich' },
        ],
    },
    {
        label: 'USA',
        code: 'US',
        items: [
            { label: 'Chicago', value: 'Chicago' },
            { label: 'Los Angeles', value: 'Los Angeles' },
            { label: 'New York', value: 'New York' },
            { label: 'San Francisco', value: 'San Francisco' },
        ],
    },
    {
        label: 'Japan',
        code: 'JP',
        items: [
            { label: 'Kyoto', value: 'Kyoto' },
            { label: 'Osaka', value: 'Osaka' },
            { label: 'Tokyo', value: 'Tokyo' },
            { label: 'Yokohama', value: 'Yokohama' },
        ],
    },
];
