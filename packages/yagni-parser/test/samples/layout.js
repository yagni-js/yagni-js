
import { isArray, merge, pipe } from "yagni";
import { h } from "yagni-dom";
import { view as loginFormView } from "./login-form.html";
import { view as logoutFormView } from "./logout-form.html";
import { view as itemView } from "./menu/item.html";


export function view(ctx) {
  return h("div", {"class": "root"}, {}, [
    h("div", {"class": "header"}, {}, [
      h("h1", {}, {}, [
        "Header"
      ]),
      !(ctx.user.isLoggedIn) ? (loginFormView(ctx)) : "",
      (ctx.user.isLoggedIn) ? (logoutFormView(ctx)) : ""
    ]),
    h("div", {"class": "main"}, {}, [
      h("div", {"class": "sidebar"}, {}, [
        h("nav", {"class": "mainmenu"}, {}, [
          isArray(ctx.mainmenu) ? ctx.mainmenu.map(itemView) : ""
        ])
      ]),
      h("div", {"class": "content", "id": "content"}, {}, [
        h("div", {"class": "content-body", "id": "content-body"}, {}, [
          "Content"
        ]),
        h("nav", {"class": "relatedmenu"}, {}, [
          (ctx.showRelatedMenu) ? (isArray(ctx.relatedmenu) ? ctx.relatedmenu.map(pipe([merge({"related": "yes"}), itemView])) : "") : ""
        ])
      ])
    ]),
    h("div", {"class": "footer"}, {}, [
      "Footer"
    ])
  ]);
}