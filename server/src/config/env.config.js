export default {
    PORT: process.env.PORT || 8081,
    HTTPS_PORT: process.env.HTTPS_PORT || 8080,
    HOST: process.env.HOST || "0.0.0.0",
    //DATABASE_URL: process.env.DATABASE_URL || "mongodb+srv://admin:zaq1ZAQ!@cluster0-yhumi.gcp.mongodb.net/translations?retryWrites=true&w=majority",
    DATABASE_URL: "mongodb://localhost:32017/casa2",
    ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
    ELASTICSEARCH_INDEX: process.env.ELASTICSEARCH_INDEX || "translations",
    ELASTICSEARCH_USER: process.env.ELASTICSEARCH_USER || "",
    ELASTICSEARCH_PASSWORD: process.env.ELASTICSEARCH_PASSWORD || "",
}

console.log("---------------------------")
console.log(process.env.DATABASE_URL)
console.log("---------------------------")