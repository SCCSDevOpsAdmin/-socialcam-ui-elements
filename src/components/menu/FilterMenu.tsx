import React, { useEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    InputSwitch,
    RadioButton,
    Tree,
    Slider,
} from 'src/elements';
//import { NodeService } from 'app/sample/treeSample/NodeService';
import { NodeTemplates } from 'src/lib';

const FilterMenu = (props: any) => {
    // Tree
    const [expandedKeys, setExpandedKeys] = useState({});
    const [nodes, setNodes] = useState(null);
    //const nodeService = new NodeService();
    // Input Switch
    const [checked, setChecked] = useState(false);
    // Radio Button
    const [selectedCategory, setSelectedCategory] = useState('');
    // Multiple Checkbox
    const [selectedCategories, setSelectedCategories] = useState<any>([]);
    // Slider
    const [sliderValue, setSliderValue] = useState(null);

    const clearSelection = () => {
        setChecked(false);
        setSelectedCategory('');
        setSelectedCategories([]);
        setSliderValue(null);
    };

    const expandAll = () => {
        let _expandedKeys = {};
        for (let node of nodes) {
            expandNode(node, _expandedKeys);
        }

        setExpandedKeys(_expandedKeys);
    };

    const collapseAll = () => {
        setExpandedKeys({});
    };

    const expandNode = (node, _expandedKeys) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;

            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    };

    const onCategoryChange = (e: { value: any; checked: boolean }) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked) {
            _selectedCategories.push(e.value);
        } else {
            for (let i = 0; i < _selectedCategories.length; i++) {
                const selectedCategory = _selectedCategories[i];
                if (selectedCategory === e.value) {
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }
        setSelectedCategories(_selectedCategories);
    };

    const nodeTemplate = (node: any, options: any) => {
        let element = <b>{node.label}</b>;
        switch (node.element) {
            case NodeTemplates.INPUTSWITCH:
                if (node.data) {
                    element = (
                        <>
                            <div>{node.label}</div>
                            <InputSwitch
                                checked={checked}
                                onChange={(e: any) => setChecked(e.value)}
                            />
                        </>
                    );
                }
                break;
            case NodeTemplates.RADIOBUTTON:
                if (node.data) {
                    element = (
                        <div key={node.key} className="field-radiobutton">
                            <RadioButton
                                inputId={node.key}
                                value={node.label}
                                onChange={(e) => setSelectedCategory(e.value)}
                                checked={selectedCategory === node.label}
                            />
                            <label htmlFor={node.key}>{node.label}</label>
                        </div>
                    );
                }
                break;
            case NodeTemplates.CHECKBOX:
                if (node.data) {
                    element = (
                        <div key={node.key} className="field-checkbox">
                            <Checkbox
                                inputId={node.key}
                                value={node.label}
                                onChange={onCategoryChange}
                                checked={selectedCategories.some(
                                    (item) => item === node.label
                                )}
                            />
                            <label htmlFor={node.key}>{node.label}</label>
                        </div>
                    );
                }
                break;
            case NodeTemplates.SLIDER:
                if (node.data) {
                    element = (
                        <div className="card">
                            <h3>
                                {node.label}: {sliderValue}
                            </h3>
                            <Slider
                                value={sliderValue}
                                onChange={(e) => setSliderValue(e.value)}
                            />
                        </div>
                    );
                }
                break;
        }
        return element;
    };

    useEffect(() => {
        //nodeService.getTreeNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div>
            <div className="card">
                <h1>Filters</h1>
                <div key="btntype secondary" className="flex-row">
                    <Button
                        icon="csi csi-plus"
                        label="Expand All"
                        onClick={expandAll}
                        className="cs-secondary"
                        variant="outlined"
                    />
                    <Button
                        icon="csi csi-minus"
                        label="Collapse All"
                        onClick={collapseAll}
                        className="cs-secondary"
                        variant="outlined"
                    />
                </div>
                <Tree
                    value={nodes}
                    expandedKeys={expandedKeys}
                    onToggle={(e) => setExpandedKeys(e.value)}
                    nodeTemplate={nodeTemplate}
                />
                <div key="btntype secondary" className="flex-row">
                    <Button
                        icon="csi csi-undo"
                        label="Clear Selection"
                        onClick={clearSelection}
                        className="cs-primary"
                        variant="outlined"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterMenu;
