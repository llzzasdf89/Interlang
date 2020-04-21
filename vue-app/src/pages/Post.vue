<template>
<v-content style="background:rgb(243,245,250)">
<transition>
  <router-view></router-view>
</transition>
<v-container app v-if="!$route.params.type">
<postTemplate v-for='v in items' :key='v.id' :item="v" @click.native="toPostDetail(v.params)">
</postTemplate>
</v-container>
</v-content>
</template>
<script>
import postTemplate from '@/components/postTemplate'
export default {
  data: function () {
    return {
      items: [
        {
          color: 'blue lighten-1',
          title: 'How do you say "..."?',
          params: {
            type: 'A'
          }
        },
        {
          color: 'blue lighten-1',
          title: 'What does "..." mean？',
          params: {
            type: 'D',
            endSentence: 'The meaning?'
          }
        },
        {
          color: 'blue lighten-1',
          title: 'What\'s the difference?',
          artist: 'Please show me the difference between "..." and "..."',
          params: {
            type: 'B',
            endSentence: `What's the difference？
                          If it's hard to explain, please list out some example`
          }
        }, {
          color: 'blue lighten-1',
          title: 'Please make a sentence with "..."',
          params: {
            type: 'C',
            hint: 'You can ask anything about that in any language。'
          }
        },
        {
          color: 'blue lighten-1',
          title: 'Is my pronounciation correct?',
          artist: 'Could you please record yours?',
          params: {
            type: 'D',
            hint: 'Please teach me',
            endSentence: 'How to pronounce it'
          }
        },
        {
          color: 'blue lighten-3',
          title: 'Ask a question without template',
          params: {
            type: 'C',
            hint: 'The content is not limited to cultrue or region, ask anything'
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
      this.$router.push({ name: 'New Question', params })
    }
  }
}
</script>
