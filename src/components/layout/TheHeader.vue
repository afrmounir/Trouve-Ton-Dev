<template>
  <header>
    <h1><RouterLink to="/">Trouve Ton Dev</RouterLink></h1>

    <div class="wrapper">
      <nav>
        <ul>
          <li><RouterLink to="/devs">Devs</RouterLink></li>
          <li><RouterLink to="/requests">Mes Demandes</RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: whitesmoke;
  box-shadow: 0px 0px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header a {
  text-decoration: none;
  color: black;
  display: inline-block;
  padding: 0.75rem 1.5rem;
}

a:active,
a:hover,
a.router-link-active {
  color: slategrey;
}

h1 {
  margin: 0;
}

h1 a {
  color: black;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
