<template>
    <div>
      <h1>Random Quote</h1>
      <p v-if="quote">{{ quote.quote }}</p> 
      <p v-if="quote">— {{ quote.author }}</p> 
      <button style="margin-right: 10px;" @click="fetchQuote">Get Another Quote</button>
      <button @click="copyToClipboard" v-if="quote">Copy Quote</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <h2>Quote History</h2>
    <ul>
      <li v-for="(historicalQuote, index) in quoteHistory" :key="index">
        "{{ historicalQuote.quote }}" — {{ historicalQuote.author }}
      </li>
    </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import QuoteService, { Quote } from '../services/quote-service'; 
  
  export default defineComponent({
    setup() {
      const quote = ref<Quote | null>(null); 
      const errorMessage = ref<string | null>(null);
        const quoteHistory = ref<Quote[]>([]);
  
      const fetchQuote = async () => {
        errorMessage.value = null;
        try {
          const response = await QuoteService.getRandomQuote();
          quote.value = response.data[0];

          if (quote.value) {
          quoteHistory.value.push(quote.value);
        }
        } catch (error) {
          errorMessage.value = "Sorry, we couldn't fetch a quote. Please try again later.";
        }
      };

      const copyToClipboard = async () => {
      if (quote.value) {
        try {
          await navigator.clipboard.writeText(quote.value.quote);
        } catch (err) {
          alert('Failed to copy quote.');
        }
      }
    };
  
      onMounted(fetchQuote);
  
      return { quote, fetchQuote, errorMessage, quoteHistory, copyToClipboard };
    },
  });
  </script>
  