<template>
  <v-row>
    <v-col>
      <v-card :color="item.color" dark>
        <div class="d-flex flex-no-wrap justify-space-between text-no-wrap text-left">
          <div>
            <v-card-title class="headline" v-text="item.title"></v-card-title>

            <v-card-subtitle v-text="item.artist"></v-card-subtitle>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['item']
}
</script>
