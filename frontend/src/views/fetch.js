export default function fetchData(url,method,header = {
    "Content-Type": "application/json",
  },body = undefined,setter) {
    fetch(url, {
        method: method,
        credentials: 'include',
        headers: header,
        body: body
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setter(data)
        })
        .catch((error) => console.log(error));
}