<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    text() {
      return this.title.toUpperCase();
    }
  }
}
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.Node\.js {
  background-color: #3d008d;
  color: white;
}

.Vue\.js {
  background-color: #008d61;
  color: white;
}

.Angular {
  background-color: #008d7a;
  color: white;
}

.Python {
  background-color: #71008d;
  color: white;
}

.React {
  background-color: #8d0023;
  color: white;
}

.Kafka {
  background-color: #00568d;
  color: white;
}

.Java {
  background-color: #8d3500;
  color: white;
}

.C\# {
  background-color: #8d5700;
  color: white;
}

.Ruby {
  background-color: #8d006e;
  color: white;
}

.Swift {
  background-color: #8d003b;
  color: white;
}

.PHP {
  background-color: #8d006e;
  color: white;
}

.JavaScript {
  background-color: #8d3d00;
  color: white;
}

.C\+\+ {
  background-color: #8d8d00;
  color: white;
}
</style>
