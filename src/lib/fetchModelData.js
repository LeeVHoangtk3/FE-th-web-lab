const BACKEND_URL = "https://8myhyc-3001.csb.app";

function fetchModel(url) {
  // 2. Nối BACKEND_URL vào trước url
  return fetch(BACKEND_URL + url).then((res) => {
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return res.json();
  });
}

export default fetchModel;
