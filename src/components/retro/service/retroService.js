import retroRepository from '../repository/retroRepository'
import Constant from '@/common/constant/constant'

const upsertPublicWellCards = async (list) => {
  list.forEach((card) =>{
    card.type = Constant.CARD_TYPE.WELL
    card.isPrivate = false
  })
  return await retroRepository.upsertPublicWellCards(list)
}

const findAllCards = async () =>{
  return await retroRepository.findAll()
}

export default {
  upsertPublicWellCards: upsertPublicWellCards,
  findAllCards: findAllCards
}
