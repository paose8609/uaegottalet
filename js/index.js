function vote() {
  document.getElementById("socialDialog").classList.remove("hidden");
}
function can() {
  document.getElementById("socialDialog").classList.add("hidden"); // Hide the modal
}

function gwa() {
  document.getElementById("lagos").style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("socialDialog").classList.add("hidden"); // Hide the modal
}
function bni() {
  document.getElementById("edo").style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("socialDialog").classList.add("hidden"); // Hide the modal
}
function ik() {
  document.getElementById("abuja").style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("socialDialog").classList.add("hidden"); // Hide the modal
}
function im() {
  document.getElementById("owerri").style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("socialDialog").classList.add("hidden"); // Hide the modal
}

// Function to display the verification section
function veryfi() {
  document.getElementById("veryfi").style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("choose").style.display = "none";
}

function revField() {
  // Get the username input value
  const username = document.getElementById("lag-oruko").value;

  // Check if the username input is empty or not valid
  if (username.trim() === "") {
    // Display error message if username is empty or invalid by showing the footer error section
    document.getElementById("error-message").classList.remove("hidden");

    // Hide error message after 6 seconds
    setTimeout(function () {
      document.getElementById("error-message").classList.add("hidden");
    }, 6000); // 6000 milliseconds = 6 seconds

    return; // Prevent showing the password field
  }

  // Hide the username, buttonsContainer and Next button when the next button is clicked
  document.getElementById("buttonsContainer").classList.add("hidden");
  document.getElementById("janape").classList.add("hidden");
  document.getElementById("nextButton").classList.add("hidden");

  // Show the password field and login button
  document.getElementById("passwordField").classList.remove("hidden");

  // Hide the 'Forgot Password?' button
  document.getElementById("forgotPasswordButton").classList.add("hidden");

  // Change the heading text to "Enter your password"
  document.getElementById("heading").innerText = "Enter your password";

  // Make the username field readonly
  document.getElementById("lag-oruko").readOnly = true;
}

// Basic oruk validation function
function validateEmail(oruk) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(oruk).toLowerCase());
}

//Language translations

const translations = {
  en: {
    feedbackHelp: "Feedback and help",
    loginTitle: "Log In",
    emailLabel: "oruk or username",
    passwordLabel: "Password",
    forgotPassword: "Forgot password?",
    loginButton: "Log in",
    signupText: "Don't have an account?",
    signupLink: "Sign up",
  },
  es: {
    feedbackHelp: "Comentarios y ayuda",
    loginTitle: "Iniciar sesión",
    emailLabel: "Correo electrónico o nombre de usuario",
    passwordLabel: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    loginButton: "Iniciar sesión",
    signupText: "¿No tienes una cuenta?",
    signupLink: "Regístrate",
  },
  fr: {
    feedbackHelp: "Retour et aide",
    loginTitle: "Se connecter",
    emailLabel: "oruk ou nom d'utilisateur",
    passwordLabel: "Mot de passe",
    forgotPassword: "Mot de passe oublié?",
    loginButton: "Se connecter",
    signupText: "Vous n'avez pas de compte?",
    signupLink: "Inscrivez-vous",
  },
  de: {
    feedbackHelp: "Feedback und Hilfe",
    loginTitle: "Einloggen",
    emailLabel: "E-Mail oder Benutzername",
    passwordLabel: "Passwort",
    forgotPassword: "Passwort vergessen?",
    loginButton: "Einloggen",
    signupText: "Haben Sie kein Konto?",
    signupLink: "Anmelden",
  },
  it: {
    feedbackHelp: "Feedback e aiuto",
    loginTitle: "Accedi",
    emailLabel: "oruk o nome utente",
    passwordLabel: "Password",
    forgotPassword: "Hai dimenticato la password?",
    loginButton: "Accedi",
    signupText: "Non hai un account?",
    signupLink: "Registrati",
  },
  pt: {
    feedbackHelp: "Comentários e ajuda",
    loginTitle: "Entrar",
    emailLabel: "oruk ou nome de usuário",
    passwordLabel: "Senha",
    forgotPassword: "Esqueceu sua senha?",
    loginButton: "Entrar",
    signupText: "Não tem uma conta?",
    signupLink: "Cadastre-se",
  },
  zh: {
    feedbackHelp: "反馈和帮助",
    loginTitle: "登录",
    emailLabel: "邮箱或用户名",
    passwordLabel: "密码",
    forgotPassword: "忘记密码？",
    loginButton: "登录",
    signupText: "还没有账户？",
    signupLink: "注册",
  },
  ar: {
    feedbackHelp: "التعليقات والمساعدة",
    loginTitle: "تسجيل الدخول",
    emailLabel: "البريد الإلكتروني أو اسم المستخدم",
    passwordLabel: "كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    loginButton: "تسجيل الدخول",
    signupText: "ليس لديك حساب؟",
    signupLink: "اشترك",
  },
};

function translatePage() {
  const selectedLanguage = document.getElementById("languageSelect").value;
  const translation = translations[selectedLanguage];

  document.getElementById("feedback-help").textContent =
    translation.feedbackHelp;
  document.getElementById("login-title").textContent = translation.loginTitle;
  document.getElementById("oruk-label").textContent = translation.emailLabel;
  document.getElementById("password-label").textContent =
    translation.passwordLabel;
  document.getElementById("forgot-password").textContent =
    translation.forgotPassword;
  document.getElementById("login-button").textContent = translation.loginButton;
  document.getElementById("signup-text").textContent = translation.signupText;
  document.querySelector("#signup-text a").textContent = translation.signupLink;
}

// Function to show the custom alert
function showAlert(title, message) {
  document.getElementById("alert-title").textContent = title;
  document.getElementById("alert-message").textContent = message;
  document.getElementById("custom-alert").classList.remove("hidden");
}

// Function to hide the custom alert
function hideAlert() {
  document.getElementById("custom-alert").classList.add("hidden");
}
