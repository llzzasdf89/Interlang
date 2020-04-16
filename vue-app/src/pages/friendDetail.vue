<template>
  <v-content>
    <v-container app class="fill-height d-flex align-content-start fluid align-center">
      <friendItem></friendItem>
      <tags :isDisabled="true" :textColor="'white'"></tags>
      <userReport class='mx-5'></userReport>
      <v-footer app>
        <v-row dense>
          <v-col cols="6" class="d-flex flex-column align-center">
            <v-btn icon>
              <v-icon>mdi-message</v-icon>
            </v-btn>
            <span class="subtitle-2">消息</span>
          </v-col>
          <v-col cols="6" class="d-flex flex-column align-center">
            <v-btn icon>
              <v-icon>mdi-plus-box-outline</v-icon>
            </v-btn>
            <span class="subtitle-2">关注</span>
          </v-col>
        </v-row>
      </v-footer>
    </v-container>
  </v-content>
</template>
<script>
import friendItem from '@/components/friendItem'
import tags from '@/components/tags'
import userReport from '@/components/userReport'
export default {
  components: {
    friendItem,
    tags,
    userReport
  }
}
</script>
