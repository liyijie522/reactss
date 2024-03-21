/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />


declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: { env: { NODE_ENV: "production" | "development" } }

  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env {
    
  }
}