<template>
    <div id="header-container">
      <div id="home-header">
        <Logout class="logout"/>
        <h1>{{title}}</h1>
        <div id="icons">
          <NotificationViewer class="invitation-viewer icon"/>
          <FriendsViewer :friends="friends" class="friends-viewer icon"/>
        </div>
      </div>
    </div>
</template>

<script>
import Logout from './Logout';
import NotificationViewer from './NotificationViewer';
import FriendsViewer from './FriendsViewer';

export default {
  name: 'Header',
  props: {
      title: String,
      friends: Array
  },
  components: {
    Logout,
    NotificationViewer,
    FriendsViewer
  },
}
</script>

<!-- "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
    margin-top: 0px;
    font-size: 60px;
    font-variation-settings: 'wght' 800;
}

#header-container {
  position: fixed;
  top: 0;
  width: 100%;
  margin-bottom:
}

#home-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px 0 50px;
  background-color: #214278;
}

#icons {
  display: flex;
  flex-direction: row;
}

.icon {
  padding: 20px;
}

</style>
