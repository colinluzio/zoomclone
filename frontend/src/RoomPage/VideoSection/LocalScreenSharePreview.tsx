import React, { useRef, useEffect } from "react";

interface ILocalScreenSharingPreviewProps {
    stream: MediaStream
}

const LocalScreenSharingPreview = ({ stream }: ILocalScreenSharingPreviewProps) => {
    const localPreviewRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video: HTMLVideoElement | null = localPreviewRef?.current

        if (video) {

            video.srcObject = stream;

            video.onloadedmetadata = () => {
                video.play()
            }
        }
    }, [stream]);

    return (
        <div className="local_screen_share_preview">
            <video muted autoPlay ref={localPreviewRef}></video>
        </div>
    );
};

export default LocalScreenSharingPreview;
