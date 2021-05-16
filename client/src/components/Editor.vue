<template>
  <div>
    <editor
      v-model="content"
      @init="editorInit"
      lang="json"
      theme="chrome"
      width="100%"
      :height="height"
      readonly="true"
    ></editor>
  </div>
</template>

<script>
import editor from "vue2-ace-editor";

export default {
  name: "code-editor",
  components: {
    editor
  },
  computed: {
    height() {
      const count = this.content
        ? typeof this.content === "object"
          ? this.content.length
          : JSON.parse(this.content).length
        : 100;
        switch(count){
          case 1:
            return 100;
            case 2:
              return 160;
              case 3:
                return 210;
                case 4:
                  return 265;
                  default:
                    return 370;
        }
    }
  },
  props: ["content"],
  methods: {
    editorInit: function(editor) {
      editor.setReadOnly(true);
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/json"); //language
      require("brace/theme/chrome");
      require("brace/snippets/json"); //snippet
    }
  }
};
</script>