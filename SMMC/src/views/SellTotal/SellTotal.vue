<template>
    <div class="sell-total">
         <!-- 面板组件 -->
        <el-card class="box-card">
                <!-- 头部 -->
                <div slot="header" class="clearfix">
                    <span>销售统计</span>
                </div>
                <!-- 内容 -->
                <div class="text item">
                    <!-- 1 准备一个容器 -->
                    <div id="box" style="height: 400px;"></div>
                </div>

        </el-card>
    </div>
</template>

<script>
            
    export default {
        // 生命周期钩子函数 适合操作dom
        mounted() {
            this.drawSalesChart(); // 调用函数 生成报表
        },
        methods: {
            // 生成销售报表
            drawSalesChart() {
                // 选中dom容器 初始化
                let myChart = this.echarts.init( document.getElementById('box') )
                // 准备配置
                let option = {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        areaStyle: {}
                    }]
                }
                // 使用配置生成报表
                myChart.setOption( option )
            }
        }
    }
    
</script>

<style lang="less">

</style>