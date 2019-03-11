const DriverRoutes = require('../routes/driver_route');

module.exports = (app) => {
    app.use('/driver', DriverRoutes);
};
