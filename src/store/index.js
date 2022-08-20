import Vue from 'vue'
import Vuex from 'vuex'
import {nanoid} from "nanoid";
Vue.use(Vuex)
Vue.config.devtools = true
class PageStyle{
	ToLeft;
	ToTop;
	BoxWidth;
	BoxHeight;
	BackgroundColor;
	FontColor;
	FontSize;
	FontWeight;
	constructor(type) {
		this.ToLeft = 100;
		this.ToTop = 100;
		if(type === 'p' || type === 'a'){
			this.BoxHeight = 40;
			this.BoxWidth = 200;
		}
		else if(type === 'button'){
			this.BoxHeight = 24;
			this.BoxWidth = 96;
		}
		else{
			this.BoxHeight = 200;
			this.BoxWidth = 'auto';
		}
		this.BackgroundColor = 'rgba(0,0,0,0)';
		this.FontColor = 'black';
		this.FontSize = 16;
		this.FontWeight = 400;
	}
}

class PageModule{
	id;
	type;
	style;
	events;
	value;
	url;

	constructor(type) {
		this.id = nanoid();
		this.type = type;
		this.style = new PageStyle(type);
		this.events = [];

		if(type === 'p'){
			this.value = '这是一段文字'
		}
		else if(type === 'a'){
			this.value = '这是一个链接'

		}
		else if(type === 'button'){
			this.value = '这是一个按钮'
		}

		if(type === 'img'){
			this.url = 'https://cdn.luogu.com.cn/upload/image_hosting/wo96jeen.png'
		}
		else if(type === 'a'){
			this.url = 'https://www.hust.edu.cn/'
		}
	}
}

function GetIndexByID(context,id){
	for(let i = 0;i < context.state.PageModules.length;i++)
		if(context.state.PageModules[i].id === id)
			return i;
	return -1
}

const actions = {

	CreateModule(context,type){
		if(type === 'p' || type === 'a' || type === 'button' || type === 'img' || type === 'video')
			context.commit('CreateModule',type)
	},

	DeleteModule(context,id) {
		let index = GetIndexByID(context,id);
		if(index !== -1)
			context.commit('DeleteModule',index)
	},

	Select(context,id){
		let index = GetIndexByID(context,id)
		if(index !== -1)
			context.commit('Select',id)
	},

	ChangeStyle(context, payload) {
		let index = GetIndexByID(context,payload.id)
		if(index !== -1)
			context.commit('ChangeStyle',{
				index: index,
				name: payload.name,
				NewVal: payload.NewVal
			})
	},

	ChangeUrl(context,payload) {
		let index = GetIndexByID(context,payload.id)
		if(index !== -1)
			context.commit('ChangeUrl',{
				index: index,
				NewVal: payload.NewVal
			})
	},

	ChangeValue(context,payload) {
		let index = GetIndexByID(context,payload.id)
		if(index !== -1)
			context.commit('ChangeValue',{
				index: index,
				NewVal: payload.NewVal
			})
	}
}

const mutations = {
	CreateModule(context, type) {
		state.PageModules.push(new PageModule(type));
	},

	DeleteModule(context,index){
		state.PageModules.splice(index,1)
		state.Selected = ''
	},

	ChangePreview(){
		state.Preview = !state.Preview
		if(state.Preview)
			state.SourceCode = false
	},

	ChangeSource(){
		state.SourceCode = !state.SourceCode
		if(state.SourceCode)
			state.Preview = false
	},

	Select(context, id) {
		if(state.Selected === id)
			state.Selected = ''
		else state.Selected = id;
	},

	ChangeStyle(context, payload) {
		state.PageModules[payload.index].style[payload.name] = payload.NewVal
	},

	ChangeUrl(context, payload) {
		state.PageModules[payload.index].url = payload.NewVal
	},

	ChangeValue(context, payload) {
		state.PageModules[payload.index].value = payload.NewVal
	}
}

const state = {
	PageModules: [],
	Preview: false,
	SourceCode: false,
	Selected: ""
}

export default new Vuex.Store({
	actions,
	mutations,
	state,
})