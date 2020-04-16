<template>
 <v-card outlined class="mt-6" width="100%">
          <v-subheader>REPORTS</v-subheader>
          <v-list>
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-content>母语</v-list-item-content>
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
                <v-list-item-content>你所感兴趣的语言</v-list-item-content>
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
            <v-divider></v-divider>
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-content>你所熟悉的国家</v-list-item-content>
              </template>
              <v-list-item v-for="n in familarCountries" :key="n">
                <v-list-item-content>
                  <v-list-item-title class="d-flex px-10 justify-space-between">{{n}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-divider></v-divider>
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-content>你所感兴趣的国家</v-list-item-content>
              </template>
              <v-list-item v-for="n in interstingCountries" :key="n">
                <v-list-item-content>
                  <v-list-item-title class="d-flex px-10 justify-space-between">{{n}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-divider></v-divider>
          </v-list>
        </v-card>
</template>
<script>
export default {
  data: function () {
    return {
      items: [{ icon: 'mdi-thumb-up', text: '被点赞的次数', value: 20 }, { icon: 'mdi-crown', text: '被选为最佳答案的次数', value: 5 }, { icon: 'mdi-bookmark', text: '书签', value: 30 }],
      motherLanguage: { language: '中文', value: 5 },
      interstingLanguageItems: [
        { language: '英语', value: 2 },
        { language: '德语', value: 3 }
      ],
      familarCountries: ['美国', '加拿大', '瑞士'],
      interstingCountries: ['美国', '中国']
    }
  }
}
</script>
