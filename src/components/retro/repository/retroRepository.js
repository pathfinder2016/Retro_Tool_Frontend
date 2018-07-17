import httpHelper from '../../../common/util/httpHelper'

const upsertPublicWellCards = async (list)=>{
  return await httpHelper.post('http://localhost:8090/card/public/well', list)
}

const findAll = async ()=>{
  let result = await httpHelper.get('http://localhost:8090/card/all')
  return result.data
}

export default {
  upsertPublicWellCards: upsertPublicWellCards,
  findAll: findAll
}
