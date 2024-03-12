import React, { useState, useEffect } from 'react';
import { Button, Tree } from 'src/elements';
import { NodeService } from 'app/sample/treeSample/NodeService';

type Props = {};

const TreePage = (props: Props) => {
    const [nodes, setNodes] = useState<any>(null);
    const [expandedKeys, setExpandedKeys] = useState({});
    const nodeService = new NodeService();

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

    useEffect(() => {
        nodeService.getTreeNodes().then((data) => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card">
                <h5>Basic</h5>
                <Tree value={nodes} />

                <h5>Programmatic Control</h5>
                <div className="mb-4">
                    <Button
                        type="button"
                        icon="csi csi-plus"
                        label="Expand All"
                        onClick={expandAll}
                        className="mr-2"
                    />
                    <Button
                        type="button"
                        icon="csi csi-minus"
                        label="Collapse All"
                        onClick={collapseAll}
                    />
                </div>
                <Tree
                    value={nodes}
                    expandedKeys={expandedKeys}
                    onToggle={(e) => setExpandedKeys(e.value)}
                />
            </div>
        </div>
    );
};

export default TreePage;
