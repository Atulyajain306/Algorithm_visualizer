export function addInBinarySearchTree(tree, value) {
  let node = tree;
  if (tree === null) {
    return {
      val: value,
      right: null,
      left: null,
    };
  }
  while (1) {
    if (node.val > value) {
      if (node.left) {
        node = node.left;
      } else {
        node.left = { val: value, right: null, left: null };
        return tree;
      }
    } else {
      if (node.right) {
        node = node.right;
      } else {
        node.right = { val: value, right: null, left: null };
        return tree;
      }
    }
  }
}

export function objectTreeToArray(root) {
  const height = heightOfTree(root);
  const array = [];
  for (let i = 0; i < height; ++i) {
    const arr = new Array(parseInt(Math.pow(2, i))).fill(null);
    array.push(arr);
  }
  function add(x, y, node) {
    if (!node) {
      return
    }
    array[x][y] = node.val;
    add(x + 1, y * 2, node.left)
    add(x + 1, y * 2 + 1, node.right)
  }
  add(0, 0, root);
  return JSON.parse(JSON.stringify(array));

}

export function heightOfTree(root) {
  function solver(root) {
    if (!root) {
      return 0;
    }
    return 1 + Math.max(heightOfTree(root.right), heightOfTree(root.left))
  }
  const height = solver(root);
  return height;
}

export function postOrder(root) {
  const arr = [];
  function solver(root, x, y) {
    arr.push({
      x: x, y: y, type: "visit"
    })
    if (root.left) {
      solver(root.left, x + 1, 2 * y);
      arr.push({
        x: x, y: y, type: "visit"
      })
    }

    if (root.right) {
      solver(root.right, x + 1, 2 * y + 1);
      arr.push({
        x: x, y: y, type: "visit"
      })
    }

    arr.push({ x: x, y: y, type: "print" })

  }
  solver(root, 0, 0);
  return arr;
}

export function preorder(root) {
  const arr = [];
  function solver(root, x, y) {
    arr.push({
      x: x, y: y, type: "visit"
    })
    arr.push({ x: x, y: y, type: "print" })
    if (root.left) {
      solver(root.left, x + 1, 2 * y);
      arr.push({
        x: x, y: y, type: "visit"
      })
    }

    if (root.right) {
      solver(root.right, x + 1, 2 * y + 1);
      arr.push({
        x: x, y: y, type: "visit"
      })
    }


  }
  solver(root, 0, 0);
  return arr;
}

export function inOrder(root) {
  const arr = [];
  function solver(root, x, y) {
    arr.push({
      x: x, y: y, type: "visit"
    })
    if (root.left) {
      solver(root.left, x + 1, 2 * y);
      arr.push({
        x: x, y: y, type: "visit"
      })
    }
    arr.push({ x: x, y: y, type: "print" })
    if (root.right) {
      solver(root.right, x + 1, 2 * y + 1);
      arr.push({
        x: x, y: y, type: "visit"
      })
    }



  }
  solver(root, 0, 0);
  return arr;
}

export function deleteNode(root, value) {
  const arr = []
  const [xpos, ypos, reqNode] = searchNode(root, value, arr);
  if (arr[arr.length - 1].type === "notFound") {
    return arr;
  } else {
    const reqNodeIndices = [arr[arr.length - 1].x, arr[arr.length - 1].y];
    if (!reqNode.right && !reqNode.left) {
      arr.push({ x: xpos, y: ypos, type: "delete" });
      arr.push({ x: xpos, y: ypos, type: "deleteComplete" });

    } else if ((!reqNode.right && reqNode.left) || (reqNode.right && !reqNode.left)) {
      let y2 = ypos * 2;
      if (reqNode.right) {
        y2 += 1;
      }
      arr.push({ x1: xpos, y1: ypos, x2: xpos + 1, y2: y2, type: "replaceNdelete" });
      arr.push({ x1: xpos, y1: ypos, x2: xpos + 1, y2: y2, type: "replaceNdeleteComplete" });
    } else {
      function solver(root, x, y) {
        if (!root) {
          arr.push({ x: xpos, y: ypos, p: x - 1, q: y / 2, type: 'successorFound' });
          return null;
        }
        arr.push({ x: xpos, y: ypos, p: x, q: y, type: 'successor' })
        const ans = solver(root.left, x + 1, y * 2);
        if (ans) {
          return ans;
        }
        return [x, y, root];
      }
      const [xSuccessor, ySuccessor, successorNode] = solver(reqNode.right, xpos + 1, ypos * 2 + 1);
      arr.push({ x: xpos, y: ypos, p: xSuccessor, q: ySuccessor, type: 'replaceValues' })
      if (!successorNode.right && !successorNode.left) {
        arr.push({ p: xSuccessor, q: ySuccessor, type: "deleteSuccessor" });
        arr.push({ p: xSuccessor, q: ySuccessor, type: "deleteSuccessorComplete" });

      } else {
        if (successorNode.right) {
          arr.push({ x1: xSuccessor, y1: ySuccessor, x2: xSuccessor + 1, y2: ySuccessor * 2 + 1, type: "replaceNdeleteSuccessor" });
          arr.push({ x1: xSuccessor, y1: ySuccessor, x2: xSuccessor + 1, y2: ySuccessor * 2 + 1, type: "replaceNdeleteSuccessorComplete" });


        } else {
          arr.push({ x1: xSuccessor, y1: ySuccessor, x2: xSuccessor + 1, y2: ySuccessor * 2, type: "replaceNdeleteSuccessor" });
          arr.push({ x1: xSuccessor, y1: ySuccessor, x2: xSuccessor + 1, y2: ySuccessor * 2, type: "replaceNdeleteSuccessorComplete" });


        }

      }
    }
  }

  return arr;


}

export function searchNode(root, value, arr) {

  function solver(root, x, y) {
    if (!root) {
      arr.push({ x: x, y: y, type: "notFound" });
      return [null, null, null];
    }
    arr.push({ x: x, y: y, type: "searching" });
    if (root.val === value) {
      arr.push({ x: x, y: y, type: "found" });
      return [x, y, root];
    } else if (value < root.val) {
      return solver(root.left, x + 1, 2 * y);
    } else {
      return solver(root.right, x + 1, 2 * y + 1);
    }
  }
  return solver(root, 0, 0);
}

export function getNode(root, value) {

  function solver(root, x, y) {
    if (!root) {
      return [null, null, null];
    }
    if (root.val === value) {
      return [x, y, root];
    }
    else if (root.val > value) {
      return solver(root.left, x + 1, y * 2);
    } else {
      return solver(root.right, x + 1, y * 2 + 1);
    }

  }
  const res = solver(root, 0, 0);
  return res[2];
}

export function findParent(root, value) {

  function solver(root, parentNode, x, y) {
    if (!root) {
      return [null, null, null, null];
    }
    if (root.val === value) {
      return [x, y, root, parentNode];
    }
    else if (root.val > value) {
      return solver(root.left, root, x + 1, y * 2);
    } else {
      return solver(root.right, root, x + 1, y * 2 + 1);
    }

  }
  const res = solver(root, null, 0, 0);
  return res[3];

}

export function getMaxNode(tree) {

  function solver(root, parent) {
    if (!root) {
      return null;
    }
    const res = solver(root.left, root);
    if (!res) {
      return [root, parent];
    }
    return res;
  }
  // console.log(tree, tree.right)
  return solver(tree.right, tree);

}

export function getNodeByIndices(root, x, y) {
  const arr = [];
  let tempx = x;
  let tempy = y;
  while (tempx != 0) {
    arr.unshift([tempx, tempy]);
    tempx -= 1;
    tempy = Math.floor(tempy / 2);
  }
  arr.unshift([0, 0]);
  for (let i = 0; i < arr.length - 1; ++i) {
    let currx = arr[i][0];
    let curry = arr[i][1];
    let nextx = arr[i + 1][0];
    let nexty = arr[i + 1][1];
    if (nexty === curry * 2) {
      root = root.left;
    } else {
      root = root.right;
    }
  }
  return root;
}

export function deleteInBinarySearchTree(root, value) {
  function search(node) {
    if (!node) {
      return null;
    }
    if (node.val === value) {
      return node;
    }
    else if (node.val > value) {
      return search(node.left)
    } else {
      return search(node.right)
    }
  }
  const node = search(root);
  if (!node) {
    return root;
  }
  if (!node.right && !node.left) {
    const parentNode = findParent(root, value);
    if (!parentNode) {
      return null
    }
    if (parentNode.right && parentNode.right.val === node.val) {
      parentNode.right = null
    } else {
      parentNode.left = null
    }
    return root;
  } else if ((node.right && !node.left) || (!node.right && node.left)) {
    const parentNode = findParent(root, value);
    if (!parentNode) {
      if (node.right) {
        return node.right
      } else {
        return node.left
      }
    }
    if (parentNode.right && parentNode.right.val === node.val) {
      if (node.right) {
        parentNode.right = node.right
      } else {
        parentNode.right = node.left
      }
    } else {
      if (node.right) {
        parentNode.left = node.right
      } else {
        parentNode.left = node.left
      }
    }
    return root;
  } else {
    function successorSearch(successor, parent) {
      if (!successor) {
        return null;
      }
      const res = successorSearch(successor.left, successor);
      if (res) {
        return res;
      }
      return [successor, parent];

    }
    const [successorNode, successorParentNode] = successorSearch(node.right, node);
    node.val = successorNode.val;
    if (!successorNode.right && !successorNode.left) {
      if ((successorParentNode.right && successorParentNode.right.val === successorNode.val)) {
        successorParentNode.right = null;
      } else {
        successorParentNode.left = null;
      }
    } else {
      if (successorNode.right) {
        if ((successorParentNode.right && successorParentNode.right.val === successorNode.val)) {
          successorParentNode.right = successorNode.right;
        } else {
          successorParentNode.left = successorNode.right;
        }
      } else {
        if ((successorParentNode.right && successorParentNode.right.val === successorNode.val)) {
          successorParentNode.right = successorNode.left;
        } else {
          successorParentNode.left = successorNode.left;
        }
      }
    }
    return root;
  }
}
