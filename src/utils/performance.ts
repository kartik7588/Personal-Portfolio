/**
 * Performance monitoring utilities
 * Uncomment and use these in production to track Core Web Vitals
 */

// Uncomment to enable performance monitoring:
// import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  id: string;
}

/**
 * Log performance metrics to console (development)
 * Replace with analytics service in production (e.g., Google Analytics, Plausible)
 */
export function reportMetric(metric: PerformanceMetric) {
  if (import.meta.env.DEV) {
    console.log(`[Performance] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    });
  }
  
  // In production, send to analytics:
  // sendToAnalytics(metric);
}

/**
 * Send metrics to analytics service
 * Example: Google Analytics, Plausible, or custom endpoint
 */
export function sendToAnalytics(metric: PerformanceMetric) {
  // Example: Google Analytics 4
  // gtag('event', metric.name, {
  //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //   metric_id: metric.id,
  //   metric_value: metric.value,
  //   metric_rating: metric.rating,
  // });

  // Example: Custom endpoint
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // });
}

/**
 * Initialize Web Vitals monitoring
 * Tracks: CLS, FID, FCP, LCP, TTFB
 * 
 * To use:
 * 1. Install: npm install web-vitals
 * 2. Uncomment the imports at the top
 * 3. Call initPerformanceMonitoring() in your main.tsx
 */
export function initPerformanceMonitoring() {
  // Uncomment when web-vitals is installed:
  /*
  onCLS((metric) => reportMetric(metric as PerformanceMetric));
  onFID((metric) => reportMetric(metric as PerformanceMetric));
  onFCP((metric) => reportMetric(metric as PerformanceMetric));
  onLCP((metric) => reportMetric(metric as PerformanceMetric));
  onTTFB((metric) => reportMetric(metric as PerformanceMetric));
  */
}

/**
 * Measure custom performance marks
 * Useful for tracking specific features like 3D scene load time
 */
export function measurePerformance(name: string, startMark: string, endMark: string) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name)[0];
    
    if (import.meta.env.DEV) {
      console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
    }
    
    return measure.duration;
  }
  return 0;
}

/**
 * Create performance marks for custom measurements
 */
export function markPerformance(name: string) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(name);
  }
}

/**
 * Observer for tracking long tasks (>50ms)
 * Helps identify performance bottlenecks
 */
export function observeLongTasks(callback: (duration: number) => void) {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            callback(entry.duration);
            if (import.meta.env.DEV) {
              console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`);
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      return () => observer.disconnect();
    } catch (e) {
      console.warn('Long task observation not supported');
    }
  }
  return () => {};
}

/**
 * Get current memory usage (Chrome only)
 */
export function getMemoryUsage() {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      percentage: ((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(2),
    };
  }
  return null;
}
