/**
 * dom 常用操作方法
 */
import LogUtils from './../logUtils/index'
export default class DomUtils {
  /**
	 * @description 判断元素是否存在某个class类
	 * @param { Element } el dom元素
	 * @param { String } className class名称
   * @example
   * DomUtils.hasClass(document.body, 'd-utils')
	 */
  static hasClass (el: any, className: string): boolean {
    return el.classList.contains(className)
  }

  /**
	 * @description 元素添加class
	 * @param { Element } el dom元素
	 * @param { (String | Array) } className class名称，可以是多个
   * @example
   * DomUtils.addClass(document.body, 'd-utils')
	 */
  static addClass (el: Element, className: string | string[]): void {
    if (Array.isArray(className)) {
      className.forEach((item: string) => {
        if (!DomUtils.hasClass(el, item)) {
          el.classList.add(item)
        }
      })
      return
    }
    if (!DomUtils.hasClass(el, className)) {
      el.classList.add(className)
    }
  }

  /**
   * @description 元素删除class
   * @param { Element } el dom元素
   * @param { (String | Array) } className class名称，可以是多个
   * @example
   * DomUtils.removeClass(document.body, 'd-utils')
   */
  static removeClass (el: any, className: string | string[]): void {
    if (Array.isArray(className)) {
      className.forEach((item: string) => {
        if (DomUtils.hasClass(el, item)) {
          el.classList.remove(item)
        }
      })
      return
    }
    if (DomUtils.hasClass(el, className)) {
      el.classList.remove(className)
    }
  }

  /**
   * @description 获取元素的css属性内容
   * @param { Element } el dom元素
   * @param { String } cssProp css的属性名称
   * @return { String } css对应的属性的值
   * @example
   * DomUtils.computedStyle(document.body, 'width')
   */
  static computedStyle (el: any, cssProp: any): void {
    if (!el) {
      LogUtils.logError('dom元素不存在', '[d-utils] DomUtils computedStyle error => ')
      return
    }
    if (!cssProp) {
      LogUtils.logError('请输入需要查询的css属性名称', '[d-utils] DomUtils computedStyle error => ')
      return
    }
    return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(el, '')[cssProp] : el.currentStyle[cssProp]
  }

  /**
   * @description js设置元素的filter样式
   * @param { Element } el dom元素
   * @param { (String | Object) } type filter类型   blur、opacity、grayscale、sepia、saturate、hue-rotate、invert、brightness、contrast、drop-shadow, 当type为Object的时候就是显示一系列键值对，设置多个filter属性 `blur、opacity、grayscale、sepia、saturate、hue-rotate、invert、brightness、contrast、drop-shadow
   * @param { (String | Number) } option 参数 10px  10% 等等，根据不同type的类型设定不同的参数配置
   * @example
   * // 单个filter属性传参数
   * DomUtils.cssFilter(document.body, 'grayscale', 1)
   * // 多个filter属性传参数
   * DomUtils.cssFilter(document.body, {
   *   grayscale: 0.5,
   *   opacity: 0.7,
   *   'hue-rotate': '90deg'
   * })
   */
  static cssFilter (el: any, type: any, option: string | number): void {
    if (typeof type === 'object' && !option) {
      let cssText = ''
      for (let k in type) {
        if (type.hasOwnProperty(k)) {
          cssText+= `${k}(${type[k]})`
        }
      }
      el.style.filter = cssText
      el.style.webkitFilter = cssText
      return
    }
    el.style.filter = `${type}(${option})`
    el.style.webkitFilter = `${type}(${option})`
  }
}
