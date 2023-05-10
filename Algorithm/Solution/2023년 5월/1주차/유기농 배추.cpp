#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <queue>
#include <tuple>
#include <memory.h>
#include <cmath>
#include <map>
#include <stack>
using namespace std;
int t, n, m, k, a[54][54], visited[54][54];
int ax, ay, ret;
int dy[] = { -1, 0, 1, 0 }, dx[] = { 0,1,0,-1 };

void go(int y, int x) {
	visited[y][x] = 1;

	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];

		if (ny >= n || nx >= m || ny < 0 || nx < 0) continue;
		if (!a[ny][nx]) continue;
		if (visited[ny][nx]) continue;

		go(ny, nx);
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL); cout.tie(NULL);

	cin >> t;

	while (t--) {
		fill(&visited[0][0], &visited[0][0] + 54 * 54, 0);
		fill(&a[0][0], &a[0][0] + 54 * 54, 0);
		ret = 0;

		cin >> n >> m >> k;

		for (int i = 0; i < k; i++) {
			cin >> ax >> ay;
			a[ax][ay] = 1;
		}

		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				if (visited[i][j]) continue;
				if (!a[i][j]) continue;

				go(i, j);
				ret++;
			}
		}

		cout << ret << "\n";
	}

	return 0;
}
