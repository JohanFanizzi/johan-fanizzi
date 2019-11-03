<template>
<v-btn
  ref="goTopBtn" @click="$vuetify.goTo(0, { duration: 1000, offset: 500, easing: 'easeInOutCubic' })"
  color="accent" dark fixed bottom right fab class="disapear out"
>
  <v-icon>mdi-chevron-up</v-icon>
</v-btn>
</template>

<style lang="scss" scoped>
.disapear {
    display: none;

    &.active {
      animation: scale-display .3s;
      display: inline;
    }

		&.out {
			animation: scale-display--reversed .3s;
			animation-fill-mode:forwards;
			display: inline;
		}
	}

@keyframes scale-display {
	0% {
		opacity: 0;
		transform: scale(0);
    -webkit-transform: scale(0);
	}

	100% {
		opacity: 1;
		transform: scale(1);
    -webkit-transform: scale(1);
	}
}

@keyframes scale-display--reversed {
	0% {
		display: inline;
		opacity: 1;
		transform: scale(1);
		-webkit-transform: scale(1);
	}
	99% {
		display: inline;
		opacity: 0;
		transform: scale(0);
		-webkit-transform: scale(0);
	}
	100% {
		display: none;
		opacity: 0;
		transform: scale(0);
		-webkit-transform: scale(0);
	}
}
</style>

<script lang="ts">
import Vue, { Component } from 'vue';

export default Vue.extend({
  name: 'GoTop',
  methods: {
    onScroll() {
      // Al realizar el scroll, obtener el boton
      const bntName: string = 'goTopBtn';
      const goTopBtn = (this.$refs[bntName] as Vue).$el as Element;
      // Determinar si el scroll se encuantra en la parte superior
      const onTop: boolean = window.scrollY < 250;

      // Actualizar las clases del boton
      this.changeClass(goTopBtn, onTop ? 'out' : 'active', onTop ? 'active' : 'out');
    },
    changeClass(el: Element, addClass: string, removeClass: string) {
      // Remover y añadir las clases indicadas
      el.classList.add(addClass);
      el.classList.remove(removeClass);
    },
  },
  mounted() {
    // Agregar el evento de Scroll
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    // Eliminar el evento de Scroll
    window.removeEventListener('scroll', this.onScroll);
  },
});
</script>