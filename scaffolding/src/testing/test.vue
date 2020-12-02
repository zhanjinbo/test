<template>
	<div>
		<button @click="changeValue">更新Value</button>
		<button @click="getComputedValue">打印computedValue</button>
	</div>
</template>
<script>
export default {
	data(){
		return {
			value: 1
		}
	},
	computed: {
		computedValue(){
			return this.value + '--' + Math.random()
		}
	},
	methods: {
		changeValue(){
			this.value++;
		},
		getComputedValue(){
			console.log(this.computedValue);
		}
	}
}
</script>