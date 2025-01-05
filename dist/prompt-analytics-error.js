"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptAnalyticsError = void 0;
class PromptAnalyticsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PromptAnalyticsError';
    }
}
exports.PromptAnalyticsError = PromptAnalyticsError;
