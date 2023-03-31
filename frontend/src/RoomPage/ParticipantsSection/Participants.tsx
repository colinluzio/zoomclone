import { connect } from "react-redux";
import { StoreState } from "../../store/reducer";

interface ISingleParticpantProps {
    identity: string;
    lastItem: boolean;
}
const SingleParticipant = ({ identity, lastItem }: ISingleParticpantProps) => {

    return (
        <>
            <p className="participants_paragraph">{identity}</p>
            {!lastItem && <span className="participants_separator_line"></span>}
        </>
    );
};

interface IParticipantProps {
    participants: IParticipant[]
}
const Participants = ({ participants }: IParticipantProps) => {

    return (
        <div className="participants_container">
            {participants.map((participant, index) => {
                return (
                    <SingleParticipant
                        key={participant.identity}
                        lastItem={participants.length === index + 1}
                        identity={participant.identity}
                    />
                );
            })}
        </div>
    );
};

const mapStoreStateToProps = (state: StoreState) => {
    return {
        ...state,
    };
};

export default connect(mapStoreStateToProps)(Participants);