(function() {
  const quotes = [
    {
      quote:
        "Don't compare your life to others. There's no comparison between the sun and the moon, they shine when it's their time.",
      author: " Life"
    },
    {
      quote:
        "Falling down is part of life, getting back up is living.",
      author: "Life"
    },
    {
      quote:
        "If you see someone without a smile, give them one of yours.",
      author: "Dolly Parton"
    },
    {
      quote: "Own you own story.",
      author: "Ali Edwards"
    },
    {
      quote:
        "Not all storms come to disrupt your life, some come to clear your path.",
      author: "Life"
    },
    {
      quote:
        "Scared? Good. We don't grow when we stay inside our comfort zone.",
      author: "Life"
    }
  ];

  const btn = document.getElementById("generate-btn");

  btn.addEventListener("click", function() {
    let random = Math.floor(Math.random() * quotes.length);
    console.log(random);

    document.getElementById("quote").textContent = quotes[random].quote;
    document.querySelector(".author").textContent = quotes[random].author;
  });
})();