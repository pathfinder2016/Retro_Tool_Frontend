import axios from 'axios'

const get = async (url, params) => {
  return await axios.get(url, {params: params})
}

const post = async(url, params) =>{
  return await axios.post(url, params);
}

const del = async(url, params) =>{
  return await axios.post(url, params);
}

const put = async(url, params) =>{
  return await axios.put(url, params);
}

const patch = async(url, params) =>{
  return await axios.patch(url, params);
}

export default {
  get: get,
  post: post,
  del: del,
  put: put,
  patch: patch
}


