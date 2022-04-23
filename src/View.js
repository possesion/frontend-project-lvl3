import onChange from "on-change";
import { object, string } from "yup";

class View {
  state = {
    feeds: [],
    rss: "",
    error: "",
  };

  userSchema = object({
    rss: string()
      .url("Ссылка должна быть валидным URL")
      .nullable()
      .notOneOf(this.state.feeds, "RSS уже существует"),
  });

  init() {
    const inputRSS = document.querySelector("#floatingInput");
    const form = document.querySelector("form");
    const feedback = document.querySelector(".feedback");

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
          rss: string()
            .url("Ссылка должна быть валидным URL")
            .nullable()
            .notOneOf(this.state.feeds, "RSS уже существует"),
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
