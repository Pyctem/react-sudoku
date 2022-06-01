import { BrowserRouter } from "react-router-dom";
import CSudoku from "../CSudoku";

function CApp() {
    return (
        <BrowserRouter>
            <CSudoku />
        </BrowserRouter>
    );
}

export default CApp;
