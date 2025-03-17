<script setup lang="ts">
import type Restaurant from '#restaurants/restaurants/models/restaurant';

  defineProps<{
    restaurant: Restaurant
  }>()
</script>

<template>
    <h1>Name: {{ restaurant.title }}</h1>

    <p>Description: {{ restaurant.description }}</p>
    <p>Address: {{ restaurant.addressLine + ' ' + restaurant.locality + ' ' + restaurant.regionCode + ' ' + restaurant.postalCode }}</p>
    <p>Image: {{ restaurant.imageUrl }}</p>
    <p>Phone: {{ restaurant.phone }}</p>
</template>