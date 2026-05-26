const moodButtons = document.querySelectorAll(".mood-card");
const selectedMoodText = document.getElementById("selected-mood-text");
const journalForm = document.getElementById("journal-form");
const journalEntry = document.getElementById("journal-entry");
const promptButtons = document.querySelectorAll(".prompt-btn");
const musicCard = document.getElementById("music-card");
const historyList = document.getElementById("history-list");

let selectedMood = "";

/* SPOTIFY EMBEDS */

const moodSongs = {
  happy: [
    "https://open.spotify.com/embed/track/6DCZcSspjsKoFjzjrWoCdn",
    "https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b"
  ],

  sad: [
    "https://open.spotify.com/embed/track/7gqdZpe7MlTLA59viClLoY",
    "https://open.spotify.com/embed/track/2TIlqbIneP0ZY1O0EzYLlc"
  ],

  anxious: [
    "https://open.spotify.com/embed/track/5Z8EDau8uNcP1E8JvmfkZe",
    "https://open.spotify.com/embed/track/6N22FZs2ZhPBYi3b9XPajV"
  ],

  overwhelmed: [
    "https://open.spotify.com/embed/track/3DK6m7It6Pw857FcQftMds",
    "https://open.spotify.com/embed/track/2QZ7WLBE8h2y1Y5Fb8RYbH"
  ],

  tired: [
    "https://open.spotify.com/embed/track/3pHkh7d0lzM2AldUtz2x37",
    "https://open.spotify.com/embed/track/2plbrEY59IikOBgBGLjaoe"
  ],

  angry: [
    "https://open.spotify.com/embed/track/7MXVkk9YMctZqd1Srtv4MB",
    "https://open.spotify.com/embed/track/1rqqCSm0Qe4I9rUvWncaom"
  ]
};

/* MOOD MESSAGES */

const moodMessages = {
  happy:
    "Hold onto this feeling. You deserve soft and beautiful moments too.",

  sad:
    "It is okay to feel low sometimes. Be gentle with yourself today.",

  anxious:
    "Take one slow breath at a time. You do not have to solve everything right now.",

  overwhelmed:
    "Pause for a moment. One small step is enough for now.",

  tired:
    "Rest is productive too. Your body and mind may simply need softness.",

  angry:
    "Your feelings are valid. Try to breathe before reacting."
};

/* MOOD BUTTONS */

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedMood = button.dataset.mood;

    moodButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    selectedMoodText.textContent = `Selected mood: ${selectedMood}`;

    showMusicRecommendations(selectedMood);
  });
});

/* PROMPT BUTTONS */

promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    journalEntry.value += button.textContent + " ";

    journalEntry.focus();
  });
});

/* SAVE CHECK-IN */

journalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const entryText = journalEntry.value.trim();

  if (!selectedMood) {
    alert("Please select a mood first.");
    return;
  }

  if (!entryText) {
    alert("Please write something before saving.");
    return;
  }

  const checkIn = {
    mood: selectedMood,
    entry: entryText,
    date: new Date().toLocaleString()
  };

  const savedCheckIns =
    JSON.parse(localStorage.getItem("mellowspaceCheckIns")) || [];

  savedCheckIns.unshift(checkIn);

  localStorage.setItem(
    "mellowspaceCheckIns",
    JSON.stringify(savedCheckIns)
  );

  journalEntry.value = "";

  selectedMood = "";

  selectedMoodText.textContent = "No mood selected yet.";

  moodButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  displayHistory();

  alert("Your check-in has been saved.");
});

/* MUSIC RECOMMENDATIONS */

function showMusicRecommendations(mood) {
  const songs = moodSongs[mood];

  musicCard.innerHTML = `
    <h3>${moodMessages[mood]}</h3>

    <p>Here are some Spotify comfort picks for this mood:</p>

    ${songs
      .map(
        (song) => `
        <iframe
          src="${song}"
          width="100%"
          height="152"
          frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy">
        </iframe>
      `
      )
      .join("")}
  `;
}

/* DISPLAY HISTORY */

function displayHistory() {
  const savedCheckIns =
    JSON.parse(localStorage.getItem("mellowspaceCheckIns")) || [];

  if (savedCheckIns.length === 0) {
    historyList.innerHTML =
      "<p>No check-ins saved yet.</p>";

    return;
  }

  historyList.innerHTML = savedCheckIns
    .map((item) => {
      return `
        <div class="history-card glass-card">
          <h3>${item.mood}</h3>

          <p>${item.entry}</p>

          <small>${item.date}</small>
        </div>
      `;
    })
    .join("");
}

/* HAMBURGER MENU */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("show");
});

/* INITIAL LOAD */

displayHistory();