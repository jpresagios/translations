export default class ElasticSearchServiceMock {
    search = async query => {
        return Promise.resolve({
            hits: {
                hits: [{
                    _source: {
                        source: "Hello",
                        target: "Hola"
                    }
                }, {
                    _source: {
                        source: "Hello World",
                        target: "Hola Mundo"
                    }
                }]
            }
        });
    }
}