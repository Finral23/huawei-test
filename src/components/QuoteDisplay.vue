<template>
    <div>
      <h1>Random Quote</h1>
      <p v-if="quote">{{ quote.quote }}</p> 
      <p v-if="quote">— {{ quote.author }}</p> 
      <button @click="fetchQuote">Get Another Quote</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import QuoteService, { Quote } from '../services/quote-service'; 
  
  export default defineComponent({
    setup() {
      const quote = ref<Quote | null>(null); 
      const errorMessage = ref<string | null>(null);
  
      const fetchQuote = async () => {
        errorMessage.value = null;
        try {
          const response = await QuoteService.getRandomQuote();
          quote.value = response.data[0];
        } catch (error) {
          errorMessage.value = "Sorry, we couldn't fetch a quote. Please try again later.";
        }
      };
  
      onMounted(fetchQuote);
  
      return { quote, fetchQuote, errorMessage };
    },
  });
  </script>
  