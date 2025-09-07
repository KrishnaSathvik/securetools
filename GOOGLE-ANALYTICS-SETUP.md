# 🔒 Google Analytics 4 Setup Guide for SecureTools

This guide will help you set up Google Analytics 4 for SecureTools with security-focused event tracking and conversion goals.

## 📋 Prerequisites

- Google account
- SecureTools project deployed
- Access to Google Analytics

## 🚀 Step 1: Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring" or "Create Account"
3. Enter account name: "SecureTools"
4. Choose "Web" as the platform
5. Enter website URL: `https://securetools.dev`
6. Select industry: "Technology" or "Software"
7. Choose reporting time zone: Your preferred timezone
8. Accept data processing terms

## 🔧 Step 2: Get Measurement ID

1. In your GA4 property, go to "Admin" (gear icon)
2. Under "Property", click "Data Streams"
3. Click "Add stream" → "Web"
4. Enter website URL: `https://securetools.dev`
5. Enter stream name: "SecureTools Website"
6. Copy the Measurement ID (format: G-XXXXXXXXXX)

## ⚙️ Step 3: Configure Environment Variables

1. Open your `.env` file in the SecureTools project
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID:

```env
# Google Analytics 4 Configuration
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GA_API_KEY=your_api_key_here
VITE_GA_CLIENT_ID=your_client_id_here
NODE_ENV=production
```

## 📊 Step 4: Set Up Conversion Goals

### Security Tool Usage Goals

1. Go to "Admin" → "Events"
2. Click "Create event"
3. Set up the following conversion events:

#### Password Generation
- **Event name**: `password_generated`
- **Conversion**: Yes
- **Description**: User generates a password

#### Text Encryption
- **Event name**: `text_encrypted`
- **Conversion**: Yes
- **Description**: User encrypts text

#### Security Headers Check
- **Event name**: `headers_checked`
- **Conversion**: Yes
- **Description**: User checks security headers

#### Two-Factor Auth Generation
- **Event name**: `totp_generated`
- **Conversion**: Yes
- **Description**: User generates TOTP codes

#### Random Data Generation
- **Event name**: `random_data_generated`
- **Conversion**: Yes
- **Description**: User generates random data

#### Password Analysis
- **Event name**: `password_analyzed`
- **Conversion**: Yes
- **Description**: User analyzes password strength

## 🎯 Step 5: Configure Custom Dimensions

1. Go to "Admin" → "Custom Definitions" → "Custom Dimensions"
2. Create the following custom dimensions:

### Security Tool Usage
- **Dimension name**: Security Tool Usage
- **Scope**: Event
- **Description**: Tracks which security tools are being used

### Password Security Level
- **Dimension name**: Password Security Level
- **Scope**: Event
- **Description**: Tracks password strength levels

### Encryption Strength
- **Dimension name**: Encryption Strength
- **Scope**: Event
- **Description**: Tracks encryption algorithm strength

### Security Header Score
- **Dimension name**: Security Header Score
- **Scope**: Event
- **Description**: Tracks security header scores

### User Security Knowledge
- **Dimension name**: User Security Knowledge
- **Scope**: User
- **Description**: Tracks user security expertise level

## 📈 Step 6: Set Up Custom Metrics

1. Go to "Admin" → "Custom Definitions" → "Custom Metrics"
2. Create the following custom metrics:

### Password Entropy
- **Metric name**: Password Entropy
- **Scope**: Event
- **Unit**: Bits
- **Description**: Measures password entropy in bits

### Security Score
- **Metric name**: Security Score
- **Scope**: Event
- **Unit**: Score
- **Description**: Overall security score (0-100)

### Encryption Time
- **Metric name**: Encryption Time
- **Scope**: Event
- **Unit**: Seconds
- **Description**: Time taken to encrypt text

### Headers Analyzed
- **Metric name**: Headers Analyzed
- **Scope**: Event
- **Unit**: Count
- **Description**: Number of headers analyzed

### Security Risks Identified
- **Metric name**: Security Risks Identified
- **Scope**: Event
- **Unit**: Count
- **Description**: Number of security risks found

## 🔍 Step 7: Create Audiences

1. Go to "Admin" → "Audiences"
2. Create the following audiences:

### Security Tool Users
- **Audience name**: Security Tool Users
- **Description**: Users who have used any security tool
- **Conditions**: Event name = `tool_accessed`

### Password Generator Users
- **Audience name**: Password Generator Users
- **Description**: Users who have generated passwords
- **Conditions**: Event name = `password_generated`

### Security Content Readers
- **Audience name**: Security Content Readers
- **Description**: Users who have read security articles
- **Conditions**: Event name = `security_article_read`

### High Security Users
- **Audience name**: High Security Users
- **Description**: Users who use multiple security tools
- **Conditions**: Event count >= 5 for `tool_accessed`

## 📊 Step 8: Set Up Reports

### Security Tools Overview
1. Go to "Reports" → "Engagement" → "Events"
2. Create a custom report with:
   - Event name
   - Event count
   - Total users
   - Security tool category

### Password Security Analysis
1. Create a custom report with:
   - Password strength distribution
   - Average entropy
   - Password length distribution
   - Security recommendations viewed

### Security Headers Performance
1. Create a custom report with:
   - Security score distribution
   - Most common missing headers
   - Average security score
   - Headers checked per session

## 🔒 Step 9: Privacy and Security Settings

### Data Retention
1. Go to "Admin" → "Data Settings" → "Data Retention"
2. Set retention period to 14 months (maximum for free GA4)
3. Enable "Reset user data on new activity"

### Data Deletion
1. Go to "Admin" → "Data Settings" → "Data Deletion Requests"
2. Set up automatic data deletion for user data

### IP Anonymization
1. Go to "Admin" → "Data Settings" → "Data Collection"
2. Enable "IP anonymization"
3. Disable "Google signals data collection" for privacy

## 📱 Step 10: Mobile App Setup (Optional)

If you plan to create a mobile app:

1. Go to "Admin" → "Data Streams"
2. Click "Add stream" → "iOS app" or "Android app"
3. Enter app details
4. Follow the mobile SDK setup instructions

## 🎯 Step 11: Set Up Goals and Conversions

### Primary Goals
1. **Security Tool Usage**: Track when users use any security tool
2. **Password Generation**: Track password generation events
3. **Text Encryption**: Track text encryption events
4. **Security Headers Check**: Track security header analysis
5. **Content Engagement**: Track security article reads

### Secondary Goals
1. **Tool Sharing**: Track when users share tools
2. **FAQ Engagement**: Track FAQ page views
3. **Comparison Views**: Track tool comparison views
4. **Return Visits**: Track returning users

## 📊 Step 12: Monitor and Optimize

### Key Metrics to Track
- **Security tool usage frequency**
- **Password generation success rate**
- **Security header check completion rate**
- **Content engagement rate**
- **User retention rate**
- **Conversion rate by tool**

### Regular Tasks
- Review security tool usage reports weekly
- Monitor conversion goals monthly
- Analyze user behavior patterns
- Optimize based on data insights
- Update custom dimensions as needed

## 🚨 Troubleshooting

### Common Issues
1. **No data appearing**: Check Measurement ID and implementation
2. **Events not tracking**: Verify gtag implementation
3. **Custom dimensions not working**: Check dimension setup and scope
4. **Conversion goals not firing**: Verify event names match exactly

### Debug Tools
- Use Google Analytics Debugger extension
- Check browser console for errors
- Use GA4 Real-time reports
- Verify events in GA4 interface

## 📚 Additional Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Custom Dimensions Guide](https://support.google.com/analytics/answer/10075209)
- [Conversion Tracking Guide](https://support.google.com/analytics/answer/9267568)

## 🎉 Success Metrics

After setup, you should see:
- Security tool usage events firing
- Custom dimensions populated
- Conversion goals tracking
- User behavior insights
- Security tool performance data

---

**Note**: This setup is optimized for SecureTools' security-focused nature and includes privacy-conscious configurations to protect user data while providing valuable insights into security tool usage patterns.