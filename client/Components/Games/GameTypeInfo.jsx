import React from 'react';
import AlertPanel from '../Site/AlertPanel';

const GameTypeInfo = ({ gameType }) => {
    switch (gameType) {
        case 'beginner':
            return (
                <AlertPanel type='info'>
                    <strong>初学者</strong> 新手对局
                </AlertPanel>
            );
        case 'casual':
            return (
                <AlertPanel type='info'>
                    <strong>休闲局</strong> 中等强度的对局
                </AlertPanel>
            );
        case 'competitive':
            return (
                <AlertPanel type='info'>
                    <strong>竞技</strong> 高强度的对局
                </AlertPanel>
            );
    }
};

export default GameTypeInfo;
