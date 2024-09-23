import i18next from "i18next";

i18next.init({
  lng: "en", // default language
  resources: {
    en: {
      translation: {
        EventTitle: "Event",
      },
    },
    hn: {
      translation: {
        EventTitle: "इवेंट",
      },
    },
  },
});

export default i18next;
