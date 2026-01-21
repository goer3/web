// 获取树形结构所有 key 列表
const GetTreeAllKeys = (nodes) => {
  let keys = [];
  nodes.forEach((node) => {
    if (node.children && node.children.length > 0) {
      keys.push(node.key);
      keys = keys.concat(GetTreeAllKeys(node.children));
    }
  });
  return keys;
};

// 递归获取当前节点下面的所有子 key 列表
const GetTreeNodeChildrenKeys = (node) => {
  let keys = [];
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      keys.push(child.key);
      keys = keys.concat(GetTreeNodeChildrenKeys(child));
    });
  }
  return keys;
};

export { GetTreeAllKeys, GetTreeNodeChildrenKeys };