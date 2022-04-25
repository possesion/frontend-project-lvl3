import View from "./View.js";
import i18next from "i18next";
// import "regenerator-runtime/runtime.js";
import resources from "./locales/index.js";
import { setLocale } from "yup";

export default async function run() {
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
}

document.addEventListener("DOMContentLoaded", () => {
  run();
});
