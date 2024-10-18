export async function getRandomQuote(){


  try {
    const quoteRequest =  awaitfetch ("https://quote.aryanue195035ece.workers.dev/");
    const quote = await quoteRequest.json();

    
  } catch (error) {
    
  }
}