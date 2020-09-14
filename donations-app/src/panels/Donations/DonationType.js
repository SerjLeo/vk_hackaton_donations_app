import React from 'react';
import {Button, Panel, PanelHeader, Card, PanelHeaderBack} from "@vkontakte/vkui";
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline'
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title'
import Icon28TargetOutline from '@vkontakte/icons/dist/28/target_outline';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';
import './styles/Donations.css'
import './styles/Donations.css'
import Caption from "@vkontakte/vkui/dist/components/Typography/Caption/Caption";

const DonationType = ({id, go}) => {
    return (
        <Panel id={id} centered>
            <PanelHeader
                left ={<PanelHeaderBack data-to="donationsList" onClick={e => go(e)}/>}
            >
                <Title level={2} className="header-centered">Тип сбора</Title>
            </PanelHeader>
            <Card className="type-card" size='l' data-formtype="target" data-to="formPage_1" onClick={e => go(e)}>
                <div className="type-card-content">
                    <div className="card-left">
                        <Icon28TargetOutline width={24} height={24} fill="#3F8AE0"/>
                        <div className="card-left-text">
                            <Headline weight="semibold">Целевой сбор</Headline>
                            <Caption level={1} weight="regular">Когда есть определенная цель</Caption>
                        </div>
                    </div>
                    <div className="arrow-container">
                        <Icon24BrowserForward/>
                    </div>
                </div>
            </Card>
            <Card className="type-card" size='l' data-formtype="regular" data-to="formPage_1" onClick={e => go(e)}>
                <div className="type-card-content">
                    <div className="card-left">
                        <Icon28CalendarOutline width={24} height={24} fill="#3F8AE0"/>
                        <div className="card-left-text">
                            <Headline weight="semibold">Регулярный сбор</Headline>
                            <Caption level={1} weight="regular">Если помощь нужна ежемесячно</Caption>
                        </div>
                    </div>
                    <div className="arrow-container">
                        <Icon24BrowserForward/>
                    </div>
                </div>
            </Card>
        </Panel>
    );
};

export default DonationType;
