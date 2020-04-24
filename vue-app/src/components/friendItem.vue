<template>
<div>
<v-list three-line class="text-left" style="background:rgb(243,245,250)">

        <v-list-item>
          <v-list-item-avatar size='60'>
            <v-img src="@/assets/IMG_3154.jpeg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title >{{user.Name}}</v-list-item-title>
            <span class="subtitle-2 text--secondary">{{user.FirstLanguage}}:native>German:beginner</span>
            <v-list-item-subtitle >♂</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
    </v-list>
</div>
</template>
<script>
export default {
  props: ['user']
}
</script>
