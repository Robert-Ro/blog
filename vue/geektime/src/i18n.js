import VueI18n from 'vue-i18n'

const messages = {
  en: {
    hello: 'hello world'
  },
  cn: {
    hello: '你好，世界'
  }
}

// 通过选项创建 VueI18n 实例
export const i18n = new VueI18n({
  locale: 'en', // 设置地区
  messages, // 设置地区信息
  fallbackLocale: 'en'
})
