import { action } from 'mobx';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { gameStore, levels } from '../../store/game';
import 'swiper/css';
import './index.scss';

function CLevel() {
    const changeHandler = useCallback(action((swiper: any) => {
        const { slides, activeIndex } = swiper;
        const level = slides[activeIndex].innerText;
        gameStore.level = level.toLowerCase();
    }), []);

    return (
        <Swiper className='sudoku__level' onSlideChange={changeHandler} onInit={(swiper) => swiper.slideTo(levels.indexOf(gameStore.level))}>
            {levels.map(level => (
                <SwiperSlide key={level}>{level.toUpperCase()}</SwiperSlide>
            ))}
        </Swiper>
    )
}

export default observer(CLevel);