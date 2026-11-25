export const PRESETS = {
  "get-post": {
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    params: [],
    headers: [["Accept", "application/json"]],
    body: "",
  },
  "get-users": {
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/users",
    params: [["id", "1"]],
    headers: [["Accept", "application/json"]],
    body: "",
  },
  "post-create": {
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/posts",
    params: [],
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify(
      {
        title: "Hello Truman",
        body: "Testing POST payload from truman client",
        userId: 1,
      },
      null,
      2
    ),
  },
  "put-update": {
    method: "PUT",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    params: [],
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify(
      {
        id: 1,
        title: "Updated Title",
        body: "Updated content via PUT",
        userId: 1,
      },
      null,
      2
    ),
  },
  "delete-post": {
    method: "DELETE",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    params: [],
    headers: [],
    body: "",
  },
};