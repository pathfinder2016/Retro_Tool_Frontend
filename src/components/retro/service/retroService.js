import retroRepository from '../repository/retroRepository'

const getRetros = async () =>{
   return await retroRepository.getRetros();
}

export default {
  getRetros: getRetros
}
