import View from "./View.js";
import i18next from "i18next";
import resources from "./locales/index.js";

const run = async () => {
  await i18next.init({
    lng: "en",
    debug: true,
    resources,
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
