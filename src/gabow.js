const fs = require('fs');

const csv = require('csv-parser');

const STACK_SIZE = 10000;
const MAX_N = 10000;

let state = new Array(MAX_N).fill(-1);
let dfs_num = new Array(MAX_N).fill(-1);
let comp = new Array(MAX_N).fill(-1);
let strong_components = new Array(MAX_N).fill(0);
let in_on_stack = new Array(MAX_N).fill(false);
let connected_components = new Array(MAX_N).fill().map(() => []);
let Ostack = new Array(STACK_SIZE);
let Rstack = new Array(STACK_SIZE);
let dfs_counter = 1;
let n, m;

function push(stack, item) {
  if (stack.length + 1 > STACK_SIZE) {
    throw new Error("Stack overflow");
  }
  stack.push(item);
}

function pop(stack) {
  if (stack.length === 0) {
    throw new Error("Stack underflow");
  }
  return stack.pop();
}

function dfs(v, graph) {
  state[v] = 1;
  dfs_num[v] = dfs_counter++;

  push(Ostack, v);
  in_on_stack[v] = true;
  push(Rstack, v);

  for (let w of graph[v]) {
    if (state[w] === -1) {
      dfs(w, graph);
    } else if (in_on_stack[w]) {
      while (dfs_num[w] < dfs_num[Rstack[Rstack.length - 1]]) {
        pop(Rstack);
      }
    }
  }

  state[v] = 0;

  if (v === Rstack[Rstack.length - 1]) {
    pop(Rstack);

    while (true) {
      let w = Ostack[Ostack.length - 1];
      Ostack.pop();
      in_on_stack[w] = false;
      comp[w] = v;
      connected_components[v].push(w);

      if (w === v) {
        break;
      }
    }
  }

  return;
}

function cheriyan_mehlhorn_gabow(graph) {
  n = 0;
  m = 0;

  // Input parsing and graph construction

  // Implement input parsing and graph construction here

  dfs_counter = 1;

  // Initialize data structures

  // state.fill(-1);
  // comp.fill(-1);
  // dfs_num.fill(-1);
  // in_on_stack.fill(false);
  // strong_components.fill(0);

  // Run the algorithm

  for (let i = 1; i <= n; i++) {
    if (state[i] === -1) {
      dfs(i, graph);
    }
  }

  let num_strong_components = 0;

  for (let i = 1; i <= n; i++) {
    strong_components[comp[i]]++;
  }

  for (let i = 1; i <= n; i++) {
    if (strong_components[i] > 0) {
      num_strong_components++;
    }
  }

  console.log("Number of strongly connected components: ", num_strong_components);

  if (num_strong_components > 1) {
    console.log("The graph isn't strongly connected");
  }
}

let results = [];

fs.createReadStream('./act-mooc/act-mooc/mooc_action_labels.tsv') //
    .pipe(csv({
        separator: 't'
    }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // console.log(results);
        cheriyan_mehlhorn_gabow(results)
    })
// # Tests:  
// - file: mooc_action_labels.tsv => output: 0
// - file: mooc_action_features.tsv => output: 0
// - file: mooc_actions.tsv => output: 0
// Run the algorithm

