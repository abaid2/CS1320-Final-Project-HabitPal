<template>
  <button class="habit btn" v-bind:class="{ hoverless: hoverChild }" @click="goToHabit">
    <div class="title-container" >
      <div class="expand-container">
        <button class="expand-btn"  @click="handleExpand($event)" @mouseenter="hoverChild=true" @mouseout="hoverChild=false"><img class="expand-img" src="../../resources/icons8-expand-arrow-52.png"></button>
      </div>  
      <h2 class="title"> {{habit.title}} </h2>
      <div class="check-container" >
        <input class="complete-check checkbox-circle" type="checkbox" value="" @click="$event.stopPropagation()" @mouseenter="hoverChild=true" @mouseout="hoverChild=false">
      </div>  
    </div>  
    <p v-show="expanded"> {{ habit.description }} </p>
  </button>
</template>

<script>

export default {
  name: 'Habit',
  data () {
      return {
          expanded: false,
          hoverChild: false
      }
  },
  props: {
      habit: Object
  },
  methods: {
    goToHabit() {
      this.$router.push({ name: 'Habit', params: { id: this.habit.id } });
    },
    handleExpand(e) {
      e.stopPropagation();
      this.expanded=!this.expanded;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.habit {
  margin-top: 10px;
  width: 50%;
  max-width: 1000px;
  border: 1px solid black;
  padding: 0px;
  background-color: white;
}

.hoverless {
  background-color: white !important;
}

button:hover {
  background-color: rgb(186, 193, 194);
}

.title-container {
  height: 60px;
  display: flex;
  align-items: center;
}

.expand-container {
  flex: 2;
  display: flex;
  justify-content: left;
}

.expand-btn {
  background-color: transparent;
  border: none;
  padding: 0px;
  margin-left: 25px;
}

.expand-btn:hover {
  background-color: transparent;
}

.expand-btn:hover .habit {
  background-color: white;
  height: 300px;
}

.expand-btn:focus {
  outline: none;
  box-shadow: none;
}

.title {
  flex: 7;
  text-align: left;
  font-size: 36px;
  font-weight: bold;
}

.check-container {
  flex: 1;
}

.complete-check {
  width: 40px;
  height: 40px;
}

.complete-check:hover {
  cursor: pointer;
}

.expand-img {
    height: 30px;
    width: 30px;
}

.expand-img:hover {
    cursor: pointer;
}

</style>
