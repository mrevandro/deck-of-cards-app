<template>
    <div class="card">
        <div style="text-align: left">
            <span class="card-value" :style="{color: valueColor}">{{value === '0' ? '10' : value}}</span>
            <span class="card-suit-left" v-if="suit === 'S'">&#9824;</span>
            <span class="card-suit-left" v-else-if="suit === 'C'">&#9827;</span>
            <span class="card-suit-left" style="color: red;" v-else-if="suit === 'D'">&#9830;</span>
            <span class="card-suit-left" style="color: red;" v-else>&#9829;</span>
        </div>
        <div>
            <span class="card-suit-center" v-if="suit === 'S'">&#9824;</span>
            <span class="card-suit-center" v-else-if="suit === 'C'">&#9827;</span>
            <span class="card-suit-center" style="color: red;" v-else-if="suit === 'D'">&#9830;</span>
            <span class="card-suit-center" style="color: red;" v-else>&#9829;</span>
        </div>
        <div style="transform: rotate(180deg); text-align: left">
            <span class="card-suit-right" v-if="suit === 'S'">&#9824;</span>
            <span class="card-suit-right" v-else-if="suit === 'C'">&#9827;</span>
            <span class="card-suit-right" style="color: red;" v-else-if="suit === 'D'">&#9830;</span>
            <span class="card-suit-right" style="color: red;" v-else>&#9829;</span>
            <span class="card-value" style="margin-top: -85px" :style="{color: valueColor}">{{value === '0' ? '10' : value}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: ["suit", "value"],
    computed: {
        valueColor() {
            return this.suit === 'D' || this.suit === 'H' ? 'red' : 'black'
        }
    }
};
</script>

<style scoped>
.card {
    background: #ffffff;
    height: 250px;
    width: 175px;
    border-radius: 10px;
    margin: 5px;
}

.card .card-suit-left {
    display: block;
    font-size: 30px;
    padding: 14px;
    margin-top: -30px;
}

.card .card-suit-right {
    display: block;
    font-size: 30px;
    padding: 14px;
    margin-top: 35px;
}

.card .card-suit-center {
    display: block;
    font-size: 60px;
}

.card .card-value {
    display: block;
    font-size: 35px;
    padding-left: 10px;
}
</style>