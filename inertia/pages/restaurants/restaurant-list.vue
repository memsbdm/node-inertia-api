<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import type Restaurant from '#restaurants/restaurants/models/restaurant'
import { tuyau } from '#inertia/core/providers/tuyau'
import { computed, ref } from 'vue'

const props = defineProps<{
  restaurants: Restaurant[]
}>()

const cards = computed(() =>
  props.restaurants.map((restaurant) => ({
    title: restaurant.title,
    icon: 'i-lucide-chef-hat',
    id: restaurant.id,
  }))
)

const links = ref([
  {
    label: 'Refresh with Google Business',
    to: '/', // TODO: add refresh with Google Business
    icon: 'i-lucide-refresh-cw',
  },
])
</script>

<template>
  <Head title="Restaurants List" />

  <UContainer>
    <UPageHero
      v-if="restaurants.length > 0"
      :title="`We found ${restaurants.length} of your restaurants`"
      description="Can't find your restaurant in the list? Try to refresh using the button below or contact support."
      :links="links"
    />
    <UPageHero
      v-else
      :title="`No restaurant found`"
      description="We are only able to find your restaurants on Google Business. Try to refresh using the button below or contact support."
      :links="links"
    />

    <UPageGrid>
      <UPageCard v-for="(card, index) in cards" :key="index" v-bind="card">
        <UContainer class="flex gap-3 px-0! mx-0!">
          <Link :href="tuyau.$url('restaurants.update', { params: { id: card.id } })">
            <UButton icon="i-lucide-edit" variant="soft" color="primary" size="xl"
              >Manage</UButton
            ></Link
          >
          <Link
            :href="tuyau.$url('restaurants.delete', { params: { id: card.id } })"
            method="delete"
          >
            <UButton icon="i-lucide-trash" variant="soft" color="error" size="xl"
              >Delete</UButton
            ></Link
          >
        </UContainer>
      </UPageCard>
    </UPageGrid>
  </UContainer>
</template>
