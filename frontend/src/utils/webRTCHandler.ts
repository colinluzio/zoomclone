import { setShowOverlay, setMessages } from "../store/actions";
import { store } from "../store/store";
import * as wss from "./wss";
import Peer from "simple-peer";
import * as SimplePeer from "simple-peer";
// import { fetchTURNCredentials, getTurnIceServers } from "./turn";

const defaultConstraints = {
    audio: false,
    video: {
        width: 480,
        height: 360,
    },
};

const onlyAudioConstraints = {
    audio: true,
    video: false,
};

let localStream: MediaStream;

export const getLocalPreviewAndInitRoomConnection = async (
    isRoomHost: boolean,
    identity: string,
    roomId: string | null = null,
    onlyAudio: boolean
) => {
    // await fetchTURNCredentials();

    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            console.log("successfuly received local stream");
            localStream = stream;
            showLocalVideoPreview(localStream);

            // dispatch an action to hide overlay
            store.dispatch(setShowOverlay(false));

            isRoomHost
                ? wss.createNewRoom(identity, onlyAudio)
                : wss.joinRoom(identity, roomId, onlyAudio);
        })
        .catch((err) => {
            console.log(
                "error occurred when trying to get an access to local stream"
            );
            console.log(err);
        });
};

let peers: Record<string, ISignalData["signal"]> = {}

let streams: MediaStream[] = [];

const getConfiguration = () => {
    // const turnIceServers = getTurnIceServers();

    console.warn("Using only STUN server");
    return {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            },
        ],
    };

};

const messengerChannel = "messenger";

export const prepareNewPeerConnection = (connUserSocketId: string, isInitiator: boolean) => {
    const configuration = getConfiguration();

    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: configuration,
        stream: localStream,
        channelName: messengerChannel,
    });

    peers[connUserSocketId].on("signal", (data: ISignalData) => {
        // webRTC offer, webRTC Answer (SDP informations), ice candidates

        const signalData = {
            signal: data,
            connUserSocketId: connUserSocketId,
        };

        wss.signalPeerData(signalData);
    });

    peers[connUserSocketId].on("stream", (stream: MediaStream) => {
        console.log("new stream came");

        addStream(stream, connUserSocketId);
        streams = [...streams, stream];
    });

    peers[connUserSocketId].on("data", (data: string) => {
        console.log(data)
        const messageData = JSON.parse(data);
        appendNewMessage(messageData);
    });
};

export const handleSignalingData = (data: ISignalData) => {
    //add signaling data to peer connection
    peers[data.connUserSocketId].signal(data.signal);
};

export const removePeerConnection = (data: ISignalData) => {
    const { socketId } = data;
    const videoContainer = socketId ? document.getElementById(socketId) : null;
    const videoEl = (document.getElementById(`${socketId}-video`) as HTMLVideoElement | null)

    if (videoContainer && videoEl) {
        const tracks = (<MediaStream>videoEl?.srcObject).getTracks();

        tracks.forEach((t) => t.stop());
        videoEl.srcObject = null;
        videoContainer.removeChild(videoEl);

        videoContainer.parentNode?.removeChild(videoContainer);

        if (socketId && peers[socketId]) {
            peers[socketId].destroy();
        }
        if (socketId) {
            delete peers[socketId];
        }
    }
};

////////////////////////////////// UI Videos //////////////////////////////////
const showLocalVideoPreview = (stream: MediaStream) => {
    const videosContainer = document.getElementById("videos_portal");

    if (!videosContainer) return;

    videosContainer.classList.add("videos_portal_styles");
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video_track_container");
    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
        videoElement.play();
    };

    videoContainer.appendChild(videoElement);

    if (store.getState().connectOnlyWithAudio) {
        videoContainer.appendChild(getAudioOnlyLabel());
    }

    videosContainer.appendChild(videoContainer);
};

const addStream = (stream: MediaStream, connUserSocketId: string) => {
    //display incoming stream
    const videosContainer = document.getElementById("videos_portal");
    const videoContainer = document.createElement("div");
    videoContainer.id = connUserSocketId;

    videoContainer.classList.add("video_track_container");
    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connUserSocketId}-video`;

    videoElement.onloadedmetadata = () => {
        videoElement.play();
    };

    videoElement.addEventListener("click", () => {
        if (videoElement.classList.contains("full_screen")) {
            videoElement.classList.remove("full_screen");
        } else {
            videoElement.classList.add("full_screen");
        }
    });

    videoContainer.appendChild(videoElement);

    // check if other user connected only with audio
    const participants = store.getState().participants;

    const participant = participants.find((p) => p.socketId === connUserSocketId);

    if (participant?.onlyAudio) {
        videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
    } else {
        videoContainer.style.position = "static";
    }

    videosContainer?.appendChild(videoContainer);
};

const getAudioOnlyLabel = (identity = "") => {
    const labelContainer = document.createElement("div");
    labelContainer.classList.add("label_only_audio_container");

    const label = document.createElement("p");
    label.classList.add("label_only_audio_text");
    label.innerHTML = `Only audio ${identity}`;

    labelContainer.appendChild(label);
    return labelContainer;
};

////////////////////////////////// Buttons logic //////////////////////////////////

export const toggleMic = (isMuted: boolean) => {
    localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled: boolean) => {
    localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};

export const toggleScreenShare = (
    isScreenSharingActive: boolean,
    screenSharingStream = null
) => {
    if (isScreenSharingActive) {
        switchVideoTracks(localStream);
    } else {
        switchVideoTracks(screenSharingStream);
    }
};

const switchVideoTracks = (stream: MediaStream | null) => {
    if (!stream) return
    for (let socket_id in peers) {
        for (let index in peers[socket_id].streams[0].getTracks()) {
            for (let index2 in stream.getTracks()) {
                if (
                    peers[socket_id].streams[0].getTracks()[index].kind ===
                    stream.getTracks()[index2].kind
                ) {
                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        stream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    );
                    break;
                }
            }
        }
    }
};

////////////////////////////////// Messages /////////////////////////////////////
const appendNewMessage = (messageData: ILocalMessageData) => {
    const messages = store.getState().messages;
    store.dispatch(setMessages([...messages, messageData]));
};

export const sendMessageUsingDataChannel = (messageContent: string) => {
    // append this message locally
    const identity = store.getState().identity;

    const localMessageData = {
        content: messageContent,
        identity,
        messageCreatedByMe: true,
    };

    appendNewMessage(localMessageData);

    const messageData = {
        content: messageContent,
        identity,
    };

    const stringifiedMessageData = JSON.stringify(messageData);
    for (let socketId in peers) {
        peers[socketId].send(stringifiedMessageData);
    }
};