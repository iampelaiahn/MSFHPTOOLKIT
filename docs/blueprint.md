# **App Name**: OutreachRx

## Core Features:

- Dynamic Tool Designer: Drag-and-drop form builder with an Excel-like formula editor for calculated fields and validation rules, including tools for text, GPS, photos, and signatures. Push specific tools to specific microplanner types (facility vs. community).
- User and Role Management: Create and assign roles to users, defining access control based on the four distinct user personas: Master Supervisor, Community Health Mobiliser, Community-Based Microplanner, and Facility-Based Microplanner.
- Synthesis Dashboard: A unified dashboard merging community data with facility data for analysis, providing tools to analyze trends such as 'Linkage to Care' rates vs. 'Community Referrals'.
- Geospatial Analytics: Heatmaps and reporting providing geospatial views of hotspot coverage and automated weekly performance reports.
- Risk Assessment Wizard: A standard 6-point scoring algorithm to determine visit frequency. The master supervisor can use the tool to add custom questions via the formula editor, if needed.
- Referral Handshake: A system where a community microplanner issues a digital referral (QR Code/Unique ID), the facility microplanner scans/enters it, and the community health mobilizer sees the linkage completed on their dashboard.
- Offline Data Sync: Service Workers and IndexedDB enable full app functionality offline, with automatic data synchronization when connectivity is restored.

## Style Guidelines:

- Primary color: A vibrant teal (#008080) evoking trustworthiness and health.
- Background color: A light, desaturated teal (#E0F8F8) creating a clean and calming backdrop.
- Accent color: A complementary light green (#80FF80) for highlights and calls to action.
- Font pairing: 'Space Grotesk' (sans-serif) for headings, providing a modern, techy feel; and 'Inter' (sans-serif) for body text, ensuring readability and a neutral tone.
- Code font: 'Source Code Pro' for displaying code snippets clearly.
- Use modern, minimalist icons that visually represent key actions and data points across the platform.
- Design a high-density desktop dashboard for supervisors with clear data visualizations and a mobile-optimized, dark-mode PWA interface for field workers.