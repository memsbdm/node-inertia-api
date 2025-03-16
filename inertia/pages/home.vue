<script setup lang="ts">
  import { tuyau } from "#inertia/core/providers/tuyau"
  import { Head, Link, usePage } from '@inertiajs/vue3'
  import type { SharedProps } from '@adonisjs/inertia/types'
  const page = usePage<SharedProps>()
</script>

<template>
  <Head title="Homepage" />

  <a v-if="!page.props.user" :href="tuyau.$url('oauth.google.redirect')">Login with Google</a>
  <div v-if="page.props.user">
    <p>Welcome {{ page.props.user.name }}</p>
    <Link :href="tuyau.$url('auth.logout')" method="delete">Logout</Link>
  </div>
</template>