import retroRepository from '../repository/retroRepository'
import Constant from '@/common/constant/constant'

const upsertPublicWellCards = async (list) => {
  list.forEach((card) =>{
    card.type = Constant.CARD_TYPE.WELL
    card.isPrivate = false
  })
  debugger
  return await retroRepository.upsertPublicWellCards(list)
}

export default {
  upsertPublicWellCards: upsertPublicWellCards
}
