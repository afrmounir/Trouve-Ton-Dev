<template>
  <header>
    <h1>
      <RouterLink to="/">Trouve Ton Dev</RouterLink>
    </h1>

    <nav>
      <ul>
        <li><RouterLink to="/devs">Devs</RouterLink></li>
        <li><RouterLink to="/requests">Mes Demandes</RouterLink></li>
      </ul>
    </nav>

    <div>
      <base-button v-if="!true" mode="outline">Se Connecter</base-button>
      <base-button v-if="true" mode="outline">Se Déconnecter</base-button>
    </div>
  </header>
</template>

<style scoped>
header {
  height: 5rem;
  background-color: white;
  margin: 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: center;
  align-items: center;
}

li {
  margin: 0 1rem;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  padding-bottom: 0.25rem;
}

a:hover,
a:active,
a.router-link-active {
  color: #45006d;
  border-color: #45006d;
}

button {
  font: inherit;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border: 1px solid #45006d;
  background-color: transparent;
  color: #45006d;
  border-radius: 30px;
}

button:hover,
button:active {
  background-color: #f0d5ff;
}
</style>