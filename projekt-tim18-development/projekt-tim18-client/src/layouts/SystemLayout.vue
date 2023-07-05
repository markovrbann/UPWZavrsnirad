<template>
    <q-layout>
      <q-header elevated>
        <q-toolbar>
          <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />
          <q-toolbar-title>
            Projekt-tim18-System
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
        <q-list>
          <q-item-label header>Menu</q-item-label>
          <q-item clickable to="/Rezervacije">
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Rezervacije</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/MeteoStations">
            <q-item-section avatar>
              <q-icon name="style" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Meteo stations</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable @click="home">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Home</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable @click="logout">
            <q-item-section avatar>
              <q-icon name="power_settings_new" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Log Out</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>
<script>
import { ref } from 'vue'
export default {
  name: 'SystemLayout',
  setup () {
    const leftDrawerOpen = ref(false)
    const logout = () => {
      this.$auth.signOut().then(() => {
        this.$router.push('/')
      })
    }
    const home = () => {
      this.$router.push('/')
    }
    return {
      leftDrawerOpen,
      logout,
      home
    }
  }
}
</script>
