
import { isArray, merge, pipe } from "@yagni-js/yagni";
import { h, hText, hSkip } from "@yagni-js/yagni-dom";
import { view as loginFormView } from "./login-form.html";
import { view as logoutFormView } from "./logout-form.html";
import { view as itemView } from "./menu/item.html";


export function view(ctx) {
  return h("div", {"class": "root"}, {}, [
    h("div", {"class": "header"}, {}, [
      h("h1", {"class": `${ctx.headerClass}`}, {}, [
        hText(`Welcome to ${ctx.headerTitle}`)
      ]),
      !(ctx.user.isLoggedIn) ? (loginFormView(ctx)) : hSkip(),
      (ctx.user.isLoggedIn) ? (logoutFormView(ctx)) : hSkip()
    ]),
    h("div", {"class": "main"}, {}, [
      h("div", {"class": "sidebar"}, {}, [
        h("nav", {"class": "mainmenu"}, {}, [
          isArray(ctx.mainmenu) ? ctx.mainmenu.map(itemView) : hSkip()
        ])
      ]),
      h("div", {"class": "content", "id": "content"}, {}, [
        h("div", {"class": "content-body", "id": "content-body"}, {}, [
          hText("Content")
        ]),
        h("nav", {"class": "relatedmenu"}, {}, [
          (ctx.showRelatedMenu) ? (isArray(ctx.relatedmenu) ? ctx.relatedmenu.map(pipe([merge({"related": "yes"}), itemView])) : hSkip()) : hSkip()
        ])
      ])
    ]),
    h("div", {"class": "footer"}, {}, [
      hText(`${ctx.copyright}`)
    ])
  ]);
}
