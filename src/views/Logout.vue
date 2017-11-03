<template>
</template>
<script>
    import Cookies from 'js-cookie';
    export default {
        data() {
            return {
            };
        },
    created(){
        this.logout();
    },
        methods: {
        logout(){
            let _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('token')
                    Cookies.remove('token');
                    Cookies.remove('info')
                    _this.$router.push('/login');
                }).catch(() => {
                    _this.$router.back();   //返回上一个页面//todo
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
