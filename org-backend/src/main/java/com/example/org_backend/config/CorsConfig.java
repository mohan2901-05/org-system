package com.example.org_backend.config;

// CORS is now fully handled by SecurityConfig.corsConfigurationSource().
// Keeping this file empty avoids the duplicate CORS conflict where both
// WebMvcConfigurer and Spring Security's CorsFilter were applying headers,
// causing "Access-Control-Allow-Origin" to appear twice in responses.