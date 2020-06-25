<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>注册 Trello</h1>
        <form id="login-form" method="POST" @submit.prevent="registerSubmit">
          <div>
            <label>
              <input
                v-model="user.name"
                class="form-field"
                autofocus="autofocus"
                placeholder="输入用户名"
              />
            </label>
          </div>
          <div>
            <label>
              <input v-model="user.password" type="password" class="form-field" placeholder="输入密码" />
            </label>
          </div>
          <div>
            <label>
              <input
                v-model="user.rePassword"
                type="password"
                class="form-field"
                placeholder="再次确认密码"
              />
            </label>
          </div>
          <div>
            <input type="submit" class="btn btn-success" value="注册" />
            <span class="signin-signup-separator">或者</span>
            <router-link :to="{name:'Login'}" class="btn" tag='button'>Login</router-link>
          </div>
        </form>
      </div>
    </div>
    <!-- <t-message></t-message> -->
  </div>
</template>

<script>

export default {
  name: "Register",

  data() {
    return {
      user: {
        name: "",
        password: "",
        rePassword: ""
      }
    };
  },

  // components:{
  //     TMessage
  // },

  methods: {
    async registerSubmit() {
      if (this.user.name.trim() === "" || this.user.password.trim() === "") {
        return this.$message.error({ message: "Username or password cannot be empty"});
      }
      if (this.user.password !== this.user.rePassword) {
        return this.$message.error({ message: "Password should be same!"});
      }

      // ajax
      try{
        await this.$store.dispatch('user/register', {
          ...this.user
        });

        this.$router.push({name:'Login'})
      }catch(e){

      }
    }
  }
};
</script>