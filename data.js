/* data.js — palitan lang ang mga laman sa loob ng "" (o ``).
   Huwag buburahin ang mga kuwit (,) sa dulo ng bawat linya. */
window.SITE_DATA = {

  // Pangalan niya
  name: "Pangalan niya",

  // Birthday niya: "YYYY-MM-DDTHH:MM:SS"  (halimbawa: "2027-03-14T00:00:00")
  birthdayDate: "2027-01-01T00:00:00",

  // Pangunahing pagbati at maikling intro
  greeting: "Happy Birthday, Pangalan niya!",
  intro: "Maikling pagbati dito.",

  // Pangunahing larawan (nasa root ng repo)
  mainPhoto: "1.jpg",

  // Sulat (mag-iwan ng blangkong linya para sa bagong talata)
  letterGreeting: "Mahal ko,",
  letter: `Isulat ang sulat mo dito.

Mag-iwan ng blangkong linya para sa bagong talata.`,

  // Surprise, huling mensahe, at mensahe kapag zero na ang countdown
  surpriseMessage: "Isulat ang surprise message dito.",
  finalMessage: "Isulat ang huling mensahe dito.",
  countdownDoneMessage: "Birthday mo na! Happy Birthday, mahal ko!",

  // Gallery
  gallery: [
    { src: "2.jpg", caption: "Caption 1" },
    { src: "3.jpg", caption: "Caption 2" },
    { src: "4.jpg", caption: "Caption 3" },
    { src: "5.jpg", caption: "Caption 4" }
  ],

  // Music: i-rename ang kanta sa birthday-song.mp3 bago i-upload
  music: "birthday-song.mp3"
};
