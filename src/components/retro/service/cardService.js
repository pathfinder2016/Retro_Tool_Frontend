import cardRepository from '../repository/cardRepository'
import Constant from '@/common/constant/constant'

const del = async (card, type) => {
  card.isPrivate = 0
  card.type = type
  return await cardRepository.del(card)
}

export default {
  del: del
}
