import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import insertion1 from "../../assets/legend/binarySearchTree/insertion1.png";
import insertion2 from "../../assets/legend/binarySearchTree/insertion2.png";
import insertion3 from "../../assets/legend/binarySearchTree/insertion3.png";
import insertion4 from "../../assets/legend/binarySearchTree/insertion4.png";
import deletion1 from "../../assets/legend/binarySearchTree/deletion1.png";
import deletion2 from "../../assets/legend/binarySearchTree/deletion2.png";
import deletion3 from "../../assets/legend/binarySearchTree/deletion3.png";
import deletion4 from "../../assets/legend/binarySearchTree/deletion4.png";
import deletion5 from "../../assets/legend/binarySearchTree/deletion5.png";
import traversal1 from "../../assets/legend/binarySearchTree/traversal1.png";
import traversal2 from "../../assets/legend/binarySearchTree/traversal2.png";

const bubbleSort = `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value into the BST
  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          if (current.value === value) {
            // Duplicate value found, handle according to your needs.
            return;
          }
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // Search for a value in the BST
  search(value) {
    let current = this.root;
    while (current && current.value !== value) {
      current = value < current.value ? current.left : current.right;
    }
    return current !== null;
  }

  // Helper function to find the minimum value node in a subtree
  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // Delete a node from the BST
  delete(value) {
    this.root = this._deleteNode(this.root, value);
  }

  _deleteNode(node, value) {
    if (!node) {
      return null; // Node not found
    }

    if (value < node.value) {
      // The value to be deleted is in the left subtree
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.value) {
      // The value to be deleted is in the right subtree
      node.right = this._deleteNode(node.right, value);
    } else {
      // Node to be deleted found

      // Case 1: No children (leaf node)
      if (!node.left && !node.right) {
        return null;
      }

      // Case 2: One child (either left or right)
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      // Case 3: Two children
      // Find the in-order successor (smallest value in the right subtree)
      const minRight = this.findMin(node.right);
      node.value = minRight.value;
      // Delete the in-order successor from the right subtree
      node.right = this._deleteNode(node.right, minRight.value);
    }

    return node;
  }

  // In-order Traversal
  inOrder(node) {
    if (node !== null) {
      this.inOrder(node.left);
      // console.log(node.value);
      this.inOrder(node.right);
    }
  }

  // Pre-order Traversal
  preOrder(node) {
    if (node !== null) {
      // console.log(node.value);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  // Post-order Traversal
  postOrder(node) {
    if (node !== null) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      // console.log(node.value);
    }
  }
}`;

export default function BinarySearchTreeTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col ">
      <h1
        id="bst"
        className="text-[28px] pt-16 mb-8 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Binary Search Tree
      </h1>

      <div className="mx-8   origin-top bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is a BST?</span>
                <p className="mr-16">
                  A Binary Search Tree (BST) is a specialized binary tree where
                  the left child of any node contains values less than the node,
                  and the right child contains values greater than the node.
                  This property allows efficient searching, insertion, and
                  deletion operations.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  The key property of a BST is that all values in the left
                  subtree are smaller, and all values in the right subtree are
                  larger, making search operations efficient.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Operations in BST</h2>
          <div className="flex flex-col pl-12 mt-8">
            <div className="flex relative flex-col">
              <img
                src={bulletin}
                className="h-[18px] absolute left-[-30px] top-[5px]"
                alt=""
              />
              <h3 className="font-bold text-xl">Insertion in BST</h3>
              <ul className=" mt-4  text-lg">
                <li className="mb-2">
                  The insert operation in a BST places a new node in the tree
                  such that the tree remains a valid binary search tree.
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      Starting at the Root:{" "}
                    </span>
                    <p>
                      {" "}
                      If the tree is empty (no root), the new node becomes the
                      root.
                    </p>
                  </div>
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      Traversing the Tree:
                    </span>
                    <p>
                      If the tree has nodes, start from the root and compare the
                      value to be inserted with the current node's value.
                    </p>
                    <ul className="ml-8 list-disc list-inside">
                      <li>
                        If the value is less than the current node’s value, move
                        to the left subtree.
                      </li>
                      <li>
                        If the value is greater than or equal to the current
                        node’s value, move to the right subtree.
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      Inserting:
                    </span>
                    <p className="">
                      Once you find an empty spot (where the left or right child
                      is <code>null</code>), place the new node there.
                    </p>
                  </div>
                </li>
                <li className="mt-4">
                  <code>insert()</code> in the code snippet is the function for
                  insertion in bst.
                </li>
              </ul>
            </div>

            <div className="mt-8 relative flex flex-col">
              <img
                src={bulletin}
                className="h-[18px] absolute left-[-30px] top-[5px]"
                alt=""
              />
              <h3 className="font-bold text-xl">Search in BST</h3>
              <ul className=" mt-4  text-lg">
                <li className="mb-2">
                  The search operation in a BST looks for a specific value in
                  the tree. It takes advantage of the BST property to
                  efficiently find the target value.
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      Starting at the Root:{" "}
                    </span>
                    <p>Begin the search at the root node.</p>
                  </div>
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      Comparing the Values:
                    </span>
                    <ul className="ml-4 list-disc list-inside">
                      <li>
                        If the value is equal to the current node’s value, the
                        node is found.
                      </li>
                      <li>
                        If the value is less than the current node’s value, move
                        to the left subtree.
                      </li>
                      <li>
                        If the value is greater than the current node’s value,
                        move to the right subtree.
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      Stopping Condition:
                    </span>
                    <p className="">
                      If the value is found, return true (or the node itself).
                      If you reach a null node, the value is not in the tree,
                      and the search returns false.
                    </p>
                  </div>
                </li>
                <li className="mt-4">
                  <code>search()</code> in the code snippet is the function for
                  searching in bst.
                </li>
              </ul>
            </div>

            <div className="flex relative mt-8 flex-col">
              <img
                src={bulletin}
                className="h-[18px] absolute left-[-30px] top-[5px]"
                alt=""
              />
              <h3 className="font-bold text-xl">Traversal in BST</h3>
              <ul className=" mt-4  text-lg">
                <li className="mb-2">
                  Traversing a BST means visiting each node in a specific order.
                  There are three primary types of depth-first traversal:
                </li>
                <li className="mt-2 ">
                  <span className="font-semibold underline underline-offset-4">
                    In-Order Traversal
                  </span>

                  <ul className=" mt-2 pl-4  text-lg">
                    <li className="mb-2">
                      In-order traversal visits nodes in ascending order of
                      their values. It first visits the left subtree, then the
                      current node, and then the right subtree.
                    </li>
                    <li className="list-disc ml-4">
                      <div className="flex flex-col ">
                        <span className="font-medium min-w-[150px]">
                          Left Subtree:
                        </span>
                        <p>Recursively traverse the left subtree.</p>
                      </div>
                    </li>
                    <li className="list-disc ml-4">
                      <div className="flex flex-col ">
                        <span className="font-medium min-w-[150px]">
                          Current Node:
                        </span>
                        <p>Process the current node (e.g., print its value).</p>
                      </div>
                    </li>
                    <li className="list-disc ml-4">
                      <div className="flex flex-col ">
                        <span className="font-medium min-w-[150px]">
                          Right Subtree:
                        </span>
                        <p className="">
                          Recursively traverse the right subtree.
                        </p>
                      </div>
                    </li>
                    <li className="mt-2">
                      <code>inOrder()</code> in the code snippet is the function
                      for in-order traversal in bst.
                    </li>
                  </ul>
                </li>

                <li className="mt-2 ">
                  <span className="font-semibold underline underline-offset-4">
                    Pre-Order Traversal
                  </span>

                  <ul className=" mt-2 pl-4  text-lg">
                    <li className="mb-2">
                      Pre-order traversal visits the current node first, then
                      recursively visits the left subtree, followed by the right
                      subtree.
                    </li>
                    <li className="list-disc ml-4">
                      <div className="flex flex-col ">
                        <span className="font-medium min-w-[150px]">
                          Current Node:
                        </span>
                        <p>
                          {" "}
                          Process the current node first (e.g., print its
                          value).
                        </p>
                      </div>
                    </li>
                    <li className="list-disc ml-4">
                      <div className="flex flex-col ">
                        <span className="font-medium min-w-[150px]">
                          Left Subtree:
                        </span>
                        <p>Recursively traverse the left subtree.</p>
                      </div>
                    </li>
                    <li className="list-disc ml-4">
                      <div className="flex flex-col ">
                        <span className="font-medium min-w-[150px]">
                          Right Subtree:
                        </span>
                        <p className="">
                          Recursively traverse the right subtree.
                        </p>
                      </div>
                    </li>
                    <li className="mt-2">
                      <code>preOrder()</code> in the code snippet is the
                      function for pre-order traversal in bst.
                    </li>
                  </ul>
                </li>

                <li className="mt-2 ">
                  <span className="font-semibold underline underline-offset-4">
                    Post-Order Traversal
                  </span>

                  <ul className=" mt-2 pl-4  text-lg">
                    <li className="mb-2">
                      Post-order traversal visits the left subtree, then the
                      right subtree, and finally the current node.
                    </li>
                    <li className="list-disc ml-4">
                      <div className="flex flex-col ">
                        <span className="font-medium min-w-[150px]">
                          Left Subtree:
                        </span>
                        <p>Recursively traverse the left subtree.</p>
                      </div>
                    </li>
                    <li className="list-disc ml-4">
                      <div className="flex flex-col ">
                        <span className="font-medium min-w-[150px]">
                          Right Subtree:
                        </span>
                        <p>Recursively traverse the right subtree.</p>
                      </div>
                    </li>
                    <li className="list-disc ml-4">
                      <div className="flex flex-col ">
                        <span className="font-medium min-w-[150px]">
                          Current Node:
                        </span>
                        <p className="">
                          Process the current node (e.g., print its value).
                        </p>
                      </div>
                    </li>
                    <li className="mt-2">
                      <code>postOrder()</code> in the code snippet is the
                      function for post-order traversal in bst.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="mt-8 relative flex flex-col">
              <img
                src={bulletin}
                className="h-[18px] absolute left-[-30px] top-[5px]"
                alt=""
              />
              <h3 className="font-bold text-xl">Deletion in BST</h3>
              <ul className="mt-4  text-lg">
                <li className="mb-1">
                  The deletion of a node in a BST is slightly more complex than
                  insertion or search because there are three main cases to
                  consider:
                </li>
                <ul className="pl-6 text-lg">
                  <li className="flex ">
                    <span className="min-w-[50px]">I </span> Node to be deleted
                    is a leaf node (no children).
                  </li>
                  <li className="flex">
                    <span className="min-w-[50px]">II </span> Node to be deleted
                    has one child (either left or right).
                  </li>
                  <li className="flex">
                    <span className="min-w-[50px]">III </span> Node to be
                    deleted has two children (both left and right).
                  </li>
                </ul>
                <li className="mt-4 mb-2">
                  Following is how deletion in BST can be done:
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      Find the Node to Delete:
                    </span>
                    <ul className="ml-8 list-disc list-inside">
                      <li>
                        Recursively traverse the tree starting from the root.
                      </li>
                      <li>
                        If the value to delete is less than the current node’s
                        value, move to the left subtree.
                      </li>
                      <li>
                        If the value is greater than the current node’s value,
                        move to the right subtree.
                      </li>
                      <li>
                        If the value is equal to the current node’s value, this
                        is the node to delete.
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      <span className="mr-4">Case 1</span> Leaf Node:
                    </span>
                    <p className="pl-8">
                      If the node to delete is a leaf node (both left and right
                      children are <code>null</code>), simply return{" "}
                      <code>null</code> to remove it.
                    </p>
                  </div>
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      <span className="mr-4">Case 2</span> Node with One Child:
                    </span>
                    <ul className="ml-8 list-disc list-inside">
                      <li>
                        If the node has one child (either left or right), return
                        that child to replace the node.
                      </li>
                      <li>
                        This bypasses the node to be deleted and connects its
                        parent directly to its child.
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      <span className="mr-4">Case 3</span> Node with Two
                      Children:
                    </span>
                    <ul className="ml-8 list-disc list-inside">
                      <li>
                        If the node has two children, you need to find the
                        in-order successor (the smallest node in the right
                        subtree).
                      </li>
                      <li>
                        Replace the value of the node to be deleted with the
                        value of the in-order successor.
                      </li>
                      <li>
                        Then, delete the in-order successor from the right
                        subtree.
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="mt-4">
                  <code>delete()</code>, <code>_deleteNode()</code> and{" "}
                  <code>findMin()</code> in the code snippet is the function for
                  deletion in bst.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Code Snippet</h2>
          <div className="mr-16 relative mt-4 ml-12">
            <pre className="">
              <code
                ref={bubble}
                style={{
                  padding: "30px 40px",
                  borderRadius: "10px",
                  fontSize: "18px",
                }}
                className="javascript"
              >
                {bubbleSort}
              </code>
            </pre>
            <span className="absolute right-4 font-semibold text-white top-2">
              Javascript
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Time and Space Complexity</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Time Complexity</span>
                <p className="mr-16">
                  (Search, Insert, Delete): <code>O(h)</code>, where h is the
                  height of the tree.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(h)</code> due to recursion.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="pl-8 mt-4">
            <h3 className="font-semibold text-xl">Insertion in BST</h3>
            <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
              <div className="flex gap-x-12 items-center">
                <img src={insertion1} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Current Node
                  </span>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={insertion4} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Next Node
                  </span>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={insertion2} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Right Node
                  </span>
                  <p className="max-w-[300px] text-center">
                    The Next Node is right child and is a <code>null</code>{" "}
                    value.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={insertion3} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Left Node
                  </span>
                  <p className="max-w-[300px] text-center">
                    The Next Node is left child and is a <code>null</code>{" "}
                    value.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pl-8 mt-8">
            <h3 className="font-semibold text-xl">Traversal in BST</h3>
            <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
              <div className="flex gap-x-12 items-center">
                <img src={traversal1} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Printed Sequence
                  </span>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={traversal2} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Printed Node
                  </span>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={insertion1} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Current Node
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pl-8 mt-8">
            <h3 className="font-semibold text-xl">Deletion in BST</h3>
            <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
              <div className="flex gap-x-12 items-center">
                <img src={deletion1} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Current Node
                  </span>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={deletion2} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Node Found
                  </span>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={deletion3} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Swap Value
                  </span>
                  <p className="max-w-[300px] text-center">
                    Swap the value of the{" "}
                    <span className="text-nowrap">element-to-be-deleted</span>{" "}
                    and the{" "}
                    <span className="text-nowrap">in-order-successor</span>.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={deletion4} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Replace Node
                  </span>
                  <p className="max-w-[300px] text-center">
                    Replace Node with its right child. Hence deleting the Node.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={deletion5} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Delete Leaf
                  </span>
                  <p className="max-w-[300px] text-center">
                    Directly delete the leaf node.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              BSTs are used in database indexing, priority queues, and any
              applications that require fast lookups, inserts, and deletions.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
