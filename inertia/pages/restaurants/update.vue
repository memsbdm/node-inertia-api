<script setup lang="ts">
import type Restaurant from '#restaurants/restaurants/models/restaurant'
import { useForm } from '@inertiajs/vue3'
import { tuyau } from '#inertia/core/providers/tuyau'

const props = defineProps<{
  restaurant: Restaurant
}>()

const address =
  props.restaurant.addressLine +
  ' ' +
  props.restaurant.locality +
  ' ' +
  props.restaurant.regionCode +
  ' ' +
  props.restaurant.postalCode

const form = useForm({
  phone: props.restaurant.phone,
  description: props.restaurant.description,
})

function onSubmit() {
  form.patch(tuyau.$url('restaurants.update.execute', { params: { id: props.restaurant.id } }))
}
</script>

<template>
  <UPageHero
    title="Update Restaurant"
    description="Update your restaurant details. To modify restricted information, please synchronize with Google Business using the button below."
  />

  <UForm :state="form" @submit.prevent="onSubmit">
    <UContainer class="flex gap-7 w-screen flex-wrap justify-center">
      <UFormField label="Name" class="lg:w-1/3 w-full">
        <UInput :value="restaurant.title" disabled class="w-full" />
      </UFormField>

      <UFormField label="Address" class="lg:w-1/3 w-full">
        <UInput :value="address" disabled class="w-full" />
      </UFormField>

      <UFormField label="Phone" :error="form.errors.phone" class="lg:w-1/3 w-full">
        <UInput v-model="form.phone" class="w-full" />
      </UFormField>

      <UFormField label="Description" class="lg:w-1/3 w-full">
        <UTextarea v-model="form.description" class="w-full" />
      </UFormField>
    </UContainer>

    <UContainer class="flex justify-center mt-5 gap-5">
      <UButton variant="soft" icon="i-lucide-refresh-cw">Sync with Google Business</UButton>
      <UButton type="submit" :disabled="form.processing" icon="i-lucide-save">Save changes</UButton>
    </UContainer>
  </UForm>
</template>
