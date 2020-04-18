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
          title: 'How to express this?',
          params: {
            type: 'A'
          }
        },
        {
          color: 'blue',
          title: 'What does this mean？',
          params: {
            type: 'D',
            endSentence: 'The meaning?'
          }
        },
        {
          color: 'primary',
          title: 'What\'s the difference?',
          artist: 'When you don\'t know  difference between A and B',
          params: {
            type: 'B',
            endSentence: `What's the difference？
                          If it's hard to explain, please list out some example`
          }
        }, {
          color: 'green',
          title: 'Questions about region',
          artist: 'Ask any questions about the country or region',
          params: {
            type: 'C',
            hint: 'You can ask anything about that in any language。'
          }
        },
        {
          color: 'green',
          title: 'Feel free to ask',
          artist: 'you could use no tempaltes to ask questions',
          params: {
            type: 'C',
            hint: 'The content is not limited to cultrue or region, ask anything'
          }
        },
        {
          color: 'pink',
          title: 'Could you give me example?',
          artist: 'Ask how to use some sentence in practical',
          params: {
            type: 'D',
            hint: 'Could you offer some',
            endSentence: 'instances？It\'s better if the examples are used in practical'
          }
        },
        {
          color: 'pink',
          title: 'Is my pronounciation correct?',
          artist: 'Ask about your pronounciation',
          params: {
            type: 'D',
            hint: 'Please teach me',
            endSentence: 'How to pronounce it'
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
