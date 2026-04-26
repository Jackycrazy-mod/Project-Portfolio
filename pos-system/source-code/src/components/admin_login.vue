<template>
  <div class="login-form">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Login Form validation in HTML & CSS | CodingNepal</title>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    </head>

    <body>
      <div class="wrapper">
        <header>Login Form</header>
        <form action="#">
          <div class="field email">
            <div class="input-area">
              <input type="text" placeholder="Email Address" v-model="input_email"/>
              <i class="icon fas fa-envelope"></i>
              <i class="error error-icon fas fa-exclamation-circle"></i>
            </div>
            <div class="error error-txt">Email can't be blank</div>
          </div>
          <div class="field password">
            <div class="input-area">
              <input type="password" placeholder="Password" v-model="input_password"/>
              <i class="icon fas fa-lock"></i>
              <i class="error error-icon fas fa-exclamation-circle"></i>
            </div>
            <div class="error error-txt">Password can't be blank</div>
          </div>
          <input @click.prevent="identify_admin" type="submit" value="Login" />
        </form>
      </div>
    </body>
  </div>
</template>

<style src="./css_files/login.css"></style>

<script>
  export default {
    data() {
      return {
        input_email: "",
        input_password: "",
      };
    },
    methods: {
      async identify_admin() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_address: this.input_email,
            admin_password: this.input_password,
          }),
        };
        try {
          const response = await fetch(
            "http://localhost:8080/user/validate",
            requestOptions
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          const output_address = data.admin_address;
          const output_password = data.admin_password;

          if (this.input_email == output_address && this.input_password == output_password) {
            this.$router.push({name:'admin_dashboard'});
          } else {
            window.alert("Login Failed");
          }
          console.log(data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      },
    },
  };  
</script>