<template>
    <div>
        <!-- 顶部导航的开始 -->
        <mt-header title="学前端,到学问">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <router-link slot="right" to="/register" >注册</router-link>
        </mt-header>
        <!-- 顶部导航的结束 -->
        <!-- 表单区域的开始 -->
        <div>
            <mt-field
                label="用户名"
                placeholder="请输入用户名"
                type="text"
                v-model="username"
                @blur.native.capture="checkUsername"
            >
            </mt-field>
            <mt-field
                label="密码"
                placeholder="请输入密码"
                type="password"
                v-model="password"
                @blur.native.capture="checkPassword"
            ></mt-field>
            <mt-button type="primary" size="large" @click="handle">登录</mt-button>
        </div>
        <!-- 表单区域的结束 -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            username: "",
            password: ""
        };
    },
    methods:{
        handle(){
            if(this.checkUsername() && this.checkPassword()){
        //现在要发送相关的用户名、密码到WEB服务器
        this.axios.post('/login','username=' + this.username + '&password=' + this.password).then(res=>{
          if(res.data.code == 1){
            this.$router.push('/');
            this.$store.commit('login_mutations');
            console.log(11111 );
            console.log(this.$store.state.isLogined);
            
          } else {
            this.$messagebox('登录提示','用户名或密码错误');

          }
        })
            }
        },
        //检测用户名
    checkUsername() {
      let username = this.username;
      let usernameReg = /^[0-9a-zA-Z]{6,12}$/;
      if (usernameReg.test(username)) {
        return true;
      } else {
        // 显示短消息提示框(简捷写法)
        // this.$toast("用户名格式或内容错误");
        // 显示短消息提示框(标准写法)
        this.$toast({
          message: "用户名格式或内容错误",
          position: "top",
          duration: 1000,
        });
        //终止函数的执行
        return false;
      }
    },
    //检测密码
    checkPassword() {
      let password = this.password;
      let passwordReg = /^[0-9A-Za-z\.\-_]{8,15}$/;
      if (passwordReg.test(password)) {
        return true;
      } else {
        this.$toast({
          message: "密码错误",
          position: "middle",
          duration: 1000,
        });
        return false;
      }
    }


    },
}
</script>