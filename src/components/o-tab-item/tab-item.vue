<template>
    <a :data-type="id" href="javascript:;" class="box-flex tap-meun"
       @click="$parent.$emit('input', id)"
       :class="{'tap-meun-on': $parent.value === id}">
        <div class="o-tab-item-icon"><slot name="icon"></slot></div>
        <div class="o-tab-item-label"><slot></slot></div>
    </a>
</template>

<script>
	export default {
        name: 'o-tab-item',
        props: ['id']
	}
</script>

