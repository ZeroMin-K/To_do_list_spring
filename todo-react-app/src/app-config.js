let backendHost;

const hostname = window && window.location && window.location.hostname;

// 현재 브라우저 도메인이 localhost인 경우 
if (hostname === "localhost") {
    // 로컬 호스트에서 동작하는 백엔드 애플리케이션 사용 
    backendHost = "http://localhost:8080";
}

export const API_BASE_URL = `${backendHost}`;