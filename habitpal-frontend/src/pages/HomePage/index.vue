<template>
  <div>
    <h1>Habits displayed below</h1>
    <div class="habits">
        <Habit v-for="habit in habits" :habit="habit" :key="habit.id" />
    </div>
  </div>
</template>

<script>
import Habit from '../../components/Habit';
import {habitsTemplate} from '../../data/habits';

export default {
  name: 'HomePage',
  data: function() {
    return {
      habits: habitsTemplate
    };
  },
  components: {
    Habit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-top: 100px;
    font-size: 60px;
}

.habits {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
