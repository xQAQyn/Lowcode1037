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
		this.ToLeft = '100px';
		this.ToTop = '100px';
		if(type === 'p' || type === 'a'){
			this.BoxHeight = '40px';
			this.BoxWidth = '200px';
		}
		else if(type === 'button'){
			this.BoxHeight = '40px';
			this.BoxWidth = '100px';
		}
		else{
			this.BoxHeight = '200px';
			this.BoxWidth = 'auto';
		}
		this.BackgroundColor = 'rgba(0,0,0,1)';
		this.FontColor = 'black';
		this.FontSize = 'medium';
		this.FontWeight = 'normal';
	}
}

class PageModule{
	id;
	type;
	style;
	events;

	constructor(type) {
		this.id = nanoid();
		this.type = type;
		this.style = new PageStyle(type);
		this.events = [];
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

	UpdateModule(context,payload) {
		console.log(payload)
		const index = GetIndexByID(context,payload.id);
		if(index!== -1)
			context.commit('UpdateModule',{
				index: index,
				styleName: payload.styleName,
				styleVal: payload.styleVal
			})
	}
}

const mutations = {
	CreateModule(context, type) {
		state.PageModules.push(new PageModule(type));
	},

	DeleteModule(context,index){
		state.PageModules.splice(index,1)
	},

	UpdateModule(context,payload) {
		state.PageModules[payload.index].style[payload.styleName] = payload.styleVal
	}
}

const state = {
	PageModules: [],
}

export default new Vuex.Store({
	actions,
	mutations,
	state,
})