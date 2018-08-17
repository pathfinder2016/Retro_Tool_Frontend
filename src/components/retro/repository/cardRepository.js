import httpHelper from '../../../common/util/httpHelper'
const host = "http://146.222.43.190:8090"
const del = async (params)=>{
  return await httpHelper.del(host + '/card/del', params)
}

const upsertPublicCards = async (list)=>{
  return await httpHelper.post(host + '/card/public', list)
}

export default {
  del: del,
  upsertPublicCards: upsertPublicCards
}
