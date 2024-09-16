import { defineStore } from 'pinia';
import { Socket, io } from 'socket.io-client';
import { ref, type Ref } from 'vue';

export const useSpaceSocketStore = defineStore('spaceSocketStore', {
  state: () => {
    let localStream = ref(new MediaStream());
    let remoteStreams:Ref<{remoteStream: MediaStream, name: string}[]> = ref([]);
    let peerConnections: Ref<Record<string, {connection: RTCPeerConnection, name: string}>>;
    let socket: Ref<Socket>;
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun.stunprotocol.org:3478' }
      ]
    };

    let startCall = (ownName: string) => {
      socket = ref(io("https://notesphere-sys-production.up.railway.app/space", {transports: ['websocket']}))
      // socket = ref(io("http://localhost:3001/space", {transports: ['websocket']}))

      socket.value.on('new_client', (clientId: string, clientName: string) => {
        createConnection({clientId, clientName}, ownName)
      })

      socket.value.on('signal', (data) => {
        handleServerSignal(data, ownName)
      })

    }

    let createConnection = async (clientInfo: {clientId: string, clientName: string}, ownName: string)=> {
      let client = clientInfo.clientId
      try{
        
        peerConnections.value[client].connection = new RTCPeerConnection(configuration)
        peerConnections.value[client].name = clientInfo.clientName
  
        localStream.value = await navigator.mediaDevices.getUserMedia({video: true, audio: true})

        localStream.value.getTracks().forEach(track => {
          peerConnections.value[client].connection.addTrack(track, localStream.value)
        })

        let offer = await peerConnections.value[client].connection.createOffer()
        await peerConnections.value[client].connection.setLocalDescription(offer)

        peerConnections.value[client].connection.onicecandidate = (event) => {
          console.log("Obtained ICE candidate")
          if(event.type == 'candidate'){
            socket.value.emit('signal', event)
          }
        }

        peerConnections.value[client].connection.ontrack = (event) => {
          remoteStreams.value.push({remoteStream: event.streams[0], name: peerConnections.value[client].name})
          console.log("added a remote track")
        }

        socket.value.emit('signal', {type: offer.type, name: ownName, sdp: offer.sdp})
      } catch(error) {
        console.log("Error while starting peer connection: ", error)
      }
    }

    let handleServerSignal = async(data: any, ownName: string) => {
      if (data.payload.type == "offer") {
        peerConnections.value[data.id].connection = new RTCPeerConnection(configuration)
        peerConnections.value[data.id].name = data.payload.name
        console.log('Signaller is known as: ', peerConnections.value[data.id])

        let sessionDescription = new RTCSessionDescription(data.payload.sdp);
        await peerConnections.value[data.id].connection.setRemoteDescription(sessionDescription);

        localStream.value = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
        localStream.value.getTracks().forEach(track => {
          peerConnections.value[data.id].connection.addTrack(track);
        })

        let answer = await peerConnections.value[data.id].connection.createAnswer()
        peerConnections.value[data.id].connection.setLocalDescription(answer)

        peerConnections.value[data.id].connection.onicecandidate = (event) => {
          if(event.type == "candidate"){
            socket.value.emit('signal', event)
          }
        }

        peerConnections.value[data.id].connection.ontrack = (event) => {
          remoteStreams.value.push({remoteStream: event.streams[0], name: peerConnections.value[data.id].name})
        }

        socket.value.emit('signal', {type: answer.type, name: ownName, sdp: answer.sdp})

      } else if(data.payload.type == "answer") {
        let sessionDescription = new RTCSessionDescription(data.payload.sdp);
        await peerConnections.value[data.id].connection.setRemoteDescription(sessionDescription)

      } else if(data.payload.type == "candidate") {
        let candidate = new RTCIceCandidate(data)
        peerConnections.value[data.id].connection.addIceCandidate(candidate);
      }
    }

    return { startCall,localStream, remoteStreams }
  },
});
