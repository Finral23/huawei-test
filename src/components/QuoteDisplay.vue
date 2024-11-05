<template>
    <div>
      <h1>Random Quote</h1>
      <p v-if="quote">{{ quote.quote }}</p> 
      <p v-if="quote">— {{ quote.author }}</p> 
      <button @click="fetchQuote">Get Another Quote</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import QuoteService, { Quote } from '../services/quote-service'; 
  
  export default defineComponent({
    setup() {
      const quote = ref<Quote | null>(null); 
  
      const fetchQuote = async () => {
        try {
          const response = await QuoteService.getRandomQuote();
          quote.value = response.data[0];
        } catch (error) {
          console.error('Error loading quote:', error);
        }
      };
  
      onMounted(fetchQuote);
  
      return { quote, fetchQuote };
    },
  });
  </script>
  