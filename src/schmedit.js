function jens_schmidt_algorithm(graph) {
    const n = graph.length;
  
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < graph[i].length; ++j) {
        const neighbor = graph[i][j];
  
        for (let k = 0; k < graph[neighbor].length; ++k) {
          if (graph[neighbor][k] === i) {
            graph[neighbor].splice(k, 1);
            break;
          }
        }
  
        const visited = new Array(n).fill(false);
        let components = 0;
  
        for (let v = 0; v < n; ++v) {
          if (!visited[v]) {
            // Perform DFS or BFS to explore the graph and count the number of components
            // For simplicity, we'll assume that the graph is connected, so there's only one component
            components++;
            dfs(graph, visited, v);
          }
        }
  
        graph[neighbor].push(i);
  
        if (components > 1) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  function dfs(graph, visited, current) {
    visited[current] = true;
  
    for (let neighbor of graph) {
      if (!visited[neighbor]) {
        dfs(graph, visited, neighbor);
      }
    }
  }
  
  const snap_data = [
    [1, 2],
    [2, 3],
    [3, 4]
  ];
  
  const is_articulation_free = jens_schmidt_algorithm(snap_data);
  
    console.log(
    "Is articulation-free after removing link directions:",
    is_articulation_free
  );