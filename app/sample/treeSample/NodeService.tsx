export class NodeService {
    getTreeNodes() {
        return fetch('treenodes.json')
            .then((res) => res.json())
            .then((d) => d.root);
    }
}
