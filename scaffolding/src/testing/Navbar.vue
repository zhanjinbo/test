<template>
    <div>
        <!-- 顶部选项卡开始 -->
        <mt-navbar v-model="active">
            <mt-tab-item id="1">新闻
                <!-- item里面也有插槽,叫icon -->
                <!-- <img src="路径" alt="" slot="icon"> -->
            </mt-tab-item>
            <mt-tab-item id="2">财经</mt-tab-item>
            <mt-tab-item id="3">金融</mt-tab-item>
            <mt-tab-item id="4">社会</mt-tab-item>
        </mt-navbar>
        <!-- 顶部选项卡结束 -->
        <!-- 面板开始 -->
        <div class="main">
            <!-- tab可以和上面一样的 比如active 一个变量控制两个是可以的,同时id在自己的区域里面唯一就可以 -->
            <mt-tab-container v-model="tab">
                <mt-tab-container-item id="ab">
                    <p v-for="(v,k) of 100" :key="k">AB--{{v}}</p>
                </mt-tab-container-item>
                <mt-tab-container-item id="cd">CD</mt-tab-container-item>
                <mt-tab-container-item id="ef">EF</mt-tab-container-item>
                <mt-tab-container-item id="gh">GH</mt-tab-container-item>
            </mt-tab-container>
        </div>
        <!-- 面板结束 -->
        <!-- 底部选项卡开始 -->
        <mt-tabbar v-model="selected" fixed>
            <!-- 加入了fixed就脱离了文档流,所有面板要设置下边距55px  -->
            <mt-tab-item id="index">
                <img src="../assets/common/index_enabled.png" alt="" slot="icon" v-if="selected == 'index'">
                <img src="../assets/common/index_disabled.png" alt="" slot="icon" v-else>     
                首页 
            </mt-tab-item>
            <mt-tab-item id="cart">
                <!-- 可以加herf进行链接跳转,但是不建议  -->
                购物车
                <img src="../assets/common/cart_enabled.png" alt="" slot="icon" v-if="selected == 'cart'">
                <img src="../assets/common/cart_disabled.png" alt="" slot="icon" v-else> 
            </mt-tab-item>
            <mt-tab-item id="me">
                我的
                <img src="../assets/common/me_enabled.png" alt="" slot="icon" v-if="selected == 'me'">
                <img src="../assets/common/me_disabled.png" alt="" slot="icon" v-else> 
            </mt-tab-item>
        </mt-tabbar>
        <!-- 底部选项卡结束 -->
    </div>
</template>
<style scoped>
    .main{
        margin-bottom:55px
    }
</style>
<script>
export default {
    data(){
        return{
            active:"1",
            tab:"ab",
            selected:"index"
        };
    },
    watch:{
        active(newValue){
            console.log(newValue);
            // 里面如果放入两个形参,将会接收到active的一个新值一个旧值,值都是字符串格式
            // 借用avtive的值,用来判断tab需要显示哪个区域,修改tab的值
            if(newValue == '1'){
                this.tab='ab';
            }else if(newValue == '2'){
                this.tab='cd';
            }else if(newValue == '3'){
                this.tab='ef';
            }else if(newValue == '4'){
                this.tab='gh';
            }

        },
        selected(newValue){
            // console.log(newValue);
            console.log(this.$route)

            console.log(this.$router)
            if(newValue == 'index'){
                this.$router.push('/');
                // route是整个理由对象
            }else if(newValue == 'cart'){
                this.$router.push('/cart');
            }else if(newValue == 'me'){
                this.$router.push('/me');
            }
        }
    }

}
</script>