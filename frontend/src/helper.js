const BACKEND_URL = "http://localhost:5000/";

const authFetch = async (url, args) => {
    if (args) {
        let token = JSON.parse(localStorage.getItem("token"));

        if (token) {
            token = "bearer " + token;

            if (args.headers) {
                args.headers.authorization = token;
            } else {
                args.headers = { authorization: token };
            }
        }
    } else {
        let token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            token = "bearer " + token;
            args = {
                headers: {
                    authorization: token,
                },
            };
        }
    }
    return await fetch(url, args);
};

module.exports = { BACKEND_URL, authFetch };
