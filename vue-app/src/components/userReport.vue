<template>
 <v-card outlined class="mt-6" width="100%">
          <v-list>
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-content>Mother Tongue</v-list-item-content>
              </template>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex px-10 justify-space-between">
                    {{motherLanguage.language}}
                    <span>{{motherLanguage.value}}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-divider></v-divider>
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-content>Intersted Languages</v-list-item-content>
              </template>
              <v-list-item v-for="n in interstingLanguageItems" :key="n.value">
                <v-list-item-content>
                  <v-list-item-title class="d-flex px-10 justify-space-between">
                    {{n.language}}
                    <span>{{n.value}}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
</template>
<script>
export default {
  data: function () {
    return {
      items: [{ icon: 'mdi-thumb-up', text: '被点赞的次数', value: 20 }, { icon: 'mdi-crown', text: '被选为最佳答案的次数', value: 5 }, { icon: 'mdi-bookmark', text: '书签', value: 30 }],
      motherLanguage: { language: 'Chinese', value: 'native' },
      interstingLanguageItems: [
        { language: 'English', value: 'beginner' },
        { language: 'Germany', value: 'advanced' }
      ],
      familarCountries: ['America', 'Canada', 'Swiss'],
      interstingCountries: ['America', 'China']
    }
  }
}
</script>
