import React from 'react';
import {Button, Panel, PanelHeader, PanelHeaderBack, Textarea} from "@vkontakte/vkui";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import File from "@vkontakte/vkui/dist/components/File/File";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';
import Icon28PictureOutline from '@vkontakte/icons/dist/28/picture_outline';
import Headline from "@vkontakte/vkui/dist/components/Typography/Headline/Headline";

const DonationFormPage1 = ({id, go, type, user, handleChange, activeDonation, clearImage, handleSubmit}) => {

    const {title, amount, description, author, goal, picture, account} = activeDonation

    const showLoadedImg = () => {
        const preview = document.querySelector('.preview')
        if(preview) {
            const img = document.createElement("img")
            img.classList.add("preview-img")
            img.file = picture
            preview.appendChild(img)

            const reader = new FileReader()
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img)
            reader.readAsDataURL(picture)
        }
    }

    React.useEffect(() => {
        showLoadedImg()
    },[picture])

    const getFormTitle = type => {
        switch (type){
            case 'target':
                return 'Целевой сбор'
            case 'regular':
                return 'Регулярный сбор'
            default:
                return 'Сбор'
        }
    }

    const validateAmount = amount => {
        if (typeof(amount) === 'string' && amount.match('^-')) return false
        return !!Number(amount);

    }

    const getPlaceholder = (formType, inputType) => {
        switch (formType) {
            case 'target':
                switch (inputType) {
                    case 'amount':
                        return 'Сколько нужно собрать'
                    case 'goal':
                        return 'Например, лечение человека'
                    default:
                        return 'Укажите цель сбора'
                }
            case 'regular':
                switch (inputType) {
                    case 'amount':
                        return 'Сколько нужно в месяц'
                    case 'goal':
                        return 'Например, поддержка приюта'
                    default:
                        return 'Укажите цель сбора'
                }
            default:
                switch (inputType) {
                    case 'amount':
                        return 'Сколько нужно собрать'
                    case 'goal':
                        return 'Укажите цель сбора'
                    default:
                        return 'Укажите цель сбора'
                }
        }
    }

    const getInputTitle = (formType, inputType) => {
        switch (formType) {
            case 'target':
                switch (inputType) {
                    case 'amount':
                        return 'Сумма, ₽'
                    default:
                        return 'Сумма, ₽'
                }
            case 'regular':
                switch (inputType) {
                    case 'amount':
                        return 'Сумма в месяц, ₽'
                    default:
                        return 'Сумма, ₽'
                }
            default:
                switch (inputType) {
                    case 'amount':
                        return 'Сумма в месяц, ₽'
                    default:
                        return 'Сумма, ₽'
                }
        }
    }

    return (
        <Panel id={id} centered>
            <PanelHeader
                separator={false}
                left ={<PanelHeaderBack data-to="donationsType" onClick={e => go(e)}/>}
            >
                <Title level={2} className="header-centered">{getFormTitle(type)}</Title>
            </PanelHeader>
            <FormLayout className="form" onSubmit={handleSubmit}>
                {picture
                    ?<div className="preview">
                        <Icon28CancelCircleOutline className="img-close" onClick={clearImage}/>
                    </div>
                    :<File name="picture" accept="image/*" className="file-input" onChange={e => handleChange(e)}>
                        <div className="file-input__content">
                            <Icon28PictureOutline/>
                            <Headline weight="medium" className="file-input__content-text">Загрузить обложку</Headline>
                        </div>
                    </File>
                }

                <FormLayoutGroup top="Название сбора">
                    <Input value={title} name="title" type="text" placeholder="Название сбора" onChange={e => handleChange(e)}/>
                </FormLayoutGroup>

                <FormLayoutGroup top={getInputTitle(type, 'amount')} >
                    <Input
                        name="amount"
                        value={amount}
                        type="number"
                        min="1"
                        placeholder={getPlaceholder(type, 'amount')}
                        onChange={e => handleChange(e)}
                    />
                </FormLayoutGroup>

                <FormLayoutGroup top="Цель" >
                    <Input
                        value={goal}
                        name="goal"
                        onChange={e => handleChange(e)}
                        type="text"
                        placeholder={getPlaceholder(type, 'goal')}
                    />
                </FormLayoutGroup>

                <FormLayoutGroup top="Описание">
                    <Textarea
                        value={description}
                        name="description"
                        onChange={e => handleChange(e)}
                        placeholder="На что пойдут деньги и как они кому-то помогут?"
                    />
                </FormLayoutGroup>

                <FormLayoutGroup top="Куда получать деньги">
                    <Select value={account} disabled defaultValue="account_id" name="account" placeholder="Выберите счет">
                        <option value="account_id">Счёт VK PAY 1234</option>
                    </Select>
                </FormLayoutGroup>
                {type === 'regular'
                    ?<FormLayoutGroup top="Автор">
                        <Select value={author} disabled defaultValue="user_id" name="author">
                            <option value="user_id">{user.name + ' ' + user.surname }</option>
                        </Select>
                    </FormLayoutGroup>
                    :null
                }

                {type === 'regular'
                    ?<Button
                        disabled={!(title && goal && description && validateAmount(amount))}
                        type="submit"
                        className="submit-btn"
                        size="l"
                        data-to="donationsList"
                        onClick={e => go(e)}
                    >
                        Создать сбор
                    </Button>
                    :null
                }

                {type === 'target'
                    ?<Button
                        disabled={!(title && goal && description && validateAmount(amount))}
                        className="submit-btn"
                        size="l"
                        type="button"
                        data-formtype="target"
                        data-to="formPage_2"
                        onClick={e => go(e)}
                    >
                        Далее
                    </Button>
                    :null
                }
            </FormLayout>
        </Panel>
    );
};

export default DonationFormPage1;
