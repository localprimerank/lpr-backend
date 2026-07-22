const Service = require('../models/Service');

// 1. Get all services (Sorted by the 'order' field)
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort('order');
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 2. Get a single service by ID
const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 3. Create a new service
const createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json({ success: true, data: newService });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 4. Update an existing service
const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.json({ success: true, data: updatedService });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 5. Delete a service
const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
};