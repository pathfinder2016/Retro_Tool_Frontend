import cardRepository from '../repository/cardRepository'

const del = async (card, type) => {
  card.isPrivate = 0
  card.type = type
  return await cardRepository.del(card)
}

const upsertPublicCards = async (list, cardType) => {
  list.forEach((card) =>{
    card.type = cardType
    card.asPrivate = 0
  })
  return await cardRepository.upsertPublicCards(list)
}

export default {
  del: del,
  upsertPublicCards: upsertPublicCards,
}
