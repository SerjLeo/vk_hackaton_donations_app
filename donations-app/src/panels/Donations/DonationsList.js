import React from 'react';
import {Button, Panel, PanelHeader} from "@vkontakte/vkui";
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline'
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title'
import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import './styles/Donations.css'
import DonationCard from "./DonationCard";

const DonationsList = ({id, donations, go}) => {
    return (
        <Panel id={id} centered>
            <PanelHeader left={donations.length?<Icon24AddOutline style={{marginLeft: 12}} data-to="donationsType" onClick={e => go(e)}/>:null}>
                <Title level="2" className="header-centered">Пожертвования</Title>
            </PanelHeader>
            {donations.length
                ?<div className="container-centered">
                    {donations.map(d => (
                        <div data-to="donationPage"
                             data-id={d._id}
                             onClick={e => go(e)}
                             key={d._id}
                        >
                            <DonationCard
                                donation={d}
                            />
                        </div>
                    ))}
                </div>
                :<div className="container-centered j-center">
                    <Headline className="text-centered">
                        У Вас пока нет сборов. <br/>Начните доброе дело.
                    </Headline>
                    <Button size="l" data-to="donationsType" onClick={e => go(e)}>Создать сбор</Button>
                </div>
            }
        </Panel>
    );
};

export default DonationsList;
