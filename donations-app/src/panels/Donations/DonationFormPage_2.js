import React from 'react';
import {Button, Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import Radio from "@vkontakte/vkui/dist/components/Radio/Radio";

const DonationFormPage2 = ({id, go, user, activeDonation, handleChange, handleSubmit}) => {
    const {author, donationEnd, endDate} = activeDonation

    return (
        <Panel id={id} >
            <PanelHeader
                left ={<PanelHeaderBack data-to="formPage_1" onClick={e => go(e)}/>}
            >
                <Title level={2} className="header-centered">Оформление</Title>
            </PanelHeader>
            <div className="container-centered">
                <FormLayout className="form j-sb" onSubmit={handleSubmit}>
                    <FormLayoutGroup top="Автор">
                        <Select value={author} disabled defaultValue="user_id" name="author" onChange={e => handleChange(e)}>
                            <option value="user_id">{user.name + ' ' + user.surname }</option>
                        </Select>
                    </FormLayoutGroup>

                    <FormLayoutGroup top="Сбор завершится">
                        <div>
                            <Radio name="donationEnd" value="onAmount" onChange={e => handleChange(e)}>Когда соберём сумму</Radio>
                            <Radio name="donationEnd" value="onTime" defaultChecked onChange={e => handleChange(e)}>В определённую дату</Radio>
                        </div>
                    </FormLayoutGroup>

                    <FormLayoutGroup top="Дата окончания">
                        <Input name="endDate" value={endDate} type="date" onChange={e => handleChange(e)}/>
                    </FormLayoutGroup>

                    <Button
                        disabled={!endDate && donationEnd === 'onTime'}
                        type="submit"
                        className="submit-btn"
                        size="l"
                        data-to="donationsList"
                        onClick={e => go(e)}
                    >
                        Создать сбор
                    </Button>

                </FormLayout>
            </div>
        </Panel>
    );
};

export default DonationFormPage2;
