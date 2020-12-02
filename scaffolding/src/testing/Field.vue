<template>
    <div>
        <mt-field
            type="text" lable="用户名" placeholder="请输入用户名" state="success"
            :attr="{maxlength:12}" disableClear v-model="username"
        ></mt-field>
        <mt-field
            type="password" lable="密码" placeholder="请输入密码" state="error"
            :attr="{maxlength:15,autocomplete:'off'}" v-model="password"
        ></mt-field>
        <mt-field
            type="password" lable="确认密码" placeholder="请再次输入密码" state="warning" :attr="{maxlength:15,autocomplete:'off'}" v-model="conpassword"
        ></mt-field>
        <mt-button type="primary" size="large" @click="handle">提交</mt-button>
    </div>
</template>
<script> 
export default {
    data(){
        return{
            username:'',
            password:'',
            conpassword:''
        }
    },
    methods:{
        handle(){
            let username = this.username;
            let password = this.password;
            let conpassword = this.conpassword;
            // 校验用户名
            let usernameReg = /^[0-9a-zA-Z]{6,12}$/;
            if(usernameReg.test(username)){
                console.log('用户名可以使用');
            }else{
                // 显示短消息提示框(简洁写法)
                // this.$toast("用户名或者密码错误");
                this.$toast({
                    message:"用户名错误",
                    position:"top",
                    // 持续的时间长短
                    duration:3000
                });
                // 必须return/return false/return true 只要有return就会终止程序  校验前面的就行了.错误就会终止函数的执行
                return false;
            }
            // 校验密码
            let passwordReg = /^[0-9a-zA-Z\.\-_]{6,12}$/;
            if(passwordReg.test(password)){
                console.log("密码可以使用");
            }else{
                this.$toast({
                    message:"密码错误",
                    position:"middle",
                    duration:2000
                });
                return false;
            }
            // 校验两次密码是否一致
            if(password == conpassword){
                console.log('两次密码是一致的');
            }else{
                this.$toast({
                    message:"两次密码不一致",
                    position:"middle",
                    duration:2000
                });
                return false;
            }
        }
    }
}
</script>