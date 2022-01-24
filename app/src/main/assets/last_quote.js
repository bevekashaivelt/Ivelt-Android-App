   function hasNestedQuotes(text) {
    	let firstQ = text.indexOf("[quote=");
    	if (firstQ === -1) {
    		return false;
    	}
    	let secondQ = text.indexOf("[quote=", firstQ + 1);
    	if (secondQ === -1) {
    		return false;
    	}
    	return true;
    }

    function removeNestedQuotes(text) {
    	let nestedQuote = text.substring(
    		text.lastIndexOf('[quote="'),
    		text.indexOf("[/quote]", text.lastIndexOf('[quote="')) + 8
    	);
    	let modifiedText = text.replace(nestedQuote, "");

    	if (hasNestedQuotes(modifiedText)) {
    		return removeNestedQuotes(modifiedText);
    	}

    	return modifiedText;
    }

    if (window.location.href.includes("last=true")) {
    	let messageArea = document.querySelector("#message");
    	let text = messageArea.innerHTML;
    	if (hasNestedQuotes(text)) {
    		text = removeNestedQuotes(text);
    		messageArea.innerHTML = text;
    	}
    }

    function getSelection2(post_id){
        let messageName= 'message_' + post_id;
        let theSelection = '';
        let divArea = false;

        divArea = document.getElementById(messageName);

        if (divArea.innerHTML) {
            theSelection = divArea.innerHTML.replace(/<br>/ig, '\n');
            theSelection = theSelection.replace(/<br\/>/ig, '\n');
            theSelection = theSelection.replace(/&lt\;/ig, '<');
            theSelection = theSelection.replace(/&gt\;/ig, '>');
            theSelection = theSelection.replace(/&amp\;/ig, '&');
            theSelection = theSelection.replace(/&nbsp\;/ig, ' ');
        }  else if (divArea.textContent) {
            theSelection = divArea.textContent;
        } else if (divArea.firstChild.nodeValue) {
            theSelection = divArea.firstChild.nodeValue;
        }
        return theSelection;
    }

    function copyQuote(url, post_id){
        let post_url = getPostLink(post_id)
        console.log(`url ${post_url}`)
        $.get(
            url,
            response => {
                let res = $("#message-box #message", response)[0].innerText
                android.copyToClipboard(`${res} [url=${post_url}]מקור[/url]`)
                console.log(res)
            }
        )
    }

    function lastaddquote(post_id, username) {
    	let theSelection = getSelection2(post_id)
    	if (theSelection) {
    		let text = '[quote="' + username + '"]' + theSelection + '[/quote]'
    		insert_text(removeNestedQuotes(text));
    	}
    	return;
    }