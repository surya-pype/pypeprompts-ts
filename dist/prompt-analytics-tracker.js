"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptAnalyticsTracker = void 0;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const config_1 = require("./config");
const prompt_analytics_error_1 = require("./prompt-analytics-error");
class PromptAnalyticsTracker {
    constructor(projectToken, enabled = true) {
        if (!projectToken) {
            throw new prompt_analytics_error_1.PromptAnalyticsError('project_token is required');
        }
        this.instanceId = (0, uuid_1.v4)();
        this.projectToken = projectToken;
        this.dashboardUrl = config_1.config.DEFAULT_DASHBOARD_URL;
        this.promptVersionUrl = config_1.config.DEFAULT_PROMPT_VERSIONS_URL;
        this.enabled = enabled;
    }
    track(workflowName, properties) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.enabled) {
                console.log('Analytics tracker is disabled. Skipping data submission.');
                return '';
            }
            try {
                const analyticsItem = this.createAnalyticsItem(workflowName, properties);
                yield this.sendAnalytics(analyticsItem);
                return analyticsItem.promptId;
            }
            catch (error) {
                console.error(`Error in track method: ${error}`);
                throw new prompt_analytics_error_1.PromptAnalyticsError(`Failed to track analytics: ${error}`);
            }
        });
    }
    createAnalyticsItem(workflowName, properties) {
        if (!workflowName) {
            throw new prompt_analytics_error_1.PromptAnalyticsError('workflow_name is required');
        }
        const prompt = properties.prompt || '';
        const output = properties.output || '';
        let attributes = properties.attributes;
        // Convert sets to arrays if needed
        if (attributes) {
            attributes = this.convertSetsToArrays(attributes);
        }
        return {
            instanceId: this.instanceId,
            promptId: (0, uuid_1.v4)(),
            name: workflowName,
            processingTime: properties.processingTime || 0.0,
            input: prompt,
            inputLength: prompt.length,
            output: output,
            outputLength: output.length,
            functionName: properties.functionName || workflowName,
            tags: properties.tags || [],
            attributes,
        };
    }
    convertSetsToArrays(obj) {
        if (typeof obj === 'object') {
            if (Array.isArray(obj)) {
                return obj.map(this.convertSetsToArrays);
            }
            const newObj = {};
            for (const [key, value] of Object.entries(obj)) {
                if (value instanceof Set) {
                    newObj[key] = Array.from(value);
                }
                else {
                    newObj[key] = this.convertSetsToArrays(value);
                }
            }
            return newObj;
        }
        return obj;
    }
    sendAnalytics(analytics) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.projectToken}`,
            };
            try {
                const config = {
                    headers,
                    method: 'post',
                    url: this.dashboardUrl,
                    data: analytics,
                };
                const response = yield (0, axios_1.default)(config);
                console.log('Analytics data submitted successfully', response.data);
            }
            catch (error) {
                console.error('Failed to submit analytics data', error);
                throw new prompt_analytics_error_1.PromptAnalyticsError(`Failed to submit analytics data: ${error}`);
            }
        });
    }
}
exports.PromptAnalyticsTracker = PromptAnalyticsTracker;
