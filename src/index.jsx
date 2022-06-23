import { useEffect, useState, useRef, useLayoutEffect, useCallback } from "react"
import { getOriginClassName } from './utils'

const defaultThreshold = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

const noActiveStyle = {
  contentVisibility: 'hidden',
  // contentVisibility: 'auto'
}

const activeStyle = {
  contentVisibility: 'visible'
}

// options:{}
// 滚动监控截流
const useScrollAnim = (options = {}) => {
  const {
    // 触发数组
    threshold = defaultThreshold, // 触发位置
    at = 200,// 触发位置
    play = 'xs', //动画
  } = options

  const myref = useRef(null)

  const [style, setStyle] = useState(noActiveStyle)
  const [enhanceClass, setEnhanceClass] = useState([])

  const [active, setActive] = useState(false)
  console.log('enhanceClass :>> ', enhanceClass);
  console.log('style :>> ', style);
  // 动画根据active状态改变
  useEffect(() => {
    // if active
    if (active) {
      console.log('set');
      setStyle(activeStyle)
      // add class
      setEnhanceClass([getOriginClassName(myref), play])
      return
    }
    // else
    setStyle(noActiveStyle)
    setEnhanceClass([enhanceClass[0]])
  }, [active])

  // trigger active
  const trigger = () => {
    setActive(true)
  }

  const scrollListener = useCallback(() => {
    // 只触发一次
    if (active) return

    const { top } = myref.current.getBoundingClientRect()

    if (top < at) {
      trigger()
    }
    if (top > window.innerHeight) {
      setActive(false)
    }

  }, [])

  // 监控当前位置
  useLayoutEffect(() => {
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  })

  if (!enhanceClass.join(' ').length) {
    return { ref: myref, style }
  }

  return { ref: myref, style, className: enhanceClass.join(' ') }
}

export default useScrollAnim