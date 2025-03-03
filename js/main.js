// Plain JavaScript to set the copyright year with "MBC"
document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear(); // Get the current year
  const copyrightYearElement = document.getElementById("copyright-year");

  // Set the text content of the copyright year element
  if (copyrightYearElement) {
    copyrightYearElement.innerHTML = `&copy; ${currentYear} Arabs Got Talent`;
  }
});

const APPEARANCE = "auto";

let defaultThemeLight = {
  id: null,
  name: "Default",
  colors: {
    pageBg: "#f9fafb",
    boxBg: "#ffffff",
    boxBorder: "#e5e8eb",
    boxBorderTop: "#fbbf24",
    title: "#111827",
    text: "#6b7280",
    highlight: "#4f46e5",
    buttonBg: "#4f46e5",
    buttonText: "#ffffff",
    border: "#e5e7eb",
  },
  hideShareButton: false,
};
let defaultThemeDark = {
  id: null,
  name: "Default",
  colors: {
    pageBg: "#111827",
    boxBg: "#1f2937",
    boxBorder: "#374151",
    boxBorderTop: "#818cf8",
    title: "#e5e7eb",
    text: "#94a3b8",
    highlight: "#6366f1",
    buttonBg: "#6366f1",
    buttonText: "#ffffff",
    border: "#374151",
  },
  hideShareButton: false,
};

let customTheme = { id: null };

let currentTheme = defaultThemeLight;

if (
  APPEARANCE === "dark" ||
  (APPEARANCE === "auto" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.getElementById("html").classList.add("dark");
  currentTheme = defaultThemeDark;
}

if (customTheme.id) {
  currentTheme = customTheme;

  if (isDarkBg(hexToRGBA(customTheme.colors.pageBg, 1, 0, 1))) {
    if (!document.getElementById("html").classList.contains("dark")) {
      document.getElementById("html").classList.add("dark");
    }
  } else {
    if (document.getElementById("html").classList.contains("dark")) {
      document.getElementById("html").classList.remove("dark");
    }
  }
}

setCustomTheme(currentTheme);

function setCustomTheme(theme) {
  for (const [key, value] of Object.entries(theme.colors)) {
    document.documentElement.style.setProperty(
      "--" + key,
      hexToRGBA(value, 1, 0, 1)
    );
  }

  document.documentElement.style.setProperty(
    "--buttonBgLight",
    hexToRGBA(theme.colors["buttonBg"], 1, 1, 1.16)
  );
  document.documentElement.style.setProperty(
    "--borderDark",
    hexToRGBA(theme.colors["border"], 1, 1, 0.84)
  );
  document.documentElement.style.setProperty(
    "--highlightDark",
    hexToRGBA(theme.colors["highlight"], 1, 1, 0.84)
  );
  document.documentElement.style.setProperty(
    "--textShadow",
    hexToRGBA(theme.colors["text"], 1, 5, 0.954)
  );
  document.documentElement.style.setProperty(
    "--textLight",
    hexToRGBA(theme.colors["text"], 0.8, 0, 1)
  ); // 1, 113, 0.5568)
  document.documentElement.style.setProperty(
    "--textLighter",
    hexToRGBA(theme.colors["text"], 1, 168, 0.3431)
  );
  document.documentElement.style.setProperty(
    "--highlightShadow",
    hexToRGBA(theme.colors["highlight"], 1, 58, 0.772)
  );
}

function hexToRGBA(hex, opacity, modifierAdd, modifierMulti) {
  if (!hex) {
    return "rgba(0, 0, 0, 0)";
  }
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255]
        .map((x) => parseInt(modifierAdd + modifierMulti * x))
        .join(",") +
      ", " +
      opacity +
      ")"
    );
  }
}

function rankingVote() {
  return {
    // Define initial options manually
    initialOptions: [
      { id: 1, value: "Contestant 3921", points: 0 },
      { id: 2, value: "Contestant 2931", points: 0 },
      { id: 3, value: "Contestant 2716", points: 0 },
      { id: 4, value: "Contestant 1246", points: 0 },
      { id: 5, value: "Contestant 2216", points: 0 },
      { id: 6, value: "Contestant 2716", points: 0 },
      { id: 7, value: "Contestant 2033", points: 0 },
      { id: 8, value: "Contestant 1016", points: 0 },
      { id: 9, value: "Contestant 8112", points: 0 },
      { id: 10, value: "Contestant 2716", points: 0 },
    ],
    checkedOptions: [],
    init() {
      // Initialize checkedOptions as a copy of initialOptions
      this.checkedOptions = JSON.parse(JSON.stringify(this.initialOptions));
    },
    // Method to handle the voting process
    vote(optionId) {
      this.checkedOptions.forEach((option) => {
        if (option.id === optionId) {
          option.points += 1; // Increment points for the selected option
        }
      });
      console.log(this.checkedOptions); // Log updated options for debugging
    },
  };
}

function parseMarkDown(text) {
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  var bold = /\*\*(.*?)\*\*/gm;
  var html = text.replace(bold, "<strong>$1</strong>");
  return html;
}

function dragOptions() {
  return {
    option: { value: "###" }, // used for Sortable fallback
    currentPosition: {},
    currentPoints: {},
    maxPoints: 0,
    init() {
      this.$watch("checkedOptions", (value) => {
        this.updateSelectedOptions(value);
      });

      this.checkedOptions = JSON.parse(JSON.stringify(this.initialOptions));

      this.waitForSortable();
    },
    updateSelectedOptions(value) {
      this.selectedOptions = value.map((option, index) => ({
        id: option.id,
        value: index + 1,
      }));
      this.maxPoints = this.$store.poll.pollConfig.maxPoints;
      if (!this.maxPoints) this.maxPoints = this.selectedOptions.length - 1;
      this.selectedOptions.forEach((option, index) => {
        this.currentPoints[option.id] = this.maxPoints - index;
        if (this.currentPoints[option.id] < 0)
          this.currentPoints[option.id] = 0;
        this.currentPosition[option.id] = index + 1;
      });
    },

    initSortable() {
      let self = this;
      let el = document.getElementById("poll_options");
      let sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: "drag-ghost",
        onChoose: function (event) {
          self.option = {
            id: event.item.dataset.id,
            value: event.item.dataset.value,
          };
        },
        onStart: function () {
          this.el.classList.remove("fix-drag-hover");
        },
        onEnd: function () {
          this.el.classList.add("fix-drag-hover");
        },
        onUpdate: (event) => {
          const element = this.checkedOptions.splice(event.oldIndex, 1);
          this.checkedOptions.splice(event.newIndex, 0, element[0]);
        },
      });
    },
  };
}

// Check if oruk is valid
function checkInput() {
  const oruk = document.getElementById("abuja-oruko").value;
  const orukFeedback = document.getElementById("oruk-feedback");

  if (emailPattern.test(oruk)) {
    orukFeedback.classList.add("hidden");
  } else {
    orukFeedback.classList.remove("hidden");
  }
}

// Check if password is valid (at least 6 characters)
function checkPassword() {
  const wazobia = document.getElementById("abuja-zom").value;
  const wazobiaFeedback = document.getElementById("password-feedback");

  if (password.length >= 6) {
    passwordFeedback.classList.add("hidden");
  } else {
    passwordFeedback.classList.remove("hidden");
  }
}
