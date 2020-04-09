<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-card class="d-flex align-center mt-6" outlined>
          <v-col cols="2">
            <v-avatar left>
              <v-img src="@/assets/IMG_3154.jpeg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="10" class="text-start">
            <v-list two-line>
              <v-list-item-title class="font-weight-bold">RichardZhiLi</v-list-item-title>
              <v-list-item-subtitle class="font-weight-medium">男</v-list-item-subtitle>
            </v-list>
          </v-col>
        </v-card>
        <v-card outlined class="mt-6">
          <v-row no-gutters>
            <v-col cols="6">
              <v-list-item two-line>
                <v-list-item-content class="text-left">
                  <v-list-item-title class="capition">提问次数</v-list-item-title>
                  <v-list-item-subtitle class="d-flex align-center justify-space-between display-1">
                    <v-icon large>mdi-help-box</v-icon>2
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="6">
              <v-list-item two-line>
                <v-list-item-content class="text-left">
                  <v-list-item-title class="capition">回答次数</v-list-item-title>
                  <v-list-item-subtitle class="d-flex align-center justify-space-between display-1">
                    <v-icon large>mdi-forum</v-icon>20
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row v-for="n in items" :key="n.value">
            <v-col cols="12" class="d-flex justify-space-around">
              <v-list-item>
                <v-list-item-subtitle class="d-flex justify-space-between align-baseline">
                  <v-icon class="ml-1">{{n.icon}}</v-icon>
                  <span>{{n.text}}</span>
                  <span>{{n.value}}</span>
                </v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
        <v-card outlined class="mt-6">
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
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    items: [{ icon: 'mdi-thumb-up', text: '被点赞的次数', value: 20 }, { icon: 'mdi-crown', text: '被选为最佳答案的次数', value: 5 }, { icon: 'mdi-bookmark', text: '书签', value: 30 }],
    motherLanguage: { language: '中文', value: 5 },
    interstingLanguageItems: [
      { language: '英语', value: 2 },
      { language: '德语', value: 3 }
    ],
    familarCountries: ['美国', '加拿大', '瑞士'],
    interstingCountries: ['美国', '中国']
  })
}
</script>
