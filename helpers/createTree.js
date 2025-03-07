const createTree = (a, parentId = "") => {
    const tree = [];
    a.forEach((item) => {
        if(item.parent_id === parentId){
            const newItem = item;
            const child = createTree(a, item.id);
            if(child.length > 0){
                newItem.child = child;
            }
            tree.push(newItem);
        }
    });
    return tree;
}

module.exports.tree = (a, parentId = "") => {
    const tree = createTree(a, parentId = "");
    return tree;
}