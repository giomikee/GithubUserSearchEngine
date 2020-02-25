/**
 * Created by @giomikee
 * More info: https://github.com/giomikee/
 */

class User {
	constructor(userInfo) {
		Object.assign(this, userInfo);
		this.repositories = [];
	}

	static buildFromJSON(json) {
		return new User(JSON.parse(json));
	}
}

export default User;
