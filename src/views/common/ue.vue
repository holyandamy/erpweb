<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    prop:['defaultMsg'],
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },

    mounted() {
      console.log(1111,'this.defaultMsg',this.defaultMsg);
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    watch: {
      defaultMsg: function (val) {
        this.editor.setContent(val);
      }
    },
    methods: {
      getUEContent() { // 获取内容方法
        console.log(333);
        return this.editor.getContent()
      }
    },
    destroyed() {
      console.log(456);
      this.editor.destroy();
    }
  }
</script>
