import React from 'react';
import {Button, Card, Separator} from "@vkontakte/vkui";
import './styles/DonationCard.css'
import Caption from "@vkontakte/vkui/dist/components/Typography/Caption/Caption";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Progress from "@vkontakte/vkui/dist/components/Progress/Progress";

const DonationCard = ({donation}) => {
    const {
        _id,
        author,
        title,
        description,
        goal,
        amount,
        collected,
        published,
        donationEnd,
        endDate,
        picture,
        type
    } = donation

    const showCardImg = () => {
        const imgSection = document.querySelector(`.id_${_id}`)
        if(imgSection && picture) {
            imgSection.innerHTML = ''
            const img = document.createElement("img");
            img.classList.add("donation-card-img");
            img.file = picture;
            imgSection.appendChild(img)

            const reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(picture);
        }
    }

    React.useEffect(() => {
        showCardImg()
    })

    return (
        <Card className="donation-card">
            <div className={`donation-card-img__container id_${_id}`}></div>
            <div className="donation-card-content">
                <div className="donation-card-header">
                    <Text weight="semibold">{title}</Text>
                    <div className="donation-card-subtext">
                        <Caption level={1} weight="regular" className="text-small">{author}</Caption>
                        <Caption level={1} weight="regular" className="text-small">&#160; &#8226; &#160;</Caption>
                        {type === 'target' && donationEnd === "onTime"
                            ?<Caption level={1} weight="regular" className="text-small">Закончится через {
                                Math.floor((Date.parse(endDate) - Date.now())/86400000)
                            } дней</Caption>
                            :<Caption level={1} weight="regular" className="text-small">Помощь нужна каждый месяц</Caption>
                        }
                    </div>
                </div>
                <Separator/>
                <div className="donation-card-progress">
                    <div className="donation-progress-bar">
                            {collected
                                ?<Text weigth="semibold">Собрано {collected} из {amount}</Text>
                                :<Caption level={1} weight="regular">Помогите первым</Caption>
                            }
                            <Progress value={Math.floor(collected/amount*100)} className="progress-bar__body"/>
                    </div>
                    <div style={{marginLeft: 8}}>
                        <Button size="l">Помочь</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default DonationCard;
