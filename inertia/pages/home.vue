<script setup lang="ts">
import { tuyau } from '#inertia/core/providers/tuyau'
import { Head, usePage, router, Link } from '@inertiajs/vue3'
import type { SharedProps } from '@adonisjs/inertia/types'
const page = usePage<SharedProps>()

function logout() {
  router.delete(tuyau.$url('auth.logout'))
}
</script>

<template>
  <Head title="Homepage" />

  <UContainer class="h-screen flex flex-col items-center">
    <UPageHero
      title="Ultimate all-in-one restaurant management"
      description="Tailored for your restaurant, from menu to analytics, from customers to payments. The perfect tool for restaurant owners and managers. Let's get started."
      headline="Easy way to manage your business"
    />

    <ULink v-if="!page.props.user" :to="tuyau.$url('oauth.google.redirect')"
      ><UButton size="xl" icon="i-lucide-rocket">Login with Google Business</UButton></ULink
    >

    <UContainer v-if="page.props.user" class="flex gap-5">
      <Link :href="tuyau.$url('restaurants.render')"
        ><UButton size="xl" icon="i-lucide-arrow-right">Manage your restaurants</UButton></Link
      >
      <UButton size="xl" icon="i-lucide-log-out" color="error" variant="soft" @click="logout"
        >Logout</UButton
      >
    </UContainer>
  </UContainer>
</template>
