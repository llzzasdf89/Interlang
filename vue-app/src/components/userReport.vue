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
                    {{user.FirstLanguage || 'null'}}
                    <span>native</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-divider></v-divider>
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-content>Intersted Languages</v-list-item-content>
              </template>
              <v-list-item v-for="n in user.interstedLanguages" :key="n.value">
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
  props: ['user'],
  data: function () {
    return {
      interstingLanguageItems: [
        { language: 'English', value: 'beginner' },
        { language: 'Germany', value: 'advanced' }
      ]
    }
  }
}
</script>
