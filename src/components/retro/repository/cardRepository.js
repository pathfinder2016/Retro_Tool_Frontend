import httpHelper from '../../../common/util/httpHelper'

const del = async (params)=>{
  return await httpHelper.del('http://146.222.43.190:8090/card/del', params)
}

const upsertPublicCards = async (list)=>{
  return await httpHelper.post('http://146.222.43.190:8090/card/public', list)
}

export default {
  del: del,
  upsertPublicCards: upsertPublicCards
}
