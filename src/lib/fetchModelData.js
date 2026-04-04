/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 * @returns {Promise<any>}  The JSON-decoded response.
 */
function fetchModel(url) {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      return res.json();
    });
}

export default fetchModel;
