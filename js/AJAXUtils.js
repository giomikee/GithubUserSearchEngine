/**
 * Created by @giomikee
 * More info: https://github.com/giomikee/
 */

/* eslint-disable no-magic-numbers */

import Constants from './Constants.js';

const { AJAX_METHOD } = Constants;

const ajaxRequest = (url, callback) => {
	const xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState === 4) {

			if (this.status === 200) {
				callback(this.response);
			} else if (this.status === 404) {
				callback();
			}
		}
	};

	xmlhttp.open(AJAX_METHOD, url, true);
	xmlhttp.send();
};

export default {
	ajaxRequest
};
