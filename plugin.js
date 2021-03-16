CKEDITOR.plugins.add('fdcallouts', {
	requires: 'richcombo,smethods',
	lang: 'en,ru,uk',
	init: function(editor){
		const config = editor.config,
			lang = editor.lang.fdcallouts,
			callouts = {
				callout: '',
				primary: 'background-color: #d7ecfa;',
				secondary: 'background-color: #eaeaea;',
				success: 'background-color: #e1faea;',
				alert: 'background-color: #f7e4e1;',
				warning: 'background-color: #fff3d9;',
			},
			re = new RegExp(CKEDITOR.tools.objectKeys(callouts).join('|'), 'g');

		editor.ui.addRichCombo('fdcallouts', {
			label: lang.label,
			title: lang.title,
			panel: {
				css: [CKEDITOR.skin.getPath('editor')].concat(config.contentsCss),
				multiSelect: false,
				attributes: {'aria-label': lang.panelTitle}
			},
			init: function(){
				this.startGroup(lang.panelTitle);
				for(const item in callouts)
					this.add(item, `<p style="${callouts[item]}color:#0a0a0a;padding:1rem;border:1px solid rgba(10,10,10,0.25);box-sizing:border-box">${lang[item]}</p>`, lang[item]);
			},
			onClick: function(item){
				editor.focus();
				editor.fire('saveSnapshot');
				this.element.toggleClass((!this.element.matchClass(re) || item == 'callout') ? 'callout' : null)
							.toggleClass(item != 'callout' && item, new RegExp(re.source.replace('callout|', ''), 'g'));
				editor.fire('saveSnapshot');
			},
			onOpen: function(){
				this.element = editor.getSelection().getStartElement();
				if(this.element)
					this.element = this.element.getAscendant('div', true);

				if (this.element && this.element.hasClass('callout'))
					this.mark(CKEDITOR.tools.array.find(this.element.matchClass(re), function(c){ return c != 'callout'; }) || 'callout');
			}
		});
	}
});

