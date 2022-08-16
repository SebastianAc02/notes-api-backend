
const logger = (request, response, next) =>{

  console.log('method : ',request.method)
  console.log('path: ',request.path)
  console.log('body : ',request.body)
  console.log('=====================')
  next()
}
  
module.exports = logger