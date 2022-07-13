import { useEffect, useState, useLayoutEffect, useCallback } from "react"

// const defaultThreshold = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

const noActiveStyle = {
  contentVisibility: 'hidden',
  // contentVisibility: 'auto'
}

const activeStyle = {
  contentVisibility: 'visible'
}
// TODO: 
// 滚动监控截流
const useScrollAnim = (options = {}) => {
  const {
    // 触发数组
    // threshold = defaultThreshold, 
    at = 200,// 触发位置
    play = 'xs', //动画
    triggerDm = null
  } = options

  const [style, setStyle] = useState(noActiveStyle)
  const [enhanceClass, setEnhanceClass] = useState([])

  const [active, setActive] = useState(false)

  // 动画根据active状态改变
  useEffect(() => {
    // if active
    if (active) {
      setStyle(activeStyle)
      // add class
      setEnhanceClass([play])
      return
    }
    // else
    setStyle(noActiveStyle)
    setEnhanceClass([])
  }, [active])

  // trigger active
  const trigger = () => {
    setActive(true)
  }

  const scrollListener = useCallback(() => {
    if (active) return // 节流

    const { top } = triggerDm.current?.getBoundingClientRect()

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

  return { className: enhanceClass.join(' '), style, trigger }
}

export default useScrollAnim