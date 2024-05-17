// URL of the API endpoint
const url = "https://jsonplaceholder.typicode.com/posts";

// Making the GET request
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
