import React from 'react';
import {Button, Panel, Separator, TabbarItem} from "@vkontakte/vkui";
import './styles/DonationPage.css'
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Caption from "@vkontakte/vkui/dist/components/Typography/Caption/Caption";
import Progress from "@vkontakte/vkui/dist/components/Progress/Progress";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import Epic from "@vkontakte/vkui/dist/components/Epic/Epic";
import Tabbar from "@vkontakte/vkui/dist/components/Tabbar/Tabbar";
import {Icon24BrowserBack} from "@vkontakte/icons";

const DonationPage = ({id, go, donation}) => {
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
        const imgSection = document.querySelector('.donation-page-img__container')
        if(imgSection && picture) {
            imgSection.innerHTML = ''
            const img = document.createElement("img");
            img.classList.add("donation-page-img");
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
        <Panel id={id}>
            <div className="container-centered">
                <div className="content-center">
                    <div className="donation-page-img__container"></div>
                    <div className="donation-card-content">
                        <div className="donation-card-header">
                            <Title level={1} weight="bold">{title}</Title>
                            <Caption level={1} weight="regular" className="text-small" style={{marginTop: 4}}>Автор {author}</Caption>
                            {type === 'target' && donationEnd === "onTime"
                                ?<Caption level={1} weight="regular" className="text-small">Закончится через {
                                    Math.floor((Date.parse(endDate) - Date.now())/86400000)
                                } дней</Caption>
                                :<Caption level={1} weight="regular" className="text-small">Помощь нужна каждый месяц</Caption>
                            }
                        </div>
                        <Separator/>
                        kek
                        <Separator/>
                        <div className="page-description">
                            {description}
                        </div>
                        <Separator/>
                        <div className="donation-card-progress">
                            <div className="donation-progress-bar">
                                {collected
                                    ?<Text weigth="semibold">Собрано {collected} из {amount}</Text>
                                    :<Caption level={1} weight="regular">Помогите первым</Caption>
                                }
                                <Progress value={10} className="progress-bar__body"/>
                            </div>
                            <div style={{marginLeft: 8}}>
                                <Button size="l">Помочь</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Epic tabbar={
                <Tabbar>
                    <TabbarItem data-to="donationsList" onClick={e => go(e)}>
                        <Icon24BrowserBack/>
                    </TabbarItem>
                </Tabbar>}
            />
        </Panel>
    );
};

export default DonationPage;
