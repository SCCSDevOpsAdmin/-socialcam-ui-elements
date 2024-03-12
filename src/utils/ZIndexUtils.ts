function handler() {
    let zIndexes: any[] = [];

    const generateZIndex = (key: any, autoZIndex: any, baseZIndex = 999) => {
        const lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex);
        const newZIndex =
            lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;

        zIndexes.push({ key, value: newZIndex });
        return newZIndex;
    };

    const revertZIndex = (zIndex: any) => {
        zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
    };

    const getCurrentZIndex = (key: any, autoZIndex: any) => {
        return getLastZIndex(key, autoZIndex).value;
    };

    const getLastZIndex = (key: any, autoZIndex: any, baseZIndex = 0) => {
        return (
            [...zIndexes]
                .reverse()
                .find((obj) => (autoZIndex ? true : obj.key === key)) || {
                key,
                value: baseZIndex,
            }
        );
    };

    const getZIndex = (el: any) => {
        return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
    };

    return {
        get: getZIndex,
        set: (key: any, el: any, autoZIndex: any, baseZIndex: any) => {
            if (el) {
                el.style.zIndex = String(
                    generateZIndex(key, autoZIndex, baseZIndex)
                );
            }
        },
        clear: (el: any) => {
            if (el) {
                revertZIndex(ZIndexUtils.get(el));
                el.style.zIndex = '';
            }
        },
        getCurrent: (key: any, autoZIndex: any) =>
            getCurrentZIndex(key, autoZIndex),
    };
}

export const ZIndexUtils = handler();
