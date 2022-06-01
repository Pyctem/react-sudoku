import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PHome from "../../page/Home";
import PBoard from "../../page/Board";
import { boardStore } from "../../store/board";

function CSudoku() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!boardStore.length) {
            navigate('/', { replace: true });
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<PHome />} />
            <Route path="board" element={<PBoard />} />
        </Routes>
    );
}

export default CSudoku;