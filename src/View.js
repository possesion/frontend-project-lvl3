import onChange from "on-change";
import { object, string } from "yup";
import i18next from "i18next";

class View {
  state = {
    rss: "",
    error: "",
    feeds: [],
  };

  userSchema = object({
    rss: string().url().nullable().notOneOf(this.state.feeds),
  });

  init() {
    const title = document.querySelector("h1");
    const inputRSS = document.querySelector("#floatingInput");
    const label = document.querySelector("label");
    const form = document.querySelector("form");
    const feedback = document.querySelector(".feedback");
    const button = document.querySelector("[aria-label='add']");
    const description = document.querySelector(".lead");

    description.innerText = i18next.t("description");
    title.innerText = i18next.t("title");
    label.innerText = i18next.t("form.label");
    button.innerText = i18next.t("form.submit");

    /**
     * browse allows for listing all the keys of a namespace
     *
     * @function sum
     * @param {number} arg - The account ID
     * @returns {number}
     */

    const watchedObject = onChange(this.state, (path, value) => {
      if (path === "rss") {
        inputRSS.value = this.state.rss;
      }
      if (path === "feeds") {
        this.userSchema = object({
          rss: string().url().nullable().notOneOf(this.state.feeds),
        });
      }
      if (path === "error") {
        if (value) {
          feedback.innerText = this.state.error;
          inputRSS.classList.add("is-invalid");
        } else {
          inputRSS.classList.remove("is-invalid");
        }
      }
    });
    inputRSS.addEventListener("change", ({ target }) => {
      watchedObject.rss = target.value;
    });

    form.addEventListener("submit", (e) => {
      const post = document.createElement("div");
      const formData = new FormData(form);
      const payload = formData.get("rss");

      e.preventDefault();
      const user = this.userSchema
        .validate(this.state)
        .then(({ rss }) => {
          fetch(rss)
            .then((r) => r.text())
            .then((str) =>
              new window.DOMParser().parseFromString(str, "text/xml")
            )
            .then(() => {
              watchedObject.feeds.push(payload);
              watchedObject.error = "";
              watchedObject.rss = "";
            });
        })
        .catch((err) => {
          watchedObject.error = err.message;
        });
    });
  }
}

export default View;
