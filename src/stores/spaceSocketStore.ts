import { defineStore } from 'pinia';
import { Socket, io } from 'socket.io-client';
import { ref } from 'vue';

export const useSpaceSocketStore = defineStore('spaceSocketStore', {
  state: () => {
    let localStream = ref(new MediaStream());
    let remoteStream = ref(new MediaStream());
    let peerConnection = ref(new RTCPeerConnection());
    let socket: Socket;

    const initializeSocket = async (room = 'some-room') => {
      try {
        // Initialize Socket.IO connection
        socket = io('https://notesphere-sys-production.up.railway.app/space', { transports: ['websocket']});
        peerConnection.value = new RTCPeerConnection({iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]});

        socket.emit('join-room', { room });
        socket.on('new-peer', async (data)=> {
            let newOffer = await peerConnection.value.createOffer()
            socket.emit('signal', {signal: newOffer, peerId: data.id, room} )
        })

        // Get local media stream
        localStream.value = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        // Initialize WebRTC Peer Connection

        // Add local tracks to peer connection
        localStream.value.getTracks().forEach(track => {
          peerConnection.value.addTrack(track, localStream.value);
          console.log(track)
        });

        
        // Handle incoming ICE candidates and signals
        socket.on('signal', async (data) => {
            if (data.type === 'offer') {
                console.log("got an offer")
                await peerConnection.value.setRemoteDescription(new RTCSessionDescription(data));
                const answer = await peerConnection.value.createAnswer();
                await peerConnection.value.setLocalDescription(answer);
                console.log("Sent an answer")
                socket.emit('signal', { signal: answer, room });
            } else if (data.type === 'answer') {
                console.log("Got an answer")
                await peerConnection.value.setRemoteDescription(new RTCSessionDescription(data));
            } else if (data.candidate) {
                console.log("Its an ICE candidate")
                await peerConnection.value.addIceCandidate(new RTCIceCandidate(data));
            }
        });
        
        // Send ICE candidates to the server
        peerConnection.value.onicecandidate = (event) => {
            if (event.candidate) {
              console.log("An ICE candidate generated")
            socket.emit('signal', { signal: event.candidate, room });
          }
        };

        // Handle remote stream
        peerConnection.value.ontrack = (event) => {
            console.log('received track')
            remoteStream.value = event.streams[0];
        };
        
        // Join room
        
    } catch (error) {
        console.error("Error during socket initialization: ", error);
      }
    };

    const closeConnection = () => {
      peerConnection.value.close();
      peerConnection.value = new RTCPeerConnection();
    };

    return { initializeSocket, localStream, remoteStream, closeConnection };
  },
});
