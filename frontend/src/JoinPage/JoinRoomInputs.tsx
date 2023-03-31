import React from "react";

interface IInputProps {
    placeholder: string;
    value: string;
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, value, changeHandler }: IInputProps) => {
    return (
        <input
            value={value}
            onChange={changeHandler}
            className="join_room_input"
            placeholder={placeholder}
        />
    );
};

interface IJoinRoomInputsProps {
    roomIdValue: string;
    setRoomIdValue: (roomId: string) => void;
    nameValue: string;
    setNameValue: (nameValue: string) => void;
    isRoomHost: boolean
}

const JoinRoomInputs = ({ roomIdValue, setRoomIdValue, nameValue, setNameValue, isRoomHost }: IJoinRoomInputsProps) => {

    const handleRoomIdValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomIdValue(event.target.value);
    };

    const handleNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    };

    return (
        <div className="join_room_inputs_container">
            {!isRoomHost && (
                <Input
                    placeholder="Enter meeting ID"
                    value={roomIdValue}
                    changeHandler={handleRoomIdValueChange}
                />
            )}
            <Input
                placeholder="Enter your Name"
                value={nameValue}
                changeHandler={handleNameValueChange}
            />
        </div>
    );
};

export default JoinRoomInputs;