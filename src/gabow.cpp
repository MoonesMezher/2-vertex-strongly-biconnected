#include<bits/stdc++.h>
using namespace std;

vector<int> state , dfs_num , comp;
int dfs_counter , n , m;
stack<int> Ostack , Rstack;
vector<vector<int>> graph;
vector<bool> in_on_stack;
vector<vector<int>> connected_components;
vector<int> strong_components; // قائمة لتخزين رقم المكونات المتصلة بقوة

void dfs(int v) {
    state[v] = 1;
    dfs_num[v] = dfs_counter++;

    Ostack.push(v);
    in_on_stack[v] = true;
    Rstack.push(v);

    for(auto w : graph[v]) {
        if(state[w] == -1) {
            dfs(w);
        } else if(in_on_stack[w]) {
            while(dfs_num[w] < dfs_num[Rstack.top()]) {
                Rstack.pop();
            }
        }
    }
    
    state[v] = 0;

    if(v == Rstack.top()) {
        Rstack.pop();

        while(true) {
            int w = Ostack.top();
            Ostack.pop();
            in_on_stack[w] = false;
            comp[w] = v;
            connected_components[v].push_back(w);

            if(w == v) {
                break;
            }
        }
    }

    return;
}

void cheriyan_mehlhorn_gabow() {
    cin >> n >> m;

    graph.clear();
    graph.resize(n + 1);
    connected_components.clear();
    connected_components.resize(n + 1);

    for(int i = 1 ; i <= m ; i++) {
        int a , b;
        cin >> a >> b;

        graph[a].push_back(b);
    }

    dfs_counter = 1;

    state.resize(n + 1 , -1);
    comp.resize(n + 1 , -1);
    dfs_num.resize(n + 1 , -1);
    in_on_stack.resize(n + 1 , false);

    strong_components.resize(n + 1, 0); // تهيئة قائمة المكونات المتصلة بقوة

    for(int i = 1 ; i <= n ; i++) {
        if(state[i] == -1) {
            dfs(i);
        }
    }

    int num_strong_components = 0; // تعداد المكونات المتصلة بقوة

    for(int i = 1 ; i <= n ; i++) {
        strong_components[comp[i]]++;
    }

    for(int i = 1 ; i <= n ; i++) {
        if(strong_components[i] > 0) {
            num_strong_components++;
        }
    }

    cout << "Number of strongly connected components: " << num_strong_components << endl; // طباعة عدد المكونات المتصلة بقوة
    if( num_strong_components>1) cout<<"the graph isn't strongly connected ";
}

int main() {

    cheriyan_mehlhorn_gabow();

    return 0;
}