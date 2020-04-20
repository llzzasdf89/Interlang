<template>
<v-list width="100%" style="background:rgb(243,245,250)">
<v-form >
<v-select solo :items='languages' hint='languages' rounded persistent-hint @input= 'selectLanguage' hide-selected :rules='languageRules'>
</v-select>
<v-select solo :rules='levelRules' @input='selectLevel' :items="levels" hint='level' rounded persistent-hint :disabled="type==='motherTogue'" :label="type==='motherTogue'?'native':''">
</v-select>
</v-form>
</v-list>
</template>
<script>
export default {
  props: ['type', 'interstedLanguages', 'id'],
  data: function () {
    return {
      languageRules: [v => !!v || 'language can not be empty'],
      levelRules: [v => !!v || 'levels can not be empty']
    }
  },
  computed: {
    languages: function () {
      const languages = this.$store.state.languages
      return languages
    },
    levels: function () {
      const levels = this.$store.state.levels
      return levels
    }
  },
  methods: {
    selectLanguage: function (lan) {
      const type = this.type
      if (type === 'motherTogue') this.$emit('selectMotherTogue', lan)
      else {
        const lanObj = {
          id: this.id,
          lan
        }
        this.$emit('selectInterstedLanguage', lanObj)
      }
    },
    selectLevel (level) {
      const levelObj = {
        id: this.id,
        level
      }
      this.$emit('selectLevel', levelObj)
    }
  }

}
</script>
