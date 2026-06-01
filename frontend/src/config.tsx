const Config = {
    baseURL : import.meta.env.MODE === "development" ? import.meta.env.VITE_API_URL : "/"
}

export default Config;