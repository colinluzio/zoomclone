import React from "react";

interface IRoomLabelProps {
    roomId: string | null;
}
const RoomLabel = ({ roomId }: IRoomLabelProps) => {
    return <div className="room_label" >
        <p className="room_label_paragraph" > ID: {roomId} </p>
    </div>
}

export default RoomLabel;