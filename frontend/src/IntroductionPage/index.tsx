import { useEffect } from "react";
import { connect } from "react-redux";
import logo from "../resources/images/logo.png";
import ConnectingButtons from "./ConnectingButtons";
import { setIsRoomHost } from "../store/actions";

import "./IntroductionPage.css";

type IsHostPayload = ReturnType<typeof setIsRoomHost>;

interface IIntroductionPageProps {
    setIsRoomHostAction: (isRoomHost: boolean) => void;
}

const IntroductionPage = ({ setIsRoomHostAction }: IIntroductionPageProps) => {
    useEffect(() => {
        setIsRoomHostAction(false);
    }, []);

    return (

        <div className="introduction_page_container">
            <div className="introduction_page_panel">
                <img src={logo} className="introduction_page_image"></img>
                <ConnectingButtons />
            </div>
        </div>

    );
};

const mapActionsToProps = (dispatch: (isHost: IsHostPayload) => void) => {
    return {
        setIsRoomHostAction: (isRoomHost: boolean) => dispatch(setIsRoomHost({ isRoomHost })),
    };
};

export default connect(null, mapActionsToProps)(IntroductionPage);