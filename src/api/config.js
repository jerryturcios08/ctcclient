let apiUrl;

if (process.env.NODE_ENV === "development") {
    apiUrl = "http://localhost:8080";
} else {
    // RIP
}

export default apiUrl;
