import React from "react";

interface IJoinRoomTitleProps {
    isRoomHost: boolean;
}

const JoinRoomTitle = ({ isRoomHost }: IJoinRoomTitleProps) => {
    const titleText = isRoomHost ? "Host meeting" : "Join meeting";

    return <p className="join_room_title">{titleText}</p>;
};

export default JoinRoomTitle;