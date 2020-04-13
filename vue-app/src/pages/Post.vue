<template>
<v-app>
<v-content>
<router-view></router-view>
<v-container app v-if="!$route.params.type">
<postTemplate v-for='v in items' :key='v.id' :item="v" @click.native="toPostDetail(v.params)">
</postTemplate>
</v-container>
</v-content>
</v-app>
</template>
<script>
import postTemplate from '@/components/postTemplate'
export default {
  data: function () {
    return {
      items: [
        {
          color: 'black',
          title: '这个怎么说?',
          params: {
            type: 'A'
          }
        },
        {
          color: 'blue',
          title: '这个是什么意思？',
          params: {
            type: 'D',
            endSentence: '是什么意思?'
          }
        },
        {
          color: 'primary',
          title: '区别是什么?',
          artist: '当你无法区分时',
          params: {
            type: 'B',
            endSentence: `的区别是什么？
                          如果解释起来比较困难，请举出一些例句`
          }
        }, {
          color: 'green',
          title: '对国家或者地区进行提问',
          artist: '关于语言、文化以及其他的任何问题都可以随便提问',
          params: {
            type: 'C',
            hint: '对国家、文化或者任何你想问的东西。你可以使用任何语言。'
          }
        },
        {
          color: 'green',
          title: '自由提问',
          artist: '你可以不使用提问模版来提问关于语言和文化的问题',
          params: {
            type: 'C',
            hint: '问题的内容不局限于语言和文化，你可以用任何一种语言提问任何其他你想提问的问题'
          }
        },
        {
          color: 'pink',
          title: '请用~~帮我造一下句子行吗?',
          artist: '询问实际使用的示例',
          params: {
            type: 'D',
            hint: '您可以提供一些包含',
            endSentence: '的例句吗？如果能提供多点生活中常用的句子就更好了'
          }
        },
        {
          color: 'orange',
          title: '我的发音标准吗?',
          artist: '询问实际使用的示例',
          params: {
            type: 'D',
            hint: '请教我',
            endSentence: '怎么发音。'
          }
        }
      ]
    }
  },
  components: {
    postTemplate
  },
  methods: {
    toPostDetail: function (params) {
      this.$router.push({ name: 'postDetail', params })
    }
  }
}
</script>
