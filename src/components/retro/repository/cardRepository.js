import httpHelper from '../../../common/util/httpHelper'

const del = async (params)=>{
  return await httpHelper.del('http://146.222.43.190:8090/card/del', params)
}

const upsertPublicWellCards = async (list)=>{
  return await httpHelper.post('http://146.222.43.190:8090/card/public/well', list)
}

const upsertPublicNotWellCards = async (list)=>{
  return await httpHelper.post('http://146.222.43.190:8090/card/public/notwell', list)
}

const upsertPublicSuggestionCards = async (list)=>{
  return await httpHelper.post('http://146.222.43.190:8090/card/public/suggestion', list)
}

export default {
  del: del,
  upsertPublicWellCards: upsertPublicWellCards,
  upsertPublicNotWellCards: upsertPublicNotWellCards,
  upsertPublicSuggestionCards: upsertPublicSuggestionCards
}
