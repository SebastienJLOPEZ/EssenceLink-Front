<!-- AddressCard.vue -->

<template>
    <div class="card">
      <address>
        {{ street }}, {{ postalCode }} {{ city }}
      </address>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      street: String,
      city: String,
      postalCode: String,
    },
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 1em;
    background-color: #93ab91;
    color: #fff;
    padding: 1em;
    margin-top: 10px;
    text-align: center; /* Align the content in the middle */
  }
  </style>
  