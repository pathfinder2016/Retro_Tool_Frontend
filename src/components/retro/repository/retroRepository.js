import httpHelper from '../../../common/util/httpHelper'

const getRetros = async ()=>{
  return await httpHelper.get('http://localhost:8090/retro/test')
}

export default {
  getRetros: getRetros
}
