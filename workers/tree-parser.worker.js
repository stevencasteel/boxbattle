self.onmessage = function (e) {
  const { paths } = e.data;
  const root = { name: "root", path: "", isDir: true, children: [], depth: -1 };

  paths.forEach((p) => {
    const parts = p.split("/");
    let current = root;

    parts.forEach((part, i) => {
      const isDir = i < parts.length - 1;
      const currentPath = parts.slice(0, i + 1).join("/");

      let child = current.children.find((c) => c.name === part);
      if (!child) {
        child = {
          name: part,
          path: isDir ? currentPath : p,
          isDir,
          children: [],
          depth: i,
        };
        current.children.push(child);
      }
      current = child;
    });
  });

  const sortNodes = (node) => {
    node.children.sort((a, b) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.name.localeCompare(b.name);
    });
    node.children.forEach(sortNodes);
  };

  sortNodes(root);

  self.postMessage({ type: "TREE_BUILT", root });
};
