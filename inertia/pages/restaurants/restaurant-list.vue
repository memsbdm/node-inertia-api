<script setup lang="ts">
  import { Head, Link } from '@inertiajs/vue3'
  import type Restaurant from '#restaurants/restaurants/models/restaurant'
  import { tuyau } from '#inertia/core/providers/tuyau'
  defineProps<{
    restaurants: Restaurant[]
  }>()

</script>

<template>
  <Head title="Restaurants List" />

  <h1 v-if="restaurants.length > 0" class="text-center">We found {{ restaurants.length }} restaurant(s) on your Google Business Profile.</h1>
  <h1 v-if="restaurants.length === 0" class="text-center">No restaurants found on your Google Business Profile. If you think this is an error, please try again later.</h1>
  <ul v-if="restaurants.length > 0" class="mt-12 flex gap-12 justify-center">
    <li v-for="restaurant in restaurants" :key="restaurant.id" class="flex flex-col gap-4">
      {{ restaurant.title }}
      <div class="bg-blue-400 flex justify-center items-center">
            <Link :href="tuyau.$url('restaurants.edit', { params: { id: restaurant.id } })">Edit</Link>
        </div>
      <div class="bg-red-400 flex justify-center items-center">
            <Link :href="tuyau.$url('restaurants.delete', { params: { id: restaurant.id } })" method="delete">Delete</Link>
        </div>
    </li>
  </ul>
</template>