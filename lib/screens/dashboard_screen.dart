import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../widgets/app_header.dart';
import '../widgets/sidebar.dart';
import '../widgets/stats_card.dart';
import '../widgets/request_card.dart';
import '../providers/app_state.dart';
import '../theme/app_theme.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppHeader(
        username: "Admin",
        onNotificationTap: () => context.go('/pending-requests'),
        notificationCount: 3,
      ),
      drawer: Sidebar(
        isOpen: true,
        onClose: () => Navigator.of(context).pop(),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.menu),
                  onPressed: () => _scaffoldKey.currentState?.openDrawer(),
                ),
                const SizedBox(width: 8),
                const Text(
                  'Dashboard Overview',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.textPrimary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Stats Grid
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 1.5,
              children: const [
                StatsCard(
                  title: 'Travel Request',
                  value: '12',
                  icon: Icons.access_time,
                ),
                StatsCard(
                  title: 'Total Employee',
                  value: '86',
                  icon: Icons.people,
                  iconColor: AppTheme.primaryColor,
                ),
                StatsCard(
                  title: 'Flight Budget Used',
                  value: '68%',
                  icon: Icons.flight,
                  iconColor: AppTheme.primaryColor,
                ),
                StatsCard(
                  title: 'Hotel Budget Used',
                  value: '42%',
                  icon: Icons.hotel,
                ),
              ],
            ),
            const SizedBox(height: 32),

            // Recent Requests
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Recent Requests',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: AppTheme.textPrimary,
                          ),
                        ),
                        TextButton(
                          onPressed: () => context.go('/pending-requests'),
                          child: const Text(
                            'View All',
                            style: TextStyle(
                              color: AppTheme.primaryColor,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Consumer<AppState>(
                      builder: (context, appState, child) {
                        final recentRequests = appState.travelRequests.take(3).toList();
                        
                        return Column(
                          children: recentRequests.map((request) {
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 8),
                              child: RequestCard(
                                request: request,
                                onTap: () => context.go('/request/${request.id}'),
                              ),
                            );
                          }).toList(),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}