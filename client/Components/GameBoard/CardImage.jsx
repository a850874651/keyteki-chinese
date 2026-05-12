import * as fabricModule from 'fabric';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { buildCard, houselessCards } from '../../archonMaker';

const fabric = fabricModule.fabric ?? fabricModule.default ?? fabricModule;

/**
 * @typedef CardImageProps
 * @property {object} card // The card data to render an image for
 * @property {string} [cardBack] // The card back image to show if not showing the card image
 */

/**
 *
 * @param {CardImageProps} props
 */
const CardImage = ({ card, cardBack, size, halfSize, onMouseOver, onMouseOut }) => {
    const { i18n } = useTranslation();
    const fabricRef = useRef();
    
    // 添加 renderIdRef
    const renderIdRef = useRef(0);
    const enhancementSignature = Array.isArray(card?.enhancements)
        ? card.enhancements.join('|')
        : '';
    const [imageSrc, setImageSrc] = useState(null);
    const cardId = card?.id;
    const cardLocation = card?.location;
    const modifiedPower = card?.modifiedPower;
    const pseudoDamage = card?.pseudoDamage;
    const wardBroken = card?.wardBroken;
    const facedown = card?.facedown;
    const tokens = card?.tokens || {};
    const amberTokens = tokens.amber;
    const armorTokens = tokens.armor;
    const awakeningTokens = tokens.awakening;
    const corrosionTokens = tokens.corrosion;
    const damageTokens = tokens.damage;
    const depthTokens = tokens.depth;
    const disruptionTokens = tokens.disruption;
    const doomTokens = tokens.doom;
    const enrageTokens = tokens.enrage;
    const fuseTokens = tokens.fuse;
    const gloryTokens = tokens.glory;
    const growthTokens = tokens.growth;
    const ignoranceTokens = tokens.ignorance;
    const knowledgeTokens = tokens.knowledge;
    const mutationTokens = tokens.mutation;
    const powerTokens = tokens.power;
    const schemeTokens = tokens.scheme;
    const timeTokens = tokens.time;
    const wardTokens = tokens.ward;
    const warrantTokens = tokens.warrant;
    const yeaTokens = tokens.yea;
    const nayTokens = tokens.nay;
    const wisdomTokens = tokens.wisdom;
    const hatchTokens = tokens.hatch;
    const paintTokens = tokens.paint;
    const tradeTokens = tokens.trade;
    const stunTokens = tokens.stun;
    const imageExtension = halfSize ? 'jpg' : 'png';
    const languageSegment = i18n.language === 'en' ? '' : `${i18n.language}/`;
    const imageName = card?.image ? card.image.replace(/\*/g, '_') : '';
    const localizedImageUrl = `/img/cards/${
        halfSize ? 'halfSize/' : ''
    }${languageSegment}${imageName}.${imageExtension}`;
    const englishImageUrl = `/img/cards/${
        halfSize ? 'halfSize/' : ''
    }${imageName}.${imageExtension}`;
    const isHouselessByNumber = /^[ARS]/.test(String(card?.number ?? ''));
    const shouldRenderCanvas =
        Boolean(card?.maverick) ||
        Boolean(card?.anomaly) ||
        (card?.id && houselessCards.includes(card.id)) ||
        isHouselessByNumber ||
        (Array.isArray(card?.enhancements) && card.enhancements.length > 0) ||
        card?.location === 'play area' ||
        card?.location === 'zoom';

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
        },
        [card, halfSize, i18n.language, size]
    );

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
                    url: localizedImageUrl
                });
            } catch {
                // ignore
            }

            if (renderId !== renderIdRef.current) {
                return;
            }
        })();
    }, [
        card,
        cardId,
        enhancementSignature,
        cardLocation,
        modifiedPower,
        amberTokens,
        armorTokens,
        awakeningTokens,
        corrosionTokens,
        damageTokens,
        depthTokens,
        disruptionTokens,
        doomTokens,
        enrageTokens,
        fuseTokens,
        gloryTokens,
        growthTokens,
        ignoranceTokens,
        knowledgeTokens,
        mutationTokens,
        powerTokens,
        schemeTokens,
        timeTokens,
        wardTokens,
        warrantTokens,
        yeaTokens,
        nayTokens,
        wisdomTokens,
        hatchTokens,
        paintTokens,
        tradeTokens,
        stunTokens,
        pseudoDamage,
        wardBroken,
        facedown,
        size,
        halfSize,
        showAccolades,
        localizedImageUrl,
        i18n.language
    ]);

    if (card?.facedown) {
        return cardBack || <div />;
    }

    if (!shouldRenderCanvas) {
        if (!imageSrc) {
            return <div className='block h-full w-full' />;
        }
        return (
            <img
                src={imageSrc}
                onError={() => {
                    if (imageSrc !== englishImageUrl) {
                        setImageSrc(englishImageUrl);
                    }
                }}
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
                        : undefined
                }
                onMouseOut={onMouseOut}
                className='block h-full w-full'
            />
        );
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
            ref={ref}
        />
    );
};

export default CardImage;