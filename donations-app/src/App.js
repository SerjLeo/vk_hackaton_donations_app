import React, {useState, useEffect} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import { v4 as uuidv4 } from 'uuid'
import doggie from './img/doggie.jpg'

import {
	DonationsList,
	DonationType,
	DonationFormPage2,
	DonationFormPage1,
	DonationPage
} from './panels'

const App = () => {
	const [activePanel, setActivePanel] = useState('donationsList');
	const [formType, setFormType] = useState('target')

	//Здесь будут храниться данные пользователя, полученные при загрузке приложения в хуке useEffect
	// Сейчас тут заглушка
	const [user, setUser] = useState({
		name: 'Иван',
		surname: 'Иванов',
		_id: 'user_id'
	})

	//Список пожервований также должен быть получен при загрузке в useEffect
	const [donations, setDonations] = useState([])
	const [donationPage, setDonationPage] = useState({})
	const [activeDonation, setActiveDonation] = useState({
		title: '',
		amount: '0',
		description: '',
		goal: '',
		author: user._id,
		account: 'account_id',
		donationEnd: 'onTime', //onTime - в определенную дату, onAmount - по достижению суммы
		endDate: '',
		picture: null,
		type: formType
	})

	useEffect(() => {
		async function createDefaultData () {
			const file = await fetch(doggie)
			const buffer = await file.arrayBuffer()
			const img = new File([buffer], 'dog', {type:'image/jpg'})
			setDonations([
				{
					title: 'Добряши помогают пёсикам',
					_id: uuidv4(),
					amount: 10000,
					description: 'Привет, добряш! Помоги пёсикам, не проходи мимо!!',
					goal: 'Корм и уход для животных в приюте',
					author: 'Иван Иванов',
					account: 'account_id',
					donationEnd: 'onTime',
					collected: 7000,
					endDate: new Date(2020,9, 14),
					picture: img,
					type: 'target'
				}
			])

		}
		createDefaultData()
	},[])

	const go = e => {
		if(e.currentTarget.dataset.to === 'formPage_1' && e.currentTarget.dataset.formtype) {
			setActiveDonation({
				...activeDonation,
				type: e.currentTarget.dataset.formtype
			})
			setFormType(e.currentTarget.dataset.formtype)
		}
		if(e.currentTarget.dataset.to === 'donationPage') {
			setDonationPage(donations.find(d => d._id === e.currentTarget.dataset.id))
		}
		setActivePanel(e.currentTarget.dataset.to);
	};

	const clearImage = () => {
		setActiveDonation({
			...activeDonation,
			picture: null
		})
	}

	const handleFormChange = e => {
		if(e.target.name === 'picture') return handleFileLoad(e)
		if(e.target.name === 'endDate') return handleDateSelect(e)
		else setActiveDonation({
			...activeDonation,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const newDonation = {
			...activeDonation,
			_id: uuidv4(),
			amount: Number(activeDonation.amount),
			collected: 0,
			author: user.name + ' ' + user.surname, //Можно оставить user._id и получать данные по API
			endDate: activeDonation.donationEnd === 'onTime'?activeDonation.endDate:null,
			published: new Date()
		}
		setDonations([
			...donations,
			newDonation
		])
		setActiveDonation({
			title: '',
			amount: '0',
			description: '',
			goal: '',
			author: user._id,
			account: 'account_id',
			donationEnd: 'onTime',
			endDate: '',
			picture: null,
			type: formType
		})
	}

	const handleFileLoad = e => {
		if(e.target.files[0].size > 1000000) return
		if(!e.target.files[0].type.match('^image/.*')) return
		setActiveDonation({
			...activeDonation,
			picture: e.target.files[0]
		})
	}

	const handleDateSelect = e => {
		if(Date.parse(e.target.value) <= Date.now()) {
			return
		}
		setActiveDonation({
			...activeDonation,
			endDate: e.target.value
		})
	}

	return (
		<View activePanel={activePanel} >
			<DonationsList id='donationsList' go={go} donations={donations}/>
			<DonationType id='donationsType' go={go}/>
			<DonationPage
				id='donationPage'
				go={go}
				donation={donationPage}
			/>
			<DonationFormPage1
				id='formPage_1'
				go={go}
				activeDonation={activeDonation}
				type={formType}
				user={user}
				handleChange={handleFormChange}
				clearImage={clearImage}
				handleSubmit={handleSubmit}
			/>
			<DonationFormPage2
				id='formPage_2'
				go={go}
				type={formType}
				user={user}
				activeDonation={activeDonation}
				handleChange={handleFormChange}
				handleSubmit={handleSubmit}
			/>
		</View>
	);
}

export default App;

