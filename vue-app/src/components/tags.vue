<template>
  <v-row class='text-left pl-7' dense>
    <v-col cols="12">
      <span>Tags:</span>
      <v-chip-group multiple  column v-model="selectedTags" active-class="active-class">
        <v-chip v-for="tag in tags" :key="tag" :value="tag" :disabled='isDisabled' color='blue' :text-color="textColor">{{ tag }}</v-chip>
      </v-chip-group>
    </v-col>
  </v-row>
</template>
<style scoped>
.active-class{
    color:white
}
</style>
<script>
export default {
  props: ['isDisabled', 'textColor'],
  data: function () {
    return {
      tags: [
        'cuisine',
        'travel',
        'movie',
        'music',
        'medical',
        'treatment',
        'education',
        'job hunting',
        'shopping',
        'sports',
        'entertainment'
      ],
      selectedTags: []
    }
  }
}
</script>
