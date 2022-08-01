export default function fetchData(url,method,header = {
    "Content-Type": "application/json",
  },body = undefined,dispatch,type) {
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
          dispatch({type:type,value:data})
        })
        .catch((error) => console.log(error));
}