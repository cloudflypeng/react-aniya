// 获取原有的类型,增强之后还给组件
const getOriginClassName=(ele)=>{
  console.log('retureclass :>> ',  ele.current.getAttribute('class'));
  return ele.current.getAttribute('class')
}

export {getOriginClassName}