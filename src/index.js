import View from "./View.js";
import i18next from "i18next";
import resources from "./locales/index.js";
import { setLocale } from "yup";

const run = async () => {
  await i18next.init({
    lng: "ru",
    debug: true,
    resources,
  });

  setLocale({
    mixed: {
      notOneOf: () => i18next.t("errors.duplicate"),
    },
    string: {
      url: () => i18next.t("errors.url"),
    },
  });
  
  const form = document.querySelector("form");
  const posts = document.querySelector(".posts");
  const feeds = document.querySelector(".feeds");

  const rssView = new View();
  rssView.init();
};

document.addEventListener("DOMContentLoaded", () => {
  run();
});
