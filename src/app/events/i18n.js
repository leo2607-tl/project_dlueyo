import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      "welcome": "Chào bạn!",
      "search_placeholder": "Tìm kiếm...",
      "profile": "Tài khoản",
      "events": "Sự kiện"
    }
  },
  en: {
    translation: {
      "welcome": "Hello!",
      "search_placeholder": "Search...",
      "profile": "Profile",
      "events": "Events"
    }
  },
  fr: {
    translation: {
      "welcome": "Bonjour!",
      "search_placeholder": "Recherche...",
      "profile": "Profil",
      "events": "Événements"
    }
  },
  zh: {
    translation: {
      "welcome": "你好!",
      "search_placeholder": "搜索...",
      "profile": "账户",
      "events": "活动"
    }
  },
  ko: {
    translation: {
      "welcome": "안녕하세요!",
      "search_placeholder": "검색...",
      "profile": "프로필",
      "events": "이벤트"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi", 
  interpolation: {
    escapeValue: false, 
  }
});

export default i18n;
