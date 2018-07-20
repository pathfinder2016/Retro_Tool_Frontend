import cardRepository from '../repository/cardRepository'
import Constant from '@/common/constant/constant'

const del = async (card, type) => {
  card.isPrivate = 0
  card.type = type
  return await cardRepository.del(card)
}

const upsertPublicWellCards = async (list) => {
  list.forEach((card) =>{
    card.type = Constant.CARD_TYPE.WELL
    card.asPrivate = 0
  })
  return await cardRepository.upsertPublicWellCards(list)
}

const upsertPublicNotWellCards = async (list) => {
  list.forEach((card) =>{
    card.type = Constant.CARD_TYPE.NOT_WELL
    card.asPrivate = 0
  })
  return await cardRepository.upsertPublicNotWellCards(list)
}

const upsertPublicSuggestionCards = async (list) => {
  list.forEach((card) =>{
    card.type = Constant.CARD_TYPE.SUGGESTION
    card.asPrivate = 0
  })
  return await cardRepository.upsertPublicSuggestionCards(list)
}

export default {
  del: del,
  upsertPublicWellCards: upsertPublicWellCards,
  upsertPublicNotWellCards: upsertPublicNotWellCards,
  upsertPublicSuggestionCards: upsertPublicSuggestionCards
}
