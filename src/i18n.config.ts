import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './i18n/zh-cn';
import en from './i18n/en-us';

const resources = {
  zh: {
    translation: zh,
  },
  en: {
    translation: en,
  },
};
i18n.use(initReactI18next).init({
  //初始化
  debug: true,
  resources, //本地多语言数据
  fallbackLng: localStorage.getItem('lang') || 'en',
});

export default i18n;
