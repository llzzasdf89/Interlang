export const detailTemplateCommonData = {
  data () {
    return {
      selectedLangauge: '',
      languageRules: [v => !!v || 'Language must be selected'],
      inputRules: [v => !!v || 'Input is required'],
      input: ''
    }
  },
  computed: {
    languages: function () {
      let languages = this.$store.state.languages
      languages = languages.map(v => v.Name)
      return languages
    },
    hint: function () {
      return this.$route.params.hint
    },
    endSentence: function () {
      return this.$route.params.endSentence
    }
  },
  methods: {
    selectLanguage: function (e) {
      this.$data.selectedLangauge = e
      this.$emit('select', e)
    },
    subscribe: function (e) {
      this.$data.input = e
      this.$emit('input', e)
    }
  }
}
