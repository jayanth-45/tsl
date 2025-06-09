import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'providers/app_state.dart';
import 'screens/dashboard_screen.dart';
import 'screens/travel_requests_screen.dart';
import 'screens/employee_management_screen.dart';
import 'screens/request_details_screen.dart';
import 'screens/booking_details_screen.dart';
import 'screens/booking_completed_screen.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({Key? key}) : super(key: key);

  final GoRouter _router = GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const DashboardScreen(),
      ),
      GoRoute(
        path: '/pending-requests',
        builder: (context, state) => const TravelRequestsScreen(),
      ),
      GoRoute(
        path: '/employees',
        builder: (context, state) => const EmployeeManagementScreen(),
      ),
      GoRoute(
        path: '/request/:id',
        builder: (context, state) => RequestDetailsScreen(
          requestId: state.pathParameters['id']!,
        ),
      ),
      GoRoute(
        path: '/request/:id/booking',
        builder: (context, state) => BookingDetailsScreen(
          requestId: state.pathParameters['id']!,
        ),
      ),
      GoRoute(
        path: '/request/:id/completed',
        builder: (context, state) => BookingCompletedScreen(
          requestId: state.pathParameters['id']!,
        ),
      ),
    ],
  );

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => AppState(),
      child: MaterialApp.router(
        title: 'TSL Admin Dashboard',
        theme: AppTheme.lightTheme,
        routerConfig: _router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}