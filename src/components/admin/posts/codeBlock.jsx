import Quill from "quill";
const Block = Quill.import("blots/block");

class CodeBlockWithLang extends Block {
  static create(value) {
    const node = super.create();
    node.setAttribute("class", `language-${value || "javascript"}`);
    return node;
  }

  static formats(node) {
    return node.getAttribute("class").replace("language-", "");
  }
}
CodeBlockWithLang.blotName = "code-block-custom";
CodeBlockWithLang.tagName = "pre";
Quill.register(CodeBlockWithLang);
