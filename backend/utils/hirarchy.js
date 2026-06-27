

function processHierarchy(data) {

    const invalid_entries = [];
    const duplicate_edges = [];

    // child -> parent (first parent wins)
    const parentMap = new Map();

    // parent -> children
    const graph = new Map();

    // child -> all parents (before filtering)
    const incoming = new Map();

    const edgeSet = new Set();

    const allNodes = new Set();

    
    function isValid(edge) {

        if (typeof edge !== "string")
            return false;

        edge = edge.trim();

        if (edge.length === 0)
            return false;

        if (!/^[A-Z]->[A-Z]$/.test(edge))
            return false;

        const [parent, child] = edge.split("->");

        if (parent === child)
            return false;

        return true;
    }

  

    for (let raw of data) {

        raw = String(raw).trim();

        if (!isValid(raw)) {

            invalid_entries.push(raw);

            continue;

        }

        // Duplicate edge
        if (edgeSet.has(raw)) {

            if (!duplicate_edges.includes(raw))
                duplicate_edges.push(raw);

            continue;

        }

        edgeSet.add(raw);

        const [parent, child] = raw.split("->");

        // Store all incoming edges
        if (!incoming.has(child))
            incoming.set(child, []);

        incoming.get(child).push(parent);

        // Multi-parent rule
        if (parentMap.has(child)) {

            // Ignore silently
            continue;

        }

        parentMap.set(child, parent);

        if (!graph.has(parent))
            graph.set(parent, []);

        if (!graph.has(child))
            graph.set(child, []);

        graph.get(parent).push(child);

        allNodes.add(parent);
        allNodes.add(child);

    }

    // Make sure every node exists
    for (const node of allNodes) {

        if (!graph.has(node))
            graph.set(node, []);

    }

    

    const undirected = new Map();

    for (const node of allNodes) {
        undirected.set(node, []);
    }

    for (const [parent, children] of graph.entries()) {

        for (const child of children) {

            undirected.get(parent).push(child);
            undirected.get(child).push(parent);

        }

    }

  

    const visitedComponent = new Set();

    const components = [];

    for (const startNode of allNodes) {

        if (visitedComponent.has(startNode))
            continue;

        const stack = [startNode];

        const componentNodes = [];

        visitedComponent.add(startNode);

        while (stack.length > 0) {

            const current = stack.pop();

            componentNodes.push(current);

            for (const next of undirected.get(current)) {

                if (!visitedComponent.has(next)) {

                    visitedComponent.add(next);

                    stack.push(next);

                }

            }

        }

        componentNodes.sort();

        components.push(componentNodes);

    }

   
    function getComponentGraph(component) {

        const localGraph = new Map();

        for (const node of component) {

            localGraph.set(node, []);

        }

        for (const node of component) {

            const children = graph.get(node) || [];

            for (const child of children) {

                if (localGraph.has(child)) {

                    localGraph.get(node).push(child);

                }

            }

        }

        return localGraph;

    }

    function findRoot(component) {

        const roots = [];

        for (const node of component) {

            if (!parentMap.has(node)) {

                roots.push(node);

            }

        }

        // Tree component
        if (roots.length > 0) {

            roots.sort();

            return roots[0];

        }

        // Pure cycle
        const sorted = [...component].sort();

        return sorted[0];

    }

     

    function hasCycle(localGraph, node, visited, recStack) {

        visited.add(node);
        recStack.add(node);

        const children = localGraph.get(node) || [];

        for (const child of children) {

            if (!visited.has(child)) {

                if (hasCycle(localGraph, child, visited, recStack))
                    return true;

            } else if (recStack.has(child)) {

                return true;

            }

        }

        recStack.delete(node);

        return false;

    }

    function buildTree(localGraph, node) {

        const result = {};

        const children = localGraph.get(node) || [];

        children.sort();

        for (const child of children) {

            result[child] = buildTree(localGraph, child);

        }

        return result;

    }

    function getDepth(localGraph, node) {

        const children = localGraph.get(node) || [];

        if (children.length === 0)
            return 1;

        let longest = 0;

        for (const child of children) {

            longest = Math.max(
                longest,
                getDepth(localGraph, child)
            );

        }

        return longest + 1;

    }

    const hierarchies = [];

    let totalTrees = 0;
    let totalCycles = 0;

    let largestTreeRoot = "";
    let largestDepth = 0;

   

    for (const component of components) {

        const localGraph = getComponentGraph(component);

        const root = findRoot(component);

        const visited = new Set();
        const recStack = new Set();

        const cycleFound = hasCycle(
            localGraph,
            root,
            visited,
            recStack
        );

        if (cycleFound) {

            totalCycles++;

            hierarchies.push({

                root,

                tree: {},

                has_cycle: true

            });

            continue;

        }

        const tree = {};

        tree[root] = buildTree(localGraph, root);

        const depth = getDepth(localGraph, root);

        totalTrees++;

        if (
            depth > largestDepth ||
            (
                depth === largestDepth &&
                (
                    largestTreeRoot === "" ||
                    root < largestTreeRoot
                )
            )
        ) {

            largestDepth = depth;
            largestTreeRoot = root;

        }

        hierarchies.push({

            root,

            tree,

            depth

        });

    }

    

    const summary = {

        total_trees: totalTrees,

        total_cycles: totalCycles,

        largest_tree_root: largestTreeRoot

    };

    return {

        hierarchies,

        invalid_entries,

        duplicate_edges,

        summary

    };

}



module.exports = processHierarchy;