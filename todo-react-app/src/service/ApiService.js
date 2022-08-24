import { API_BASE_URL } from "../app-config";

// 백엔드로 요청 보냄 (API콜)
export function call(api, method, request) {
    let options = {
        headers: new Headers( {
            "Content-Type" : "application/json",
        }),
        url: API_BASE_URL + api,
        method: method,
    };
    if (request) {
        // GET method
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => 
        response.json().then((json) => {
            // response.ok가 true이면 
            if(!response.ok) {
                // 정상적인 응답을 받은것
                return Promise.reject(json);
            } // false이면 에러 응답을 받은 것 
            return json;
        })
    );
}