import React from "react";

import MicButton from "./MicButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharing";
import LeaveRoomButton from "./LeaveRoomButton";
import CameraButton from "./Camera";

const VideoButtons = () => {
    return <div className="video_buttons_container">
        <MicButton />
        <SwitchToScreenSharingButton />
        <LeaveRoomButton />
        <CameraButton />
    </div>
}

export default VideoButtons;