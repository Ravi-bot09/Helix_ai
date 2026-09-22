const mongoose = require('mongoose');

const Incidentschema = new mongoose.Schema({

    tenantId: {
        type: String,
        required: true
    },

    agentname: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['idle', 'working', 'done', 'failed'],
        default: 'idle',
    },

    message: {
        type: String,
        required: true
    },

    meta: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    }

}, {
    timestamps: true
});

Incidentschema.index({ agentname: 1, createdAt: -1 });


const Logschema = new mongoose.Schema({

    tenantId: {
        type: String,
        required: true
    },

    agentname: {
        type: String,
        required: true
    },

    level: {
        type: String,
        enum: ['info', 'warn', 'error'],
        default: 'info',
    },

    message: {
        type: String,
        required: true
    },

    meta: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    }

}, {
    timestamps: true
});

Logschema.index({ agentname: 1, createdAt: -1 });


module.exports = {
    Incident: mongoose.model('Incident', Incidentschema),
    Log: mongoose.model('Log', Logschema),
};