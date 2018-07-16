import httpHelper from '../../../common/util/httpHelper'

const upsertPublicWellCards = async (list)=>{
  return await httpHelper.post('http://localhost:8090/card/public/well', list)
}

export default {
  upsertPublicWellCards: upsertPublicWellCards
}
