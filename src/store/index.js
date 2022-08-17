import Vue from 'vue'
import Vuex from 'vuex'
import {nanoid} from "nanoid";
Vue.use(Vuex)

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

const actions = {
	CreateModule(context,type){
		if(type === 'p' || type === 'a' || type === 'button' || type === 'img' || type === 'video')
			context.commit('CreateModule',type)
	},
	DeleteModule(context,id) {
		context.commit('DeleteModule',id)
	}
	UpdateModule(context,id,) {

	}
}

const mutations = {
	CreateModule(context, type) {
		context.state.PageModules.push(new PageModule(type));
	},
	DeleteModule(context,id){
		for(let i = 0;i < context.state.PageModules.length;i++){
			if(context.state.PageModules[i].id === id)
				context.state.PageModules.splice(i,1)
		}
	}
}

const state = {
	PageModules: []
}


export default new Vuex.Store({
	actions,
	mutations,
	state,
})