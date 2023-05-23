<script>
export default {
  props: ['userEmail', 'userMessage', 'devId'],
  computed: {
    emailLink() {
      return `mailto:${this.email}`
    }
  }
}
</script>

<template>
  <li>
    <div>
      De : <a :href="emailLink">{{ userEmail }}</a>
    </div>
    <p>Message : {{ userMessage }}</p>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}

h3 {
  margin-top: 0;
}
</style>
