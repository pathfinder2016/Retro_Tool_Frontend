import httpHelper from '../../../common/util/httpHelper'

const del = async (params)=>{
  return await httpHelper.del('http://146.222.43.190:8090/card/del', params)
}

export default {
  del: del
}
