import axios from 'axios'

axios.defaults.baseURL = "https://icongameserver.vercel.app/api"

const cb = () => {}

const request = async (
  uri,
  {
    setLoading = cb,
    method = 'GET',
    data,
    params,
    headers = {},
    onUploadProgress = cb,
  } = {}
) => {
  // console.log("axios data");
  // console.log(data);

  const res = axios({
    method: method,
    url: uri,
    data: data,
    params: params,
    headers: {
      'Accept-Language': 'en',
      ...headers,
    },
    onUploadProgress,
  })
    .then((res) => res)
    .catch((error) => {
      console.log(error)
      return {
        errors: error.response || 'something went wrong',
      }
    })
    // .finally(() => console.log(`request is made to ${uri}`))

  return res
}

export default request
