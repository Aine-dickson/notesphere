import { createConnection } from 'net';
import { defineStore } from 'pinia';
import { Socket, io } from 'socket.io-client';
import { ref, type Ref } from 'vue';

export const useSpaceSocketStore = defineStore('spaceSocketStore', {
  state: () => {
    let localStream = ref(new MediaStream());
    let remoteStream = ref(new MediaStream());
    let peerConnections = ref([]);
    let socket: Ref<Socket>;

    let startCall = () => {
      socket.value = io("https://notesphere-sys-production.up.railway.app/space")

      socket.value.on('new_client', (clientId: string, clientName: string) => {
        createConnection({clientId, clientName})
      })

    }

    let createConnection = (clientInfo)=> {
      console.log(clientInfo.clientId)
      // peerConnection[] = 
    }

    return { startCall }
  },
});
