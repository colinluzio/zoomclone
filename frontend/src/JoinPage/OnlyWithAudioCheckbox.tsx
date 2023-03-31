import CheckImg from "../resources/images/check.png";

interface OnlyWithAudioCheckboxProps {
    connectOnlyWithAudio: boolean;
    setConnectOnlyWithAudio: (connectOnlyWithAudio: boolean) => void;
}

const OnlyWithAudioCheckbox = ({
    connectOnlyWithAudio,
    setConnectOnlyWithAudio,
}: OnlyWithAudioCheckboxProps) => {
    const handleConnectionTypeChange = () => {
        setConnectOnlyWithAudio(!connectOnlyWithAudio);
    };

    return (
        <div className="checkbox_container">
            <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
                {connectOnlyWithAudio && (
                    <img className="checkbox_image" src={CheckImg}></img>
                )}
            </div>
            <p className="checkbox_container_paragraph">Only audio</p>
        </div>
    );
};

export default OnlyWithAudioCheckbox;