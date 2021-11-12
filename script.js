$( document ).ready(function() {

	let posts = [];
	let autocompleteValues = setAutocompleteValues();

	function restoreFromLocalStorage()
	{
		posts = getPosts();
		drawPosts();
	}

	function submitPost()
	{
		let inputTag = document.getElementById('postTag');
		let postTagValue = inputTag.value.split(',');
		let inputText = document.getElementById('postText');
		let postValue = inputText.value;
		posts = getPosts(); 
		posts.push({
			Tags: postTagValue,
			Value: postValue,
			Time: new Date()
		});
		localStorage.setItem('posts', JSON.stringify(posts));
		inputText.value = '';
		drawPosts();
		$("#postTag").autocomplete({source: autocompleteValues});
	}

	function drawPosts()
	{
		let tableBody = document.getElementById('postsBody');
		tableBody.innerHTML = '';
		posts.forEach(p => {
			//Add row to end
			var postRow = tableBody.insertRow(-1);
			
			var tagsCell  = postRow.insertCell(0);
			tagsCell.appendChild(document.createTextNode(p.Tags));
			
			var postCell  = postRow.insertCell(1);
			postCell.appendChild(document.createTextNode(p.Value));
			
			var nameCell  = postRow.insertCell(2);
			nameCell.appendChild( document.createTextNode(moment(p.Time).format("dddd, MMMM Do YYYY, h:mm:ss a")));
		});
	}

	function getPosts()
	{
		if (!localStorage.getItem('posts')) {
			localStorage.setItem('posts', JSON.stringify([]));
		}
		return JSON.parse(localStorage.getItem('posts'));
	}

	function setTags()
	{
		var posts = getPosts();
		var tags = _.chain(posts)
		.pluck('Tags')
		.map(el => {
			return el;
		})
		.flatten()
		.uniq()
		.value();
		return tags;
	}

	restoreFromLocalStorage();

	$("#postTag").autocomplete({source: autocompleteValues});

	function setAutocompleteValues()
	{
		var tags = setTags();
		var tagsArr = _.map(tags, el => {
			return {value: el, text: el};
		});
		return tagsArr;
	}

	document.getElementById('postSubmit').onclick = submitPost;

});
