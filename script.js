document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ageForm");
  const dobInput = document.getElementById("dob");
  const resultDiv = document.getElementById("result");
  const extraInfo = document.getElementById("extraInfo");
  const countdown = document.getElementById("countdown");
  const zodiac = document.getElementById("zodiac");
  const clock = document.getElementById("clock");
  const toggleBtn = document.getElementById("toggleMode");

  function fadeIn(element, text) {
    element.style.opacity = 0;
    element.textContent = text;
    setTimeout(() => {
      element.style.opacity = 1;
    }, 50);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const dobValue = dobInput.value;
    if (!dobValue) {
      fadeIn(resultDiv, "Please enter your birth date.");
      extraInfo.textContent = "";
      countdown.textContent = "";
      zodiac.textContent = "";
      return;
    }

    const dob = new Date(dobValue);
    const today = new Date();

    if (dob > today || isNaN(dob.getTime())) {
      fadeIn(resultDiv, "Please enter a valid birthdate.");
      extraInfo.textContent = "";
      countdown.textContent = "";
      zodiac.textContent = "";
      return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const ageInDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
    const ageInWeeks = Math.floor(ageInDays / 7);
    const ageInHours = ageInDays * 24;
    const ageInMinutes = ageInHours * 60;

    fadeIn(resultDiv, `You are ${years} years, ${months} months, and ${days} days old.`);
    fadeIn(extraInfo, `That's about ${ageInDays} days, ${ageInWeeks} weeks, ${ageInHours} hours, or ${ageInMinutes} minutes!`);

    let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    fadeIn(countdown, `Your next birthday is in ${daysUntilBirthday} days!`);

    const getZodiac = (day, month) => {
      const signs = [
        ["Capricorn", 19], ["Aquarius", 18], ["Pisces", 20], ["Aries", 19],
        ["Taurus", 20], ["Gemini", 20], ["Cancer", 22], ["Leo", 22],
        ["Virgo", 22], ["Libra", 22], ["Scorpio", 21], ["Sagittarius", 21]
      ];
      return day > signs[month][1] ? signs[(month + 1) % 12][0] : signs[month][0];
    };

    fadeIn(zodiac, `Your Zodiac Sign is: ${getZodiac(dob.getDate(), dob.getMonth())}`);
  });

  // Live Clock
  setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }, 1000);

  // Dark/Light Mode
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});
