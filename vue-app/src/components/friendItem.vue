<template>
<div>
<v-list three-line class="text-left" style="background:rgb(243,245,250)">

        <v-list-item class='pl-0'>
          <v-list-item-avatar size='60'>
            <v-img :src="user.Avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title >{{user.Name}}</v-list-item-title>
            <span class="subtitle-2 text--secondary flowControl">{{user.FirstLanguage}}:native > {{inString}}</span>
            <v-list-item-subtitle >♂</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
    </v-list>
</div>
</template>
<style scoped>
.flowControl{
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<script>
export default {
  props: ['user'],
  computed: {
    inString: function () {
      const inLanguages = this.user.InterestedLanguages.map(v => v.Name + ':' + v.Level)
      const inString = '' + inLanguages.toString()
      return inString
    }
  }
}
</script>
