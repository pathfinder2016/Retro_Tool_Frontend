import retroRepository from '../repository/retroRepository'
import Constant from '@/common/constant/constant'

const upsertPublicWellCards = async (list) => {
  list.forEach((card) =>{
    card.type = Constant.CARD_TYPE.WELL
    card.asPrivate = 0
  })
  return await retroRepository.upsertPublicWellCards(list)
}

const findAllCards = async () =>{
  return await retroRepository.findAll()
}

const createAction = async(action) => {
    return await retroRepository.createAction(action)
}

const loadActionContent = async(retroKey) => {
    return await retroRepository.loadActionContent(retroKey)
}

export default {
  upsertPublicWellCards: upsertPublicWellCards,
  findAllCards: findAllCards,
    createAction: createAction,
    loadActionContent: loadActionContent
}
