import { describe, test, expect } from "@jest/globals";
import { findPageByIdOrPath } from "./pages-utils";

const pages = {
  homePage: {
    id: "home",
    path: "/",
    name: "Home",
    title: "Home",
    treeId: "tree-1",
    meta: {},
  },
  pages: [
    {
      id: "page1",
      path: "/page1",
      name: "Page",
      title: "Page",
      treeId: "tree-1",
      meta: {},
    },
  ],
};

describe("Find by id or path", () => {
  test("home page by id", () => {
    const page = findPageByIdOrPath(pages, "home");
    expect(page).toEqual(pages.homePage);
  });
  test("home page by path /", () => {
    const page = findPageByIdOrPath(pages, "/");
    expect(page).toEqual(pages.homePage);
  });
  test("home page by empty path", () => {
    const page = findPageByIdOrPath(pages, "");
    expect(page).toEqual(pages.homePage);
  });
  test("find page by id", () => {
    const page = findPageByIdOrPath(pages, "page1");
    expect(page).toEqual(pages.pages[0]);
  });
  test("find page by path", () => {
    const page = findPageByIdOrPath(pages, "/page1");
    expect(page).toEqual(pages.pages[0]);
  });
});
