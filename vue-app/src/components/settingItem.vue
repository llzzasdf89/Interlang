<template>
<v-list width="100%">
<v-form>
<v-select solo :items='languages' hint='languages' rounded persistent-hint @change='selectMotherTogue' :value='selectedMotherTogue' >
</v-select>
<v-select solo :items='[1,2,3,4,5]' hint='levels' rounded persistent-hint>
</v-select>
</v-form>
</v-list>
</template>
<script>
export default {
  computed: {
    languages: function () {
      return this.$store.state.motherTogues
    }
  },
  data: function () {
    return {
      selectedMotherTogue: ''
    }
  },
  methods: {
    selectMotherTogue: function (lan) {
      this.$data.selectedMotherTogue = lan
      this.$store.commit('removeLanguage', lan)
    }
  }
}
</script>
