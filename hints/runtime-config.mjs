// Version-pinned. No CDN requests occur until the player explicitly enables a model.
export const WLLAMA_VERSION = "3.6.1";
export const RUNTIME_BASE = `https://cdn.jsdelivr.net/npm/@wllama/wllama@${WLLAMA_VERSION}/esm/`;
// Deployments may replace RUNTIME_BASE with their own pinned Wllama assets.
// Default compatibility support is also resolved by Wllama when needed.
export const COMPAT_MODE = "default";
