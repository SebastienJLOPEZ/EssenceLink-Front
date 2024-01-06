<template>
    <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
    <div class="contact-container">
      <div class="left-col"></div>
      <div class="right-col">
        <h1 class="center-heading">Contact us</h1>
        <p>Have questions or feedback?</p>
<p>Contact us - we'd love to hear from you!</p>
  
        <form @submit.prevent="validateForm" id="contact-form">
          <label for="name">Full name</label>
          <input v-model="name" type="text" id="name" name="name" placeholder="Your Full Name" required />
          <hr class="black-line" />
  
          <label for="email">Email Address</label>
          <input v-model="email" type="email" id="email" name="email" placeholder="Your Email Address" required />
          <hr class="black-line" />
  
          <label for="message">Message</label>
          <textarea v-model="message" rows="6" placeholder="Your Message" id="message" name="message" required></textarea>
          <hr class="black-line" />
  
          <button type="submit" id="submit" name="submit">Send</button>
        </form>
        <div id="error">{{ error }}</div>
        <div id="success-msg">{{ successMessage }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        message: '',
        error: '',
        successMessage: '',
      };
    },
    methods: {
      validateForm() {
        if (this.name.length < 3) {
          this.error = 'Your name should be at least 3 characters long.';
          return;
        }
  
        if (!(this.email.includes('.') && this.email.includes('@'))) {
          this.error = 'Please enter a valid email address.';
          return;
        }
  
        if (!this.emailIsValid(this.email)) {
          this.error = 'Please enter a valid email address.';
          return;
        }
  
        if (this.message.length < 15) {
          this.error = 'Please write a longer message.';
          return;
        }
  
        this.error = '';
        this.successMessage = 'Thank you! I will get back to you as soon as possible.';
  
        setTimeout(() => {
          this.successMessage = '';
          this.$refs.contactForm.reset();
        }, 6000);
      },
      emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
    },
  };
  </script>
  
  <style scoped>
    :root {
      --primary-color: #010712;
      --secondary-color: #818386;
      --bg-color: #FCFDFD;
      --button-color: #000000; /* Black button background */
      --h1-color: #3F444C;
    }
  
    * {
      margin: 0;
      box-sizing: border-box;
      transition: all 0.3s ease-in-out;
    }
  
    .contact-container {
      margin-top: 160px;
      display: flex;
      width: 90vw;
      height: 120vh;
      background: var(--bg-color);
    }
  
    .left-col {
      width: 45vw;
      height: 100%;
      background-image: url('@/assets/POST.jpg');
      background-size: cover;
      background-repeat: no-repeat;
    }
  
    .right-col {
      background: var(--bg-color);
      width: 50vw;
      height: 100vh;
      padding: 5rem 3.5rem;
    }
  
    h1, label, button {
      font-family: 'Jost', sans-serif;
      font-weight: 400;
      letter-spacing: 0.1rem;
    }
  
    h1 {
      color: var(--h1-color);
      text-transform: uppercase;
      font-size: 2.5rem;
      letter-spacing: 0.5rem;
      font-weight: 300;
      
      
    }
  
    p {
      color: var(--secondary-color);
      font-size: 0.9rem;
      letter-spacing: 0.01rem;
      width: 40vw;
      margin: 0.25rem 0;
    }
  
    label {
      color: var(--secondary-color);
      text-transform: uppercase;
      font-size: 0.625rem;
    }
  
    form {
      width: 31.25rem;
      position: relative;
      margin-top: 2rem;
      padding: 1rem 0;
    }
  
    input, textarea, label {
      width: 40vw;
      display: block;
    }
  
    input::placeholder, textarea::placeholder {
      color: var(--primary-color);
    }
  
    input, textarea {
      color: var(--primary-color);
      font-weight: 500;
      background: var(--bg-color);
      border: none;
      border-bottom: 1px solid var(--secondary-color);
      padding: 0.5rem 0;
      margin-bottom: 1rem;
      outline: none;
    }
  
    textarea {
      resize: none;
    }
  
    button {
      text-transform: uppercase;
      font-weight: 300;
      background: #93ab91;
      color: #FCFDFD;
      width: 10rem;
      height: 2.25rem;
      border: none;
      border-radius: 2px;
      outline: none;
      cursor: pointer;
      margin-top: 30PX;
    }
  
    input:hover, textarea:hover, button:hover {
      opacity: 0.5;
    }
  
    button:active {
      opacity: 0.8;
    }
  
    #error, #success-msg {
      width: 40vw;
      margin: 0.125rem 0;
      font-size: 0.75rem;
      text-transform: uppercase;
      font-family: 'Jost';
      color: var(--secondary-color);
    }
  
    #success-msg {
      transition-delay: 3s;
    }

    .center-heading {
    
    margin-bottom: 40PX;
    left: 95PX; /* Remove top margin for centering */
  }

  
    /* Add this style for the black lines */
    .black-line {
      border: none;
      height: 0.7px;
      background-color: #000000; /* Black color */
      margin: 1rem 0;
    }
  
    @media only screen and (max-width: 950px) {
      h1 {
        font-size: 1.75rem;
      }
      p {
        font-size: 0.7rem;
      }
      input, textarea, button {
        font-size: 0.65rem;
      }
      label {
        font-size: 0.625rem;
      }
      button {
        width: 7rem;
      }
    }
  </style>
  