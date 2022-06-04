import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { CButton } from "../CButton";
import { countStore } from "../../store/board";
import CBoardControl from "../CBoardControl";
import './index.scss';


function CBoardControls() {
    const count = countStore.get();
    const navigate = useNavigate();

    function back() {
        navigate('/', { replace: true });
    };

    return (
        <>
            <div className="board-controls">
                {Array.from(count.keys()).map(key => <CBoardControl key={key} value={key} />)}
            </div>
            <div className="board-buttons">
                <CButton className="board-button" onClick={back}>BACK</CButton>
                <CButton className="board-button">RESTART</CButton>
                <CButton className="board-button">VALIDATE</CButton>
            </div>
        </>
    );
}

export default observer(CBoardControls)