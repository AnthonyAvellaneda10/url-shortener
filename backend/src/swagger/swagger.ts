import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Short URL API',
            version: '1.0.0',
            description: 'API for managing short URLs',
            contact: {
                name: 'Anthony Avellaneda',
            },
            servers: [
                {
                    url: 'http://localhost:5000',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['./backend/routes/*.ts']
};

const specs = swaggerJsdoc(options);
export default specs;