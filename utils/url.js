/**
 * url 相关处理
 * @Author Cphayim
 */

/**
 * 查询字符串
 * @function queryString
 * @param {object} data
 * @return string
 */
export function queryString(data) {
  let str = '?'
  if (!data) return str
  const keys = Object.keys(data)
  for (let key of keys) {
    str += `${key}=${data[key].toString()}&`     
  }
  return str.slice(0,-1)
}