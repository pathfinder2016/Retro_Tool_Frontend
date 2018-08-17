import httpHelper from '../../../common/util/httpHelper'

const host = "http://146.222.43.190:8090"

const upsertPublicWellCards = async (list)=>{
  return await httpHelper.post(host + '/card/public/well', list)
}



const findAll = async ()=>{
  let result = await httpHelper.get(host + '/card/all')
  return result.data
}



const createAction = async (action)=>{
    return await httpHelper.post(host + '/action/create', action)
}



const loadActionContent = async (retroKey)=>{
  let result = await httpHelper.get(host + '/action/load', retroKey)
    return result.data
}

export default {
  upsertPublicWellCards: upsertPublicWellCards,
  findAll: findAll,
    createAction: createAction,
    loadActionContent: loadActionContent
}
