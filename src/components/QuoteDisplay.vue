<template>
  <div>
    <h1>Random Quote</h1>
    <h2>Quote Settings</h2>
    <label for="category">Category:</label>
    <input
      class="input-field"
      type="text"
      v-model="quoteCategory"
      placeholder="Enter a category (e.g., love)"
    />
    <p v-if="quote">{{ quote.quote }}</p>
    <p v-if="quote">— {{ quote.author }}</p>
    <button class="button" @click="fetchQuote">Generate Quote</button>
    <button class="button" @click="copyToClipboard" v-if="quote">
      Copy Quote
    </button>

    <div v-if="quote">
      <h3>Share this quote:</h3>
      <button class="button" @click="shareOnTelegram">Share on Telegram</button>
      <button class="button" @click="shareOnFacebook">Share on Facebook</button>
    </div>

    <div v-if="errorMessage">{{ errorMessage }}</div>

    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    <h2>Quote History</h2>
    <ul>
      <li v-for="(historicalQuote, index) in quoteHistory" :key="index">
        "{{ historicalQuote.quote }}" — {{ historicalQuote.author }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import QuoteService, { Quote } from "../services/quote-service";

export default defineComponent({
  setup() {
    const quote = ref<Quote | null>(null);
    const errorMessage = ref<string | null>(null);
    const quoteHistory = ref<Quote[]>([]);
    const quoteCategory = ref<string>("");

    const fetchQuote = async () => {
      errorMessage.value = null;
      try {
        const params = {
          category: quoteCategory.value,
        };
        const response = await QuoteService.getRandomQuote(params);
        quote.value = response.data[0];

        if (quote.value) {
          quoteHistory.value.push(quote.value);
        }
      } catch (error) {
        errorMessage.value =
          "Sorry, we couldn't fetch a quote. Please try again later.";
      }
    };

    const copyToClipboard = async () => {
      if (quote.value) {
        try {
          await navigator.clipboard.writeText(quote.value.quote);
        } catch (err) {
          alert("Failed to copy quote.");
        }
      }
    };

    const shareOnTelegram = () => {
      if (quote.value) {
        const url = `https://t.me/share/url?text="${quote.value.quote}" - ${quote.value.author}`;
        window.open(url, "_blank");
      }
    };

    const shareOnFacebook = () => {
      if (quote.value) {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}&quote="${quote.value.quote}"`;
        window.open(url, "_blank");
      }
    };

    onMounted(fetchQuote);

    return {
      quote,
      fetchQuote,
      errorMessage,
      quoteHistory,
      copyToClipboard,
      quoteCategory,
      shareOnTelegram,
      shareOnFacebook,
    };
  },
});
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
}

.button:hover {
  background-color: #0056b3;
}
</style>
