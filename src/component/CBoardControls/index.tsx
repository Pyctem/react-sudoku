import { action } from "mobx";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Icon } from 'react-icons-kit'
import { ic_check } from 'react-icons-kit/md/ic_check'
import { ic_refresh } from 'react-icons-kit/md/ic_refresh'
import { ic_arrow_back } from 'react-icons-kit/md/ic_arrow_back'
import { CButton } from "../CButton";
import { gameStore } from "../../store/game";
import { boardStore } from "../../store/board";
import { errorStore } from "../../store/error";
import CBoardControl from "../CBoardControl";
import { reset, validateBoard } from "../../controller/Game";
import { boardBem } from "../CBoard";
import './index.scss';

function CBoardControls() {
    const count = gameStore.counts.get();
    const navigate = useNavigate();

    const backHandler = action(() => {
        navigate('/', { replace: true });
        boardStore.clear();
        errorStore.clear();
    });

    const resetHandler = action(() => {
        const cells = reset(boardStore.slice());
        boardStore.replace(cells);
        errorStore.clear();
    });

    function validateHandler() {
        const error = validateBoard(gameStore.cells.slice());
        errorStore.replace(error);
        gameStore.selectedCell = null;
        gameStore.selectedValue = null;
    }

    return (
        <>
            {!gameStore.solved && (
                <div className={boardBem('controls')}>
                    {Array.from(count.keys()).map(key => <CBoardControl key={key} value={key} />)}
                </div>
            )}
            <div className={boardBem('helpers')}>
                <CButton className={boardBem('helper')} onClick={backHandler}>
                    <Icon title={'back'} size={'5vh'} icon={ic_arrow_back} />
                </CButton>
                {!gameStore.solved && (
                    <>
                        <CButton className={boardBem('helper')} onClick={resetHandler}>
                            <Icon title={'refresh'} size={'5vh'} icon={ic_refresh} />
                        </CButton>
                        <CButton className={boardBem('helper')} onClick={validateHandler}>
                            <Icon title={'validate'} size={'5vh'} icon={ic_check} />
                        </CButton>
                    </>
                )}
            </div>
        </>
    );
}

export default observer(CBoardControls)