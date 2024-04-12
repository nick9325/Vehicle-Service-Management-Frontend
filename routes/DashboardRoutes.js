import { v4 as uuid } from 'uuid';


export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '/'
	},
	{
		id: uuid(),
		title: 'Vehicles',
		icon: 'truck',
		link: '/vehicles'
	},
	{
		id: uuid(),
		title: 'Owners',
		icon: 'users',
		link: '/owners'
	},
	{
		id: uuid(),
		title: 'Service Advisors',
		icon: 'users',
		link: '/service-advisors'
	},
	{
		id: uuid(),
		title: 'Work Items',
		icon: 'list',
		link: '/work-items'
	},

];

export default DashboardMenu;
