import { options } from "./options";

export function arrToAdjacencyList(arr) {
    const nodes = [];
    for (let i of arr) {
        const first = i[0];
        const second = i[1];
        if (!nodes.includes(first)) {
            nodes.push(first);
        }
        if (!nodes.includes(second)) {
            nodes.push(second);
        }


    }
    for (let i = 0; i < nodes.length; ++i) {
        nodes[i] = [nodes[i], []];
    }
    nodes.sort((a, b) => {
        if (a[0] <= b[0]) {
            return -1
        } else {
            return 1
        }
    })
    for (let i of nodes) {
        const nodeVal = i[0];
        const array = i[1];
        for (let j of arr) {
            if (j[0] === nodeVal && !array.includes(j[1])) {
                array.push(j[1])
            }
        }
        array.sort((a, b) => {
            if (a <= b) {
                return -1
            } else {
                return 1
            }
        })
    }
    // console.log(nodes);
    return nodes;

}

export function arrToAdjacencyMatrix(arr) {
    const nodes = [];
    for (let i of arr) {
        const first = i[0];
        const second = i[1];
        if (!nodes.includes(first)) {
            nodes.push(first);
        }
        if (!nodes.includes(second)) {
            nodes.push(second);
        }


    }
    nodes.sort((a, b) => {
        if (a <= b) {
            return -1
        }
        return 1;
    })
    const n = nodes.length;
    const matrix = [];
    for (let i = 0; i < n + 1; ++i) {
        matrix.push(new Array(n + 1).fill(null));
    }
    for (let i = 1; i < matrix.length; ++i) {
        const ind = i - 1;
        matrix[0][i] = nodes[ind];
        matrix[i][0] = nodes[ind];
    }
    // console.log(JSON.parse(JSON.stringify(matrix)));
    for (let i = 1; i < matrix.length; ++i) {
        for (let j = 1; j < matrix.length; ++j) {
            if (matrix[i][j] === 1) {
                continue;
            }
            const two = matrix[0][j];
            const one = matrix[i][0];
            if (one === two) {
                matrix[i][j] = 1;
                continue;
            }
            for (let x of arr) {
                if ((x[0] === one && x[1] === two)) {
                    matrix[i][j] = 1;
                    break;

                }
            }
        }
    }
    // console.log(matrix);
    return matrix
}

function getVisited(visited) {
    const ans = [];
    for (let i = 0; i < visited.length; ++i) {
        if (visited[i]) {
            ans.push(i);
        }
    }
    return ans;
}

export function bfsTimeline(lst) {
    const ans = [];
    const visited = new Array(lst[lst.length - 1][0] + 1).fill(false);
    const fullVisit = [];
    const queue = [];
    const bfs = [];
    for (let i = 1; i <= lst[lst.length - 1][0]; ++i) {
        if (visited[i]) {
            continue;
        }
        //visit the node 
        visited[i] = true;
        bfs.push(i);
        queue.push(i);
        while (queue.length != 0) {

            const front = queue.shift();
            ans.push({ type: "start", highlight: [front], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });
            // console.log(front);
            for (let j of lst[front - 1][1]) {
                if (visited[j] === false) {
                    ans.push({ type: "exploration", highlight: [front], explore: [j], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });
                    visited[j] = true;
                    bfs.push(j);

                    queue.push(j);
                    ans.push({ type: "visitedExplored", highlight: [front], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });
                }
            }
            fullVisit.push(front);
            ans.push({ type: "fullVisit", highlight: [front], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });

        }

    }
    ans.push({ type: "success", visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });
    // console.log(ans);
    return ans;

}

export function dfsTimeline(lst) {
    const ans = [];
    const visited = new Array(lst[lst.length - 1][0] + 1).fill(false);
    const fullVisit = [];
    const stack = [];
    const callStack = [];
    const dfs = [];
    for (let i = 1; i <= lst[lst.length - 1][0]; ++i) {
        if (visited[i]) {
            continue;
        }
        //visit the node 
        stack.unshift(i);

        function solver(stack, visited) {
            const top = stack.shift();
            callStack.push(`dfs(${top})`);
            visited[top] = true;
            dfs.push(top);
            ans.push({ type: "start", callstack: [...callStack], highlight: [top], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...dfs] });
            for (let j of lst[top - 1][1]) {
                if (visited[j] === false) {
                    stack.unshift(j);
                    ans.push({ type: "exploration", callstack: [...callStack], highlight: [top], explore: [j], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...dfs] });
                    solver(stack, visited);
                }
            }
            fullVisit.push(top);
            ans.push({ type: "fullVisit", callstack: [...callStack], highlight: [top], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...dfs] });
            callStack.pop();

        }

        solver(stack, visited);

    }
    ans.push({ type: "success", callstack: [...callStack], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...dfs] });
    // console.log(ans);
    return ans;

}

function getWeight(edges, edge) {
    for (let i of edges) {
        if (i[0] === edge[0] && i[1] === edge[1]) {
            return i[2];
        }
    }
}

function leastDistanceNode(distanceTable, selected) {
    let ind = 0;
    let min = 5000;
    let ans;
    for (let i of distanceTable[distanceTable.length - 1][1]) {
        const currNode = ind + 1;
        if (!selected.includes(currNode) && (i < min)) {
            min = i;
            ans = currNode;
        }
        ++ind;
    }
    return ans;
}

function dc(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function dijkstraTimeline(lst, edges, start) {
    const distanceTable = [];
    const ans = [];
    const selected = [];
    const array = new Array(lst.length).fill(4000);
    const firstEntry = [start, [...array], selected];
    firstEntry[1][start - 1] = 0;
    for (let i of lst[start - 1][1]) {
        const edge = [start, i];
        const weight = getWeight(edges, edge);
        if (weight < firstEntry[1][i - 1]) {
            firstEntry[1][i - 1] = weight;
        }
    }
    distanceTable.push(firstEntry);
    selected.push(start);

    ans.push({ table: dc(distanceTable), highlight: start, selected: [...selected] })
    distanceTable[distanceTable.length - 1] = dc(distanceTable[distanceTable.length - 1]);

    while (selected.length != lst.length) {
        const leastDisNode = leastDistanceNode(distanceTable, selected);
        const currWeight = distanceTable[distanceTable.length - 1][1][leastDisNode - 1];
        const newEntry = [leastDisNode, [...(distanceTable[distanceTable.length - 1][1])], selected];
        selected.push(leastDisNode);
        distanceTable.push(newEntry);
        ans.push({ table: dc(distanceTable), highlight: leastDisNode, selected: [...selected] })
        distanceTable[distanceTable.length - 1] = dc(distanceTable[distanceTable.length - 1]);
        for (let i of lst[leastDisNode - 1][1]) {
            if (selected.includes(i)) {
                continue;
            }
            const distance = getWeight(edges, [leastDisNode, i]);
            if (currWeight + distance < distanceTable[distanceTable.length - 1][1][i - 1]) {
                ans.push({ table: dc(distanceTable), highlight: leastDisNode, selected: [...selected], neighbour: i, type: "change", msg: `${currWeight >= 4000 ? "∞" : currWeight} + ${distance >= 4000 ? "∞" : distance} --> ${(currWeight + distance) >= 4000 ? "∞" : currWeight + distance}  <  ${distanceTable[distanceTable.length - 1][1][i - 1]}` })

                distanceTable[distanceTable.length - 1][1][i - 1] = currWeight + distance;
                ans.push({ table: dc(distanceTable), highlight: leastDisNode, selected: [...selected], neighbour: i });

            } else {
                ans.push({ table: dc(distanceTable), highlight: leastDisNode, selected: [...selected], neighbour: i, type: "noChange", msg: `${currWeight >= 4000 ? "∞" : currWeight} + ${distance >= 4000 ? "∞" : distance} --> ${(currWeight + distance) >= 4000 ? "∞" : currWeight + distance}  >=  ${distanceTable[distanceTable.length - 1][1][i - 1]}` })

                ans.push({ table: dc(distanceTable), highlight: leastDisNode, selected: [...selected], neighbour: i });

            }

        }
    }
    ans.push({ table: dc(distanceTable), type: "success", selected: [...selected] })
    // console.log(ans);
    return ans;
}
