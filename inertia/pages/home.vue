<script setup lang="ts">
  import { tuyau } from "#inertia/core/providers/tuyau"
  import { Head, usePage, router } from '@inertiajs/vue3'
  import type { SharedProps } from '@adonisjs/inertia/types'
  const page = usePage<SharedProps>()

  function logout() {
    router.delete(tuyau.$url('auth.logout'))
  }
  </script>

<template>
  <Head title="Homepage" />

  <a v-if="!page.props.user" :href="tuyau.$url('oauth.google.redirect')">Login with Google</a>
  <div v-if="page.props.user">
    <p>Welcome {{ page.props.user.name }}</p>
    
    <button @click="logout">Logout</button>
  </div>
</template>