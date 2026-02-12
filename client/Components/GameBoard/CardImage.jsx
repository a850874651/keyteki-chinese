import React, { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as fabricModule from 'fabric';

const fabric = fabricModule.fabric ?? fabricModule.default ?? fabricModule;
import { buildCard } from '../../archonMaker';

import './CardImage.scss';

const CardImage = ({ card, cardBack, size, halfSize, onMouseOver, onMouseOut }) => {
    const { i18n } = useTranslation();
    const fabricRef = useRef();

    const ref = useCallback(
        async (node) => {
            if (node && card) {
                let canvas;
                try {
                    canvas = new fabric.StaticCanvas(node);
                } catch {
                    fabricRef.current = null;
                }

                if (canvas) {
                    // 构建当前语言的图片路径
                    let imageUrl = `/img/cards/${halfSize ? 'halfSize/' : ''}${
                        i18n.language === 'en' ? '' : i18n.language + '/'
                    }${card.image.replace(/\*/g, '_')}.${halfSize ? 'jpg' : 'png'}`;

                    try {
                        // 尝试加载当前语言的图片
                        fabricRef.current = await buildCard(canvas, {
                            ...card,
                            size,
                            halfSize,
                            url: imageUrl
                        });
                    } catch (error) {
                        // 如果失败且不是英文，尝试加载英文图片
                        if (i18n.language !== 'en') {
                            console.log(`图片加载失败，使用英文图片: ${card.image}`);
                            
                            // 构建英文图片路径
                            let fallbackUrl = `/img/cards/${halfSize ? 'halfSize/' : ''}${card.image.replace(
                                /\*/g,
                                '_'
                            )}.${halfSize ? 'jpg' : 'png'}`;

                            try {
                                fabricRef.current = await buildCard(canvas, {
                                    ...card,
                                    size,
                                    halfSize,
                                    url: fallbackUrl
                                });
                            } catch {
                                fabricRef.current = null;
                            }
                        } else {
                            fabricRef.current = null;
                        }
                    }
                }
            }
            return;
        }

        if (!fabricRef.current) {
            try {
                fabricRef.current = new fabric.StaticCanvas(node);
                fabricRef.current.renderOnAddRemove = false;
            } catch {
                fabricRef.current = null;
            }
        }
    }, []);

    useEffect(() => {
        const canvas = fabricRef.current;
        if (!canvas || !card || card.facedown) {
            return;
        }

        const renderId = ++renderIdRef.current;
        canvas.clear();

        const url = `/img/cards/${halfSize ? 'halfSize/' : ''}${
            i18n.language === 'en' ? '' : i18n.language
        }/${card.image.replace(/\*/g, '_')}.${halfSize ? 'jpg' : 'png'}`;

        (async () => {
            try {
                await buildCard(canvas, {
                    ...card,
                    size,
                    halfSize,
                    showAccolades,
                    url
                });
            } catch {
                // ignore
            }

            if (renderId !== renderIdRef.current) {
                return;
            }
        })();
    }, [
        card?.id,
        card?.location,
        card?.modifiedPower,
        card?.tokens && card.tokens.amber,
        card?.tokens && card.tokens.armor,
        card?.tokens && card.tokens.awakening,
        card?.tokens && card.tokens.damage,
        card?.tokens && card.tokens.depth,
        card?.tokens && card.tokens.disruption,
        card?.tokens && card.tokens.doom,
        card?.tokens && card.tokens.enrage,
        card?.tokens && card.tokens.fuse,
        card?.tokens && card.tokens.glory,
        card?.tokens && card.tokens.growth,
        card?.tokens && card.tokens.ignorance,
        card?.tokens && card.tokens.knowledge,
        card?.tokens && card.tokens.mutation,
        card?.tokens && card.tokens.power,
        card?.tokens && card.tokens.scheme,
        card?.tokens && card.tokens.time,
        card?.tokens && card.tokens.ward,
        card?.tokens && card.tokens.warrant,
        card?.tokens && card.tokens.yea,
        card?.tokens && card.tokens.nay,
        card?.tokens && card.tokens.wisdom,
        card?.tokens && card.tokens.hatch,
        card?.tokens && card.tokens.paint,
        card?.tokens && card.tokens.trade,
        card?.tokens && card.tokens.stun,
        card?.pseudoDamage,
        card?.wardBroken,
        card?.facedown,
        size,
        halfSize,
        showAccolades,
        i18n.language
    ]);

    if (card?.facedown) {
        return cardBack || <div />;
    }

    return (
        <canvas
            onMouseOver={
                onMouseOver
                    ? () =>
                          onMouseOver({
                              image: (
                                  <CardImage
                                      card={{ ...card, location: 'zoom' }}
                                      cardBack={cardBack}
                                  />
                              ),
                              size: 'normal'
                          })
                    : null
            }
            onMouseOut={onMouseOut}
            className='h-100 w-100'
            ref={setCanvasRef}
        />
    );
};

export default CardImage;