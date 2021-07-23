<template>
    <div>
        <h1>Script</h1>
        <h3 ref="script">
            &lt;script src="https://arvioliidi.com/api/calculator-script"
            key='VEC-{{ $store.state.user.identify }}'&gt;&lt;/script&gt;
        </h3>
        <h1>Iframe</h1>
        <h3 ref="iframe">
            &lt;iframe src="https://arvioliidi.com/VEC-{{ $store.state.user.identify }}" width="100%" style="border: none; height: 99vh;"&gt;&lt;/iframe&gt;
        </h3>
    </div>
</template>

<script>
export default {
    data: () => ({
        identify: ""
    }),
    methods: {
    },
    mounted() {
        this.identify = this.$store.state.user.identify;
    }
};
</script>
