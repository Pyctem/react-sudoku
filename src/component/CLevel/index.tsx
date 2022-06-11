import { action } from 'mobx';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { gameStore, levels } from '../../store/game';
import { Icon } from 'react-icons-kit'
import { ic_navigate_next } from 'react-icons-kit/md/ic_navigate_next'
import { ic_navigate_before } from 'react-icons-kit/md/ic_navigate_before'
import 'swiper/css';
import './index.scss';

function CLevel() {
    const changeHandler = useCallback(action((swiper: any) => {
        const { slides, activeIndex } = swiper;
        const level = slides[activeIndex].innerText;
        gameStore.level = level.toLowerCase();
    }), []);

    return (
        <Swiper 
            modules={[Navigation]}
            className='sudoku__level'
            onSlideChange={changeHandler}
            initialSlide={levels.indexOf(gameStore.level)}
            navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next'
            }}
        >
            <button className='swiper-button-prev'>
                <Icon title={'back'} size={'7vh'} icon={ic_navigate_before} />
            </button>
            <button className='swiper-button-next'>
                <Icon title={'back'} size={'7vh'} icon={ic_navigate_next} />
            </button>

            {levels.map(level => (
                <SwiperSlide key={level}>{level.toUpperCase()}</SwiperSlide>
            ))}
        </Swiper>
    )
}

export default observer(CLevel);