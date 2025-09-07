# Environment Setup for TextCraft

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Google Analytics 4 Configuration
# Get your Measurement ID from Google Analytics 4
# Format: G-XXXXXXXXXX
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Enable/disable analytics tracking
VITE_ANALYTICS_ENABLED=true

# Optional: Debug mode for analytics
VITE_ANALYTICS_DEBUG=false
```

## How to Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for your website
3. Go to Admin → Data Streams → Web
4. Copy your Measurement ID (starts with G-)
5. Add it to your `.env` file

## Analytics Features

TextCraft includes comprehensive analytics tracking:

- **Page Views**: Automatic tracking of all page visits
- **Tool Usage**: Tracks when users interact with tools
- **Text Processing**: Monitors text processing operations
- **User Interactions**: Tracks clicks, copies, downloads, etc.
- **Performance Metrics**: Monitors tool performance
- **Error Tracking**: Captures and reports errors

## Privacy Compliance

All analytics tracking is GDPR compliant:
- No personal data is collected
- All text processing happens locally
- Users can opt out via browser settings
- Analytics data is anonymized

## Development vs Production

- **Development**: Analytics are disabled by default
- **Production**: Set `VITE_ANALYTICS_ENABLED=true` to enable tracking

## Testing Analytics

To test analytics in development:
1. Set `VITE_ANALYTICS_DEBUG=true`
2. Check browser console for analytics events
3. Verify events in Google Analytics Real-time reports
