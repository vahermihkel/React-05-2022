import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ee: {
    translation: {
      "Welcome to React": "Tere tulemast Reacti",
      "navbar.admin-button": "Admin vaatesse",
      "navbar.cart-button": "Ostukorvi",
      "addproduct.added": "Edukalt uus toode lisatud!",
      "form.name": "Nimi",
      "form.description": "Kirjeldus"
    }
  },
  uk: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "navbar.admin-button": "To admin view",
      "navbar.cart-button": "Cart",
      "addproduct.added": "Successfully new product added!",
      "form.name": "Name",
      "form.description": "Description"
    }
  },
  ru: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
      "navbar.admin-button": "Admin vaatesse RU",
      "navbar.cart-button": "Ostukorvi RU",
      "addproduct.added": "Edukalt uus toode lisatud! RU",
      "form.name": "Nimi RU",
      "form.description": "Kirjeldus RU"
    }
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: localStorage.getItem("language") || "ee",
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;