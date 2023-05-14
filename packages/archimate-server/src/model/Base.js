 class ArchiMateElement {
	 /**
	  * {string}
	  */
	 id;
	 /**
	  * {string}
	  */
	 name;
	 /**
	  * {string}
	  */
	 documentation;
	constructor(id="", name="", documentation="") {
		this.id = id;
		this.name = name;
		this.documentation = documentation;
	}
}

module.exports=ArchiMateElement
