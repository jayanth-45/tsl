# TSL Admin Dashboard - Flutter

A comprehensive Flutter admin dashboard for travel booking management, converted from the original React application.

## Features

- **Dashboard Overview**: Statistics and recent travel requests
- **Travel Request Management**: View, filter, and manage travel requests by status
- **Employee Management**: Browse employees by department with search functionality
- **Request Processing**: Complete workflow from request submission to booking completion
- **Responsive Design**: Optimized for both mobile and tablet devices
- **Material Design**: Clean, modern UI following Material Design principles

## Project Structure

```
lib/
├── main.dart                 # App entry point and routing
├── theme/
│   └── app_theme.dart       # App-wide theme configuration
├── models/
│   ├── employee.dart        # Employee data model
│   └── travel_request.dart  # Travel request data model
├── data/
│   └── mock_data.dart       # Mock data for development
├── providers/
│   └── app_state.dart       # App state management
├── widgets/
│   ├── app_header.dart      # Reusable header component
│   ├── sidebar.dart         # Navigation sidebar
│   ├── stats_card.dart      # Statistics display card
│   ├── request_card.dart    # Travel request card
│   └── progress_steps.dart  # Progress indicator
└── screens/
    ├── dashboard_screen.dart           # Main dashboard
    ├── travel_requests_screen.dart     # Travel requests list
    ├── employee_management_screen.dart # Employee management
    ├── request_details_screen.dart     # Request details view
    ├── booking_details_screen.dart     # Booking form
    └── booking_completed_screen.dart   # Completion confirmation
```

## Key Dependencies

- **flutter**: Core Flutter framework
- **go_router**: Declarative routing
- **provider**: State management
- **intl**: Internationalization and number formatting
- **file_picker**: File selection for document uploads

## Getting Started

1. **Install Flutter**: Follow the [Flutter installation guide](https://flutter.dev/docs/get-started/install)

2. **Install dependencies**:
   ```bash
   flutter pub get
   ```

3. **Run the app**:
   ```bash
   flutter run
   ```

## Key Features Converted from React

### Navigation
- React Router → Go Router for declarative navigation
- Responsive sidebar with drawer functionality
- Tab-based navigation for travel requests

### State Management
- React hooks → Provider pattern for state management
- Centralized app state with reactive updates
- Search and filtering functionality

### UI Components
- Tailwind CSS → Material Design components
- Custom cards and statistics widgets
- Progress indicators and status chips
- File upload interface

### Data Flow
- Mock data structure maintained from original
- Employee and travel request models
- Status-based filtering and search

## Responsive Design

The app is optimized for:
- **Mobile devices**: Single-column layouts, drawer navigation
- **Tablets**: Adaptive grid layouts, expanded content areas
- **Material Design**: Consistent spacing, typography, and color schemes

## Development Notes

- Uses Material Design 3 principles
- Implements proper Flutter widget lifecycle
- Follows Flutter best practices for state management
- Maintains the original app's functionality and user experience
- Ready for production deployment

## Future Enhancements

- Integration with real backend APIs
- Push notifications for request updates
- Advanced filtering and sorting options
- Export functionality for reports
- Dark theme support